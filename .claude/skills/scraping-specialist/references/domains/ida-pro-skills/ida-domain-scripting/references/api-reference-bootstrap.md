# Regenerating `API_REFERENCE.md`

Use this maintainer note when `API_REFERENCE.md` needs to be refreshed from the checked-out `ida-domain` source tree.

## Path Resolution

Determine the skill directory from the location of this file and replace `$SKILL_DIR` in the guidance below with the real path.

Common installation paths:

- Bundled repository: `<repo>/plugins/code-eval-ida-domain/skills/ida-domain-scripting`
- Project-specific: `<project>/.codex/skills/ida-domain-scripting`
- Manual global: `~/.codex/skills/ida-domain-scripting`

## Goal

Generate a practical, hand-written style `API_REFERENCE.md` for the IDA Domain skill by reading the source code in:

`$SKILL_DIR/ida-domain/ida_domain/`

## Process

1. Read `database.py` first to discover the entity handlers exposed through `db.*`.
2. Inspect the corresponding Python modules for each handler and extract public methods, signatures, return types, and common usage patterns.
3. Search the tree for `Enum` subclasses and document their values and intended usage.
4. Write `API_REFERENCE.md` in the skill root with practical examples and concise notes about gotchas.

## Output Shape

Keep the document focused and operational:

- 500-800 lines maximum
- Group sections by use case, not alphabetically
- Prefer runnable examples over long prose
- Assume wrapped scripts where `db` is already available
- Document non-obvious patterns such as `db.xrefs.to_ea()` instead of guessed method names
