# Expert Taxonomy V3 (Precise Mapping)

- Generated: `2026-03-05T22:29:23.308314+08:00`
- Source of truth: `/.claude/skills/SKILL_WRITING_GUIDE.md`

## Top-Level Policy

- Keep only top-level expert skills and approved exceptions.
- Non-expert directories are merged into expert `references/domains/*` (progressive disclosure).
- Each expert keeps a single `SKILL.md` entry file and optional `references/`, `scripts/`, `assets/`.

## Core Expert Domains

- `architecture-specialist`
- `backend-specialist`
- `frontend-specialist`
- `data-specialist`
- `security-specialist`
- `testing-specialist`
- `devops-specialist`
- `code-quality-specialist`
- `product-specialist`
- `project-management-specialist`
- `design-specialist`
- `marketing-specialist`
- `documentation-specialist`
- `operations-specialist`
- `language-framework-specialist`

## Framework Instance Experts

- `ruoyi-specialist` (renamed from `ruoyi-framework`)

## Exceptions (Keep Unchanged)

- `_shared`
- `ccw`
- `ccw-help`
- `ccw-loop`
- `SKILL_WRITING_GUIDE.md`

## Precise Top-Level Mapping

| Source | Action | Target Expert | Target Path | Rationale |
|---|---|---|---|---|
| `artifacts-builder` | `merge` | `frontend-specialist` | `references/domains/artifact-engineering` | Frontend artifact construction domain |
| `business-analysis` | `merge` | `product-specialist` | `references/domains/business-analysis` | Product strategy and analysis domain |
| `changelog-generator` | `merge` | `documentation-specialist` | `references/domains/changelog-engineering` | Documentation automation domain |
| `competitive-ads-extractor` | `merge` | `marketing-specialist` | `references/domains/competitive-intelligence` | Marketing intelligence domain |
| `copyright-docs` | `merge` | `documentation-specialist` | `references/domains/compliance-copyright` | Compliance documentation domain |
| `document-skills` | `merge` | `documentation-specialist` | `references/domains/document-formats` | Document format handling domain |
| `domain-name-brainstormer` | `merge` | `marketing-specialist` | `references/domains/domain-branding` | Branding and naming domain |
| `file-organizer` | `merge` | `operations-specialist` | `references/domains/workspace-organization` | Operational file management domain |
| `gh-bootstrap` | `merge` | `devops-specialist` | `references/domains/github-platform/bootstrap` | Repository bootstrap operations |
| `github-specialist` | `merge` | `devops-specialist` | `references/domains/github-platform/core` | GitHub is a platform operations subdomain, not top-level expert |
| `internal-comms` | `merge` | `documentation-specialist` | `references/domains/internal-communications` | Internal documentation/communication domain |
| `issue-manage` | `merge` | `project-management-specialist` | `references/domains/issue-lifecycle` | Project management issue workflow |
| `lead-research-assistant` | `merge` | `marketing-specialist` | `references/domains/lead-research` | Growth and lead research domain |
| `mcp-builder` | `merge` | `backend-specialist` | `references/domains/mcp-platform` | Backend integration platform domain |
| `meeting-insights-analyzer` | `merge` | `project-management-specialist` | `references/domains/meeting-intelligence` | Team/process management domain |
| `project-analyze` | `merge` | `architecture-specialist` | `references/domains/project-analysis` | Architecture analysis domain |
| `prompt-enhancer` | `merge` | `product-specialist` | `references/domains/prompt-specification` | Product requirement specification domain |
| `review-code` | `merge` | `code-quality-specialist` | `references/domains/review-workflow` | Code quality review domain |
| `ruoyi-framework` | `rename_as_expert` | `ruoyi-specialist` | `.` | Mature third-party framework should be standalone expert |
| `skill-creator` | `merge` | `documentation-specialist` | `references/domains/skill-authoring/creator` | Skill authoring documentation domain |
| `skill-generator` | `merge` | `documentation-specialist` | `references/domains/skill-authoring/generator` | Skill generation workflow domain |
| `skill-tuning` | `merge` | `code-quality-specialist` | `references/domains/skill-quality/tuning` | Skill quality optimization domain |
| `software-manual` | `merge` | `documentation-specialist` | `references/domains/manual-generation` | Documentation generation domain |
| `text-formatter` | `merge` | `documentation-specialist` | `references/domains/text-formatting` | Text formatting domain |
| `ui-ux-pro-max` | `merge` | `design-specialist` | `references/domains/ui-design` | UI design domain |
| `ux-research` | `merge` | `design-specialist` | `references/domains/ux-research` | UX research domain |
| `vue-best-practices` | `merge` | `frontend-specialist` | `references/domains/vue` | Frontend Vue domain |
| `webapp-testing` | `merge` | `testing-specialist` | `references/domains/webapp-testing` | Web application testing domain |

## Backend References Refactor (58 -> structured domains)

Normalization principles:
- Remove meaningless prefixes: `cursor_rules_`, `engineering_backend_`, `specialized_*`, `universal_`.
- Rename by semantic technology/domain naming.
- Place under `backend-specialist/references/domains/...`.

| Source File | Target File |
|---|---|
| `cursor_rules_actix-web.md` | `backend-specialist/references/domains/technologies/rust/actix-web.md` |
| `cursor_rules_apollo-client.md` | `backend-specialist/references/domains/technologies/javascript-node/apollo-client.md` |
| `cursor_rules_apollo-graphql.md` | `backend-specialist/references/domains/technologies/javascript-node/apollo-graphql.md` |
| `cursor_rules_asp-net.md` | `backend-specialist/references/domains/technologies/dotnet/asp-net.md` |
| `cursor_rules_bash.md` | `backend-specialist/references/domains/tooling/cli/bash.md` |
| `cursor_rules_bottle.md` | `backend-specialist/references/domains/technologies/python/bottle.md` |
| `cursor_rules_bun.md` | `backend-specialist/references/domains/technologies/javascript-node/bun.md` |
| `cursor_rules_c-sharp.md` | `backend-specialist/references/domains/technologies/dotnet/c-sharp.md` |
| `cursor_rules_databricks.md` | `backend-specialist/references/domains/platforms/infrastructure/databricks.md` |
| `cursor_rules_discord-api.md` | `backend-specialist/references/domains/integrations/external-services/discord-api.md` |
| `cursor_rules_django-orm.md` | `backend-specialist/references/domains/technologies/python/django/django-orm.md` |
| `cursor_rules_django-rest-framework.md` | `backend-specialist/references/domains/technologies/python/django/django-rest-framework.md` |
| `cursor_rules_django.md` | `backend-specialist/references/domains/technologies/python/django/index.md` |
| `cursor_rules_emacs.md` | `backend-specialist/references/domains/tooling/cli/emacs.md` |
| `cursor_rules_express.md` | `backend-specialist/references/domains/technologies/javascript-node/express.md` |
| `cursor_rules_fastapi.md` | `backend-specialist/references/domains/technologies/python/fastapi.md` |
| `cursor_rules_ffmpeg.md` | `backend-specialist/references/domains/tooling/media/ffmpeg.md` |
| `cursor_rules_fiber.md` | `backend-specialist/references/domains/technologies/go/fiber.md` |
| `cursor_rules_flask-restful.md` | `backend-specialist/references/domains/technologies/python/flask/flask-restful.md` |
| `cursor_rules_flask.md` | `backend-specialist/references/domains/technologies/python/flask/index.md` |
| `cursor_rules_git.md` | `backend-specialist/references/domains/tooling/cli/git.md` |
| `cursor_rules_godot.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/godot.md` |
| `cursor_rules_graphql.md` | `backend-specialist/references/domains/technologies/javascript-node/graphql.md` |
| `cursor_rules_insomnia.md` | `backend-specialist/references/domains/tooling/api-testing/insomnia.md` |
| `cursor_rules_laravel.md` | `backend-specialist/references/domains/technologies/php/laravel/index.md` |
| `cursor_rules_microsoft-teams.md` | `backend-specialist/references/domains/integrations/external-services/microsoft-teams.md` |
| `cursor_rules_nestjs.md` | `backend-specialist/references/domains/technologies/javascript-node/nestjs.md` |
| `cursor_rules_nginx.md` | `backend-specialist/references/domains/platforms/infrastructure/nginx.md` |
| `cursor_rules_notion-api.md` | `backend-specialist/references/domains/integrations/external-services/notion-api.md` |
| `cursor_rules_phoenix.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/phoenix.md` |
| `cursor_rules_php.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/php.md` |
| `cursor_rules_postman.md` | `backend-specialist/references/domains/tooling/api-testing/postman.md` |
| `cursor_rules_pyramid.md` | `backend-specialist/references/domains/technologies/python/pyramid.md` |
| `cursor_rules_rocket.md` | `backend-specialist/references/domains/technologies/rust/rocket.md` |
| `cursor_rules_ros.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/ros.md` |
| `cursor_rules_ruby.md` | `backend-specialist/references/domains/technologies/ruby/ruby.md` |
| `cursor_rules_sanic.md` | `backend-specialist/references/domains/technologies/python/sanic.md` |
| `cursor_rules_servemux.md` | `backend-specialist/references/domains/technologies/go/servemux.md` |
| `cursor_rules_solidity.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/solidity.md` |
| `cursor_rules_spring.md` | `backend-specialist/references/domains/technologies/java/spring.md` |
| `cursor_rules_springboot.md` | `backend-specialist/references/domains/technologies/java/springboot.md` |
| `cursor_rules_stripe.md` | `backend-specialist/references/domains/platforms/infrastructure/stripe.md` |
| `cursor_rules_tornado.md` | `backend-specialist/references/domains/technologies/python/tornado.md` |
| `cursor_rules_unity.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/unity.md` |
| `cursor_rules_unreal-engine.md` | `backend-specialist/references/domains/technologies/runtime-ecosystem/unreal-engine.md` |
| `cursor_rules_vim.md` | `backend-specialist/references/domains/tooling/cli/vim.md` |
| `cursor_rules_zsh.md` | `backend-specialist/references/domains/tooling/cli/zsh.md` |
| `engineering_backend_ai-engineer.md` | `backend-specialist/references/domains/personas/backend/ai-engineer.md` |
| `engineering_backend_backend-architect.md` | `backend-specialist/references/domains/personas/backend/backend-architect.md` |
| `specialized_django_django-api-developer.md` | `backend-specialist/references/domains/technologies/python/django/django-api-developer.md` |
| `specialized_django_django-backend-expert.md` | `backend-specialist/references/domains/technologies/python/django/django-backend-expert.md` |
| `specialized_django_django-orm-expert.md` | `backend-specialist/references/domains/technologies/python/django/django-orm-expert.md` |
| `specialized_laravel_laravel-backend-expert.md` | `backend-specialist/references/domains/technologies/php/laravel/laravel-backend-expert.md` |
| `specialized_laravel_laravel-eloquent-expert.md` | `backend-specialist/references/domains/technologies/php/laravel/laravel-eloquent-expert.md` |
| `specialized_rails_rails-activerecord-expert.md` | `backend-specialist/references/domains/technologies/ruby/rails/rails-activerecord-expert.md` |
| `specialized_rails_rails-api-developer.md` | `backend-specialist/references/domains/technologies/ruby/rails/rails-api-developer.md` |
| `specialized_rails_rails-backend-expert.md` | `backend-specialist/references/domains/technologies/ruby/rails/rails-backend-expert.md` |
| `universal_backend-developer.md` | `backend-specialist/references/domains/personas/universal/backend-developer.md` |

## Preview Top Tree (condensed)

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
├── data-specialist/
├── security-specialist/
├── testing-specialist/
├── devops-specialist/
├── code-quality-specialist/
├── product-specialist/
├── project-management-specialist/
├── design-specialist/
├── marketing-specialist/
├── documentation-specialist/
├── operations-specialist/
├── language-framework-specialist/
│   ├── SKILL.md
│   ├── references/domains/...
│   ├── scripts/ (optional)
│   └── assets/ (optional)
└── ruoyi-specialist/
    ├── SKILL.md
    ├── references/domains/...
    ├── scripts/ (optional)
    └── assets/ (optional)
```