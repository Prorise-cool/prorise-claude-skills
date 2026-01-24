# Phase 2: Structure Generation

根据配置创建 Skill 目录结构和入口文件。

## Objective

- 创建标准目录结构
- 生成 SKILL.md 入口文件
- 根据执行模式创建对应的子目录

## Input

- 依赖: `skill-config.json` (Phase 1 产出)

## Execution Steps

### Step 1: 读取配置

```javascript
const config = JSON.parse(Read(`${workDir}/skill-config.json`));
const skillDir = `.claude/skills/${config.skill_name}`;
```

### Step 2: 创建目录结构

```javascript
// 基础目录
Bash(`mkdir -p "${skillDir}/phases"`);
Bash(`mkdir -p "${skillDir}/specs"`);
Bash(`mkdir -p "${skillDir}/templates"`);

// Autonomous 模式额外目录
if (config.execution_mode === 'autonomous' || config.execution_mode === 'hybrid') {
  Bash(`mkdir -p "${skillDir}/phases/actions"`);
}

// scripts 目录（默认创建，用于存放确定性脚本）
Bash(`mkdir -p "${skillDir}/scripts"`);
```

### Step 3: 生成 SKILL.md

```javascript
const skillMdTemplate = `---
name: ${config.skill_name}
description: ${config.description}. Triggers on ${config.triggers.map(t => `"${t}"`).join(", ")}.
allowed-tools: ${config.allowed_tools.join(", ")}
---

# ${config.display_name}

${config.description}

## Architecture Overview

\`\`\`
${generateArchitectureDiagram(config)}
\`\`\`

## Key Design Principles

${generateDesignPrinciples(config)}

## Execution Flow

${generateExecutionFlow(config)}

## Directory Setup

\`\`\`javascript
const timestamp = new Date().toISOString().slice(0,19).replace(/[-:T]/g, '');
const workDir = \`${config.output.location.replace('{timestamp}', '${timestamp}')}\`;

Bash(\`mkdir -p "\${workDir}"\`);
${config.execution_mode === 'sequential' ? 
  `Bash(\`mkdir -p "\${workDir}/sections"\`);` : 
  `Bash(\`mkdir -p "\${workDir}/state"\`);`}
\`\`\`

## Output Structure

\`\`\`
${generateOutputStructure(config)}
\`\`\`

## Reference Documents

${generateReferenceTable(config)}
`;

Write(`${skillDir}/SKILL.md`, skillMdTemplate);
```

### Step 4: 架构图生成函数

```javascript
function generateArchitectureDiagram(config) {
  if (config.execution_mode === 'sequential') {
    return config.sequential_config.phases.map((p, i) => 
      `│  Phase ${i+1}: ${p.name.padEnd(15)} → ${p.output || 'output-' + (i+1) + '.json'}${' '.repeat(10)}│`
    ).join('\n│           ↓' + ' '.repeat(45) + '│\n');
  } else {
    return `
┌─────────────────────────────────────────────────────────────────┐
│           Orchestrator (状态驱动决策)                             │
└───────────────┬─────────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    ↓           ↓           ↓
${config.autonomous_config.actions.slice(0, 3).map(a => 
  `┌─────────┐  `).join('')}
${config.autonomous_config.actions.slice(0, 3).map(a => 
  `│${a.name.slice(0, 7).padEnd(7)}│  `).join('')}
${config.autonomous_config.actions.slice(0, 3).map(a => 
  `└─────────┘  `).join('')}`;
  }
}

function generateDesignPrinciples(config) {
  const common = [
    "1. **规范遵循**: 严格遵循 `_shared/SKILL-DESIGN-SPEC.md`",
    "2. **简要返回**: Agent 返回路径+摘要，避免上下文溢出"
  ];
  
  if (config.execution_mode === 'sequential') {
    return [...common,
      "3. **阶段隔离**: 每个阶段独立可测",
      "4. **链式输出**: 阶段产出作为下阶段输入"
    ].join('\n');
  } else {
    return [...common,
      "3. **状态驱动**: 显式状态管理，动态决策",
      "4. **动作独立**: 每个动作无副作用依赖"
    ].join('\n');
  }
}

function generateExecutionFlow(config) {
  if (config.execution_mode === 'sequential') {
    return '```\n' + config.sequential_config.phases.map((p, i) => 
      `├─ Phase ${i+1}: ${p.name}\n│  → Output: ${p.output || 'output.json'}`
    ).join('\n') + '\n```';
  } else {
    return `\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Orchestrator Loop                                               │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                 │
│  │ Read     │────▶│ Select   │────▶│ Execute  │                 │
│  │ State    │     │ Action   │     │ Action   │                 │
│  └──────────┘     └──────────┘     └──────────┘                 │
│       ▲                                  │                       │
│       └──────────── Update State ◀───────┘                       │
└─────────────────────────────────────────────────────────────────┘
\`\`\``;
  }
}

function generateOutputStructure(config) {
  const base = `${config.output.location}/
├── ${config.execution_mode === 'sequential' ? 'sections/' : 'state.json'}`;
  
  if (config.execution_mode === 'sequential') {
    return base + '\n' + config.sequential_config.phases.map(p => 
      `│   └── ${p.output || 'section-' + p.id + '.md'}`
    ).join('\n') + `\n└── ${config.output.filename_pattern}`;
  } else {
    return base + `
├── actions-log.json
└── ${config.output.filename_pattern}`;
  }
}

function generateReferenceTable(config) {
  const rows = [];
  
  if (config.execution_mode === 'sequential') {
    config.sequential_config.phases.forEach(p => {
      rows.push(`| [phases/${p.id}.md](phases/${p.id}.md) | ${p.name} |`);
    });
  } else {
    rows.push(`| [phases/orchestrator.md](phases/orchestrator.md) | 编排器 |`);
    rows.push(`| [phases/state-schema.md](phases/state-schema.md) | 状态定义 |`);
    config.autonomous_config.actions.forEach(a => {
      rows.push(`| [phases/actions/${a.id}.md](phases/actions/${a.id}.md) | ${a.name} |`);
    });
  }
  
  rows.push(`| [specs/${config.skill_name}-requirements.md](specs/${config.skill_name}-requirements.md) | 领域规范 |`);
  rows.push(`| [specs/quality-standards.md](specs/quality-standards.md) | 质量标准 |`);
  
  return `| Document | Purpose |\n|----------|---------||\n` + rows.join('\n');
}
```

## Output

- **Directory**: `.claude/skills/{skill-name}/`
- **Files**:
  - `SKILL.md` (入口文件)
  - `phases/` (执行阶段目录)
  - `specs/` (规范文档目录)
  - `templates/` (模板目录)
  - `scripts/` (脚本目录，存放 Python/Bash 确定性脚本)

## Next Phase

→ [Phase 3: Phase Generation](03-phase-generation.md)
