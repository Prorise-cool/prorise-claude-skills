# CLI Integration Specification

CCW CLI 集成规范，定义 Skill 中如何正确调用外部 CLI 工具。

---

## 执行模式

### 1. 同步执行 (Blocking)

适用于需要立即获取结果的场景。

```javascript
// Agent 调用 - 同步
const result = Task({
  subagent_type: 'universal-executor',
  prompt: '执行任务...',
  run_in_background: false  // 关键: 同步执行
});

// 结果立即可用
console.log(result);
```

### 2. 异步执行 (Background)

适用于长时间运行的 CLI 命令。

```javascript
// CLI 调用 - 异步
const task = Bash({
  command: 'ccw cli -p "..." --tool gemini --mode analysis',
  run_in_background: true  // 关键: 后台执行
});

// 立即返回，不等待结果
// task.task_id 可用于后续查询
```

---

## CCW CLI 调用规范

### 基础命令结构

```bash
ccw cli -p "<PROMPT>" --tool <gemini|qwen|codex> --mode <analysis|write>
```

### 参数说明

| 参数 | 必需 | 说明 |
|------|------|------|
| `-p "<prompt>"` | ✓ | 提示词（使用双引号） |
| `--tool <tool>` | ✓ | 工具选择: gemini, qwen, codex |
| `--mode <mode>` | ✓ | 执行模式: analysis, write |
| `--cd <path>` | - | 工作目录 |
| `--includeDirs <dirs>` | - | 包含额外目录（逗号分隔） |
| `--resume [id]` | - | 恢复会话 |

### 模式选择

```
┌─ 分析/文档任务?
│  └─→ --mode analysis (只读)
│
└─ 实现/修改任务?
   └─→ --mode write (读写)
```

---

## Agent 类型与选择

### universal-executor

通用执行器，最常用的 Agent 类型。

```javascript
Task({
  subagent_type: 'universal-executor',
  prompt: `
执行任务:
1. 读取配置文件
2. 分析依赖关系
3. 生成报告到 ${outputPath}
  `,
  run_in_background: false
});
```

**适用场景**:
- 多步骤任务执行
- 文件操作（读/写/编辑）
- 需要工具调用的任务

### Explore

代码探索 Agent，快速理解代码库。

```javascript
Task({
  subagent_type: 'Explore',
  prompt: `
探索 src/ 目录:
- 识别主要模块
- 理解目录结构
- 找到入口点

Thoroughness: medium
  `,
  run_in_background: false
});
```

**适用场景**:
- 代码库探索
- 文件发现
- 结构理解

### cli-explore-agent

深度代码分析 Agent。

```javascript
Task({
  subagent_type: 'cli-explore-agent',
  prompt: `
深度分析 src/auth/ 模块:
- 认证流程
- 会话管理
- 安全机制
  `,
  run_in_background: false
});
```

**适用场景**:
- 深度代码理解
- 设计模式识别
- 复杂逻辑分析

---

## 会话管理

### 会话恢复

```javascript
// 保存会话 ID
const session = Bash({
  command: 'ccw cli -p "初始分析..." --tool gemini --mode analysis',
  run_in_background: true
});

// 后续恢复
const continuation = Bash({
  command: `ccw cli -p "继续分析..." --tool gemini --mode analysis --resume ${session.id}`,
  run_in_background: true
});
```

### 多会话合并

```javascript
// 合并多个会话的上下文
const merged = Bash({
  command: `ccw cli -p "汇总分析..." --tool gemini --mode analysis --resume ${id1},${id2}`,
  run_in_background: true
});
```

---

## Skill 中的 CLI 集成模式

### 模式 1: 单次调用

简单任务，一次调用完成。

```javascript
// Phase 执行
async function executePhase(context) {
  const result = Bash({
    command: `ccw cli -p "
PURPOSE: 分析项目结构
TASK: 识别模块、依赖、入口点
MODE: analysis
CONTEXT: @src/**/*
EXPECTED: JSON 格式的结构报告
" --tool gemini --mode analysis --cd ${context.projectRoot}`,
    run_in_background: true,
    timeout: 600000
  });

  // 等待完成
  return await waitForCompletion(result.task_id);
}
```

### 模式 2: 链式调用

多步骤任务，每步依赖前一步结果。

```javascript
async function executeChain(context) {
  // Step 1: 收集
  const collectId = await runCLI('collect', context);

  // Step 2: 分析 (依赖 Step 1)
  const analyzeId = await runCLI('analyze', context, `--resume ${collectId}`);

  // Step 3: 生成 (依赖 Step 2)
  const generateId = await runCLI('generate', context, `--resume ${analyzeId}`);

  return generateId;
}

async function runCLI(step, context, resumeFlag = '') {
  const prompts = {
    collect: 'PURPOSE: 收集代码文件...',
    analyze: 'PURPOSE: 分析代码模式...',
    generate: 'PURPOSE: 生成文档...'
  };

  const result = Bash({
    command: `ccw cli -p "${prompts[step]}" --tool gemini --mode analysis ${resumeFlag}`,
    run_in_background: true
  });

  return await waitForCompletion(result.task_id);
}
```

### 模式 3: 并行调用

独立任务并行执行。

```javascript
async function executeParallel(context) {
  const tasks = [
    { type: 'structure', tool: 'gemini' },
    { type: 'dependencies', tool: 'gemini' },
    { type: 'patterns', tool: 'qwen' }
  ];

  // 并行启动
  const taskIds = tasks.map(task =>
    Bash({
      command: `ccw cli -p "分析 ${task.type}..." --tool ${task.tool} --mode analysis`,
      run_in_background: true
    }).task_id
  );

  // 等待全部完成
  const results = await Promise.all(
    taskIds.map(id => waitForCompletion(id))
  );

  return results;
}
```

### 模式 4: Fallback 链

工具失败时自动切换。

```javascript
async function executeWithFallback(context) {
  const tools = ['gemini', 'qwen', 'codex'];
  let result = null;

  for (const tool of tools) {
    try {
      result = await runWithTool(tool, context);
      if (result.success) break;
    } catch (error) {
      console.log(`${tool} failed, trying next...`);
    }
  }

  if (!result?.success) {
    throw new Error('All tools failed');
  }

  return result;
}

async function runWithTool(tool, context) {
  const task = Bash({
    command: `ccw cli -p "..." --tool ${tool} --mode analysis`,
    run_in_background: true,
    timeout: 600000
  });

  return await waitForCompletion(task.task_id);
}
```

---

## 提示词模板集成

### 引用协议模板

```bash
# Analysis mode - use --rule to auto-load protocol and template (appended to prompt)
ccw cli -p "
CONSTRAINTS: ...
..." --tool gemini --mode analysis --rule analysis-code-patterns

# Write mode - use --rule to auto-load protocol and template (appended to prompt)
ccw cli -p "
CONSTRAINTS: ...
..." --tool codex --mode write --rule development-feature
```

### 动态模板构建

```javascript
function buildPrompt(config) {
  const { purpose, task, mode, context, expected, constraints } = config;

  return `
PURPOSE: ${purpose}
TASK: ${task.map(t => `• ${t}`).join('\n')}
MODE: ${mode}
CONTEXT: ${context}
EXPECTED: ${expected}
CONSTRAINTS: ${constraints || ''}
`; // Use --rule option to auto-append protocol + template
}
```

---

## 超时配置

### 推荐超时值

| 任务类型 | 超时 (ms) | 说明 |
|---------|----------|------|
| 快速分析 | 300000 | 5 分钟 |
| 标准分析 | 600000 | 10 分钟 |
| 深度分析 | 1200000 | 20 分钟 |
| 代码生成 | 1800000 | 30 分钟 |
| 复杂任务 | 3600000 | 60 分钟 |

### Codex 特殊处理

Codex 需要更长的超时时间（建议 3x）。

```javascript
const timeout = tool === 'codex' ? baseTimeout * 3 : baseTimeout;

Bash({
  command: `ccw cli -p "..." --tool ${tool} --mode write`,
  run_in_background: true,
  timeout: timeout
});
```

---

## 错误处理

### 常见错误

| 错误 | 原因 | 处理 |
|------|------|------|
| ETIMEDOUT | 网络超时 | 重试或切换工具 |
| Exit code 1 | 命令执行失败 | 检查参数，切换工具 |
| Context overflow | 上下文过大 | 减少输入范围 |

### 重试策略

```javascript
async function executeWithRetry(command, maxRetries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const task = Bash({
        command,
        run_in_background: true,
        timeout: 600000
      });

      return await waitForCompletion(task.task_id);
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      // 指数退避
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }

  throw lastError;
}
```

---

## 最佳实践

### 1. run_in_background 规则

```
Agent 调用 (Task):
  run_in_background: false  → 同步，立即获取结果

CLI 调用 (Bash + ccw cli):
  run_in_background: true   → 异步，后台执行
```

### 2. 工具选择

```
分析任务: gemini > qwen
生成任务: codex > gemini > qwen
代码修改: codex > gemini
```

### 3. 会话管理

- 相关任务使用 `--resume` 保持上下文
- 独立任务不使用 `--resume`

### 4. Prompt Specification

- Always use PURPOSE/TASK/MODE/CONTEXT/EXPECTED/CONSTRAINTS structure
- Use `--rule <template>` to auto-append protocol + template to prompt
- Template name format: `category-function` (e.g., `analysis-code-patterns`)

### 5. 结果处理

- 持久化重要结果到 workDir
- Brief returns: 路径 + 摘要，避免上下文溢出
- JSON 格式便于后续处理
