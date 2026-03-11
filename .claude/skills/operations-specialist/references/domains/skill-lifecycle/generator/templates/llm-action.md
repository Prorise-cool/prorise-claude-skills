# LLM Action Template

LLM 动作模板，用于在 Skill 中集成 LLM 调用能力。

---

## 配置结构

```typescript
interface LLMActionConfig {
  id: string;                    // "llm-analyze", "llm-generate"
  name: string;                  // "LLM Analysis"
  type: 'llm';                   // 动作类型标识

  // LLM 工具配置
  tool: {
    primary: 'gemini' | 'qwen' | 'codex';
    fallback_chain: string[];    // ['gemini', 'qwen', 'codex']
  };

  // 执行模式
  mode: 'analysis' | 'write';

  // 提示词配置
  prompt: {
    template: string;            // 提示词模板路径或内联
    variables: string[];         // 需要替换的变量
  };

  // 输入输出
  input: string[];               // 依赖的上下文文件
  output: string;                // 输出文件路径

  // 超时配置
  timeout?: number;              // 毫秒，默认 600000 (10min)
}
```

---

## 模板生成函数

```javascript
function generateLLMAction(config) {
  const { id, name, tool, mode, prompt, input, output, timeout = 600000 } = config;

  return `
# ${name}

## Action: ${id}

### 执行逻辑

\`\`\`javascript
async function execute${toPascalCase(id)}(context) {
  const workDir = context.workDir;
  const state = context.state;

  // 1. 收集输入上下文
  const inputContext = ${JSON.stringify(input)}.map(f => {
    const path = \`\${workDir}/\${f}\`;
    return Read(path);
  }).join('\\n\\n---\\n\\n');

  // 2. 构建提示词
  const promptTemplate = \`${prompt.template}\`;
  const finalPrompt = promptTemplate
    ${prompt.variables.map(v => `.replace('{{${v}}}', context.${v} || '')`).join('\n    ')};

  // 3. 执行 LLM 调用 (带 fallback)
  const tools = ['${tool.primary}', ${tool.fallback_chain.map(t => `'${t}'`).join(', ')}];
  let result = null;
  let usedTool = null;

  for (const t of tools) {
    try {
      result = await callLLM(t, finalPrompt, '${mode}', ${timeout});
      usedTool = t;
      break;
    } catch (error) {
      console.log(\`\${t} failed: \${error.message}, trying next...\`);
    }
  }

  if (!result) {
    throw new Error('All LLM tools failed');
  }

  // 4. 保存结果
  Write(\`\${workDir}/${output}\`, result);

  // 5. 更新状态
  state.llm_calls = (state.llm_calls || 0) + 1;
  state.last_llm_tool = usedTool;

  return {
    success: true,
    output: '${output}',
    tool_used: usedTool
  };
}

// LLM 调用封装
async function callLLM(tool, prompt, mode, timeout) {
  const modeFlag = mode === 'write' ? '--mode write' : '--mode analysis';

  // 使用 CCW CLI 统一接口
  const command = \`ccw cli -p "\${escapePrompt(prompt)}" --tool \${tool} \${modeFlag}\`;

  const result = Bash({
    command,
    timeout,
    run_in_background: true  // 异步执行
  });

  // 等待完成
  return await waitForResult(result.task_id, timeout);
}

function escapePrompt(prompt) {
  // 转义双引号和特殊字符
  return prompt.replace(/"/g, '\\\\"').replace(/\$/g, '\\\\$');
}
\`\`\`

### Prompt 模板

\`\`\`
${prompt.template}
\`\`\`

### 变量说明

${prompt.variables.map(v => `- \`{{${v}}}\`: ${v} 变量`).join('\n')}
`;
}

function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}
```

---

## 预置 LLM 动作模板

### 1. 代码分析动作

```yaml
id: llm-code-analysis
name: LLM Code Analysis
type: llm
tool:
  primary: gemini
  fallback_chain: [qwen]
mode: analysis
prompt:
  template: |
    PURPOSE: 分析代码结构和模式，提取关键设计特征
    TASK:
    • 识别主要模块和组件
    • 分析依赖关系
    • 提取设计模式
    • 评估代码质量
    MODE: analysis
    CONTEXT: {{code_context}}
    EXPECTED: JSON 格式的分析报告，包含 modules, dependencies, patterns, quality_score
    RULES: $(cat ~/.claude/workflows/cli-templates/protocols/analysis-protocol.md)
  variables:
    - code_context
input:
  - collected-code.md
output: analysis-report.json
timeout: 900000
```

### 2. 文档生成动作

```yaml
id: llm-doc-generation
name: LLM Documentation Generation
type: llm
tool:
  primary: gemini
  fallback_chain: [qwen, codex]
mode: write
prompt:
  template: |
    PURPOSE: 根据分析结果生成高质量文档
    TASK:
    • 基于分析报告生成文档大纲
    • 填充各章节内容
    • 添加代码示例和说明
    • 生成 Mermaid 图表
    MODE: write
    CONTEXT: {{analysis_report}}
    EXPECTED: 完整的 Markdown 文档，包含目录、章节、图表
    RULES: $(cat ~/.claude/workflows/cli-templates/protocols/write-protocol.md)
  variables:
    - analysis_report
input:
  - analysis-report.json
output: generated-doc.md
timeout: 1200000
```

### 3. 代码重构建议动作

```yaml
id: llm-refactor-suggest
name: LLM Refactoring Suggestions
type: llm
tool:
  primary: codex
  fallback_chain: [gemini]
mode: analysis
prompt:
  template: |
    PURPOSE: 分析代码并提供重构建议
    TASK:
    • 识别代码异味 (code smells)
    • 评估复杂度热点
    • 提出具体重构方案
    • 估算重构影响范围
    MODE: analysis
    CONTEXT: {{source_code}}
    EXPECTED: 重构建议列表，每项包含 location, issue, suggestion, impact
    RULES: $(cat ~/.claude/workflows/cli-templates/protocols/analysis-protocol.md)
  variables:
    - source_code
input:
  - source-files.md
output: refactor-suggestions.json
timeout: 600000
```

---

## 使用示例

### 在 Phase 中使用 LLM 动作

```javascript
// phases/02-llm-analysis.md

const llmConfig = {
  id: 'llm-analyze-skill',
  name: 'Skill Pattern Analysis',
  type: 'llm',
  tool: {
    primary: 'gemini',
    fallback_chain: ['qwen']
  },
  mode: 'analysis',
  prompt: {
    template: `
PURPOSE: 分析现有 Skill 的设计模式
TASK:
• 提取 Skill 结构规范
• 识别 Phase 组织模式
• 分析 Agent 调用模式
MODE: analysis
CONTEXT: {{skill_source}}
EXPECTED: 结构化的设计模式分析
`,
    variables: ['skill_source']
  },
  input: ['collected-skills.md'],
  output: 'skill-patterns.json'
};

// 执行
const result = await executeLLMAction(llmConfig, {
  workDir: '.workflow/.scratchpad/skill-gen-xxx',
  skill_source: Read('.workflow/.scratchpad/skill-gen-xxx/collected-skills.md')
});
```

### 在 Orchestrator 中调度 LLM 动作

```javascript
// autonomous-orchestrator 中的 LLM 动作调度

const actions = [
  { type: 'collect', priority: 100 },
  { type: 'llm', id: 'llm-analyze', priority: 90 },  // LLM 分析
  { type: 'process', priority: 80 },
  { type: 'llm', id: 'llm-generate', priority: 70 }, // LLM 生成
  { type: 'validate', priority: 60 }
];

for (const action of sortByPriority(actions)) {
  if (action.type === 'llm') {
    const llmResult = await executeLLMAction(
      getLLMConfig(action.id),
      context
    );
    context.state[action.id] = llmResult;
  }
}
```

---

## 错误处理

```javascript
async function executeLLMActionWithRetry(config, context, maxRetries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await executeLLMAction(config, context);
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      // 指数退避
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }

  // 所有重试失败
  return {
    success: false,
    error: lastError.message,
    fallback: 'manual_review_required'
  };
}
```

---

## 最佳实践

1. **选择合适的工具**
   - 分析任务：Gemini（大上下文）> Qwen
   - 生成任务：Codex（自主执行）> Gemini > Qwen
   - 代码修改：Codex > Gemini

2. **配置 Fallback Chain**
   - 总是配置至少一个 fallback
   - 考虑工具特性选择 fallback 顺序

3. **超时设置**
   - 分析任务：10-15 分钟
   - 生成任务：15-20 分钟
   - 复杂任务：20-60 分钟

4. **提示词设计**
   - 使用 PURPOSE/TASK/MODE/CONTEXT/EXPECTED/RULES 结构
   - 引用标准协议模板
   - 明确输出格式要求
