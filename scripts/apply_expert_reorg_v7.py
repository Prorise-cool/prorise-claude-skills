#!/usr/bin/env python3
"""
Apply v7 expert reorganization plan from dry-run JSON.
"""

from __future__ import annotations

import argparse
import json
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class ApplyResult:
    op_type: str
    source: str
    target: str
    status: str
    message: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "op_type": self.op_type,
            "source": self.source,
            "target": self.target,
            "status": self.status,
            "message": self.message,
        }


def load_plan(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def apply_op(op: dict[str, Any]) -> ApplyResult:
    op_type = op["op_type"]
    source = op["source"]
    target = op["target"]

    try:
        if op_type == "mkdir":
            Path(target).mkdir(parents=True, exist_ok=True)
            return ApplyResult(op_type, source, target, "ok", "Directory ensured")

        if op_type == "rename_dir":
            src = Path(source)
            dst = Path(target)
            if not src.exists():
                return ApplyResult(op_type, source, target, "skipped", "Source missing")
            if dst.exists():
                return ApplyResult(op_type, source, target, "skipped", "Target exists")
            ensure_parent(dst)
            shutil.move(str(src), str(dst))
            return ApplyResult(op_type, source, target, "ok", "Directory renamed")

        if op_type == "move_dir":
            src = Path(source)
            dst = Path(target)
            if not src.exists():
                return ApplyResult(op_type, source, target, "skipped", "Source missing")
            if dst.exists():
                return ApplyResult(op_type, source, target, "skipped", "Target exists")
            ensure_parent(dst)
            shutil.move(str(src), str(dst))
            return ApplyResult(op_type, source, target, "ok", "Directory moved")

        if op_type == "move_file":
            src = Path(source)
            dst = Path(target)
            if not src.exists():
                return ApplyResult(op_type, source, target, "skipped", "Source missing")
            if dst.exists():
                return ApplyResult(op_type, source, target, "skipped", "Target exists")
            ensure_parent(dst)
            shutil.move(str(src), str(dst))
            return ApplyResult(op_type, source, target, "ok", "File moved")

        return ApplyResult(op_type, source, target, "error", f"Unsupported op_type: {op_type}")
    except Exception as exc:  # noqa: BLE001
        return ApplyResult(op_type, source, target, "error", f"{type(exc).__name__}: {exc}")


def build_markdown(report: dict[str, Any]) -> str:
    stats = report["summary"]
    lines = [
        "# Expert Reorg V7 Apply Report",
        "",
        f"- Applied at (UTC): `{report['applied_at']}`",
        f"- Plan source: `{report['plan_source']}`",
        "",
        "## Summary",
        "",
        f"- Planned operations: **{stats['planned']}**",
        f"- Executed: **{stats['executed']}**",
        f"- `ok`: **{stats['ok']}**",
        f"- `skipped`: **{stats['skipped']}**",
        f"- `error`: **{stats['error']}**",
        "",
        "## Errors",
        "",
    ]

    if not report["errors"]:
        lines.append("- None")
    else:
        for item in report["errors"]:
            lines.append(
                f"- `{item['op_type']}` `{item['source']}` -> `{item['target']}`: {item['message']}"
            )

    lines.extend(["", "## Skipped", ""])
    if not report["skipped"]:
        lines.append("- None")
    else:
        for item in report["skipped"]:
            lines.append(
                f"- `{item['op_type']}` `{item['source']}` -> `{item['target']}`: {item['message']}"
            )

    lines.extend(["", "## Successful Operations", ""])
    for item in report["ok"]:
        lines.append(f"- `{item['op_type']}` `{item['source']}` -> `{item['target']}`")

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Apply expert reorg v7 plan.")
    parser.add_argument("--plan-json", required=True)
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--output-md", required=True)
    args = parser.parse_args()

    plan_path = Path(args.plan_json).resolve()
    plan = load_plan(plan_path)
    operations = plan.get("operations", [])

    results: list[ApplyResult] = []
    for op in operations:
        if not op.get("ready", False):
            results.append(
                ApplyResult(
                    op["op_type"],
                    op["source"],
                    op["target"],
                    "skipped",
                    "Not ready in plan",
                )
            )
            continue
        results.append(apply_op(op))

    ok = [r.to_dict() for r in results if r.status == "ok"]
    skipped = [r.to_dict() for r in results if r.status == "skipped"]
    errors = [r.to_dict() for r in results if r.status == "error"]

    report = {
        "applied_at": datetime.now(timezone.utc).isoformat(),
        "plan_source": str(plan_path),
        "summary": {
            "planned": len(operations),
            "executed": len(results),
            "ok": len(ok),
            "skipped": len(skipped),
            "error": len(errors),
        },
        "ok": ok,
        "skipped": skipped,
        "errors": errors,
    }

    out_json = Path(args.output_json).resolve()
    out_md = Path(args.output_md).resolve()
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    out_md.write_text(build_markdown(report), encoding="utf-8")

    print(f"[OK] Apply report JSON: {out_json}")
    print(f"[OK] Apply report MD: {out_md}")
    print(f"[SUMMARY] ok={len(ok)} skipped={len(skipped)} error={len(errors)}")


if __name__ == "__main__":
    main()
