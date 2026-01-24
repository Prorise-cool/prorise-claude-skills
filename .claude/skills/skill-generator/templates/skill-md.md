# SKILL.md Template

用于生成新 Skill 入口文件的模板。

## ⚠️ 重要：YAML Front Matter 规范

> **CRITICAL**: SKILL.md 文件必须以 YAML front matter 开头，即以 `---` 作为文件第一行。
>
> **禁止**使用以下格式：
> - `# Title` 然后 `## Metadata` + yaml 代码块 ❌
> - 任何在 `---` 之前的内容 ❌
>
> **正确格式**：文件第一行必须是 `---`

## 可直接应用的模板

以下是完整的 SKILL.md 模板。生成时**直接复制应用**，将 `{{变量}}` 替换为实际值：

---
name: {{skill_name}}
description: {{description}}. Triggers on {{triggers}}.
allowed-tools: {{allowed_tools}}
---

# {{display_name}}

{{description}}

## Architecture Overview

\`\`\`
{{architecture_diagram}}
\`\`\`

## Key Design Principles

{{design_principles}}

---

## ⚠️ Mandatory Prerequisites (强制前置条件)

> **⛔ 禁止跳过**: 在执行任何操作之前，**必须**完整阅读以下文档。未阅读规范直接执行将导致输出不符合质量标准。

{{mandatory_prerequisites}}

---

## Execution Flow

{{execution_flow}}

## Directory Setup

\`\`\`javascript
const timestamp = new Date().toISOString().slice(0,19).replace(/[-:T]/g, '');
const workDir = \`{{output_location}}\`;

Bash(\`mkdir -p "\${workDir}"\`);
{{additional_dirs}}
\`\`\`

## Output Structure

\`\`\`
{{output_structure}}
\`\`\`

## Reference Documents

{{reference_table}}

---

## 变量说明

| 变量 | 类型 | 来源 |
|------|------|------|
| `{{skill_name}}` | string | config.skill_name |
| `{{display_name}}` | string | config.display_name |
| `{{description}}` | string | config.description |
| `{{triggers}}` | string | config.triggers.join(", ") |
| `{{allowed_tools}}` | string | config.allowed_tools.join(", ") |
| `{{architecture_diagram}}` | string | 根据 execution_mode 生成 (包含 Phase 0) |
| `{{design_principles}}` | string | 根据 execution_mode 生成 |
| `{{mandatory_prerequisites}}` | string | 强制前置阅读文档列表 (specs + templates) |
| `{{execution_flow}}` | string | 根据 phases/actions 生成 (Phase 0 在最前) |
| `{{output_location}}` | string | config.output.location |
| `{{additional_dirs}}` | string | 根据 execution_mode 生成 |
| `{{output_structure}}` | string | 根据配置生成 |
| `{{reference_table}}` | string | 根据文件列表生成 |

## 生成函数

```javascript
function generateSkillMd(config) {
  const template = Read('templates/skill-md.md');

  return template
    .replace(/\{\{skill_name\}\}/g, config.skill_name)
    .replace(/\{\{display_name\}\}/g, config.display_name)
    .replace(/\{\{description\}\}/g, config.description)
    .replace(/\{\{triggers\}\}/g, config.triggers.map(t => `"${t}"`).join(", "))
    .replace(/\{\{allowed_tools\}\}/g, config.allowed_tools.join(", "))
    .replace(/\{\{architecture_diagram\}\}/g, generateArchitecture(config))  // 包含 Phase 0
    .replace(/\{\{design_principles\}\}/g, generatePrinciples(config))
    .replace(/\{\{mandatory_prerequisites\}\}/g, generatePrerequisites(config))  // 强制前置条件
    .replace(/\{\{execution_flow\}\}/g, generateFlow(config))  // Phase 0 在最前
    .replace(/\{\{output_location\}\}/g, config.output.location)
    .replace(/\{\{additional_dirs\}\}/g, generateAdditionalDirs(config))
    .replace(/\{\{output_structure\}\}/g, generateOutputStructure(config))
    .replace(/\{\{reference_table\}\}/g, generateReferenceTable(config));
}

// 生成强制前置条件表格
function generatePrerequisites(config) {
  const specs = config.specs || [];
  const templates = config.templates || [];

  let result = '### 规范文档 (必读)\n\n';
  result += '| Document | Purpose | Priority |\n';
  result += '|----------|---------|----------|\n';

  specs.forEach((spec, index) => {
    const priority = index === 0 ? '**P0 - 最高**' : 'P1';
    result += `| [${spec.path}](${spec.path}) | ${spec.purpose} | ${priority} |\n`;
  });

  if (templates.length > 0) {
    result += '\n### 模板文件 (生成前必读)\n\n';
    result += '| Document | Purpose |\n';
    result += '|----------|---------|\n';
    templates.forEach(tmpl => {
      result += `| [${tmpl.path}](${tmpl.path}) | ${tmpl.purpose} |\n`;
    });
  }

  return result;
}
```

## Sequential 模式示例

```markdown
---
name: api-docs-generator
description: Generate API documentation from source code. Triggers on "generate api docs", "api documentation".
allowed-tools: Task, Read, Write, Glob, Grep, Bash
---

# API Docs Generator

Generate API documentation from source code.

## Architecture Overview

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Phase 0: Specification  → 阅读并理解设计规范 (强制前置)      │
│              Study                                               │
│           ↓                                                      │
│  Phase 1: Scanning        → endpoints.json                      │
│           ↓                                                      │
│  Phase 2: Parsing         → schemas.json                        │
│           ↓                                                      │
│  Phase 3: Generation      → api-docs.md                         │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## ⚠️ Mandatory Prerequisites (强制前置条件)

> **⛔ 禁止跳过**: 在执行任何操作之前，**必须**完整阅读以下文档。

### 规范文档 (必读)

| Document | Purpose | Priority |
|----------|---------|----------|
| [specs/api-standards.md](specs/api-standards.md) | API 文档标准规范 | **P0 - 最高** |

### 模板文件 (生成前必读)

| Document | Purpose |
|----------|---------|
| [templates/endpoint-doc.md](templates/endpoint-doc.md) | 端点文档模板 |
```

## Autonomous 模式示例

```markdown
---
name: task-manager
description: Interactive task management with CRUD operations. Triggers on "manage tasks", "task list".
allowed-tools: Task, AskUserQuestion, Read, Write
---

# Task Manager

Interactive task management with CRUD operations.

## Architecture Overview

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Phase 0: Specification Study (强制前置)                       │
└───────────────┬─────────────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────────────────────────────┐
│           Orchestrator (状态驱动决策)                             │
└───────────────┬─────────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────┐
    ↓           ↓           ↓           ↓
┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
│ List  │  │Create │  │ Edit  │  │Delete │
└───────┘  └───────┘  └───────┘  └───────┘
\`\`\`

## ⚠️ Mandatory Prerequisites (强制前置条件)

> **⛔ 禁止跳过**: 在执行任何操作之前，**必须**完整阅读以下文档。

### 规范文档 (必读)

| Document | Purpose | Priority |
|----------|---------|----------|
| [specs/task-schema.md](specs/task-schema.md) | 任务数据结构规范 | **P0 - 最高** |
| [specs/action-catalog.md](specs/action-catalog.md) | 动作目录 | P1 |

### 模板文件 (生成前必读)

| Document | Purpose |
|----------|---------|
| [templates/orchestrator-base.md](templates/orchestrator-base.md) | 编排器模板 |
| [templates/action-base.md](templates/action-base.md) | 动作模板 |
```
