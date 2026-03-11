# Expert Taxonomy V4 (Refined)

- Generated: `2026-03-05T22:34:41.883531+08:00`
- Source of truth: `/.claude/skills/SKILL_WRITING_GUIDE.md`

## Expert Domains (Top Level)

- `architecture-specialist`
- `backend-specialist`
- `frontend-specialist`
- `framework-specialist`
- `open-source-project-specialist`
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

## Keep-as-Is Exceptions

- `_shared`
- `ccw`
- `ccw-help`
- `ccw-loop`
- `SKILL_WRITING_GUIDE.md`

## Precise Mapping (Every Current Top-Level Directory)

| Source | Action | Target | Rationale |
|---|---|---|---|
| `_shared` | `keep_exception` | `_shared` | Shared reusable assets across experts |
| `architecture-specialist` | `keep_top_expert` | `architecture-specialist` | Large architecture domain |
| `artifacts-builder` | `merge` | `frontend-specialist/references/domains/artifact-engineering` | Frontend artifact engineering domain |
| `backend-specialist` | `keep_top_expert` | `backend-specialist` | Large backend engineering domain |
| `business-analysis` | `merge` | `product-specialist/references/domains/business-analysis` | Product/business analysis domain |
| `ccw` | `keep_exception` | `ccw` | User-declared exception |
| `ccw-help` | `keep_exception` | `ccw-help` | User-declared exception |
| `ccw-loop` | `keep_exception` | `ccw-loop` | User-declared exception |
| `changelog-generator` | `merge` | `documentation-specialist/references/domains/changelog-automation` | Documentation automation domain |
| `code-quality-specialist` | `keep_top_expert` | `code-quality-specialist` | Large code quality domain |
| `competitive-ads-extractor` | `merge` | `marketing-specialist/references/domains/competitive-intelligence` | Marketing intelligence domain |
| `copyright-docs` | `merge` | `documentation-specialist/references/domains/compliance-copyright` | Compliance documentation domain |
| `data-specialist` | `keep_top_expert` | `data-specialist` | Large data domain |
| `design-specialist` | `keep_top_expert` | `design-specialist` | Large design domain |
| `devops-specialist` | `keep_top_expert` | `devops-specialist` | Large devops domain |
| `document-skills` | `merge` | `documentation-specialist/references/domains/document-formats` | Document format knowledge domain |
| `documentation-specialist` | `keep_top_expert` | `documentation-specialist` | Large documentation domain |
| `domain-name-brainstormer` | `merge` | `marketing-specialist/references/domains/domain-branding` | Brand/domain naming domain |
| `file-organizer` | `merge` | `operations-specialist/references/domains/workspace-organization` | Operational workspace domain |
| `frontend-specialist` | `keep_top_expert` | `frontend-specialist` | Large frontend domain |
| `gh-bootstrap` | `merge` | `devops-specialist/references/domains/github-platform/bootstrap` | GitHub platform bootstrap operations |
| `github-specialist` | `merge` | `devops-specialist/references/domains/github-platform/core` | GitHub is a platform subdomain, not top-level expert |
| `internal-comms` | `merge` | `documentation-specialist/references/domains/internal-communications` | Internal communication documents domain |
| `issue-manage` | `merge` | `project-management-specialist/references/domains/issue-lifecycle` | Issue workflow management domain |
| `language-framework-specialist` | `rename_keep_top_expert` | `framework-specialist` | Elevate as broader framework domain with clearer naming |
| `lead-research-assistant` | `merge` | `marketing-specialist/references/domains/lead-research` | Lead research domain |
| `marketing-specialist` | `keep_top_expert` | `marketing-specialist` | Large marketing domain |
| `mcp-builder` | `merge` | `backend-specialist/references/domains/mcp-platform` | Backend MCP platform engineering |
| `meeting-insights-analyzer` | `merge` | `project-management-specialist/references/domains/meeting-intelligence` | Team/process insight domain |
| `operations-specialist` | `keep_top_expert` | `operations-specialist` | Large operations domain |
| `product-specialist` | `keep_top_expert` | `product-specialist` | Large product domain |
| `project-analyze` | `merge` | `architecture-specialist/references/domains/project-analysis` | Architecture/project analysis domain |
| `project-management-specialist` | `keep_top_expert` | `project-management-specialist` | Large PM domain |
| `prompt-enhancer` | `merge` | `product-specialist/references/domains/prompt-specification` | Requirement/prompt specification domain |
| `review-code` | `merge` | `code-quality-specialist/references/domains/review-workflow` | Code review workflow domain |
| `ruoyi-framework` | `merge` | `open-source-project-specialist/references/projects/ruoyi` | Project-specific open-source framework should belong to OSS project expert category |
| `security-specialist` | `keep_top_expert` | `security-specialist` | Large security domain |
| `skill-creator` | `merge` | `operations-specialist/references/domains/skill-lifecycle/creator` | Skill lifecycle operations domain |
| `skill-generator` | `merge` | `operations-specialist/references/domains/skill-lifecycle/generator` | Skill lifecycle automation domain |
| `skill-tuning` | `merge` | `code-quality-specialist/references/domains/skill-quality/tuning` | Skill quality optimization domain |
| `software-manual` | `merge` | `documentation-specialist/references/domains/manual-generation` | Manual generation domain |
| `testing-specialist` | `keep_top_expert` | `testing-specialist` | Large testing domain |
| `text-formatter` | `merge` | `documentation-specialist/references/domains/text-formatting` | Text formatting domain |
| `ui-ux-pro-max` | `merge` | `design-specialist/references/domains/ui-design` | UI design domain |
| `ux-research` | `merge` | `design-specialist/references/domains/ux-research` | UX research domain |
| `vue-best-practices` | `merge` | `framework-specialist/references/domains/frontend-frameworks/vue` | Framework best practice domain |
| `webapp-testing` | `merge` | `testing-specialist/references/domains/webapp-testing` | Web application testing domain |

## Condensed Tree After Reclassification

```text
.claude/skills/
├── _shared/                                 # keep
├── ccw/                                     # keep
├── ccw-help/                                # keep
├── ccw-loop/                                # keep
├── SKILL_WRITING_GUIDE.md                   # keep
├── architecture-specialist/
│   ├── SKILL.md
│   └── references/domains/project-analysis/
├── backend-specialist/
│   ├── SKILL.md
│   └── references/domains/{mcp-platform,technologies,tooling,platforms,integrations,personas}/
├── frontend-specialist/
│   ├── SKILL.md
│   └── references/domains/artifact-engineering/
├── framework-specialist/                    # renamed from language-framework-specialist
│   ├── SKILL.md
│   └── references/domains/frontend-frameworks/vue/
├── open-source-project-specialist/          # new top-level expert category
│   ├── SKILL.md
│   └── references/projects/ruoyi/
├── data-specialist/
├── security-specialist/
├── testing-specialist/
│   └── references/domains/webapp-testing/
├── devops-specialist/
│   └── references/domains/github-platform/{core,bootstrap}/
├── code-quality-specialist/
│   └── references/domains/{review-workflow,skill-quality/tuning}/
├── product-specialist/
│   └── references/domains/{business-analysis,prompt-specification}/
├── project-management-specialist/
│   └── references/domains/{issue-lifecycle,meeting-intelligence}/
├── design-specialist/
│   └── references/domains/{ui-design,ux-research}/
├── marketing-specialist/
│   └── references/domains/{competitive-intelligence,domain-branding,lead-research}/
├── documentation-specialist/
│   └── references/domains/{changelog-automation,compliance-copyright,document-formats,internal-communications,manual-generation,text-formatting}/
└── operations-specialist/
    └── references/domains/{workspace-organization,skill-lifecycle/{creator,generator}}/
```

## Backend Prefix Cleanup Mapping (58 files)

| Source | Target |
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