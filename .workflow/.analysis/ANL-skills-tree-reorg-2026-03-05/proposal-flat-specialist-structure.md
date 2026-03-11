# Proposal: Flat Specialist Structure (No `experts/` Root)

## Confirmed Constraints

- Do **not** create `/.claude/skills/experts/`.
- Keep specialist directories flat under `/.claude/skills/`.
- `ccw*` directories are exceptions and remain unchanged.
- Other non-`ccw*` directories should be assigned into specialist directions.
- Must follow `/.claude/skills/SKILL_WRITING_GUIDE.md` as single source of truth.

---

## What Comes Directly From SKILL_WRITING_GUIDE

1. A skill folder must contain `SKILL.md` with YAML frontmatter (`name`, `description` required).
2. Resource directories are optional and recommended:
   - `scripts/`
   - `references/`
   - `assets/`
3. Progressive disclosure principle:
   - keep core workflow in `SKILL.md`
   - put detailed materials in `references/`

---

## Proposed Repository-Level Convention (for this reorg)

### Top Level (`/.claude/skills`)

- Keep only:
  - `*-specialist/` (expert-level skills)
  - `ccw*` (exception untouched)
  - `SKILL_WRITING_GUIDE.md` (governance document)

### Inside Each Specialist

- `SKILL.md`: index-only (navigation + trigger boundary + links)
- `references/domains/{domain}/...`: migrated domain knowledge from current scattered directories
- `scripts/`, `assets/`: optional, when needed

### Depth Index Rule

- To satisfy "top-level SKILL.md always index":
  - Specialist `SKILL.md` links to domain index docs under `references/domains/...`
  - Sub-index files use `README.md` (or `index.md`) instead of nested `SKILL.md`
  - This keeps “only specialist is a skill” consistent

---

## Dry-Run Assignment Summary (Flat Specialist)

- Keep unchanged:
  - `ccw`
  - `ccw-help`
  - `ccw-loop`

- Reassign to specialist directions:
  - `frontend-specialist`: `artifacts-builder`, `vue-best-practices`
  - `backend-specialist`: `mcp-builder`
  - `code-quality-specialist`: `review-code`, `skill-tuning`
  - `design-specialist`: `ui-ux-pro-max`, `ux-research`
  - `documentation-specialist`: `changelog-generator`, `copyright-docs`, `document-skills`, `internal-comms`, `skill-creator`, `skill-generator`, `software-manual`, `text-formatter`
  - `github-specialist`: `gh-bootstrap`
  - `language-framework-specialist`: `ruoyi-framework`
  - `marketing-specialist`: `competitive-ads-extractor`, `domain-name-brainstormer`, `lead-research-assistant`
  - `operations-specialist`: `_shared`, `file-organizer`
  - `product-specialist`: `business-analysis`, `prompt-enhancer`
  - `project-management-specialist`: `issue-manage`, `meeting-insights-analyzer`
  - `architecture-specialist`: `project-analyze`
  - `testing-specialist`: `webapp-testing`

---

## Open Decisions (Need Your Confirmation)

1. `_shared` should be merged into `operations-specialist/references/domains/shared/` or remain top-level `_shared/` as cross-specialist base?
2. For migrated directories that currently contain `SKILL.md`, should we keep file name as `SKILL.md` (as reference doc) or rename to `README.md` to avoid nested skill semantics?
3. For specialist `SKILL.md` index style, should links point only to `references/domains/*/README.md` (strict index) or also allow direct links to deep phase/spec files?

