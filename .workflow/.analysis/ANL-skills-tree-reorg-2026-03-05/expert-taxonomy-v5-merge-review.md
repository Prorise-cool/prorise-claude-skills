# Expert Taxonomy V5 - Merge & Hard-Fit Review

## 1) Can Experts Be Merged?

Yes. Experts can be merged when both conditions are true:

1. Domain overlap is high (same problem space, same trigger vocabulary).
2. One side is too sparse and mostly acts as a container.

Current candidate merges (optional):

- `project-management-specialist` -> merge into `product-specialist` (delivery + planning continuity).
- `code-quality-specialist` -> merge into `architecture-specialist` (governance + review standards continuity).

Not recommended to merge now:

- `open-source-project-specialist` (currently sparse, but strategically required by your roadmap).
- `framework-specialist` (serves non-project framework guidance, distinct from OSS project skills).

---

## 2) Hard-Fit Detection (Current V4)

Likely hard-fit assignments:

- `skill-creator` and `skill-generator` under `operations-specialist`
- `skill-tuning` under `code-quality-specialist` (can fit, but it is more "skill lifecycle engineering")

Reason:

- These three belong to a "Skill system engineering" lifecycle, not generic operations.

Recommended extraction:

- New top-level expert: `skill-engineering-specialist`
- Move:
  - `skill-creator` -> `skill-engineering-specialist/references/domains/authoring/creator`
  - `skill-generator` -> `skill-engineering-specialist/references/domains/authoring/generator`
  - `skill-tuning` -> `skill-engineering-specialist/references/domains/quality/tuning`

Optional:

- `prompt-enhancer` can stay in `product-specialist`, or move to `skill-engineering-specialist/references/domains/prompt-specification` if you want all prompt-to-skill tooling in one place.

---

## 3) Refined Expert Set (Recommended)

- `architecture-specialist`
- `backend-specialist`
- `frontend-specialist`
- `framework-specialist`
- `open-source-project-specialist`
- `skill-engineering-specialist`
- `data-specialist`
- `security-specialist`
- `testing-specialist`
- `devops-specialist`
- `code-quality-specialist` (keep, unless you choose to merge into architecture)
- `product-specialist`
- `project-management-specialist` (keep, unless you choose to merge into product)
- `design-specialist`
- `marketing-specialist`
- `documentation-specialist`
- `operations-specialist`

---

## 4) Condensed Tree (After V5 Extraction)

```text
.claude/skills/
├── _shared/
├── ccw/
├── ccw-help/
├── ccw-loop/
├── SKILL_WRITING_GUIDE.md
├── architecture-specialist/
├── backend-specialist/
├── frontend-specialist/
├── framework-specialist/
├── open-source-project-specialist/
│   └── references/projects/ruoyi/
├── skill-engineering-specialist/
│   └── references/domains/{authoring,quality}/
├── data-specialist/
├── security-specialist/
├── testing-specialist/
├── devops-specialist/
│   └── references/domains/github-platform/{core,bootstrap}/
├── code-quality-specialist/
├── product-specialist/
├── project-management-specialist/
├── design-specialist/
├── marketing-specialist/
├── documentation-specialist/
└── operations-specialist/
```

---

## 5) Practical Recommendation

If your goal is "least hard-fit + future extensibility":

1. Keep V4 base.
2. Add `skill-engineering-specialist` (extract the 3 skill-lifecycle modules).
3. Keep `open-source-project-specialist` for future project-specific skills.
4. Delay expert merges until more modules accumulate (avoid premature collapsing).

