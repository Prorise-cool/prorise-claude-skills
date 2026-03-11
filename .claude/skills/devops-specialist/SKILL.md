---
description: 提供部署、CI/CD、基础设施管理和 DevOps 自动化能力。当需要部署应用、配置基础设施或优化开发流程时使用。
name: devops-specialist
---
# Devops Specialist

提供部署、CI/CD、基础设施管理和 DevOps 自动化能力。当需要部署应用、配置基础设施或优化开发流程时使用。

## Domain Index

- `references/domains/ci-cd/`
- `references/domains/cloud/`
- `references/domains/deployment/`
- `references/domains/github-platform/`
- `references/domains/infrastructure/`
- `references/domains/rules/`

## Skill Index

<!-- AUTO-GENERATED-SKILL-INDEX:START -->
以下索引由 `node scripts/update-skill-index.js` 自动生成，用于让 Claude 在顶层专家触发后继续路由到最相关的子技能。

### Claude 使用说明

1. 先将用户当前任务与每个子技能的 `触发语义` 进行语义匹配，不要只看目录名。
2. 一旦找到最相关的子技能，立即打开其 `相对路径` 指向的 `SKILL.md`，把它作为下一层入口文件。
3. 进入子技能后，再根据该子技能自己的说明按需加载同目录下的 `references/`、`scripts/`、`assets/`，不要在顶层专家中预先展开大段细节。
4. 如果多个子技能都相关，先加载最贴近主目标的那个，再按需补充其他子技能，避免一次性加载过多上下文。
5. 下方 `相对路径` 均相对于当前顶层专家目录。

### 子技能索引

#### github-platform (1)
- `gh-bootstrap`
  - 触发语义: 一站式 GitHub 仓库配置初始化工具。
  - 相对路径: `references/domains/github-platform/bootstrap/SKILL.md`

#### github-platform/core (9)
- `git-config`
  - 触发语义: Comprehensive Git configuration guide covering global settings, aliases, performance tuning, credential management, maintenance, .gitattributes, clone shortcuts, and troubleshooting. Use when configuring Git beyond basic setup, optimizing Git performance, setting up aliases, managing credentials (GitHub CLI, Windows Credential Manager), configuring line ending strategy, setting up .gitattributes, enabling Git maintenance, or troubleshooting configuration issues. Cross-platform guidance for Windows, macOS, and Linux.
  - 相对路径: `references/domains/github-platform/core/git-config/SKILL.md`
- `git-hooks`
  - 触发语义: Central authority on git hook implementations, modern best practices, and tooling for .NET/C#, JavaScript/TypeScript, Python, and polyglot repositories. Covers framework selection (Husky.Net, lefthook, Husky, pre-commit), setup workflows, Conventional Commits, semantic versioning, secret scanning (gitleaks, TruffleHog), performance optimization, CI/CD integration, testing strategies, and team collaboration patterns. Adaptive to project scale from solo developers to enterprise teams. Use for setting up git hooks, configuring pre-commit/commit-msg/pre-push hooks, integrating dotnet format/dotnet test, ESLint/Prettier, Black/Ruff/mypy, commitlint, choosing between frameworks, optimizing hook performance, enforcing code quality, automating testing, and troubleshooting hook issues.
  - 相对路径: `references/domains/github-platform/core/git-hooks/SKILL.md`
- `github-issues`
  - 触发语义: Query and search GitHub issues using gh CLI with web fallback. Supports filtering by labels, state, assignees, and full-text search. Use when troubleshooting errors, checking if an issue is already reported, or finding workarounds.
  - 相对路径: `references/domains/github-platform/core/github-issues/SKILL.md`
- `gpg-multi-key`
  - 触发语义: Advanced GPG multi-key management strategies for consultants, CI/CD automation, and enterprise teams. Configure, set up, run, and execute multi-key GPG workflows. Use when managing multiple GPG keys (personal + automation, per-client keys, enterprise keys), configuring CI/CD commit signing, implementing per-client key isolation, using conditional Git includes, setting up automated signing, or scaling GPG key strategies beyond single-key setups.
  - 相对路径: `references/domains/github-platform/core/gpg-multi-key/SKILL.md`
- `gpg-signing`
  - 触发语义: Comprehensive guide to GPG commit signing. Set up, configure, and troubleshoot GPG commit signing. Fix GPG signing errors, configure passphrase caching, verify commit signatures. Use when working with Git commit signing, GPG keys, commit verification, signature verification, GPG configuration, or when encountering GPG signing errors. Covers Windows (Gpg4win), macOS (GPG Suite), Linux (gnupg), and WSL installation and setup.
  - 相对路径: `references/domains/github-platform/core/gpg-signing/SKILL.md`
- `gui-tools`
  - 触发语义: Provides guidance for installing, configuring, and choosing Git graphical interface clients (GitKraken, Sourcetree, GitHub Desktop) across platforms. Compares features, licensing, and workflows. Troubleshoots graphical tool configuration and setup issues. Use when installing Git graphical clients, setting up Git visualization tools, configuring graphical commit tools, choosing between options, or troubleshooting configuration. Covers Windows, macOS, and Linux. All tools are optional and based on user preference.
  - 相对路径: `references/domains/github-platform/core/gui-tools/SKILL.md`
- `line-endings`
  - 触发语义: Comprehensive guide to Git line ending configuration for cross-platform development teams. Use when configuring line endings, setting up .gitattributes, troubleshooting line ending issues, understanding core.autocrlf/core.eol/core.safecrlf, working with Git LFS, normalizing line endings in repositories, or resolving cross-platform line ending conflicts. Covers Windows, macOS, Linux, and WSL. Includes decision trees, workflows, best practices, and real-world scenarios.
  - 相对路径: `references/domains/github-platform/core/line-endings/SKILL.md`
- `push`
  - 触发语义: Comprehensive Git push operations including basic push, force push safety protocols, tag pushing, remote management, and troubleshooting. Use when pushing commits, managing remotes, pushing tags, resolving push conflicts, handling rejected pushes, or dealing with force push scenarios. Covers push strategies, branch protection, upstream configuration, and push --force-with-lease best practices.
  - 相对路径: `references/domains/github-platform/core/push/SKILL.md`
- `setup`
  - 触发语义: Complete guide to installing Git and performing basic configuration across all platforms (Windows, macOS, Linux, WSL). Use when setting up Git for the first time, installing Git on new systems, configuring user identity, setting default branch, choosing editor, verifying installation, or troubleshooting Git installation issues. Covers platform-specific installation methods, basic required configuration, and verification steps.
  - 相对路径: `references/domains/github-platform/core/setup/SKILL.md`

<!-- AUTO-GENERATED-SKILL-INDEX:END -->

## Notes

- 顶层 `SKILL.md` 仅做索引导航，不承载大体量细节内容。
- 详细资料下沉到 `references/domains/`，按树形结构组织。
