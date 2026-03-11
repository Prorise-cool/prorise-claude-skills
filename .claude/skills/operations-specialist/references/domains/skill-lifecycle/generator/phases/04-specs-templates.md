# Phase 4: Specs & Templates Generation

生成规范文件和模板文件。

## Objective

- 生成领域规范 (`specs/{domain}-requirements.md`)
- 生成质量标准 (`specs/quality-standards.md`)
- 生成 Agent 模板 (`templates/agent-base.md`)
- Autonomous 模式额外生成动作目录 (`specs/action-catalog.md`)

## Input

- 依赖: `skill-config.json`, SKILL.md, phases/*.md

## Execution Steps

### Step 1: 生成领域规范

```javascript
const config = JSON.parse(Read(`${workDir}/skill-config.json`));
const skillDir = `.claude/skills/${config.skill_name}`;

const domainRequirements = `# ${config.display_name} Requirements

${config.description}

## When to Use

| Phase | Usage | Reference |
|-------|-------|-----------|
${config.execution_mode === 'sequential' ? 
  config.sequential_config.phases.map((p, i) => 
    `| Phase ${i+1} | ${p.name} | ${p.id}.md |`
  ).join('\n') :
  `| Orchestrator | 动作选择 | orchestrator.md |
| Actions | 动作执行 | actions/*.md |`}

---

## Domain Requirements

### 功能要求

- [ ] 要求1: TODO
- [ ] 要求2: TODO
- [ ] 要求3: TODO

### 输出要求

- [ ] 格式: ${config.output.format}
- [ ] 位置: ${config.output.location}
- [ ] 命名: ${config.output.filename_pattern}

### 质量要求

- [ ] 完整性: 所有必需内容存在
- [ ] 一致性: 术语和格式统一
- [ ] 准确性: 内容基于实际分析

## Validation Function

\`\`\`javascript
function validate${toPascalCase(config.skill_name)}(output) {
  const checks = [
    // TODO: 添加验证规则
    { name: "格式正确", pass: output.format === "${config.output.format}" },
    { name: "内容完整", pass: output.content?.length > 0 }
  ];
  
  return {
    passed: checks.filter(c => c.pass).length,
    total: checks.length,
    details: checks
  };
}
\`\`\`

## Error Handling

| Error | Recovery |
|-------|----------|
| 输入数据缺失 | 返回明确错误信息 |
| 处理超时 | 缩小范围，重试 |
| 输出验证失败 | 记录问题，人工审核 |
`;

Write(`${skillDir}/specs/${config.skill_name}-requirements.md`, domainRequirements);
```

### Step 2: 生成质量标准

```javascript
const qualityStandards = `# Quality Standards

${config.display_name} 的质量评估标准。

## Quality Dimensions

### 1. Completeness (完整性) - 25%

| 要求 | 权重 | 检查方式 |
|------|------|----------|
| 所有必需输出存在 | 10 | 文件检查 |
| 内容覆盖完整 | 10 | 内容分析 |
| 无占位符残留 | 5 | 文本搜索 |

### 2. Consistency (一致性) - 25%

| 方面 | 检查 |
|------|------|
| 术语 | 同一概念使用相同术语 |
| 格式 | 标题层级、代码块格式一致 |
| 风格 | 语气和表达方式统一 |

### 3. Accuracy (准确性) - 25%

| 要求 | 说明 |
|------|------|
| 数据正确 | 引用和数据无错误 |
| 逻辑正确 | 流程和关系描述准确 |
| 代码正确 | 代码示例可运行 |

### 4. Usability (可用性) - 25%

| 指标 | 目标 |
|------|------|
| 可读性 | 结构清晰，易于理解 |
| 可导航 | 目录和链接正确 |
| 可操作 | 步骤明确，可执行 |

## Quality Gates

| Gate | Threshold | Action |
|------|-----------|--------|
| Pass | ≥ 80% | 输出最终产物 |
| Review | 60-79% | 处理警告后继续 |
| Fail | < 60% | 必须修复 |

## Issue Classification

### Errors (Must Fix)

- 必需输出缺失
- 数据错误
- 代码不可运行

### Warnings (Should Fix)

- 格式不一致
- 内容深度不足
- 缺少示例

### Info (Nice to Have)

- 优化建议
- 增强机会

## Automated Checks

\`\`\`javascript
function runQualityChecks(workDir) {
  const results = {
    completeness: checkCompleteness(workDir),
    consistency: checkConsistency(workDir),
    accuracy: checkAccuracy(workDir),
    usability: checkUsability(workDir)
  };

  results.overall = (
    results.completeness * 0.25 +
    results.consistency * 0.25 +
    results.accuracy * 0.25 +
    results.usability * 0.25
  );

  return {
    score: results.overall,
    gate: results.overall >= 80 ? 'pass' : 
          results.overall >= 60 ? 'review' : 'fail',
    details: results
  };
}
\`\`\`
`;

Write(`${skillDir}/specs/quality-standards.md`, qualityStandards);
```

### Step 3: 生成 Agent 模板

```javascript
const agentBase = `# Agent Base Template

${config.display_name} 的 Agent 基础模板。

## 通用 Prompt 结构

\`\`\`
[ROLE] 你是{角色}，专注于{职责}。

[PROJECT CONTEXT]
Skill: ${config.skill_name}
目标: ${config.description}

[TASK]
{任务描述}
- 输出: {output_path}
- 格式: ${config.output.format}

[CONSTRAINTS]
- 约束1
- 约束2

[OUTPUT_FORMAT]
1. 执行任务
2. 返回 JSON 简要信息

[QUALITY_CHECKLIST]
- [ ] 输出格式正确
- [ ] 内容完整无遗漏
- [ ] 无占位符残留
\`\`\`

## 变量说明

| 变量 | 来源 | 示例 |
|------|------|------|
| {workDir} | 运行时 | .workflow/.scratchpad/${config.skill_name}-xxx |
| {output_path} | 配置 | ${config.output.location}/${config.output.filename_pattern} |

## 返回格式

\`\`\`typescript
interface AgentReturn {
  status: "completed" | "partial" | "failed";
  output_file: string;
  summary: string;  // Max 50 chars
  stats?: {
    items_processed?: number;
    errors?: number;
  };
}
\`\`\`

## 角色定义参考

${config.execution_mode === 'sequential' ?
  config.sequential_config.phases.map((p, i) => 
    `- **Phase ${i+1} Agent**: ${p.name} 专家`
  ).join('\n') :
  config.autonomous_config.actions.map(a => 
    `- **${a.name} Agent**: ${a.description || a.name + ' 执行者'}`
  ).join('\n')}
`;

Write(`${skillDir}/templates/agent-base.md`, agentBase);
```

### Step 4: Autonomous 模式 - 动作目录

```javascript
if (config.execution_mode === 'autonomous' || config.execution_mode === 'hybrid') {
  const actionCatalog = `# Action Catalog

${config.display_name} 的可用动作目录。

## Available Actions

| Action | Purpose | Preconditions | Effects |
|--------|---------|---------------|---------|
${config.autonomous_config.actions.map(a => 
  `| [${a.id}](../phases/actions/${a.id}.md) | ${a.description || a.name} | ${a.preconditions?.join(', ') || '-'} | ${a.effects?.join(', ') || '-'} |`
).join('\n')}

## Action Dependencies

\`\`\`mermaid
graph TD
${config.autonomous_config.actions.map((a, i, arr) => {
  if (i === 0) return `    ${a.id.replace(/-/g, '_')}[${a.name}]`;
  const prev = arr[i-1];
  return `    ${prev.id.replace(/-/g, '_')} --> ${a.id.replace(/-/g, '_')}[${a.name}]`;
}).join('\n')}
\`\`\`

## State Transitions

| From State | Action | To State |
|------------|--------|----------|
| pending | action-init | running |
${config.autonomous_config.actions.slice(1).map(a => 
  `| running | ${a.id} | running |`
).join('\n')}
| running | action-complete | completed |
| running | action-abort | failed |

## Selection Priority

当多个动作的前置条件都满足时，按以下优先级选择：

${config.autonomous_config.actions.map((a, i) => 
  `${i + 1}. \`${a.id}\` - ${a.name}`
).join('\n')}
`;

  Write(`${skillDir}/specs/action-catalog.md`, actionCatalog);
}
```

### Step 5: 辅助函数

```javascript
function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}
```

## Output

- `specs/{skill-name}-requirements.md` - 领域规范
- `specs/quality-standards.md` - 质量标准
- `specs/action-catalog.md` - 动作目录 (Autonomous 模式)
- `templates/agent-base.md` - Agent 模板

## Next Phase

→ [Phase 5: Validation](05-validation.md)
