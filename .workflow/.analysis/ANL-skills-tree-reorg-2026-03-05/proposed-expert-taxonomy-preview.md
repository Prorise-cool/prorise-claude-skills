# Proposed Expert Taxonomy Preview (Round 4)

## 1) Current Repository Map (Top Level Snapshot)

Current top-level directories under `/.claude/skills`:

`_shared`, `architecture-specialist`, `artifacts-builder`, `backend-specialist`, `business-analysis`, `ccw`, `ccw-help`, `ccw-loop`, `changelog-generator`, `code-quality-specialist`, `competitive-ads-extractor`, `copyright-docs`, `data-specialist`, `design-specialist`, `devops-specialist`, `document-skills`, `documentation-specialist`, `domain-name-brainstormer`, `file-organizer`, `frontend-specialist`, `gh-bootstrap`, `github-specialist`, `internal-comms`, `issue-manage`, `language-framework-specialist`, `lead-research-assistant`, `marketing-specialist`, `mcp-builder`, `meeting-insights-analyzer`, `operations-specialist`, `product-specialist`, `project-analyze`, `project-management-specialist`, `prompt-enhancer`, `review-code`, `ruoyi-framework`, `security-specialist`, `skill-creator`, `skill-generator`, `skill-tuning`, `software-manual`, `testing-specialist`, `text-formatter`, `ui-ux-pro-max`, `ux-research`, `vue-best-practices`, `webapp-testing`.

Current pain points:

1. Some top-level directories are not expert-level domains (e.g. `github-specialist`, feature/tool modules).
2. Non-specialist modules are scattered at top level.
3. Backend references use noisy file prefixes (`cursor_rules_`, etc.) and lack technology-zone substructure.

---

## 2) Design Rules (Aligned with SKILL_WRITING_GUIDE)

1. Keep expert skills as top-level specialist directories.
2. Each specialist has one `SKILL.md` as index/entry.
3. Domain details move to `references/` (progressive disclosure).
4. Optional `scripts/`, `assets/` remain valid.
5. Naming is kebab-case and semantic; remove meaningless file prefixes.

---

## 3) Proposed Top-Level Expert Domains

Keep these as top-level specialist domains:

- `architecture-specialist`
- `backend-specialist`
- `frontend-specialist`
- `data-specialist`
- `security-specialist`
- `testing-specialist`
- `devops-specialist`
- `product-specialist`
- `project-management-specialist`
- `design-specialist`
- `marketing-specialist`
- `documentation-specialist`
- `operations-specialist`

Keep unchanged exceptions:

- `_shared` (top-level shared resources)
- `ccw`, `ccw-help`, `ccw-loop`
- `SKILL_WRITING_GUIDE.md`

Domains to be absorbed (not top-level after migration):

- `github-specialist` -> `devops-specialist`
- `language-framework-specialist` -> `backend-specialist` and `frontend-specialist` framework zones
- `code-quality-specialist` -> `architecture-specialist` quality zone
- Other non-specialist modules -> corresponding specialist `references/domains/*`

---

## 4) Whole Preview Tree (Proposed)

```text
.claude/skills/
├── _shared/                              # keep
├── ccw/                                  # keep
├── ccw-help/                             # keep
├── ccw-loop/                             # keep
├── SKILL_WRITING_GUIDE.md                # keep
│
├── architecture-specialist/
│   ├── SKILL.md                          # index-only
│   ├── references/
│   │   ├── domains/
│   │   │   ├── system-design/
│   │   │   ├── project-analysis/         # <- project-analyze
│   │   │   └── code-quality/             # <- code-quality-specialist, review-code, skill-tuning
│   │   └── ...
│   └── scripts/
│
├── backend-specialist/
│   ├── SKILL.md                          # index-only
│   ├── references/
│   │   ├── domains/
│   │   │   ├── mcp/                      # <- mcp-builder
│   │   │   ├── frameworks/               # <- language-framework-specialist, ruoyi-framework
│   │   │   ├── technologies/
│   │   │   │   ├── python/
│   │   │   │   ├── java/
│   │   │   │   ├── javascript-node/
│   │   │   │   ├── go/
│   │   │   │   ├── php/
│   │   │   │   ├── ruby/
│   │   │   │   ├── rust/
│   │   │   │   ├── dotnet/
│   │   │   │   └── other-runtime/
│   │   │   ├── tooling/
│   │   │   │   └── cli-devtools/         # bash/git/vim/zsh/postman/insomnia/emacs
│   │   │   ├── platforms/
│   │   │   │   └── infrastructure/       # nginx/databricks/stripe
│   │   │   ├── integrations/
│   │   │   │   └── external-services/    # notion-api/discord-api/microsoft-teams
│   │   │   └── personas/
│   │   │       ├── backend/
│   │   │       └── universal/
│   │   └── ...
│   └── scripts/
│
├── frontend-specialist/
│   ├── SKILL.md
│   ├── references/
│   │   ├── domains/
│   │   │   ├── vue/                      # <- vue-best-practices
│   │   │   ├── artifact-ui/              # <- artifacts-builder
│   │   │   └── frameworks/
│   │   └── ...
│   └── scripts/
│
├── data-specialist/
│   ├── SKILL.md
│   └── references/domains/
│
├── security-specialist/
│   ├── SKILL.md
│   └── references/domains/
│
├── testing-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── webapp/                       # <- webapp-testing
│       └── strategy/
│
├── devops-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── github-platform/              # <- github-specialist, gh-bootstrap
│       ├── ci-cd/
│       └── infra-ops/
│
├── product-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── business-analysis/            # <- business-analysis
│       ├── prompt-design/                # <- prompt-enhancer
│       └── strategy/
│
├── project-management-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── issue-lifecycle/              # <- issue-manage
│       └── meeting-insights/             # <- meeting-insights-analyzer
│
├── design-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── ux-research/                  # <- ux-research
│       └── ui-design/                    # <- ui-ux-pro-max
│
├── marketing-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── ads-intelligence/             # <- competitive-ads-extractor
│       ├── domain-branding/              # <- domain-name-brainstormer
│       └── lead-research/                # <- lead-research-assistant
│
├── documentation-specialist/
│   ├── SKILL.md
│   └── references/domains/
│       ├── changelog/
│       ├── copyright/
│       ├── document-formats/
│       ├── internal-comms/
│       ├── skill-authoring/
│       ├── manual-generation/
│       └── text-formatting/
│
└── operations-specialist/
    ├── SKILL.md
    └── references/domains/
        ├── workspace-organization/       # <- file-organizer
        └── runbook/
```

---

## 5) Backend Prefix Cleanup Rule (Mandatory)

Filename normalization rules:

1. `cursor_rules_<name>.md` -> `<name>.md`
2. `engineering_backend_<name>.md` -> `personas/backend/<name>.md`
3. `specialized_<stack>_<name>.md` -> `technologies/<lang>/<stack>/<name>.md`
4. `universal_<name>.md` -> `personas/universal/<name>.md`

Examples:

- `cursor_rules_fastapi.md` -> `technologies/python/fastapi.md`
- `cursor_rules_bash.md` -> `tooling/cli-devtools/bash.md`
- `specialized_django_django-api-developer.md` -> `technologies/python/django/django-api-developer.md`
- `universal_backend-developer.md` -> `personas/universal/backend-developer.md`

---

## 6) Migration Order (for safety)

1. Freeze taxonomy and naming rules.
2. Move top-level scattered modules into specialist domains.
3. Restructure `backend-specialist/references` with prefix cleanup.
4. Update each specialist `SKILL.md` to index-only references.
5. Validate links and regenerate description map.

