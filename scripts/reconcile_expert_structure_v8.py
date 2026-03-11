#!/usr/bin/env python3
"""
Reconcile specialist structure to a strict expert-domain tree.

Goals:
- Keep specialists flat under `.claude/skills/`
- Keep `_shared` and `ccw*` untouched
- Move loose `references/*` assets into `references/domains/*`
- Fix frontend/framework mismatch (Vue best-practices should live under frontend)
- Optionally rewrite top-level specialist SKILL.md as index-only documents
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


PREFIX_TO_DOMAIN = {
    "cursor_rules_": "rules",
    "specialized_": "specializations",
    "engineering_": "engineering",
    "deployment_": "deployment",
    "testing_": "testing",
    "core_": "core",
    "studio-operations_": "studio-operations",
    "project-management_": "project-management",
    "marketing_": "marketing",
    "design_": "design",
    "orchestrators_": "orchestration",
    "databases_": "databases",
    "universal_": "general",
    "senior_backend_": "personas/senior-backend",
}

FRONTEND_WEB = {
    "react",
    "next-js",
    "remix",
    "vue",
    "vue3",
    "nuxt",
    "angular",
    "svelte",
    "sveltekit",
    "solidjs",
    "astro",
    "qwik",
}

FRONTEND_MOBILE = {
    "react-native",
    "expo",
    "flutter",
    "ionic",
    "android-sdk",
    "jetpack-compose",
    "kivy",
    "pyqt",
    "pyside",
    "tkinter",
    "customtkinter",
    "pygame",
}

FRONTEND_UI_LIBS = {"material-ui", "ant-design", "chakra-ui", "fontawesome", "shadcn"}
FRONTEND_STYLING = {"css", "tailwind"}
FRONTEND_STATE = {"react-query", "react-redux", "react-mobx", "vue-state-manager", "zustand", "redux", "mobx", "riverpod"}
FRONTEND_REHOME_FROM_FRAMEWORK = {
    "cursor_rules_vue.md",
    "cursor_rules_vue3.md",
    "cursor_rules_nuxt.md",
    "cursor_rules_react.md",
    "cursor_rules_next-js.md",
    "specialized_react_react-component-architect.md",
    "specialized_react_react-nextjs-expert.md",
    "specialized_vue_vue-component-architect.md",
    "specialized_vue_vue-nuxt-expert.md",
    "specialized_vue_vue-state-manager.md",
}

SECURITY_IDP = {"auth0", "clerk"}

DATA_DATABASE = {
    "postgresql",
    "mysql",
    "mariadb",
    "mongodb",
    "sqlite",
    "supabase",
    "prisma",
    "drizzle",
    "elasticsearch",
    "redis",
    "aws-dynamodb",
    "aws-rds",
    "duckdb",
    "neo4j",
}

DATA_ML_AI = {
    "langchain",
    "llamaindex",
    "openai",
    "crewai",
    "vllm",
    "transformers",
    "spacy",
    "nltk",
    "gensim",
    "autogen",
}

DATA_COMPUTE = {"dask", "spark", "cuda", "numpy", "pandas"}


@dataclass
class Operation:
    op_type: str
    source: str
    target: str
    reason: str

    def to_dict(self) -> dict[str, str]:
        return {
            "op_type": self.op_type,
            "source": self.source,
            "target": self.target,
            "reason": self.reason,
        }


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def normalize_stem(name: str) -> tuple[str, str]:
    stem = name[:-3] if name.endswith(".md") else name
    for prefix, domain in PREFIX_TO_DOMAIN.items():
        if stem.startswith(prefix):
            normalized = stem[len(prefix) :]
            normalized = normalized.replace("_", "-")
            normalized = re.sub(r"-{2,}", "-", normalized).strip("-")
            return normalized, domain
    normalized = stem.replace("_", "-")
    normalized = re.sub(r"-{2,}", "-", normalized).strip("-")
    return normalized, "misc"


def classify_file(specialist: str, file_name: str) -> str:
    normalized, fallback_domain = normalize_stem(file_name)

    # specialist-aware overrides
    if specialist == "frontend-specialist":
        if normalized in FRONTEND_MOBILE:
            return f"frameworks/mobile/{normalized}.md"
        if normalized in FRONTEND_STATE:
            return f"state-management/{normalized}.md"
        if normalized in FRONTEND_WEB or normalized.startswith("react-") or normalized.startswith("vue-"):
            return f"frameworks/web/{normalized}.md"
        if normalized in FRONTEND_UI_LIBS:
            return f"ui-libraries/{normalized}.md"
        if normalized in FRONTEND_STYLING:
            return f"styling/{normalized}.md"
        if normalized in {"netlify"}:
            return f"delivery/{normalized}.md"
        if fallback_domain in {"engineering", "general"}:
            return f"engineering/{normalized}.md"

    if specialist == "security-specialist":
        if normalized in SECURITY_IDP:
            return f"identity/{normalized}.md"
        if normalized in {"risk-manager", "security-auditor"}:
            return f"governance/{normalized}.md"
        if normalized in {"legal-compliance-checker"}:
            return f"compliance/{normalized}.md"

    if specialist == "data-specialist":
        if normalized in DATA_DATABASE:
            return f"datastores/{normalized}.md"
        if normalized in DATA_ML_AI:
            return f"ai-ml/{normalized}.md"
        if normalized in DATA_COMPUTE:
            return f"compute/{normalized}.md"
        if normalized.startswith("aws-"):
            return f"cloud-data/{normalized}.md"

    if specialist == "framework-specialist":
        if normalized.startswith("django-"):
            return f"backend/python/django/{normalized}.md"
        if normalized.startswith("laravel-"):
            return f"backend/php/laravel/{normalized}.md"
        if normalized.startswith("rails-"):
            return f"backend/ruby/rails/{normalized}.md"
        if normalized.startswith("vue-") or normalized in {"vue", "vue3", "nuxt"}:
            return f"frontend/vue/{normalized}.md"
        if normalized.startswith("react-") or normalized in {"next-js"}:
            return f"frontend/react/{normalized}.md"

    if specialist == "testing-specialist":
        if normalized in {"pytest", "nose2", "unittest", "hypothesis", "behave"}:
            return f"python-testing/{normalized}.md"
        if normalized in {"jest", "vitest", "cypress", "playwright", "puppeteer", "detox"}:
            return f"javascript-testing/{normalized}.md"
        if normalized in {"junit", "mockito"}:
            return f"jvm-testing/{normalized}.md"

    if specialist == "devops-specialist":
        if normalized.startswith("aws") or normalized.startswith("amazon-"):
            return f"cloud/aws/{normalized}.md"
        if normalized in {"docker", "kubernetes", "helm", "terraform", "ansible"}:
            return f"infrastructure/{normalized}.md"
        if normalized in {"github-actions", "gitlab-ci", "jenkins"}:
            return f"ci-cd/{normalized}.md"

    if specialist == "open-source-project-specialist":
        return f"projects/{normalized}.md"

    return f"{fallback_domain}/{normalized}.md"


def classify_dir(specialist: str, dir_name: str) -> str:
    if specialist == "open-source-project-specialist" and dir_name == "projects":
        return "projects"
    if specialist == "frontend-specialist" and dir_name == "projects":
        return "projects"
    return dir_name


def collect_specialists(skills_root: Path) -> list[Path]:
    return sorted(
        [
            p
            for p in skills_root.iterdir()
            if p.is_dir()
            and p.name.endswith("-specialist")
            and p.name != "_shared"
            and not p.name.startswith("ccw")
        ],
        key=lambda p: p.name,
    )


def build_plan(skills_root: Path) -> dict[str, Any]:
    ops: list[Operation] = []

    # Hard override: Vue best-practices should belong to frontend specialist
    vue_src = (
        skills_root
        / "framework-specialist"
        / "references"
        / "domains"
        / "frontend-frameworks"
        / "vue"
    )
    vue_dst = (
        skills_root
        / "frontend-specialist"
        / "references"
        / "domains"
        / "frameworks"
        / "vue-best-practices"
    )
    if vue_src.exists():
        ops.append(
            Operation(
                op_type="move_dir",
                source=str(vue_src),
                target=str(vue_dst),
                reason="Vue best-practices belong to frontend-specialist",
            )
        )

    specialists = collect_specialists(skills_root)
    for specialist_dir in specialists:
        specialist = specialist_dir.name
        refs = specialist_dir / "references"
        if not refs.exists():
            continue
        domains = refs / "domains"
        ops.append(
            Operation(
                op_type="ensure_dir",
                source="",
                target=str(domains),
                reason=f"Ensure domains root for {specialist}",
            )
        )

        for child in sorted(refs.iterdir(), key=lambda p: p.name):
            if child.name == "domains":
                continue
            if child.is_file():
                if specialist == "framework-specialist" and child.name in FRONTEND_REHOME_FROM_FRAMEWORK:
                    frontend_target_rel = classify_file("frontend-specialist", child.name)
                    target = (
                        skills_root
                        / "frontend-specialist"
                        / "references"
                        / "domains"
                        / frontend_target_rel
                    )
                    ops.append(
                        Operation(
                            op_type="move_file",
                            source=str(child),
                            target=str(target),
                            reason="Move frontend-related file from framework-specialist to frontend-specialist",
                        )
                    )
                    continue

                relative_target = classify_file(specialist, child.name)
                target = domains / relative_target
                ops.append(
                    Operation(
                        op_type="move_file",
                        source=str(child),
                        target=str(target),
                        reason=f"Move loose reference into domains tree ({specialist})",
                    )
                )
            elif child.is_dir():
                relative_target = classify_dir(specialist, child.name)
                target = domains / relative_target
                ops.append(
                    Operation(
                        op_type="move_dir",
                        source=str(child),
                        target=str(target),
                        reason=f"Move loose directory into domains tree ({specialist})",
                    )
                )

    return {
        "generated_at": now_utc(),
        "mode": "dry-run",
        "operations": [op.to_dict() for op in ops],
        "summary": {
            "total": len(ops),
            "ensure_dir": sum(1 for op in ops if op.op_type == "ensure_dir"),
            "move_file": sum(1 for op in ops if op.op_type == "move_file"),
            "move_dir": sum(1 for op in ops if op.op_type == "move_dir"),
        },
    }


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def move_file_with_conflict(source: Path, target: Path) -> str:
    ensure_dir(target.parent)
    if not source.exists():
        return "skipped_missing_source"

    if target.exists():
        if target.is_file() and sha256(source) == sha256(target):
            source.unlink()
            return "deduplicated_removed_source"
        if target.is_file():
            idx = 1
            while True:
                candidate = target.with_name(f"{target.stem}-dup{idx}{target.suffix}")
                if not candidate.exists():
                    target = candidate
                    break
                idx += 1
        else:
            return "error_target_is_dir"

    shutil.move(str(source), str(target))
    return "ok"


def move_dir_with_merge(source: Path, target: Path) -> str:
    if not source.exists():
        return "skipped_missing_source"
    ensure_dir(target.parent)

    if not target.exists():
        shutil.move(str(source), str(target))
        return "ok"

    if not target.is_dir():
        return "error_target_is_file"

    # merge recursively
    for child in list(source.iterdir()):
        dst_child = target / child.name
        if child.is_file():
            move_file_with_conflict(child, dst_child)
        elif child.is_dir():
            move_dir_with_merge(child, dst_child)

    # remove empty tree
    try:
        source.rmdir()
    except OSError:
        shutil.rmtree(source, ignore_errors=True)
    return "merged"


def apply_plan(plan: dict[str, Any]) -> dict[str, Any]:
    results: list[dict[str, str]] = []
    for op in plan["operations"]:
        op_type = op["op_type"]
        source = Path(op["source"]) if op["source"] else None
        target = Path(op["target"])

        if op_type == "ensure_dir":
            ensure_dir(target)
            status = "ok"
        elif op_type == "move_file":
            status = move_file_with_conflict(source, target) if source else "error_missing_source_field"
        elif op_type == "move_dir":
            status = move_dir_with_merge(source, target) if source else "error_missing_source_field"
        else:
            status = "error_unknown_op"

        results.append(
            {
                "op_type": op_type,
                "source": op["source"],
                "target": op["target"],
                "status": status,
                "reason": op["reason"],
            }
        )

    status_count: dict[str, int] = {}
    for row in results:
        status_count[row["status"]] = status_count.get(row["status"], 0) + 1

    return {
        "applied_at": now_utc(),
        "summary": {
            "total": len(results),
            "status_count": status_count,
        },
        "results": results,
    }


def read_frontmatter_block(path: Path) -> tuple[str, str]:
    content = path.read_text(encoding="utf-8", errors="replace")
    if not content.startswith("---\n"):
        return "", content
    closing = content.find("\n---\n", 4)
    if closing == -1:
        return "", content
    fm = content[: closing + 5]
    body = content[closing + 5 :]
    return fm, body


def parse_yaml_scalar(frontmatter: str, key: str) -> str:
    pattern = re.compile(rf"^{re.escape(key)}\s*:\s*(.+)$", re.MULTILINE)
    m = pattern.search(frontmatter)
    if not m:
        return ""
    value = m.group(1).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def title_from_specialist(name: str) -> str:
    return " ".join(part.capitalize() for part in name.replace("-specialist", "").split("-")) + " Specialist"


def rewrite_specialist_skill_indexes(skills_root: Path) -> dict[str, Any]:
    rewritten: list[str] = []
    skipped: list[str] = []

    for specialist_dir in collect_specialists(skills_root):
        skill_md = specialist_dir / "SKILL.md"
        if not skill_md.exists():
            skipped.append(str(skill_md))
            continue

        frontmatter, _old_body = read_frontmatter_block(skill_md)
        if not frontmatter:
            skipped.append(str(skill_md))
            continue

        description = parse_yaml_scalar(frontmatter, "description")
        name = specialist_dir.name
        title = title_from_specialist(name)

        domains_root = specialist_dir / "references" / "domains"
        domain_entries: list[str] = []
        if domains_root.exists():
            for child in sorted(domains_root.iterdir(), key=lambda p: p.name):
                if child.is_dir():
                    domain_entries.append(f"- `references/domains/{child.name}/`")
                else:
                    domain_entries.append(f"- `references/domains/{child.name}`")

        if not domain_entries:
            domain_entries = ["- `references/domains/` (empty, pending content)"]

        body = [
            f"# {title}",
            "",
            description if description else "该专家技能作为领域入口，统一索引到 references/domains。",
            "",
            "## Domain Index",
            "",
            *domain_entries,
            "",
            "## Notes",
            "",
            "- 顶层 `SKILL.md` 仅做索引导航，不承载大体量细节内容。",
            "- 详细资料下沉到 `references/domains/`，按树形结构组织。",
            "",
        ]

        skill_md.write_text(frontmatter + "\n".join(body), encoding="utf-8")
        rewritten.append(str(skill_md))

    return {
        "rewritten_count": len(rewritten),
        "rewritten_files": rewritten,
        "skipped_count": len(skipped),
        "skipped_files": skipped,
    }


def to_markdown(plan: dict[str, Any], apply_report: dict[str, Any] | None, rewrite_report: dict[str, Any] | None) -> str:
    lines = [
        "# Expert Structure Reconcile V8",
        "",
        f"- Generated at (UTC): `{plan['generated_at']}`",
        f"- Mode: `{plan['mode']}`",
        "",
        "## Plan Summary",
        "",
        f"- Total ops: **{plan['summary']['total']}**",
        f"- `ensure_dir`: {plan['summary']['ensure_dir']}",
        f"- `move_file`: {plan['summary']['move_file']}",
        f"- `move_dir`: {plan['summary']['move_dir']}",
        "",
    ]

    if apply_report:
        lines.extend(
            [
                "## Apply Summary",
                "",
                f"- Applied at (UTC): `{apply_report['applied_at']}`",
                f"- Total executed: **{apply_report['summary']['total']}**",
            ]
        )
        for status, count in sorted(apply_report["summary"]["status_count"].items()):
            lines.append(f"- `{status}`: {count}")
        lines.append("")

    if rewrite_report:
        lines.extend(
            [
                "## SKILL Index Rewrite",
                "",
                f"- Rewritten: **{rewrite_report['rewritten_count']}**",
                f"- Skipped: **{rewrite_report['skipped_count']}**",
                "",
            ]
        )

    lines.extend(["## Operations", ""])
    for op in plan["operations"]:
        src = op["source"] if op["source"] else "(none)"
        lines.append(f"- `{op['op_type']}` `{src}` -> `{op['target']}` | {op['reason']}")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Reconcile specialist trees to domain-first structure.")
    parser.add_argument("--skills-root", default=".claude/skills")
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--output-md", default="")
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--rewrite-indexes", action="store_true")
    args = parser.parse_args()

    skills_root = Path(args.skills_root).resolve()
    plan = build_plan(skills_root)

    output_json = Path(args.output_json).resolve()
    output_json.parent.mkdir(parents=True, exist_ok=True)

    apply_report: dict[str, Any] | None = None
    rewrite_report: dict[str, Any] | None = None

    if args.apply:
        apply_report = apply_plan(plan)
        plan["mode"] = "apply"
        plan["apply_report"] = apply_report

        if args.rewrite_indexes:
            rewrite_report = rewrite_specialist_skill_indexes(skills_root)
            plan["rewrite_report"] = rewrite_report

    output_json.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.output_md:
        output_md = Path(args.output_md).resolve()
        output_md.parent.mkdir(parents=True, exist_ok=True)
        output_md.write_text(to_markdown(plan, apply_report, rewrite_report), encoding="utf-8")

    print(f"[OK] Report JSON: {output_json}")
    if args.output_md:
        print(f"[OK] Report MD: {Path(args.output_md).resolve()}")


if __name__ == "__main__":
    main()
