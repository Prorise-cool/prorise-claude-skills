# Skill Requirements Specification

新 Skill 创建的需求收集规范。

---

## 必需信息

### 1. 基本信息

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `skill_name` | string | ✓ | Skill 标识符（小写-连字符） |
| `display_name` | string | ✓ | 显示名称 |
| `description` | string | ✓ | 一句话描述 |
| `triggers` | string[] | ✓ | 触发关键词列表 |

### 2. 执行模式

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `execution_mode` | enum | ✓ | `sequential` \| `autonomous` \| `hybrid` |
| `phase_count` | number | 条件 | Sequential 模式下的阶段数 |
| `action_count` | number | 条件 | Autonomous 模式下的动作数 |

### 2.5 上下文策略 (P0 增强)

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `context_strategy` | enum | ✓ | `file` \| `memory` |

**策略对比**:

| 策略 | 持久化 | 可调试 | 可恢复 | 适用场景 |
|------|--------|--------|--------|----------|
| `file` | ✓ | ✓ | ✓ | 复杂多阶段任务（推荐） |
| `memory` | ✗ | ✗ | ✗ | 简单线性任务 |

### 2.6 LLM 集成配置 (P1 增强)

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `llm_integration` | object | 可选 | LLM 调用配置 |
| `llm_integration.enabled` | boolean | - | 是否启用 LLM 调用 |
| `llm_integration.default_tool` | enum | - | `gemini` \| `qwen` \| `codex` |
| `llm_integration.fallback_chain` | string[] | - | 失败时的备选工具链 |

### 3. 工具依赖

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `allowed_tools` | string[] | ✓ | 允许使用的工具列表 |
| `mcp_tools` | string[] | 可选 | 需要的 MCP 工具 |

### 4. 输出配置

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `output_format` | enum | ✓ | `markdown` \| `html` \| `json` |
| `output_location` | string | ✓ | 输出目录模式 |

---

## 配置文件结构

```typescript
interface SkillConfig {
  // 基本信息
  skill_name: string;           // "my-skill"
  display_name: string;         // "My Skill"
  description: string;          // "一句话描述"
  triggers: string[];           // ["keyword1", "keyword2"]
  
  // 执行模式
  execution_mode: 'sequential' | 'autonomous' | 'hybrid';

  // 上下文策略 (P0 增强)
  context_strategy: 'file' | 'memory';  // 默认: 'file'

  // LLM 集成配置 (P1 增强)
  llm_integration?: {
    enabled: boolean;                    // 是否启用 LLM 调用
    default_tool: 'gemini' | 'qwen' | 'codex';
    fallback_chain: string[];            // ['gemini', 'qwen', 'codex']
    mode: 'analysis' | 'write';          // 默认 mode
  };

  // Sequential 模式配置
  sequential_config?: {
    phases: Array<{
      id: string;               // "01-init"
      name: string;             // "Initialization"
      description: string;      // "收集初始配置"
      input: string[];          // 输入依赖
      output: string;           // 输出文件
    }>;
  };
  
  // Autonomous 模式配置
  autonomous_config?: {
    state_schema: {
      fields: Array<{
        name: string;
        type: string;
        description: string;
      }>;
    };
    actions: Array<{
      id: string;               // "action-init"
      name: string;             // "Initialize"
      description: string;      // "初始化状态"
      preconditions: string[];  // 前置条件
      effects: string[];        // 执行效果
    }>;
    termination_conditions: string[];
  };
  
  // 工具依赖
  allowed_tools: string[];      // ["Task", "Read", "Write", ...]
  mcp_tools?: string[];         // ["mcp__chrome__*"]
  
  // 输出配置
  output: {
    format: 'markdown' | 'html' | 'json';
    location: string;           // ".workflow/.scratchpad/{skill}-{timestamp}"
    filename_pattern: string;   // "{name}-output.{ext}"
  };
  
  // 质量配置
  quality?: {
    dimensions: string[];       // ["completeness", "consistency", ...]
    pass_threshold: number;     // 80
  };
  
  // 元数据
  created_at: string;
  version: string;
}
```

---

## 需求收集问题

### Phase 1: 基本信息

```javascript
AskUserQuestion({
  questions: [
    {
      question: "Skill 的名称是什么？（英文，小写-连字符格式）",
      header: "Skill 名称",
      multiSelect: false,
      options: [
        { label: "自动生成", description: "根据描述自动生成名称" },
        { label: "手动输入", description: "输入自定义名称" }
      ]
    },
    {
      question: "Skill 的主要用途是什么？",
      header: "用途类型",
      multiSelect: false,
      options: [
        { label: "文档生成", description: "生成 Markdown/HTML 文档" },
        { label: "代码分析", description: "分析代码结构、质量、安全" },
        { label: "交互管理", description: "管理 Issue、任务、工作流" },
        { label: "数据处理", description: "ETL、转换、报告生成" },
        { label: "自定义", description: "其他用途" }
      ]
    }
  ]
});
```

### Phase 2: 执行模式

```javascript
AskUserQuestion({
  questions: [
    {
      question: "选择执行模式：",
      header: "执行模式",
      multiSelect: false,
      options: [
        { 
          label: "Sequential (顺序)", 
          description: "阶段按固定顺序执行，适合流水线任务（推荐）" 
        },
        { 
          label: "Autonomous (自主)", 
          description: "动态选择执行路径，适合交互式任务" 
        },
        { 
          label: "Hybrid (混合)", 
          description: "初始化和收尾固定，中间交互灵活" 
        }
      ]
    }
  ]
});
```

### Phase 3: 阶段/动作定义

#### Sequential 模式

```javascript
AskUserQuestion({
  questions: [
    {
      question: "需要多少个执行阶段？",
      header: "阶段数量",
      multiSelect: false,
      options: [
        { label: "3 阶段", description: "简单: 收集 → 处理 → 输出" },
        { label: "5 阶段", description: "标准: 收集 → 探索 → 分析 → 组装 → 验证" },
        { label: "7 阶段", description: "完整: 包含并行处理和迭代优化" },
        { label: "自定义", description: "手动指定阶段" }
      ]
    }
  ]
});
```

#### Autonomous 模式

```javascript
AskUserQuestion({
  questions: [
    {
      question: "核心动作有哪些？",
      header: "动作定义",
      multiSelect: true,
      options: [
        { label: "初始化 (init)", description: "设置初始状态" },
        { label: "列表 (list)", description: "显示当前项目" },
        { label: "创建 (create)", description: "创建新项目" },
        { label: "编辑 (edit)", description: "修改现有项目" },
        { label: "删除 (delete)", description: "删除项目" },
        { label: "完成 (complete)", description: "完成任务" }
      ]
    }
  ]
});
```

### Phase 4: 上下文策略 (P0 增强)

```javascript
AskUserQuestion({
  questions: [
    {
      question: "选择上下文管理策略：",
      header: "上下文策略",
      multiSelect: false,
      options: [
        {
          label: "文件策略 (file)",
          description: "持久化到 .scratchpad，支持调试和恢复（推荐）"
        },
        {
          label: "内存策略 (memory)",
          description: "仅在运行时保持，速度快但无法恢复"
        }
      ]
    }
  ]
});
```

### Phase 5: LLM 集成 (P1 增强)

```javascript
AskUserQuestion({
  questions: [
    {
      question: "是否需要 LLM 调用能力？",
      header: "LLM 集成",
      multiSelect: false,
      options: [
        {
          label: "启用 LLM 调用",
          description: "使用 gemini/qwen/codex 进行分析或生成"
        },
        {
          label: "不需要",
          description: "仅使用本地工具"
        }
      ]
    }
  ]
});

// 如果启用 LLM
if (llmEnabled) {
  AskUserQuestion({
    questions: [
      {
        question: "选择默认 LLM 工具：",
        header: "LLM 工具",
        multiSelect: false,
        options: [
          { label: "Gemini", description: "大上下文，适合分析任务（推荐）" },
          { label: "Qwen", description: "代码生成能力强" },
          { label: "Codex", description: "自主执行能力强，适合实现任务" }
        ]
      }
    ]
  });
}
```

### Phase 6: 工具依赖

```javascript
AskUserQuestion({
  questions: [
    {
      question: "需要哪些工具？",
      header: "工具选择",
      multiSelect: true,
      options: [
        { label: "基础工具", description: "Task, Read, Write, Glob, Grep, Bash" },
        { label: "用户交互", description: "AskUserQuestion" },
        { label: "Chrome 截图", description: "mcp__chrome__*" },
        { label: "外部搜索", description: "mcp__exa__search" },
        { label: "CCW CLI 调用", description: "ccw cli (gemini/qwen/codex)" }
      ]
    }
  ]
});
```

---

## 验证规则

### 名称验证

```javascript
function validateSkillName(name) {
  const rules = [
    { test: /^[a-z][a-z0-9-]*$/, msg: "必须以小写字母开头，只包含小写字母、数字、连字符" },
    { test: /^.{3,30}$/, msg: "长度 3-30 字符" },
    { test: /^(?!.*--)/, msg: "不能有连续连字符" },
    { test: /[^-]$/, msg: "不能以连字符结尾" }
  ];
  
  for (const rule of rules) {
    if (!rule.test.test(name)) {
      return { valid: false, error: rule.msg };
    }
  }
  return { valid: true };
}
```

### 配置验证

```javascript
function validateSkillConfig(config) {
  const errors = [];
  
  // 必需字段
  if (!config.skill_name) errors.push("缺少 skill_name");
  if (!config.description) errors.push("缺少 description");
  if (!config.execution_mode) errors.push("缺少 execution_mode");
  
  // 模式特定验证
  if (config.execution_mode === 'sequential') {
    if (!config.sequential_config?.phases?.length) {
      errors.push("Sequential 模式需要定义 phases");
    }
  } else if (config.execution_mode === 'autonomous') {
    if (!config.autonomous_config?.actions?.length) {
      errors.push("Autonomous 模式需要定义 actions");
    }
  }
  
  return { valid: errors.length === 0, errors };
}
```

---

## 示例配置

### Sequential 模式示例 (增强版)

```json
{
  "skill_name": "api-docs-generator",
  "display_name": "API Docs Generator",
  "description": "Generate API documentation from source code",
  "triggers": ["generate api docs", "api documentation"],
  "execution_mode": "sequential",
  "context_strategy": "file",
  "llm_integration": {
    "enabled": true,
    "default_tool": "gemini",
    "fallback_chain": ["gemini", "qwen"],
    "mode": "analysis"
  },
  "sequential_config": {
    "phases": [
      {
        "id": "01-scan",
        "name": "Code Scanning",
        "output": "endpoints.json",
        "agent": { "type": "universal-executor", "run_in_background": false }
      },
      {
        "id": "02-analyze",
        "name": "LLM Analysis",
        "output": "analysis.json",
        "agent": { "type": "llm", "tool": "gemini", "mode": "analysis" }
      },
      {
        "id": "03-generate",
        "name": "Doc Generation",
        "output": "api-docs.md",
        "agent": { "type": "universal-executor", "run_in_background": false }
      }
    ]
  },
  "allowed_tools": ["Task", "Read", "Write", "Glob", "Grep", "Bash"],
  "output": {
    "format": "markdown",
    "location": ".workflow/.scratchpad/api-docs-{timestamp}",
    "filename_pattern": "{name}-api-docs.md"
  }
}
```

### Autonomous 模式示例

```json
{
  "skill_name": "task-manager",
  "display_name": "Task Manager",
  "description": "Interactive task management with CRUD operations",
  "triggers": ["manage tasks", "task list", "create task"],
  "execution_mode": "autonomous",
  "autonomous_config": {
    "state_schema": {
      "fields": [
        { "name": "tasks", "type": "Task[]", "description": "任务列表" },
        { "name": "current_view", "type": "string", "description": "当前视图" }
      ]
    },
    "actions": [
      { "id": "action-list", "name": "List Tasks", "preconditions": [], "effects": ["显示任务列表"] },
      { "id": "action-create", "name": "Create Task", "preconditions": [], "effects": ["添加新任务"] },
      { "id": "action-edit", "name": "Edit Task", "preconditions": ["task_selected"], "effects": ["更新任务"] },
      { "id": "action-delete", "name": "Delete Task", "preconditions": ["task_selected"], "effects": ["删除任务"] }
    ],
    "termination_conditions": ["user_exit", "error_limit"]
  },
  "allowed_tools": ["Task", "AskUserQuestion", "Read", "Write"],
  "output": {
    "format": "json",
    "location": ".workflow/.scratchpad/tasks",
    "filename_pattern": "tasks.json"
  }
}
```
