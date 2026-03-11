# Migration Summary Report (V8 Corrective Apply)

- Generated: `2026-03-05T23:08:00+08:00`
- Primary apply report:
  - `/.workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/reorg-apply-v8.json`
  - `/.workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/reorg-apply-v8.md`
- Post-cleanup report:
  - `/.workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/reorg-apply-v8-postcleanup.json`
  - `/.workflow/.analysis/ANL-skills-tree-reorg-2026-03-05/reorg-apply-v8-postcleanup.md`

## Execution Result

- V8 corrective apply:
  - Planned/Executed: **308**
  - `ok`: **303**
  - `deduplicated_removed_source`: **5**
  - Errors: **0**
- Post-cleanup rewrite apply:
  - Planned/Executed: **17**
  - `ok`: **17**
  - Errors: **0**

## Key Fixes

1. Vue best-practices corrected:
   - From `framework-specialist/references/domains/frontend-frameworks/vue`
   - To `frontend-specialist/references/domains/frameworks/vue-best-practices`
2. All specialists normalized to domain-first structure:
   - `references/*` loose assets moved to `references/domains/*`
3. Open-source project specialist normalized:
   - `references/projects/ruoyi` → `references/domains/projects/ruoyi`
4. Specialist top-level entry normalization:
   - All 17 top-level specialist `SKILL.md` rewritten as index-only pages.

## Compliance Verification

- Specialist count checked: **17**
- `references/domains` present: **17/17**
- Loose entries under `references` (outside `domains`): **0/17**
- Empty migration leftovers cleaned: `framework-specialist/references/domains/frontend-frameworks`

## Frontend Specialist Snapshot

`frontend-specialist/references/domains/` now includes:
- `frameworks/web/`
- `frameworks/mobile/`
- `frameworks/vue-best-practices/`
- `ui-libraries/`
- `styling/`
- `state-management/`
- `engineering/`
- `delivery/`
- `artifact-engineering/`

## Notes

- `ccw*` and `_shared` remained untouched as requested.
- This V8 is a corrective migration for the failed V7 acceptance claim.
