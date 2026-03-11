---
description: 提供项目管理、任务跟踪、团队协调和项目交付能力。当需要管理项目、跟踪进度或协调团队时使用。
name: project-management-specialist
---
# Project Management Specialist

提供项目管理、任务跟踪、团队协调和项目交付能力。当需要管理项目、跟踪进度或协调团队时使用。

## Domain Index

- `references/domains/issue-lifecycle/`
- `references/domains/meeting-intelligence/`
- `references/domains/orchestration/`
- `references/domains/project-management/`

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

#### issue-lifecycle (1)
- `issue-manage`
  - 触发语义: Interactive issue management with menu-driven CRUD operations. Use when managing issues, viewing issue status, editing issue fields, performing bulk operations, or viewing issue history. Triggers on "manage issue", "list issues", "edit issue", "delete issue", "bulk update", "issue dashboard", "issue history", "completed issues".
  - 相对路径: `references/domains/issue-lifecycle/SKILL.md`

#### meeting-intelligence (1)
- `meeting-insights-analyzer`
  - 触发语义: 分析会议记录和录音，以发现行为模式、沟通洞察和可行的反馈。识别您何时避免冲突、使用填充词、主导对话或错过倾听的机会。非常适合寻求提高沟通和领导技能的专业人士。
  - 相对路径: `references/domains/meeting-intelligence/SKILL.md`

<!-- AUTO-GENERATED-SKILL-INDEX:END -->

## Notes

- 顶层 `SKILL.md` 仅做索引导航，不承载大体量细节内容。
- 详细资料下沉到 `references/domains/`，按树形结构组织。
