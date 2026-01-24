# Prorise Claude Skills

一个开源的 Claude Code Skills 集合，提供专业的工作流、工具集成和领域专业知识。

[![Auto Update](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml/badge.svg)](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml)

## 特性

- **41+ Skills** - 涵盖开发、设计、运维、营销等多个领域
- **自动更新** - 仓库更新时自动生成 changelog 和更新文档
- **按需下载** - 使用 sparse-checkout 只下载需要的 skill

## Skills 目录

| Skill | 描述 |
|-------|------|
| [architecture-specialist](.claude/skills/architecture-specialist) | 提供系统架构设计、技术选型、架构审查和组件设计能力。当需要设计新系统、重构现有架构或进行架构审查时使用。 |
| [artifacts-builder](.claude/skills/artifacts-builder) | 一套用于使用现代前端 Web 技术（React、Tailwind CSS、shadcn/ui）创建复杂的多组件 claude.ai HTML 工件的工具集... |
| [backend-specialist](.claude/skills/backend-specialist) | 提供后端开发、API 设计、数据库交互和框架特定开发能力。当需要实现后端功能、设计 API 或处理数据层逻辑时使用。 |
| [ccw](.claude/skills/ccw) | Stateless workflow orchestrator. Auto-selects optimal workflow based on task ... |
| [ccw-help](.claude/skills/ccw-help) | CCW command help system. Search, browse, recommend commands. Triggers "ccw-he... |
| [ccw-loop](.claude/skills/ccw-loop) | Stateless iterative development loop workflow with documented progress. Suppo... |
| [changelog-generator](.claude/skills/changelog-generator) | 通过分析提交历史、分类更改并将技术提交转换为清晰的、面向客户的发布说明，自动从 git 提交创建面向用户的更新日志。将数小时的手动更新日志编写工作缩短为几... |
| [code-quality-specialist](.claude/skills/code-quality-specialist) | 提供代码审查、性能分析、重构建议、错误诊断和调试能力。当需要代码质量评估、性能优化、或问题排查时使用。 |
| [competitive-ads-extractor](.claude/skills/competitive-ads-extractor) | 从广告库（Facebook、LinkedIn 等）中提取和分析竞争对手的广告，以了解哪些消息、问题和创意方法有效。帮助激发和改进您自己的广告活动。 |
| [copyright-docs](.claude/skills/copyright-docs) | Generate software copyright design specification documents compliant with Chi... |
| [data-specialist](.claude/skills/data-specialist) | 提供数据库设计、优化、数据工程和数据分析能力。当需要处理数据库操作、数据管道或数据分析时使用。 |
| [design-specialist](.claude/skills/design-specialist) | 提供 UI/UX 设计、用户研究、视觉设计和品牌一致性能力。当需要设计界面、进行用户研究或创建视觉资产时使用。 |
| [devops-specialist](.claude/skills/devops-specialist) | 提供部署、CI/CD、基础设施管理和 DevOps 自动化能力。当需要部署应用、配置基础设施或优化开发流程时使用。 |
| [documentation-specialist](.claude/skills/documentation-specialist) | 创建和维护技术文档、API 文档、代码注释和项目文档。当需要生成、更新或改进文档时使用。 |
| [domain-name-brainstormer](.claude/skills/domain-name-brainstormer) | 为您的项目生成创意域名想法，并检查多个顶级域名（.com、.io、.dev、.ai 等）的可用性。节省数小时的头脑风暴和手动检查时间。 |
| [file-organizer](.claude/skills/file-organizer) | 通过理解上下文、查找重复项、建议更好的结构并自动化清理任务，智能地组织您计算机上的文件和文件夹。减少认知负担，无需手动操作即可保持数字工作区整洁。 |
| [frontend-specialist](.claude/skills/frontend-specialist) | 提供前端开发、UI 实现、移动应用开发和现代前端框架能力。当需要实现用户界面、构建组件或开发移动应用时使用。 |
| [gh-bootstrap](.claude/skills/gh-bootstrap) | 一站式 GitHub 仓库配置初始化工具。 |
| [internal-comms](.claude/skills/internal-comms) | 一套资源，帮助我使用公司喜欢的格式编写各种内部通信。每当要求编写某种内部通信（状态报告、领导更新、3P 更新、公司通讯、常见问题、事件报告、项目更新等）时... |
| [issue-manage](.claude/skills/issue-manage) | Interactive issue management with menu-driven CRUD operations. Use when manag... |
| [language-framework-specialist](.claude/skills/language-framework-specialist) | '提供特定编程语言和框架的深度专业知识。当需要处理特定技术栈的复杂问题时使用' |
| [lead-research-assistant](.claude/skills/lead-research-assistant) | 通过分析您的业务、搜索目标公司并提供可行的联系策略，为您的产品或服务识别高质量潜在客户。非常适合销售、业务开发和营销专业人士。 |
| [marketing-specialist](.claude/skills/marketing-specialist) | 提供内容营销、增长策略、社交媒体管理和应用商店优化能力。当需要创建营销内容、制定增长策略或管理社交媒体时使用。 |
| [mcp-builder](.claude/skills/mcp-builder) | 创建高质量 MCP（模型上下文协议）服务器的指南，使 LLM 能够通过精心设计的工具与外部服务交互。在构建 MCP 服务器以集成外部 API 或服务时使用... |
| [meeting-insights-analyzer](.claude/skills/meeting-insights-analyzer) | 分析会议记录和录音，以发现行为模式、沟通洞察和可行的反馈。识别您何时避免冲突、使用填充词、主导对话或错过倾听的机会。非常适合寻求提高沟通和领导技能的专业人士。 |
| [operations-specialist](.claude/skills/operations-specialist) | 提供运营分析、财务跟踪、基础设施维护和客户支持能力。当需要处理运营任务、生成报告或维护系统时使用。 |
| [product-specialist](.claude/skills/product-specialist) | 提供产品规划、需求分析、市场研究和业务分析能力。当需要进行产品决策、需求分析或市场研究时使用。 |
| [project-analyze](.claude/skills/project-analyze) | Multi-phase iterative project analysis with Mermaid diagrams. Generates archi... |
| [project-management-specialist](.claude/skills/project-management-specialist) | 提供项目管理、任务跟踪、团队协调和项目交付能力。当需要管理项目、跟踪进度或协调团队时使用。 |
| [Prompt Enhancer](.claude/skills/prompt-enhancer) | Transform vague prompts into actionable specs using intelligent analysis and ... |
| [review-code](.claude/skills/review-code) | Multi-dimensional code review with structured reports. Analyzes correctness, ... |
| [security-specialist](.claude/skills/security-specialist) | 提供安全审计、风险评估和合规检查能力。当需要进行安全审查、风险评估或合规验证时使用。 |
| [skill-creator](.claude/skills/skill-creator) | 创建有效技能的指南。当用户想要创建新技能（或更新现有技能）以通过专业知识、工作流或工具集成扩展 Claude 的功能时，应使用此技能。 |
| [skill-generator](.claude/skills/skill-generator) | Meta-skill for creating new Claude Code skills with configurable execution mo... |
| [skill-tuning](.claude/skills/skill-tuning) | Universal skill diagnosis and optimization tool. Detect and fix skill executi... |
| [software-manual](.claude/skills/software-manual) | Generate interactive TiddlyWiki-style HTML software manuals with screenshots,... |
| [testing-specialist](.claude/skills/testing-specialist) | 提供测试策略、测试编写、测试执行和测试结果分析能力。当需要编写测试、修复测试或优化测试流程时使用。 |
| [text-formatter](.claude/skills/text-formatter) | Transform and optimize text content with intelligent formatting. Output BBCod... |
| [ui-ux-pro-max](.claude/skills/ui-ux-pro-max) | "UI/UX 设计智能，在设计页面时必须使用" |
| [vue-best-practices](.claude/skills/vue-best-practices) | Vue 3 and Vue.js best practices for TypeScript, vue-tsc, and Volar. This skil... |
| [webapp-testing](.claude/skills/webapp-testing) | 使用 Playwright 与本地 Web 应用程序交互和测试的工具包。支持验证前端功能、调试 UI 行为、捕获浏览器截图和查看浏览器日志。 |

## 安装使用

### 方式一：克隆整个仓库

```bash
git clone https://github.com/prorise/prorise-claude-skills.git
cp -r prorise-claude-skills/.claude/skills/* ~/.claude/skills/
```

### 方式二：下载单个 Skill (Sparse Checkout)

```bash
# 1. 创建空仓库
mkdir claude-skills && cd claude-skills
git init
git remote add origin https://github.com/prorise/prorise-claude-skills.git

# 2. 启用 sparse-checkout
git config core.sparseCheckout true

# 3. 指定要下载的 skill（例如 changelog-generator）
echo ".claude/skills/changelog-generator" >> .git/info/sparse-checkout

# 4. 拉取
git pull origin main

# 5. 复制到 Claude 配置目录
cp -r .claude/skills/changelog-generator ~/.claude/skills/
```

### 下载多个 Skills

```bash
# 在 sparse-checkout 文件中添加多个路径
cat >> .git/info/sparse-checkout << EOF
.claude/skills/changelog-generator
.claude/skills/code-quality-specialist
.claude/skills/testing-specialist
EOF

git pull origin main
```

## 同步上游更新

```bash
# 进入你的 clone 目录
cd claude-skills

# 拉取最新更新
git pull origin main

# 复制更新的 skills
cp -r .claude/skills/* ~/.claude/skills/
```

## 贡献指南

欢迎贡献新的 Skills！请参考 [SKILL_WRITING_GUIDE.md](.claude/skills/SKILL_WRITING_GUIDE.md) 了解如何编写 Skill。

1. Fork 本仓库
2. 创建你的 skill 目录: `.claude/skills/your-skill-name/`
3. 编写 `SKILL.md` 文件（包含 YAML frontmatter）
4. 提交 Pull Request

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解最近的更新。

## 许可证

MIT License

---

*最后更新: 2026-01-24T02:36:39.428Z*
*Skills 数量: 41*
