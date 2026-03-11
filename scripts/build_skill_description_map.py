#!/usr/bin/env python3
"""
Build a tree map of markdown files under a skills directory by reading only
top frontmatter metadata (name/description).
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

KEY_PATTERN = re.compile(r"^([A-Za-z0-9_-]+)\s*:\s*(.*)$")


def _strip_quotes(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1].strip()
    return value


def parse_frontmatter(path: Path) -> dict[str, str]:
    metadata: dict[str, str] = {}

    with path.open("r", encoding="utf-8", errors="replace") as handle:
        first = handle.readline()
        first = first.lstrip("\ufeff")
        if first.strip() != "---":
            return metadata

        fm_lines: list[str] = []
        for line in handle:
            if line.strip() == "---":
                break
            fm_lines.append(line.rstrip("\n"))
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


def insert_file(tree: dict[str, Any], rel_path: Path, entry: dict[str, Any]) -> None:
    node = tree
    parts = rel_path.parts
    for directory in parts[:-1]:
        children = node.setdefault("children", {})
        if directory not in children:
            children[directory] = {
                "type": "directory",
                "name": directory,
                "path": str(Path(node["path"]) / directory) if node["path"] != "." else directory,
                "children": {},
                "files": {},
            }
        node = children[directory]

    files = node.setdefault("files", {})
    files[parts[-1]] = entry


def sort_tree(node: dict[str, Any]) -> dict[str, Any]:
    sorted_children = []
    for name in sorted(node.get("children", {})):
        sorted_children.append(sort_tree(node["children"][name]))

    sorted_files = []
    for name in sorted(node.get("files", {})):
        sorted_files.append(node["files"][name])

    return {
        "type": node["type"],
        "name": node["name"],
        "path": node["path"],
        "children": sorted_children,
        "files": sorted_files,
    }


def tree_to_markdown_lines(node: dict[str, Any], depth: int, max_desc: int) -> list[str]:
    lines: list[str] = []
    indent = "  " * depth

    if depth == 0:
        lines.append(f"- `{node['name']}/`")
    else:
        lines.append(f"{indent}- `{node['name']}/`")

    for child in node.get("children", []):
        lines.extend(tree_to_markdown_lines(child, depth + 1, max_desc))

    for file_entry in node.get("files", []):
        desc = file_entry.get("description", "")
        if len(desc) > max_desc:
            desc = f"{desc[: max_desc - 3]}..."
        suffix = f" — {desc}" if desc else " — [NO_DESCRIPTION]"
        lines.append(f"{indent}  - `{file_entry['name']}`{suffix}")

    return lines


def build_map(skills_root: Path) -> dict[str, Any]:
    root = {
        "type": "directory",
        "name": skills_root.name,
        "path": ".",
        "children": {},
        "files": {},
    }

    total_md = 0
    with_desc = 0
    without_desc = 0
    missing_description_files: list[str] = []

    for file_path in sorted(skills_root.rglob("*.md")):
        if not file_path.is_file():
            continue

        total_md += 1
        rel_path = file_path.relative_to(skills_root)
        metadata = parse_frontmatter(file_path)
        description = metadata.get("description", "").strip()

        if description:
            with_desc += 1
        else:
            without_desc += 1
            missing_description_files.append(str(rel_path))

        entry = {
            "type": "file",
            "name": rel_path.name,
            "path": str(rel_path),
            "skill_name": metadata.get("name", ""),
            "description": description,
        }
        insert_file(root, rel_path, entry)

    tree = sort_tree(root)
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "skills_root": str(skills_root),
        "summary": {
            "total_markdown_files": total_md,
            "files_with_description": with_desc,
            "files_without_description": without_desc,
        },
        "missing_description_files": missing_description_files,
        "tree": tree,
    }


def write_markdown(map_data: dict[str, Any], output_md: Path, max_desc: int) -> None:
    summary = map_data["summary"]
    lines = [
        "# Skill Description Map",
        "",
        f"- Generated at (UTC): `{map_data['generated_at']}`",
        f"- Skills root: `{map_data['skills_root']}`",
        "",
        "## Summary",
        "",
        f"- Total `.md` files: **{summary['total_markdown_files']}**",
        f"- Files with `description`: **{summary['files_with_description']}**",
        f"- Files without `description`: **{summary['files_without_description']}**",
        "",
        "## Tree",
        "",
    ]
    lines.extend(tree_to_markdown_lines(map_data["tree"], depth=0, max_desc=max_desc))
    lines.append("")

    output_md.parent.mkdir(parents=True, exist_ok=True)
    output_md.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build skills markdown description tree map from frontmatter."
    )
    parser.add_argument(
        "--skills-root",
        default=".claude/skills",
        help="Skills root directory to scan recursively (default: .claude/skills)",
    )
    parser.add_argument(
        "--output-json",
        required=True,
        help="Output JSON file path.",
    )
    parser.add_argument(
        "--output-md",
        default="",
        help="Optional output markdown report file path.",
    )
    parser.add_argument(
        "--max-desc-length",
        type=int,
        default=120,
        help="Max description length in markdown tree lines (default: 120).",
    )
    args = parser.parse_args()

    skills_root = Path(args.skills_root).resolve()
    if not skills_root.exists() or not skills_root.is_dir():
        raise SystemExit(f"Skills root does not exist or is not a directory: {skills_root}")

    map_data = build_map(skills_root)

    output_json = Path(args.output_json).resolve()
    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(map_data, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.output_md:
        write_markdown(map_data, Path(args.output_md).resolve(), args.max_desc_length)

    print(f"[OK] JSON map written to: {output_json}")
    if args.output_md:
        print(f"[OK] Markdown map written to: {Path(args.output_md).resolve()}")


if __name__ == "__main__":
    main()
