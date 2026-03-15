# Prorise Claude Skills

一个开源的 Claude Code Skills 集合，提供专业的工作流、工具集成和领域专业知识。

[![Auto Update](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml/badge.svg)](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml)

## 特性

- **18 Skills** - 涵盖开发、设计、运维、营销等多个领域
- **自动更新** - 仓库更新时自动生成 changelog 和更新文档
- **按需下载** - 使用 sparse-checkout 只下载需要的 skill

## Skills 目录

| Skill | 描述 |
|-------|------|
| [ai-specialist](.claude/skills/ai-specialist) | 提供 AI 应用开发、MCP 服务器工程、提示词工程与智能体框架集成能力。当需要构建或优化基于大模型的功能、工作流或平台集成时使用。 |
| [architecture-specialist](.claude/skills/architecture-specialist) | 提供系统架构设计、技术选型、架构审查和组件设计能力。当需要设计新系统、重构现有架构或进行架构审查时使用。 |
| [backend-specialist](.claude/skills/backend-specialist) | 提供后端开发、API 设计、数据库交互和框架特定开发能力。当需要实现后端功能、设计 API 或处理数据层逻辑时使用。 |
| [code-quality-specialist](.claude/skills/code-quality-specialist) | 提供代码审查、性能分析、重构建议、错误诊断和调试能力。当需要代码质量评估、性能优化、或问题排查时使用。 |
| [data-specialist](.claude/skills/data-specialist) | 提供数据库设计、优化、数据工程和数据分析能力。当需要处理数据库操作、数据管道或数据分析时使用。 |
| [design-specialist](.claude/skills/design-specialist) | 提供 UI/UX 设计、用户研究、视觉设计和品牌一致性能力。当需要设计界面、进行用户研究或创建视觉资产时使用。 |
| [devops-specialist](.claude/skills/devops-specialist) | 提供部署、CI/CD、基础设施管理和 DevOps 自动化能力。当需要部署应用、配置基础设施或优化开发流程时使用。 |
| [documentation-specialist](.claude/skills/documentation-specialist) | 创建和维护技术文档、API 文档、代码注释和项目文档。当需要生成、更新或改进文档时使用。 |
| [framework-specialist](.claude/skills/framework-specialist) | '提供特定编程语言和框架的深度专业知识。当需要处理特定技术栈的复杂问题时使用' |
| [frontend-specialist](.claude/skills/frontend-specialist) | 提供前端开发、UI 实现、移动应用开发和现代前端框架能力。当需要实现用户界面、构建组件或开发移动应用时使用。 |
| [marketing-specialist](.claude/skills/marketing-specialist) | 提供内容营销、增长策略、社交媒体管理和应用商店优化能力。当需要创建营销内容、制定增长策略或管理社交媒体时使用。 |
| [open-source-project-specialist](.claude/skills/open-source-project-specialist) | 提供开源项目专属技能的组织与索引能力。当任务依赖特定第三方开源项目的深度实践、约定或扩展模式时使用。 |
| [operations-specialist](.claude/skills/operations-specialist) | 提供运营分析、财务跟踪、基础设施维护和客户支持能力。当需要处理运营任务、生成报告或维护系统时使用。 |
| [product-specialist](.claude/skills/product-specialist) | 提供产品规划、需求分析、市场研究和业务分析能力。当需要进行产品决策、需求分析或市场研究时使用。 |
| [project-management-specialist](.claude/skills/project-management-specialist) | 提供项目管理、任务跟踪、团队协调和项目交付能力。当需要管理项目、跟踪进度或协调团队时使用。 |
| [scraping-specialist](.claude/skills/scraping-specialist) | 提供网站抓取、结构化数据提取、浏览器自动化、站点映射、搜索广告情报、社媒内容采集、评论分析与垂直站点采集能力。当任务涉及 scrape、crawl、ext... |
| [security-specialist](.claude/skills/security-specialist) | 提供安全审计、风险评估和合规检查能力。当需要进行安全审查、风险评估或合规验证时使用。 |
| [testing-specialist](.claude/skills/testing-specialist) | 提供测试策略、测试编写、测试执行和测试结果分析能力。当需要编写测试、修复测试或优化测试流程时使用。 |

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

# 3. 指定要下载的 skill（例如 ai-specialist）
echo ".claude/skills/ai-specialist" >> .git/info/sparse-checkout

# 4. 拉取
git pull origin main

# 5. 复制到 Claude 配置目录
cp -r .claude/skills/ai-specialist ~/.claude/skills/
```

### 下载多个 Skills

```bash
# 在 sparse-checkout 文件中添加多个路径
cat >> .git/info/sparse-checkout << EOF
.claude/skills/ai-specialist
.claude/skills/architecture-specialist
.claude/skills/backend-specialist
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

*最后更新: 2026-03-15T14:13:56.626Z*
*Skills 数量: 18*
