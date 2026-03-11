---
description: 提供运营分析、财务跟踪、基础设施维护和客户支持能力。当需要处理运营任务、生成报告或维护系统时使用。
name: operations-specialist
---
# Operations Specialist

提供运营分析、财务跟踪、基础设施维护和客户支持能力。当需要处理运营任务、生成报告或维护系统时使用。

## Domain Index

- `references/domains/databases/`
- `references/domains/skill-lifecycle/`
- `references/domains/studio-operations/`
- `references/domains/workspace-organization/`

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

#### skill-lifecycle (2)
- `skill-creator`
  - 触发语义: 创建有效技能的指南。当用户想要创建新技能（或更新现有技能）以通过专业知识、工作流或工具集成扩展 Claude 的功能时，应使用此技能。
  - 相对路径: `references/domains/skill-lifecycle/creator/SKILL.md`
- `skill-generator`
  - 触发语义: Meta-skill for creating new Claude Code skills with configurable execution modes. Supports sequential (fixed order) and autonomous (stateless) phase patterns. Use for skill scaffolding, skill creation, or building new workflows. Triggers on "create skill", "new skill", "skill generator", "生成技能", "创建技能".
  - 相对路径: `references/domains/skill-lifecycle/generator/SKILL.md`

#### workspace-organization (1)
- `file-organizer`
  - 触发语义: 通过理解上下文、查找重复项、建议更好的结构并自动化清理任务，智能地组织您计算机上的文件和文件夹。减少认知负担，无需手动操作即可保持数字工作区整洁。
  - 相对路径: `references/domains/workspace-organization/SKILL.md`

<!-- AUTO-GENERATED-SKILL-INDEX:END -->

## Notes

- 顶层 `SKILL.md` 仅做索引导航，不承载大体量细节内容。
- 详细资料下沉到 `references/domains/`，按树形结构组织。
