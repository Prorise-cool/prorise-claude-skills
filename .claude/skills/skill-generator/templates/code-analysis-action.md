# Code Analysis Action Template

代码分析动作模板，用于在 Skill 中集成代码探索和分析能力。

---

## 配置结构

```typescript
interface CodeAnalysisActionConfig {
  id: string;                    // "analyze-structure", "explore-patterns"
  name: string;                  // "Code Structure Analysis"
  type: 'code-analysis';         // 动作类型标识

  // 分析范围
  scope: {
    paths: string[];             // 目标路径
    patterns: string[];          // Glob 模式
    excludes?: string[];         // 排除模式
  };

  // 分析类型
  analysis_type: 'structure' | 'patterns' | 'dependencies' | 'quality' | 'security';

  // Agent 配置
  agent: {
    type: 'Explore' | 'cli-explore-agent' | 'universal-executor';
    thoroughness: 'quick' | 'medium' | 'very thorough';
  };

  // 输出配置
  output: {
    format: 'json' | 'markdown';
    file: string;
  };

  // MCP 工具增强
  mcp_tools?: string[];          // ['mcp__ace-tool__search_context']
}
```

---

## 模板生成函数

```javascript
function generateCodeAnalysisAction(config) {
  const { id, name, scope, analysis_type, agent, output, mcp_tools = [] } = config;

  return `
# ${name}

## Action: ${id}

### 分析范围

- **路径**: ${scope.paths.join(', ')}
- **模式**: ${scope.patterns.join(', ')}
${scope.excludes ? `- **排除**: ${scope.excludes.join(', ')}` : ''}

### 执行逻辑

\`\`\`javascript
async function execute${toPascalCase(id)}(context) {
  const workDir = context.workDir;
  const results = [];

  // 1. 文件发现
  const files = await discoverFiles({
    paths: ${JSON.stringify(scope.paths)},
    patterns: ${JSON.stringify(scope.patterns)},
    excludes: ${JSON.stringify(scope.excludes || [])}
  });

  console.log(\`Found \${files.length} files to analyze\`);

  // 2. 使用 MCP 工具进行语义搜索（如果配置）
  ${mcp_tools.length > 0 ? `
  const semanticResults = await mcp__ace_tool__search_context({
    project_root_path: context.projectRoot,
    query: '${getQueryForAnalysisType(analysis_type)}'
  });
  results.push({ type: 'semantic', data: semanticResults });
  ` : '// No MCP tools configured'}

  // 3. 启动 Agent 进行深度分析
  const agentResult = await Task({
    subagent_type: '${agent.type}',
    prompt: \`
${generateAgentPrompt(analysis_type, scope)}
    \`,
    run_in_background: false
  });

  results.push({ type: 'agent', data: agentResult });

  // 4. 汇总结果
  const summary = aggregateResults(results);

  // 5. 输出结果
  const outputPath = \`\${workDir}/${output.file}\`;
  ${output.format === 'json'
    ? `Write(outputPath, JSON.stringify(summary, null, 2));`
    : `Write(outputPath, formatAsMarkdown(summary));`}

  return {
    success: true,
    output: '${output.file}',
    files_analyzed: files.length,
    analysis_type: '${analysis_type}'
  };
}
\`\`\`
`;
}

function getQueryForAnalysisType(type) {
  const queries = {
    structure: 'main entry points, module organization, exports',
    patterns: 'design patterns, abstractions, reusable components',
    dependencies: 'imports, external dependencies, coupling',
    quality: 'code complexity, test coverage, documentation',
    security: 'authentication, authorization, input validation, secrets'
  };
  return queries[type] || queries.structure;
}

function generateAgentPrompt(type, scope) {
  const prompts = {
    structure: `分析以下路径的代码结构:
${scope.paths.map(p => `- ${p}`).join('\\n')}

任务:
1. 识别主要模块和入口点
2. 分析目录组织结构
3. 提取模块间的导入导出关系
4. 生成结构概览图 (Mermaid)

输出格式: JSON
{
  "modules": [...],
  "entry_points": [...],
  "structure_diagram": "mermaid code"
}`,

    patterns: `分析以下路径的设计模式:
${scope.paths.map(p => `- ${p}`).join('\\n')}

任务:
1. 识别使用的设计模式 (Factory, Strategy, Observer 等)
2. 分析抽象层级
3. 评估模式使用的恰当性
4. 提取可复用的模式实例

输出格式: JSON
{
  "patterns": [{ "name": "...", "location": "...", "usage": "..." }],
  "abstractions": [...],
  "reusable_components": [...]
}`,

    dependencies: `分析以下路径的依赖关系:
${scope.paths.map(p => `- ${p}`).join('\\n')}

任务:
1. 提取内部模块依赖
2. 识别外部包依赖
3. 分析耦合度
4. 检测循环依赖

输出格式: JSON
{
  "internal_deps": [...],
  "external_deps": [...],
  "coupling_score": 0-100,
  "circular_deps": [...]
}`,

    quality: `分析以下路径的代码质量:
${scope.paths.map(p => `- ${p}`).join('\\n')}

任务:
1. 评估代码复杂度
2. 检查测试覆盖率
3. 分析文档完整性
4. 识别技术债务

输出格式: JSON
{
  "complexity": { "avg": 0, "max": 0, "hotspots": [...] },
  "test_coverage": { "percentage": 0, "gaps": [...] },
  "documentation": { "score": 0, "missing": [...] },
  "tech_debt": [...]
}`,

    security: `分析以下路径的安全性:
${scope.paths.map(p => `- ${p}`).join('\\n')}

任务:
1. 检查认证授权实现
2. 分析输入验证
3. 检测敏感数据处理
4. 识别常见漏洞模式

输出格式: JSON
{
  "auth": { "methods": [...], "issues": [...] },
  "input_validation": { "coverage": 0, "gaps": [...] },
  "sensitive_data": { "found": [...], "protected": true/false },
  "vulnerabilities": [{ "type": "...", "severity": "...", "location": "..." }]
}`
  };

  return prompts[type] || prompts.structure;
}
```

---

## 预置代码分析动作

### 1. 项目结构分析

```yaml
id: analyze-project-structure
name: Project Structure Analysis
type: code-analysis
scope:
  paths:
    - src/
  patterns:
    - "**/*.ts"
    - "**/*.js"
  excludes:
    - "**/node_modules/**"
    - "**/*.test.*"
analysis_type: structure
agent:
  type: Explore
  thoroughness: medium
output:
  format: json
  file: structure-analysis.json
mcp_tools:
  - mcp__ace-tool__search_context
```

### 2. 设计模式提取

```yaml
id: extract-design-patterns
name: Design Pattern Extraction
type: code-analysis
scope:
  paths:
    - src/
  patterns:
    - "**/*.ts"
analysis_type: patterns
agent:
  type: cli-explore-agent
  thoroughness: very thorough
output:
  format: markdown
  file: patterns-report.md
```

### 3. 依赖关系分析

```yaml
id: analyze-dependencies
name: Dependency Analysis
type: code-analysis
scope:
  paths:
    - src/
    - packages/
  patterns:
    - "**/package.json"
    - "**/*.ts"
analysis_type: dependencies
agent:
  type: Explore
  thoroughness: medium
output:
  format: json
  file: dependency-graph.json
```

### 4. 安全审计

```yaml
id: security-audit
name: Security Audit
type: code-analysis
scope:
  paths:
    - src/auth/
    - src/api/
  patterns:
    - "**/*.ts"
analysis_type: security
agent:
  type: universal-executor
  thoroughness: very thorough
output:
  format: json
  file: security-report.json
mcp_tools:
  - mcp__ace-tool__search_context
```

---

## 使用示例

### 在 Phase 中使用

```javascript
// phases/01-code-exploration.md

const analysisConfig = {
  id: 'explore-skill-structure',
  name: 'Skill Structure Exploration',
  type: 'code-analysis',
  scope: {
    paths: ['D:\\Claude_dms3\\.claude\\skills\\software-manual'],
    patterns: ['**/*.md'],
    excludes: ['**/node_modules/**']
  },
  analysis_type: 'structure',
  agent: {
    type: 'Explore',
    thoroughness: 'medium'
  },
  output: {
    format: 'json',
    file: 'skill-structure.json'
  }
};

// 执行
const result = await executeCodeAnalysis(analysisConfig, context);
```

### 组合多种分析

```javascript
// 串行执行多种分析
const analyses = [
  { type: 'structure', file: 'structure.json' },
  { type: 'patterns', file: 'patterns.json' },
  { type: 'dependencies', file: 'deps.json' }
];

for (const analysis of analyses) {
  await executeCodeAnalysis({
    ...baseConfig,
    analysis_type: analysis.type,
    output: { format: 'json', file: analysis.file }
  }, context);
}

// 并行执行（独立分析）
const parallelResults = await Promise.all(
  analyses.map(a => executeCodeAnalysis({
    ...baseConfig,
    analysis_type: a.type,
    output: { format: 'json', file: a.file }
  }, context))
);
```

---

## Agent 选择指南

| 分析类型 | 推荐 Agent | Thoroughness | 原因 |
|---------|-----------|--------------|------|
| structure | Explore | medium | 快速获取目录结构 |
| patterns | cli-explore-agent | very thorough | 需要深度代码理解 |
| dependencies | Explore | medium | 主要分析 import 语句 |
| quality | universal-executor | medium | 需要运行分析工具 |
| security | universal-executor | very thorough | 需要全面扫描 |

---

## MCP 工具集成

### 语义搜索增强

```javascript
// 使用 ACE 工具进行语义搜索
const semanticContext = await mcp__ace_tool__search_context({
  project_root_path: projectRoot,
  query: 'authentication logic, user session management'
});

// 将语义搜索结果作为 Agent 的输入上下文
const agentResult = await Task({
  subagent_type: 'Explore',
  prompt: `
基于以下语义搜索结果进行深度分析:

${semanticContext}

任务: 分析认证逻辑的实现细节...
  `,
  run_in_background: false
});
```

### smart_search 集成

```javascript
// 使用 smart_search 进行精确搜索
const exactMatches = await mcp__ccw_tools__smart_search({
  action: 'search',
  query: 'class.*Controller',
  mode: 'ripgrep',
  path: 'src/'
});

// 使用 find_files 发现文件
const configFiles = await mcp__ccw_tools__smart_search({
  action: 'find_files',
  pattern: '**/*.config.ts',
  path: 'src/'
});
```

---

## 结果聚合

```javascript
function aggregateResults(results) {
  const aggregated = {
    timestamp: new Date().toISOString(),
    sources: [],
    summary: {},
    details: []
  };

  for (const result of results) {
    aggregated.sources.push(result.type);

    if (result.type === 'semantic') {
      aggregated.summary.semantic_matches = result.data.length;
      aggregated.details.push({
        source: 'semantic',
        data: result.data.slice(0, 10)  // Top 10
      });
    }

    if (result.type === 'agent') {
      aggregated.summary.agent_findings = extractKeyFindings(result.data);
      aggregated.details.push({
        source: 'agent',
        data: result.data
      });
    }
  }

  return aggregated;
}

function extractKeyFindings(agentResult) {
  // 从 Agent 结果中提取关键发现
  // 实现取决于 Agent 的输出格式
  return {
    modules: agentResult.modules?.length || 0,
    patterns: agentResult.patterns?.length || 0,
    issues: agentResult.issues?.length || 0
  };
}
```

---

## 最佳实践

1. **范围控制**
   - 使用精确的 patterns 减少分析范围
   - 配置 excludes 排除无关文件

2. **Agent 选择**
   - 快速探索用 Explore
   - 深度分析用 cli-explore-agent
   - 需要执行操作用 universal-executor

3. **MCP 工具组合**
   - 先用 mcp__ace-tool__search_context 获取语义上下文
   - 再用 Agent 进行深度分析
   - 最后用 smart_search 补充精确匹配

4. **结果缓存**
   - 将分析结果持久化到 workDir
   - 后续阶段可直接读取，避免重复分析

5. **Brief Returns**
   - Agent 返回路径 + 摘要，而非完整内容
   - 避免上下文溢出
