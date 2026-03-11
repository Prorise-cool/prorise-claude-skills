#!/usr/bin/env python3
"""
Dry-run planner for expert taxonomy reorganization (v7).

Behavior:
- Reads v4 + v6 taxonomy artifacts
- Applies AI specialist decisions (mcp-builder/prompt-enhancer -> ai-specialist)
- Produces a dry-run operation plan with conflict checks
- Does NOT modify filesystem
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class Operation:
    op_type: str
    source: str
    target: str
    reason: str
    source_exists: bool
    target_exists: bool
    ready: bool
    notes: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "op_type": self.op_type,
            "source": self.source,
            "target": self.target,
            "reason": self.reason,
            "source_exists": self.source_exists,
            "target_exists": self.target_exists,
            "ready": self.ready,
            "notes": self.notes,
        }


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_v4_mapping(v4: dict[str, Any]) -> list[dict[str, str]]:
    rows = v4.get("top_level_precise_mapping", [])
    normalized: list[dict[str, str]] = []
    for row in rows:
        normalized.append(
            {
                "source": row["source"],
                "action": row["action"],
                "target": row["target"],
                "reason": row.get("reason", ""),
            }
        )
    return normalized


def apply_v7_overrides(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    updated: list[dict[str, str]] = []
    for row in rows:
        source = row["source"]

        # user-confirmed rename
        if source == "language-framework-specialist":
            updated.append(
                {
                    "source": source,
                    "action": "rename_keep_top_expert",
                    "target": "framework-specialist",
                    "reason": "User approved rename from language-framework-specialist",
                }
            )
            continue

        # user-confirmed AI extraction
        if source == "mcp-builder":
            updated.append(
                {
                    "source": source,
                    "action": "merge",
                    "target": "ai-specialist/references/domains/mcp-server-engineering/mcp-builder",
                    "reason": "Move MCP skill into AI specialist",
                }
            )
            continue

        if source == "prompt-enhancer":
            updated.append(
                {
                    "source": source,
                    "action": "merge",
                    "target": "ai-specialist/references/domains/prompt-engineering/prompt-enhancer",
                    "reason": "User requested prompt-enhancer under AI specialist",
                }
            )
            continue

        if source == "ruoyi-framework":
            updated.append(
                {
                    "source": source,
                    "action": "merge",
                    "target": "open-source-project-specialist/references/projects/ruoyi",
                    "reason": "RuoYi belongs to OSS project specialist category",
                }
            )
            continue

        updated.append(row)

    return updated


def build_operations(
    skills_root: Path,
    mapping_rows: list[dict[str, str]],
    v4_backend: list[dict[str, str]],
    v6_ai_files: list[dict[str, str]],
) -> dict[str, Any]:
    ops: list[Operation] = []

    # Ensure new top-level experts exist
    for new_dir in ["ai-specialist", "open-source-project-specialist"]:
        target = skills_root / new_dir
        ops.append(
            Operation(
                op_type="mkdir",
                source="",
                target=str(target),
                reason=f"Ensure top-level expert directory exists: {new_dir}",
                source_exists=True,
                target_exists=target.exists(),
                ready=True,
                notes="No-op if already exists",
            )
        )

    # Top-level mapping operations
    for row in mapping_rows:
        source_name = row["source"]
        action = row["action"]
        target_rel = row["target"]
        reason = row["reason"]

        if action == "keep_exception" or action == "keep_top_expert":
            continue

        src = skills_root / source_name

        if action == "rename_keep_top_expert":
            dst = skills_root / target_rel
            ops.append(
                Operation(
                    op_type="rename_dir",
                    source=str(src),
                    target=str(dst),
                    reason=reason,
                    source_exists=src.exists(),
                    target_exists=dst.exists(),
                    ready=src.exists() and not dst.exists(),
                    notes="Top-level expert rename",
                )
            )
            continue

        # action == merge
        dst = skills_root / target_rel
        ops.append(
            Operation(
                op_type="move_dir",
                source=str(src),
                target=str(dst),
                reason=reason,
                source_exists=src.exists(),
                target_exists=dst.exists(),
                ready=src.exists() and not dst.exists(),
                notes="Merge source directory into specialist domain path",
            )
        )

    # Backend reference cleanup (exclude file extracted to AI to avoid dual moves)
    ai_extracted_sources = {item["source"] for item in v6_ai_files}
    for item in v4_backend:
        source_rel_raw = item["source"]
        target_rel_raw = item["target"]

        # v4 may store backend mapping as short names (e.g., cursor_rules_xxx.md)
        # normalize to full paths under backend-specialist.
        if "/" in source_rel_raw:
            source_rel = source_rel_raw
        else:
            source_rel = f"backend-specialist/references/{source_rel_raw}"

        if target_rel_raw.startswith("backend-specialist/"):
            target_rel = target_rel_raw
        elif target_rel_raw.startswith("references/"):
            target_rel = f"backend-specialist/{target_rel_raw}"
        else:
            target_rel = f"backend-specialist/references/{target_rel_raw}"

        if source_rel == "backend-specialist/references/engineering_backend_ai-engineer.md":
            continue
        if source_rel in ai_extracted_sources:
            continue

        src = skills_root / source_rel
        dst = skills_root / target_rel
        ops.append(
            Operation(
                op_type="move_file",
                source=str(src),
                target=str(dst),
                reason="Backend references semantic cleanup (remove noisy prefixes)",
                source_exists=src.exists(),
                target_exists=dst.exists(),
                ready=src.exists() and not dst.exists(),
                notes="File-level taxonomy normalization",
            )
        )

    # AI file-level extraction (excluding mcp-builder/reference because whole dir moved)
    for item in v6_ai_files:
        source_rel = item["source"]
        if source_rel.startswith("mcp-builder/reference/"):
            continue

        src = skills_root / source_rel
        dst = skills_root / item["target"]
        ops.append(
            Operation(
                op_type="move_file",
                source=str(src),
                target=str(dst),
                reason="AI specialist extraction",
                source_exists=src.exists(),
                target_exists=dst.exists(),
                ready=src.exists() and not dst.exists(),
                notes="Extract AI-specific asset to ai-specialist",
            )
        )

    totals = {
        "all_operations": len(ops),
        "ready_operations": sum(1 for op in ops if op.ready),
        "blocked_operations": sum(1 for op in ops if not op.ready),
        "mkdir": sum(1 for op in ops if op.op_type == "mkdir"),
        "rename_dir": sum(1 for op in ops if op.op_type == "rename_dir"),
        "move_dir": sum(1 for op in ops if op.op_type == "move_dir"),
        "move_file": sum(1 for op in ops if op.op_type == "move_file"),
    }

    blocked = [op.to_dict() for op in ops if not op.ready]

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mode": "dry-run",
        "totals": totals,
        "operations": [op.to_dict() for op in ops],
        "blocked_operations": blocked,
    }


def to_markdown(report: dict[str, Any]) -> str:
    lines = [
        "# Expert Reorg V7 Dry Run",
        "",
        f"- Generated at (UTC): `{report['generated_at']}`",
        f"- Mode: `{report['mode']}`",
        "",
        "## Summary",
        "",
    ]
    totals = report["totals"]
    lines.extend(
        [
            f"- All operations: **{totals['all_operations']}**",
            f"- Ready: **{totals['ready_operations']}**",
            f"- Blocked: **{totals['blocked_operations']}**",
            f"- `mkdir`: {totals['mkdir']}",
            f"- `rename_dir`: {totals['rename_dir']}",
            f"- `move_dir`: {totals['move_dir']}",
            f"- `move_file`: {totals['move_file']}",
            "",
            "## Blocked Operations",
            "",
        ]
    )

    blocked = report["blocked_operations"]
    if not blocked:
        lines.append("- None")
    else:
        for item in blocked:
            lines.append(
                f"- `{item['op_type']}` `{item['source']}` -> `{item['target']}` "
                f"(source_exists={item['source_exists']}, target_exists={item['target_exists']})"
            )

    lines.extend(["", "## Operations (Ordered)", ""])
    for item in report["operations"]:
        status = "READY" if item["ready"] else "BLOCKED"
        src = item["source"] if item["source"] else "(none)"
        lines.append(
            f"- [{status}] `{item['op_type']}`: `{src}` -> `{item['target']}`"
            f" | {item['reason']}"
        )

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate v7 expert reorg dry-run plan.")
    parser.add_argument(
        "--skills-root",
        default=".claude/skills",
        help="Skills root path (default: .claude/skills)",
    )
    parser.add_argument(
        "--v4-json",
        default=".workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/expert-taxonomy-v4.json",
    )
    parser.add_argument(
        "--v6-json",
        default=".workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/expert-taxonomy-v6-ai-specialist.json",
    )
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--output-md", default="")
    args = parser.parse_args()

    skills_root = Path(args.skills_root).resolve()
    v4 = load_json(Path(args.v4_json).resolve())
    v6 = load_json(Path(args.v6_json).resolve())

    rows = normalize_v4_mapping(v4)
    rows = apply_v7_overrides(rows)

    backend = v4.get("backend_reference_precise_mapping", [])
    ai_files = v6.get("file_level_extraction", [])

    report = build_operations(skills_root, rows, backend, ai_files)

    output_json = Path(args.output_json).resolve()
    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.output_md:
        output_md = Path(args.output_md).resolve()
        output_md.parent.mkdir(parents=True, exist_ok=True)
        output_md.write_text(to_markdown(report), encoding="utf-8")

    print(f"[OK] Dry-run JSON: {output_json}")
    if args.output_md:
        print(f"[OK] Dry-run MD: {Path(args.output_md).resolve()}")


if __name__ == "__main__":
    main()
