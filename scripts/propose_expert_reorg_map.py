#!/usr/bin/env python3
"""
Generate a dry-run reorganization mapping:
- Keep ccw* as exception (no reorg)
- Move everything else under a single expert super-category: experts/
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

KEY_PATTERN = re.compile(r"^([A-Za-z0-9_-]+)\s*:\s*(.*)$")
TOKEN_PATTERN = re.compile(r"[A-Za-z0-9\u4e00-\u9fff]+")

DEFAULT_RULES: dict[str, str] = {
    "artifacts-builder": "frontend-specialist",
    "business-analysis": "product-specialist",
    "changelog-generator": "documentation-specialist",
    "competitive-ads-extractor": "marketing-specialist",
    "copyright-docs": "documentation-specialist",
    "document-skills": "documentation-specialist",
    "domain-name-brainstormer": "marketing-specialist",
    "file-organizer": "operations-specialist",
    "gh-bootstrap": "github-specialist",
    "internal-comms": "documentation-specialist",
    "issue-manage": "project-management-specialist",
    "lead-research-assistant": "marketing-specialist",
    "mcp-builder": "backend-specialist",
    "meeting-insights-analyzer": "project-management-specialist",
    "project-analyze": "architecture-specialist",
    "prompt-enhancer": "product-specialist",
    "review-code": "code-quality-specialist",
    "ruoyi-framework": "language-framework-specialist",
    "skill-creator": "documentation-specialist",
    "skill-generator": "documentation-specialist",
    "skill-tuning": "code-quality-specialist",
    "software-manual": "documentation-specialist",
    "text-formatter": "documentation-specialist",
    "ui-ux-pro-max": "design-specialist",
    "ux-research": "design-specialist",
    "vue-best-practices": "frontend-specialist",
    "webapp-testing": "testing-specialist",
    "_shared": "operations-specialist",
}


@dataclass
class DirMeta:
    name: str
    has_skill_md: bool
    skill_name: str
    description: str


def _strip_quotes(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1].strip()
    return value


def parse_frontmatter(path: Path) -> dict[str, str]:
    metadata: dict[str, str] = {}
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.lstrip("\ufeff").splitlines()
    if not lines or lines[0].strip() != "---":
        return metadata

    fm_lines: list[str] = []
    for line in lines[1:]:
        if line.strip() == "---":
            break
        fm_lines.append(line)
    else:
        return metadata

    i = 0
    while i < len(fm_lines):
        line = fm_lines[i]
        match = KEY_PATTERN.match(line)
        if not match:
            i += 1
            continue

        key, raw_value = match.group(1), match.group(2).strip()
        if raw_value.startswith(("|", ">")):
            block_lines: list[str] = []
            i += 1
            while i < len(fm_lines):
                block_line = fm_lines[i]
                if KEY_PATTERN.match(block_line):
                    i -= 1
                    break
                if block_line.startswith((" ", "\t")):
                    block_lines.append(block_line.lstrip())
                elif block_line.strip() == "":
                    block_lines.append("")
                else:
                    i -= 1
                    break
                i += 1
            if raw_value.startswith("|"):
                metadata[key] = "\n".join(block_lines).strip()
            else:
                metadata[key] = " ".join(part.strip() for part in block_lines if part.strip()).strip()
        else:
            metadata[key] = _strip_quotes(raw_value)
        i += 1

    return metadata


def tokenize(text: str) -> set[str]:
    return {t.lower() for t in TOKEN_PATTERN.findall(text) if len(t) > 1}


def jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    inter = len(a.intersection(b))
    union = len(a.union(b))
    if union == 0:
        return 0.0
    return inter / union


def gather_top_level(skills_root: Path) -> list[DirMeta]:
    result: list[DirMeta] = []
    for entry in sorted(skills_root.iterdir(), key=lambda p: p.name):
        if not entry.is_dir():
            continue
        skill_md = entry / "SKILL.md"
        if skill_md.exists():
            fm = parse_frontmatter(skill_md)
            result.append(
                DirMeta(
                    name=entry.name,
                    has_skill_md=True,
                    skill_name=fm.get("name", ""),
                    description=fm.get("description", "").strip(),
                )
            )
        else:
            result.append(
                DirMeta(
                    name=entry.name,
                    has_skill_md=False,
                    skill_name="",
                    description="",
                )
            )
    return result


def build_mapping(
    items: list[DirMeta],
    exception_prefixes: list[str],
    experts_root: str,
) -> dict[str, Any]:
    anchors = sorted([item.name for item in items if item.name.endswith("-specialist")])
    anchor_tokens: dict[str, set[str]] = {}
    for item in items:
        if item.name in anchors:
            anchor_tokens[item.name] = tokenize(f"{item.name} {item.description}")

    entries: list[dict[str, Any]] = []

    for item in items:
        name = item.name
        source_path = f".claude/skills/{name}"

        if any(name.startswith(prefix) for prefix in exception_prefixes):
            entries.append(
                {
                    "source": source_path,
                    "target": source_path,
                    "expert_category": None,
                    "action": "keep",
                    "reason": f"Exception matched prefix: {','.join(exception_prefixes)}",
                    "confidence": 1.0,
                    "manual_review": False,
                }
            )
            continue

        if name in anchors:
            entries.append(
                {
                    "source": source_path,
                    "target": f".claude/skills/{experts_root}/{name}",
                    "expert_category": name,
                    "action": "move",
                    "reason": "Existing expert anchor directory",
                    "confidence": 1.0,
                    "manual_review": False,
                }
            )
            continue

        if name in DEFAULT_RULES and DEFAULT_RULES[name] in anchors:
            mapped = DEFAULT_RULES[name]
            entries.append(
                {
                    "source": source_path,
                    "target": f".claude/skills/{experts_root}/{mapped}/modules/{name}",
                    "expert_category": mapped,
                    "action": "move",
                    "reason": "Name-based explicit mapping rule",
                    "confidence": 0.9,
                    "manual_review": False,
                }
            )
            continue

        source_tokens = tokenize(f"{name} {item.description}")
        best_anchor = ""
        best_score = 0.0
        for anchor in anchors:
            score = jaccard(source_tokens, anchor_tokens.get(anchor, set()))
            if score > best_score:
                best_score = score
                best_anchor = anchor

        if not best_anchor:
            best_anchor = "operations-specialist" if "operations-specialist" in anchors else anchors[0]
            best_score = 0.0

        entries.append(
            {
                "source": source_path,
                "target": f".claude/skills/{experts_root}/{best_anchor}/modules/{name}",
                "expert_category": best_anchor,
                "action": "move",
                "reason": "Description similarity fallback",
                "confidence": round(best_score, 3),
                "manual_review": best_score < 0.12,
            }
        )

    by_expert: dict[str, int] = {}
    manual_review = 0
    keep_count = 0
    for entry in entries:
        if entry["action"] == "keep":
            keep_count += 1
            continue
        expert = entry["expert_category"] or "unknown"
        by_expert[expert] = by_expert.get(expert, 0) + 1
        if entry["manual_review"]:
            manual_review += 1

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "experts_root": f".claude/skills/{experts_root}",
        "exception_prefixes": exception_prefixes,
        "anchors": anchors,
        "summary": {
            "total_top_level_directories": len(items),
            "move_entries": len(entries) - keep_count,
            "keep_entries": keep_count,
            "manual_review_entries": manual_review,
        },
        "distribution_by_expert": dict(sorted(by_expert.items())),
        "entries": entries,
    }


def to_markdown(report: dict[str, Any]) -> str:
    lines = [
        "# Expert Reorg Dry-Run Map",
        "",
        f"- Generated at (UTC): `{report['generated_at']}`",
        f"- Experts root: `{report['experts_root']}`",
        f"- Exception prefixes: `{', '.join(report['exception_prefixes'])}`",
        "",
        "## Summary",
        "",
        f"- Total top-level directories: **{report['summary']['total_top_level_directories']}**",
        f"- Move entries: **{report['summary']['move_entries']}**",
        f"- Keep entries: **{report['summary']['keep_entries']}**",
        f"- Manual-review entries: **{report['summary']['manual_review_entries']}**",
        "",
        "## Distribution",
        "",
    ]

    for expert, count in report["distribution_by_expert"].items():
        lines.append(f"- `{expert}`: {count}")

    lines.extend(["", "## Mapping", ""])

    for entry in report["entries"]:
        flag = " [MANUAL_REVIEW]" if entry["manual_review"] else ""
        lines.append(
            f"- `{entry['source']}` -> `{entry['target']}`"
            f" ({entry['reason']}, confidence={entry['confidence']}){flag}"
        )

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Propose dry-run expert reorg mapping.")
    parser.add_argument(
        "--skills-root",
        default=".claude/skills",
        help="Skills root path (default: .claude/skills)",
    )
    parser.add_argument(
        "--experts-root",
        default="experts",
        help="Target super category directory under .claude/skills (default: experts)",
    )
    parser.add_argument(
        "--exception-prefixes",
        default="ccw",
        help="Comma-separated top-level prefixes to exclude from reorg (default: ccw)",
    )
    parser.add_argument("--output-json", required=True, help="Output JSON path")
    parser.add_argument("--output-md", default="", help="Optional output markdown path")
    args = parser.parse_args()

    skills_root = Path(args.skills_root).resolve()
    if not skills_root.exists() or not skills_root.is_dir():
        raise SystemExit(f"Invalid skills root: {skills_root}")

    prefixes = [item.strip() for item in args.exception_prefixes.split(",") if item.strip()]
    items = gather_top_level(skills_root)
    report = build_mapping(items, prefixes, args.experts_root)

    output_json = Path(args.output_json).resolve()
    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.output_md:
        output_md = Path(args.output_md).resolve()
        output_md.parent.mkdir(parents=True, exist_ok=True)
        output_md.write_text(to_markdown(report), encoding="utf-8")

    print(f"[OK] JSON report written to: {output_json}")
    if args.output_md:
        print(f"[OK] Markdown report written to: {Path(args.output_md).resolve()}")


if __name__ == "__main__":
    main()
