# Phase 1: Requirements Discovery

收集新 Skill 的需求信息，生成配置文件。

## Objective

- 收集 Skill 基本信息（名称、描述、触发词）
- 确定执行模式（Sequential / Autonomous）
- 定义阶段/动作
- 配置工具依赖和输出格式

## Execution Steps

### Step 1: 基本信息收集

```javascript
const basicInfo = await AskUserQuestion({
  questions: [
    {
      question: "新 Skill 的名称是什么？（英文，小写-连字符格式，如 'api-docs'）",
      header: "Skill 名称",
      multiSelect: false,
      options: [
        { label: "自动生成", description: "根据后续描述自动生成名称" },
        { label: "手动输入", description: "现在输入自定义名称" }
      ]
    },
    {
      question: "Skill 的主要用途是什么？",
      header: "用途类型",
      multiSelect: false,
      options: [
        { label: "文档生成", description: "生成 Markdown/HTML 文档（如手册、报告）" },
        { label: "代码分析", description: "分析代码结构、质量、安全性" },
        { label: "交互管理", description: "管理 Issue、任务、工作流（CRUD 操作）" },
        { label: "数据处理", description: "ETL、格式转换、报告生成" }
      ]
    }
  ]
});

// 如果选择手动输入，进一步询问
if (basicInfo["Skill 名称"] === "手动输入") {
  // 用户会在 "Other" 中输入
}

// 根据用途类型推断描述模板
const purposeTemplates = {
  "文档生成": "Generate {type} documents from {source}",
  "代码分析": "Analyze {target} for {purpose}",
  "交互管理": "Manage {entity} with interactive operations",
  "数据处理": "Process {data} and generate {output}"
};
```

### Step 2: 执行模式选择

```javascript
const modeInfo = await AskUserQuestion({
  questions: [
    {
      question: "选择执行模式：",
      header: "执行模式",
      multiSelect: false,
      options: [
        { 
          label: "Sequential (顺序模式)", 
          description: "阶段按固定顺序执行（收集→分析→生成），适合流水线任务（推荐）" 
        },
        { 
          label: "Autonomous (自主模式)", 
          description: "动态选择执行路径，适合交互式任务（如 Issue 管理）" 
        },
        { 
          label: "Hybrid (混合模式)", 
          description: "初始化和收尾固定，中间交互灵活" 
        }
      ]
    }
  ]
});

const executionMode = modeInfo["执行模式"].includes("Sequential") ? "sequential" :
                      modeInfo["执行模式"].includes("Autonomous") ? "autonomous" : "hybrid";
```

### Step 3: 阶段/动作定义

#### Sequential 模式

```javascript
if (executionMode === "sequential") {
  const phaseInfo = await AskUserQuestion({
    questions: [
      {
        question: "需要多少个执行阶段？",
        header: "阶段数量",
        multiSelect: false,
        options: [
          { label: "3 阶段（简单）", description: "收集 → 处理 → 输出" },
          { label: "5 阶段（标准）", description: "收集 → 探索 → 分析 → 组装 → 验证" },
          { label: "7 阶段（完整）", description: "含并行处理、汇总、迭代优化" }
        ]
      }
    ]
  });
  
  // 根据选择生成阶段定义
  const phaseTemplates = {
    "3 阶段": [
      { id: "01-collection", name: "Data Collection" },
      { id: "02-processing", name: "Processing" },
      { id: "03-output", name: "Output Generation" }
    ],
    "5 阶段": [
      { id: "01-collection", name: "Requirements Collection" },
      { id: "02-exploration", name: "Project Exploration" },
      { id: "03-analysis", name: "Deep Analysis" },
      { id: "04-assembly", name: "Document Assembly" },
      { id: "05-validation", name: "Validation" }
    ],
    "7 阶段": [
      { id: "01-collection", name: "Requirements Collection" },
      { id: "02-exploration", name: "Project Exploration" },
      { id: "03-parallel", name: "Parallel Analysis" },
      { id: "03.5-consolidation", name: "Consolidation" },
      { id: "04-assembly", name: "Document Assembly" },
      { id: "05-refinement", name: "Iterative Refinement" },
      { id: "06-output", name: "Final Output" }
    ]
  };
}
```

#### Autonomous 模式

```javascript
if (executionMode === "autonomous") {
  const actionInfo = await AskUserQuestion({
    questions: [
      {
        question: "核心动作有哪些？（可多选）",
        header: "动作定义",
        multiSelect: true,
        options: [
          { label: "初始化 (init)", description: "设置初始状态" },
          { label: "列表 (list)", description: "显示当前项目列表" },
          { label: "创建 (create)", description: "创建新项目" },
          { label: "编辑 (edit)", description: "修改现有项目" },
          { label: "删除 (delete)", description: "删除项目" },
          { label: "搜索 (search)", description: "搜索/过滤项目" }
        ]
      }
    ]
  });
}
```

### Step 4: 工具和输出配置

```javascript
const toolsInfo = await AskUserQuestion({
  questions: [
    {
      question: "需要哪些特殊工具？（基础工具已默认包含）",
      header: "工具选择",
      multiSelect: true,
      options: [
        { label: "用户交互 (AskUserQuestion)", description: "需要与用户对话" },
        { label: "Chrome 截图 (mcp__chrome__*)", description: "需要网页截图" },
        { label: "外部搜索 (mcp__exa__search)", description: "需要搜索外部信息" },
        { label: "无特殊需求", description: "仅使用基础工具" }
      ]
    },
    {
      question: "输出格式是什么？",
      header: "输出格式",
      multiSelect: false,
      options: [
        { label: "Markdown", description: "适合文档和报告" },
        { label: "HTML", description: "适合交互式文档" },
        { label: "JSON", description: "适合数据和配置" }
      ]
    }
  ]
});
```

### Step 5: 生成配置文件

```javascript
const config = {
  skill_name: skillName,
  display_name: displayName,
  description: description,
  triggers: triggers,
  execution_mode: executionMode,
  
  // 模式特定配置
  ...(executionMode === "sequential" ? {
    sequential_config: { phases: phases }
  } : {
    autonomous_config: { 
      state_schema: stateSchema,
      actions: actions,
      termination_conditions: ["user_exit", "error_limit", "task_completed"]
    }
  }),
  
  allowed_tools: [
    "Task", "Read", "Write", "Glob", "Grep", "Bash",
    ...selectedTools
  ],
  
  output: {
    format: outputFormat.toLowerCase(),
    location: `.workflow/.scratchpad/${skillName}-{timestamp}`,
    filename_pattern: `{name}-output.${outputFormat === "HTML" ? "html" : outputFormat === "JSON" ? "json" : "md"}`
  },
  
  created_at: new Date().toISOString(),
  version: "1.0.0"
};

// 写入配置文件
const workDir = `.workflow/.scratchpad/skill-gen-${timestamp}`;
Bash(`mkdir -p "${workDir}"`);
Write(`${workDir}/skill-config.json`, JSON.stringify(config, null, 2));
```

## Output

- **File**: `skill-config.json`
- **Location**: `.workflow/.scratchpad/skill-gen-{timestamp}/`
- **Format**: JSON

## Next Phase

→ [Phase 2: Structure Generation](02-structure-generation.md)
