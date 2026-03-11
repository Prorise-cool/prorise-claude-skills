---
description: 提供前端开发、UI 实现、移动应用开发和现代前端框架能力。当需要实现用户界面、构建组件或开发移动应用时使用。
name: frontend-specialist
---
# Frontend Specialist

提供前端开发、UI 实现、移动应用开发和现代前端框架能力。当需要实现用户界面、构建组件或开发移动应用时使用。

## Domain Index

- `references/domains/artifact-engineering/`
- `references/domains/delivery/`
- `references/domains/engineering/`
- `references/domains/frameworks/`
- `references/domains/specializations/`
- `references/domains/state-management/`
- `references/domains/styling/`
- `references/domains/ui-libraries/`

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

#### artifact-engineering (1)
- `artifacts-builder`
  - 触发语义: 一套用于使用现代前端 Web 技术（React、Tailwind CSS、shadcn/ui）创建复杂的多组件 claude.ai HTML 工件的工具集。适用于需要状态管理、路由或 shadcn/ui 组件的复杂工件，不适用于简单的单文件 HTML/JSX 工件。
  - 相对路径: `references/domains/artifact-engineering/SKILL.md`

#### frameworks (1)
- `vue-best-practices`
  - 触发语义: Vue 3 and Vue.js best practices for TypeScript, vue-tsc, and Volar. This skill should be used when writing, reviewing, or refactoring Vue components to ensure correct typing patterns. Triggers on tasks involving Vue components, props extraction, wrapper components, template type checking, or Volar configuration.
  - 相对路径: `references/domains/frameworks/vue-best-practices/SKILL.md`

<!-- AUTO-GENERATED-SKILL-INDEX:END -->

## Notes

- 顶层 `SKILL.md` 仅做索引导航，不承载大体量细节内容。
- 详细资料下沉到 `references/domains/`，按树形结构组织。
