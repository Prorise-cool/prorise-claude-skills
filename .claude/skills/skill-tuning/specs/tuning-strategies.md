# Tuning Strategies

Detailed fix strategies for each problem category with implementation guidance.

## When to Use

| Phase | Usage | Section |
|-------|-------|---------|
| action-propose-fixes | Strategy selection | Strategy Details |
| action-apply-fix | Implementation guidance | Implementation |
| action-verify | Verification steps | Verification |

---

## Authoring Principles Strategies (P0 - 首要准则)

> **核心原则**：简洁高效 → 去除无关存储 → 去除中间存储 → 上下文流转

### Strategy: eliminate_intermediate_files

**Purpose**: 删除所有中间文件，改用上下文流转。

**Implementation**:
```javascript
// Before: 中间文件
async function process() {
  const step1 = await analyze();
  Write(`${workDir}/step1.json`, JSON.stringify(step1));

  const step1Data = JSON.parse(Read(`${workDir}/step1.json`));
  const step2 = await transform(step1Data);
  Write(`${workDir}/step2.json`, JSON.stringify(step2));

  const step2Data = JSON.parse(Read(`${workDir}/step2.json`));
  return finalize(step2Data);
}

// After: 上下文流转
async function process() {
  const step1 = await analyze();
  const step2 = await transform(step1);  // 直接传递
  return finalize(step2);  // 只返回最终结果
}
```

**Risk**: Low
**Verification**: `ls ${workDir}` 无 temp/intermediate 文件

---

### Strategy: minimize_state

**Purpose**: 精简 State schema 至必要字段。

**Implementation**:
```typescript
// Before: 膨胀的 State
interface State {
  status: string;
  target: TargetInfo;
  user_input: string;
  parsed_input: ParsedInput;      // 删除 - 只在处理时用
  intermediate_result: any;       // 删除 - 中间结果
  debug_info: DebugInfo;          // 删除 - 调试信息
  analysis_cache: any;            // 删除 - 缓存
  full_history: HistoryEntry[];   // 删除 - 无限增长
  step1_output: any;              // 删除 - 中间输出
  step2_output: any;              // 删除 - 中间输出
  final_result: FinalResult;
}

// After: 精简的 State
interface State {
  status: 'pending' | 'running' | 'completed' | 'failed';
  target: { name: string; path: string };
  result_path: string;            // 最终结果路径
  error?: string;                 // 仅失败时有
}
```

**Rules**:
- State 字段 ≤ 15 个
- 删除所有 `debug_*`, `*_cache`, `*_temp` 字段
- `*_history` 数组设置上限或改用滚动窗口

**Risk**: Medium (需确保不丢失必要数据)
**Verification**: Count state fields ≤ 15

---

### Strategy: context_passing

**Purpose**: 用函数参数/返回值代替文件中转。

**Implementation**:
```javascript
// 上下文流转模式
async function executeWorkflow(initialContext) {
  let ctx = initialContext;

  // Phase 1: 直接传递上下文
  ctx = await executePhase1(ctx);

  // Phase 2: 继续传递
  ctx = await executePhase2(ctx);

  // Phase 3: 最终处理
  const result = await executePhase3(ctx);

  // 只存最终结果
  Write(`${ctx.workDir}/result.json`, JSON.stringify(result));

  return result;
}

// Phase 函数模板
async function executePhaseN(ctx) {
  const { previousResult, constraints } = ctx;

  const result = await Task({
    prompt: `
      [CONTEXT]
      ${JSON.stringify(previousResult)}

      [TASK]
      Process and return result.
    `
  });

  // 返回更新后的上下文，不写文件
  return {
    ...ctx,
    previousResult: result,
    completed: [...ctx.completed, 'phase-n']
  };
}
```

**Risk**: Low
**Verification**: 无 Write→Read 紧邻模式

---

### Strategy: deduplicate_storage

**Purpose**: 消除重复数据存储。

**Implementation**:
```javascript
// Before: 重复存储
state.user_request = userInput;
state.original_request = userInput;
state.input_text = userInput;

// After: 单一来源
state.input = userInput;  // 唯一存储点
```

**Risk**: Low
**Verification**: 无相同数据多字段存储

---

## Context Explosion Strategies

### Strategy: sliding_window

**Purpose**: Limit context history to most recent N items.

**Implementation**:
```javascript
// In orchestrator.md or phase files
const MAX_HISTORY_ITEMS = 5;

function updateHistory(state, newItem) {
  const history = state.history || [];
  const updated = [...history, newItem].slice(-MAX_HISTORY_ITEMS);
  return { ...state, history: updated };
}
```

**Files to Modify**:
- `phases/orchestrator.md` - Add history management
- `phases/state-schema.md` - Document history limit

**Risk**: Low
**Verification**:
- Run skill for 10+ iterations
- Verify history.length never exceeds MAX_HISTORY_ITEMS

---

### Strategy: path_reference

**Purpose**: Pass file paths instead of full content.

**Implementation**:
```javascript
// Before
const content = Read('data.json');
const prompt = `Analyze: ${content}`;

// After
const dataPath = `${workDir}/data.json`;
const prompt = `Analyze file at: ${dataPath}. Read it first.`;
```

**Files to Modify**:
- All phase files with `${content}` in prompts

**Risk**: Low
**Verification**:
- Verify agents can still access required data
- Check token count reduced

---

### Strategy: context_summarization

**Purpose**: Add summarization step before passing to next phase.

**Implementation**:
```javascript
// Add summarization agent
const summarizeResult = await Task({
  subagent_type: 'universal-executor',
  prompt: `
    Summarize the following in <100 words, preserving key facts:
    ${fullContent}

    Return JSON: { summary: "...", key_points: [...] }
  `
});

// Pass summary instead of full content
nextPhasePrompt = `Previous phase summary: ${summarizeResult.summary}`;
```

**Files to Modify**:
- Phase transition points
- Orchestrator (if autonomous)

**Risk**: Low
**Verification**:
- Compare output quality with/without summarization
- Verify key information preserved

---

### Strategy: structured_state

**Purpose**: Replace text-based context with structured JSON state.

**Implementation**:
```javascript
// Before: Text-based context passing
const context = `
  User requested: ${userRequest}
  Previous output: ${previousOutput}
  Current status: ${status}
`;

// After: Structured state
const state = {
  original_request: userRequest,
  previous_output_path: `${workDir}/output.md`,
  previous_output_summary: "...",
  status: status,
  key_decisions: [...]
};
```

**Files to Modify**:
- `phases/state-schema.md` - Define structure
- All phases - Use structured fields

**Risk**: Medium (requires refactoring)
**Verification**:
- Verify all phases can access required state fields
- Check backward compatibility

---

## Long-tail Forgetting Strategies

### Strategy: constraint_injection

**Purpose**: Inject original constraints into every phase prompt.

**Implementation**:
```javascript
// Add to every phase prompt template
const phasePrompt = `
[CONSTRAINTS - FROM ORIGINAL REQUEST]
${state.original_requirements.map(r => `- ${r}`).join('\n')}

[CURRENT TASK]
${taskDescription}

[REMINDER]
Output MUST satisfy all constraints listed above.
`;
```

**Files to Modify**:
- All `phases/*.md` files
- `templates/agent-base.md` (if exists)

**Risk**: Low
**Verification**:
- Verify constraints visible in each phase
- Test with specific constraint, verify output respects it

---

### Strategy: state_constraints_field

**Purpose**: Add dedicated field in state schema for requirements.

**Implementation**:
```typescript
// In state-schema.md
interface State {
  // Add these fields
  original_requirements: string[];    // User's original constraints
  goal_summary: string;               // One-line goal statement
  constraint_violations: string[];    // Track any violations
}

// In action-init.md
function initState(userInput) {
  return {
    original_requirements: extractRequirements(userInput),
    goal_summary: summarizeGoal(userInput),
    constraint_violations: []
  };
}
```

**Files to Modify**:
- `phases/state-schema.md`
- `phases/actions/action-init.md`

**Risk**: Low
**Verification**:
- Verify state.json contains requirements after init
- Check requirements persist through all phases

---

### Strategy: checkpoint_restore

**Purpose**: Save state at key milestones for recovery and verification.

**Implementation**:
```javascript
// Add checkpoint function
function createCheckpoint(state, workDir, checkpointName) {
  const checkpointPath = `${workDir}/checkpoints/${checkpointName}.json`;
  Write(checkpointPath, JSON.stringify({
    state: state,
    timestamp: new Date().toISOString(),
    name: checkpointName
  }, null, 2));
  return checkpointPath;
}

// Use at key points
await executePhase2();
createCheckpoint(state, workDir, 'after-phase-2');
```

**Files to Modify**:
- `phases/orchestrator.md`
- Key phase files

**Risk**: Low
**Verification**:
- Verify checkpoints created at expected points
- Test restore from checkpoint

---

### Strategy: goal_embedding

**Purpose**: Track semantic similarity to original goal throughout execution.

**Implementation**:
```javascript
// Store goal embedding at init
state.goal_embedding = await embed(state.goal_summary);

// At each major phase, check alignment
const currentPlanEmbedding = await embed(currentPlan);
const similarity = cosineSimilarity(state.goal_embedding, currentPlanEmbedding);

if (similarity < 0.7) {
  console.warn('Goal drift detected! Similarity:', similarity);
  // Trigger re-alignment
}
```

**Files to Modify**:
- State schema (add embedding field)
- Orchestrator (add similarity check)

**Risk**: Medium (requires embedding infrastructure)
**Verification**:
- Test with intentional drift, verify detection
- Verify false positive rate acceptable

---

## Data Flow Strategies

### Strategy: state_centralization

**Purpose**: Use single state.json for all persistent data.

**Implementation**:
```javascript
// Create state manager
const StateManager = {
  read: (workDir) => JSON.parse(Read(`${workDir}/state.json`)),

  update: (workDir, updates) => {
    const current = StateManager.read(workDir);
    const next = { ...current, ...updates, updated_at: new Date().toISOString() };
    Write(`${workDir}/state.json`, JSON.stringify(next, null, 2));
    return next;
  },

  get: (workDir, path) => {
    const state = StateManager.read(workDir);
    return path.split('.').reduce((obj, key) => obj?.[key], state);
  }
};

// Replace direct writes
// Before: Write(`${workDir}/config.json`, config);
// After:  StateManager.update(workDir, { config });
```

**Files to Modify**:
- All phases that write state
- Create shared state manager

**Risk**: Medium (significant refactoring)
**Verification**:
- Verify single state.json after full run
- Check no orphan state files

---

### Strategy: schema_enforcement

**Purpose**: Add runtime validation using Zod or similar.

**Implementation**:
```javascript
// Define schema (in state-schema.md)
const StateSchema = {
  status: ['pending', 'running', 'completed', 'failed'],
  target_skill: {
    name: 'string',
    path: 'string'
  },
  // ... full schema
};

function validateState(state) {
  const errors = [];

  if (!StateSchema.status.includes(state.status)) {
    errors.push(`Invalid status: ${state.status}`);
  }

  if (typeof state.target_skill?.name !== 'string') {
    errors.push('target_skill.name must be string');
  }

  if (errors.length > 0) {
    throw new Error(`State validation failed:\n${errors.join('\n')}`);
  }

  return true;
}

// Use before state write
function updateState(workDir, updates) {
  const newState = { ...currentState, ...updates };
  validateState(newState);  // Throws if invalid
  Write(`${workDir}/state.json`, JSON.stringify(newState, null, 2));
}
```

**Files to Modify**:
- `phases/state-schema.md` - Add validation function
- All state write locations

**Risk**: Low
**Verification**:
- Test with invalid state, verify rejection
- Verify valid state accepted

---

### Strategy: field_normalization

**Purpose**: Normalize field names across all phases.

**Implementation**:
```javascript
// Create normalization mapping
const FIELD_NORMALIZATIONS = {
  'title': 'name',
  'identifier': 'id',
  'state': 'status',
  'error': 'errors'
};

function normalizeData(data) {
  if (typeof data !== 'object' || data === null) return data;

  const normalized = {};
  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = FIELD_NORMALIZATIONS[key] || key;
    normalized[normalizedKey] = normalizeData(value);
  }
  return normalized;
}

// Apply when reading external data
const rawData = JSON.parse(Read(filePath));
const normalizedData = normalizeData(rawData);
```

**Files to Modify**:
- Data ingestion points
- State update functions

**Risk**: Low
**Verification**:
- Verify consistent field names in state
- Check no data loss during normalization

---

## Agent Coordination Strategies

### Strategy: error_wrapping

**Purpose**: Add try-catch to all Task calls.

**Implementation**:
```javascript
// Wrapper function
async function safeTask(config, state, updateState) {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await Task(config);

      // Validate result
      if (!result) throw new Error('Empty result from agent');

      return result;
    } catch (error) {
      console.log(`Task attempt ${attempt} failed: ${error.message}`);

      if (attempt === maxRetries) {
        updateState({
          errors: [...state.errors, {
            action: config.subagent_type,
            message: error.message,
            timestamp: new Date().toISOString()
          }],
          error_count: state.error_count + 1
        });
        throw error;
      }

      // Wait before retry
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}
```

**Files to Modify**:
- All files with Task calls

**Risk**: Low
**Verification**:
- Simulate agent failure, verify graceful handling
- Verify retry logic works

---

### Strategy: result_validation

**Purpose**: Validate agent returns before use.

**Implementation**:
```javascript
function validateAgentResult(result, expectedSchema) {
  // Try JSON parse
  let parsed;
  try {
    parsed = typeof result === 'string' ? JSON.parse(result) : result;
  } catch (e) {
    throw new Error(`Agent result is not valid JSON: ${result.slice(0, 100)}`);
  }

  // Check required fields
  for (const field of expectedSchema.required || []) {
    if (!(field in parsed)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return parsed;
}

// Usage
const rawResult = await Task({...});
const validResult = validateAgentResult(rawResult, {
  required: ['status', 'output_file']
});
```

**Files to Modify**:
- All locations where agent results are used

**Risk**: Low
**Verification**:
- Test with invalid agent output
- Verify proper error messages

---

### Strategy: flatten_nesting

**Purpose**: Remove nested agent calls, use orchestrator coordination.

**Implementation**:
```javascript
// Before: Agent A calls Agent B in its prompt
// Agent A prompt: "... then call Task({subagent_type: 'B', ...}) ..."

// After: Agent A returns signal, orchestrator handles
// Agent A prompt: "If you need further analysis, return: { needs_agent_b: true, context: ... }"

// Orchestrator handles:
const resultA = await Task({ subagent_type: 'A', ... });
const parsedA = JSON.parse(resultA);

if (parsedA.needs_agent_b) {
  const resultB = await Task({
    subagent_type: 'B',
    prompt: `Continue analysis with context: ${JSON.stringify(parsedA.context)}`
  });
}
```

**Files to Modify**:
- Phase files with nested Task calls
- Orchestrator decision logic

**Risk**: Medium (may change agent behavior)
**Verification**:
- Verify no nested Task patterns
- Test agent chain via orchestrator

---

## Documentation Strategies

文档去重和冲突解决策略。

---

### Strategy: consolidate_to_ssot

**Purpose**: 将重复定义合并到单一真相来源 (Single Source of Truth)。

**Implementation**:
```javascript
// 合并流程
async function consolidateToSSOT(state, duplicates) {
  // 1. 识别最完整的定义位置
  const canonical = selectCanonicalSource(duplicates);

  // 2. 确保规范位置包含完整定义
  const fullDefinition = mergeDefinitions(duplicates);
  Write(canonical.file, fullDefinition);

  // 3. 替换其他位置为引用
  for (const dup of duplicates.filter(d => d.file !== canonical.file)) {
    const reference = generateReference(canonical.file, dup.type);
    // 例如: "详见 [state-schema.md](phases/state-schema.md)"
    replaceWithReference(dup.file, dup.location, reference);
  }

  return { canonical: canonical.file, removed: duplicates.length - 1 };
}

function selectCanonicalSource(duplicates) {
  // 优先级: specs/ > phases/ > SKILL.md
  const priority = ['specs/', 'phases/', 'SKILL.md'];
  return duplicates.sort((a, b) => {
    const aIdx = priority.findIndex(p => a.file.includes(p));
    const bIdx = priority.findIndex(p => b.file.includes(p));
    return aIdx - bIdx;
  })[0];
}
```

**Risk**: Low
**Verification**:
- 确认只有一处包含完整定义
- 其他位置包含有效引用链接

---

### Strategy: centralize_mapping_config

**Purpose**: 将硬编码配置提取到集中的 JSON 文件，代码改为加载配置。

**Implementation**:
```javascript
// 1. 创建集中配置文件
const config = {
  version: "1.0.0",
  categories: {
    context_explosion: {
      pattern_ids: ["CTX-001", "CTX-002"],
      strategies: ["sliding_window", "path_reference"]
    }
    // ... 从硬编码中提取
  }
};
Write('specs/category-mappings.json', JSON.stringify(config, null, 2));

// 2. 重构代码加载配置
// Before:
function findTaxonomyMatch(category) {
  const patternMapping = {
    'context_explosion': { category: 'context_explosion', pattern_ids: [...] }
    // 硬编码
  };
  return patternMapping[category];
}

// After:
function findTaxonomyMatch(category) {
  const mappings = JSON.parse(Read('specs/category-mappings.json'));
  const config = mappings.categories[category];
  if (!config) return null;
  return { category, pattern_ids: config.pattern_ids, severity_hint: config.severity_hint };
}
```

**Risk**: Medium (需要测试配置加载逻辑)
**Verification**:
- JSON 文件语法正确
- 所有原硬编码的值都已迁移
- 功能行为不变

---

### Strategy: reconcile_conflicting_definitions

**Purpose**: 调和冲突的定义，由用户选择正确版本后统一更新。

**Implementation**:
```javascript
async function reconcileConflicts(conflicts) {
  for (const conflict of conflicts) {
    // 1. 展示冲突给用户
    const options = conflict.definitions.map(def => ({
      label: `${def.file}: ${def.value}`,
      description: `来自 ${def.file}`
    }));

    const choice = await AskUserQuestion({
      questions: [{
        question: `发现冲突定义: "${conflict.key}"，请选择正确版本`,
        header: '冲突解决',
        options: options,
        multiSelect: false
      }]
    });

    // 2. 更新所有文件为选中的版本
    const selected = conflict.definitions[choice.index];
    for (const def of conflict.definitions) {
      if (def.file !== selected.file) {
        updateDefinition(def.file, conflict.key, selected.value);
      }
    }
  }

  return { resolved: conflicts.length };
}
```

**Risk**: Low (用户确认后执行)
**Verification**:
- 所有位置的定义一致
- 无新冲突产生

---

## Strategy Selection Guide

```
Issue Type: Context Explosion
├── history grows unbounded? → sliding_window
├── full content in prompts? → path_reference
├── no summarization? → context_summarization
└── text-based context? → structured_state

Issue Type: Long-tail Forgetting
├── constraints not in phases? → constraint_injection
├── no requirements in state? → state_constraints_field
├── no recovery points? → checkpoint_restore
└── goal drift risk? → goal_embedding

Issue Type: Data Flow
├── multiple state files? → state_centralization
├── no validation? → schema_enforcement
└── inconsistent names? → field_normalization

Issue Type: Agent Coordination
├── no error handling? → error_wrapping
├── no result validation? → result_validation
└── nested agent calls? → flatten_nesting

Issue Type: Prompt Engineering
├── vague instructions? → structured_prompt
├── inconsistent output? → output_schema
├── hallucination risk? → grounding_context
└── format drift? → format_enforcement

Issue Type: Architecture
├── unclear responsibilities? → phase_decomposition
├── tight coupling? → interface_contracts
├── poor extensibility? → plugin_architecture
└── complex flow? → state_machine

Issue Type: Performance
├── high token usage? → token_budgeting
├── slow execution? → parallel_execution
├── redundant computation? → result_caching
└── large files? → lazy_loading

Issue Type: Error Handling
├── no recovery? → graceful_degradation
├── silent failures? → error_propagation
├── no logging? → structured_logging
└── unclear errors? → error_context

Issue Type: Output Quality
├── inconsistent quality? → quality_gates
├── no verification? → output_validation
├── format issues? → template_enforcement
└── incomplete output? → completeness_check

Issue Type: User Experience
├── no progress? → progress_tracking
├── unclear status? → status_communication
├── no feedback? → interactive_checkpoints
└── confusing flow? → guided_workflow

Issue Type: Documentation Redundancy
├── 核心定义重复? → consolidate_to_ssot
└── 硬编码配置重复? → centralize_mapping_config

Issue Type: Documentation Conflict
└── 定义不一致? → reconcile_conflicting_definitions
```

---

## General Tuning Strategies (按需 via Gemini CLI)

以下策略针对更通用的优化场景，通常需要 Gemini CLI 进行深度分析后生成具体实现。

---

### Prompt Engineering Strategies

#### Strategy: structured_prompt

**Purpose**: 将模糊指令转换为结构化提示词。

**Implementation**:
```javascript
// Before: Vague prompt
const prompt = "Please analyze the code and give suggestions";

// After: Structured prompt
const prompt = `
[ROLE]
You are a code analysis expert specializing in ${domain}.

[TASK]
Analyze the provided code for:
1. Code quality issues
2. Performance bottlenecks
3. Security vulnerabilities

[INPUT]
File: ${filePath}
Context: ${context}

[OUTPUT FORMAT]
Return JSON:
{
  "issues": [{ "type": "...", "severity": "...", "location": "...", "suggestion": "..." }],
  "summary": "..."
}

[CONSTRAINTS]
- Focus on actionable issues only
- Limit to top 10 findings
`;
```

**Risk**: Low
**Verification**: Check output consistency across multiple runs

---

#### Strategy: output_schema

**Purpose**: 强制 LLM 输出符合特定 schema。

**Implementation**:
```javascript
// Define expected schema
const outputSchema = {
  type: 'object',
  required: ['status', 'result'],
  properties: {
    status: { enum: ['success', 'error', 'partial'] },
    result: { type: 'object' },
    errors: { type: 'array' }
  }
};

// Include in prompt
const prompt = `
...task description...

[OUTPUT SCHEMA]
Your response MUST be valid JSON matching this schema:
${JSON.stringify(outputSchema, null, 2)}

[VALIDATION]
Before returning, verify your output:
1. Is it valid JSON?
2. Does it have all required fields?
3. Are field types correct?
`;
```

**Risk**: Low
**Verification**: JSON.parse + schema validation

---

#### Strategy: grounding_context

**Purpose**: 提供足够上下文减少幻觉。

**Implementation**:
```javascript
// Gather grounding context
const groundingContext = {
  codebase_patterns: await analyzePatterns(skillPath),
  existing_examples: await findSimilarImplementations(taskType),
  constraints: state.original_requirements
};

const prompt = `
[GROUNDING CONTEXT]
This skill follows these patterns:
${JSON.stringify(groundingContext.codebase_patterns)}

Similar implementations exist at:
${groundingContext.existing_examples.map(e => `- ${e.path}`).join('\n')}

[TASK]
${taskDescription}

[IMPORTANT]
- Only suggest patterns that exist in the codebase
- Reference specific files when making suggestions
- If unsure, indicate uncertainty level
`;
```

**Risk**: Medium (requires context gathering)
**Verification**: Check suggestions match existing patterns

---

### Architecture Strategies

#### Strategy: phase_decomposition

**Purpose**: 重新划分阶段以清晰化职责。

**Analysis via Gemini**:
```bash
ccw cli -p "
PURPOSE: Analyze phase decomposition for skill at ${skillPath}
TASK: • Map current phase responsibilities • Identify overlapping concerns • Suggest cleaner boundaries
MODE: analysis
CONTEXT: @phases/**/*.md
EXPECTED: { current_phases: [], overlaps: [], recommended_structure: [] }
" --tool gemini --mode analysis
```

**Implementation Pattern**:
```
Before: Monolithic phases
Phase1: Collect + Analyze + Transform + Output

After: Single-responsibility phases
Phase1: Collect (input gathering)
Phase2: Analyze (processing)
Phase3: Transform (conversion)
Phase4: Output (delivery)
```

---

#### Strategy: interface_contracts

**Purpose**: 定义阶段间的数据契约。

**Implementation**:
```typescript
// Define contracts in state-schema.md
interface PhaseContract {
  input: {
    required: string[];
    optional: string[];
    schema: object;
  };
  output: {
    guarantees: string[];
    schema: object;
  };
}

// Phase 1 output contract
const phase1Contract: PhaseContract = {
  input: {
    required: ['user_request'],
    optional: ['preferences'],
    schema: { /* ... */ }
  },
  output: {
    guarantees: ['parsed_requirements', 'validation_status'],
    schema: { /* ... */ }
  }
};
```

---

### Performance Strategies

#### Strategy: token_budgeting

**Purpose**: 为每个阶段设置 Token 预算。

**Implementation**:
```javascript
const TOKEN_BUDGETS = {
  'phase-collect': 2000,
  'phase-analyze': 5000,
  'phase-generate': 8000,
  total: 15000
};

function checkBudget(phase, estimatedTokens) {
  if (estimatedTokens > TOKEN_BUDGETS[phase]) {
    console.warn(`Phase ${phase} exceeds budget: ${estimatedTokens} > ${TOKEN_BUDGETS[phase]}`);
    // Trigger summarization or truncation
    return false;
  }
  return true;
}
```

---

#### Strategy: parallel_execution

**Purpose**: 并行执行独立任务。

**Implementation**:
```javascript
// Before: Sequential
const result1 = await Task({ subagent_type: 'analyzer', prompt: prompt1 });
const result2 = await Task({ subagent_type: 'analyzer', prompt: prompt2 });
const result3 = await Task({ subagent_type: 'analyzer', prompt: prompt3 });

// After: Parallel (when independent)
const [result1, result2, result3] = await Promise.all([
  Task({ subagent_type: 'analyzer', prompt: prompt1, run_in_background: true }),
  Task({ subagent_type: 'analyzer', prompt: prompt2, run_in_background: true }),
  Task({ subagent_type: 'analyzer', prompt: prompt3, run_in_background: true })
]);
```

---

#### Strategy: result_caching

**Purpose**: 缓存中间结果避免重复计算。

**Implementation**:
```javascript
const cache = {};

async function cachedAnalysis(key, analysisFunc) {
  if (cache[key]) {
    console.log(`Cache hit: ${key}`);
    return cache[key];
  }

  const result = await analysisFunc();
  cache[key] = result;

  // Persist to disk for cross-session caching
  Write(`${workDir}/cache/${key}.json`, JSON.stringify(result));

  return result;
}
```

---

### Error Handling Strategies

#### Strategy: graceful_degradation

**Purpose**: 失败时降级而非崩溃。

**Implementation**:
```javascript
async function executeWithDegradation(primaryTask, fallbackTask) {
  try {
    return await primaryTask();
  } catch (error) {
    console.warn(`Primary task failed: ${error.message}, using fallback`);

    try {
      return await fallbackTask();
    } catch (fallbackError) {
      console.error(`Fallback also failed: ${fallbackError.message}`);
      return {
        status: 'degraded',
        partial_result: null,
        error: fallbackError.message
      };
    }
  }
}
```

---

#### Strategy: structured_logging

**Purpose**: 添加结构化日志便于调试。

**Implementation**:
```javascript
function log(level, action, data) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    action,
    ...data
  };

  // Append to log file
  const logPath = `${workDir}/execution.log`;
  const existing = Read(logPath) || '';
  Write(logPath, existing + JSON.stringify(entry) + '\n');

  // Console output
  console.log(`[${level}] ${action}:`, JSON.stringify(data));
}

// Usage
log('INFO', 'phase_start', { phase: 'analyze', input_size: 1000 });
log('ERROR', 'agent_failure', { agent: 'universal-executor', error: err.message });
```

---

### Output Quality Strategies

#### Strategy: quality_gates

**Purpose**: 输出前进行质量检查。

**Implementation**:
```javascript
const qualityGates = [
  {
    name: 'completeness',
    check: (output) => output.sections?.length >= 3,
    message: 'Output must have at least 3 sections'
  },
  {
    name: 'format',
    check: (output) => /^#\s/.test(output.content),
    message: 'Output must start with markdown heading'
  },
  {
    name: 'length',
    check: (output) => output.content?.length >= 500,
    message: 'Output must be at least 500 characters'
  }
];

function validateOutput(output) {
  const failures = qualityGates
    .filter(gate => !gate.check(output))
    .map(gate => gate.message);

  if (failures.length > 0) {
    throw new Error(`Quality gate failures:\n${failures.join('\n')}`);
  }

  return true;
}
```

---

### User Experience Strategies

#### Strategy: progress_tracking

**Purpose**: 显示执行进度。

**Implementation**:
```javascript
function updateProgress(current, total, description) {
  const percentage = Math.round((current / total) * 100);
  const progressBar = '█'.repeat(percentage / 5) + '░'.repeat(20 - percentage / 5);

  console.log(`[${progressBar}] ${percentage}% - ${description}`);

  // Update state for UI
  updateState({
    progress: {
      current,
      total,
      percentage,
      description
    }
  });
}

// Usage
updateProgress(1, 5, 'Initializing tuning session...');
updateProgress(2, 5, 'Running context diagnosis...');
```

---

#### Strategy: interactive_checkpoints

**Purpose**: 在关键点暂停获取用户确认。

**Implementation**:
```javascript
async function checkpoint(name, summary, options) {
  console.log(`\n=== Checkpoint: ${name} ===`);
  console.log(summary);

  const response = await AskUserQuestion({
    questions: [{
      question: `Review ${name} results. How to proceed?`,
      header: 'Checkpoint',
      options: options || [
        { label: 'Continue', description: 'Proceed with next step' },
        { label: 'Modify', description: 'Adjust parameters and retry' },
        { label: 'Skip', description: 'Skip this step' },
        { label: 'Abort', description: 'Stop the workflow' }
      ],
      multiSelect: false
    }]
  });

  return response;
}
```

---

## Token Consumption Strategies

Strategies for reducing token usage and simplifying skill outputs.

---

### Strategy: prompt_compression

**Purpose**: Reduce verbose prompts by extracting static text and using templates.

**Implementation**:
```javascript
// Before: Long inline prompt
const prompt = `
You are an expert code analyzer specializing in identifying patterns.
Your role is to examine the provided code and identify any issues.
Please follow these detailed instructions carefully:
1. Read the code thoroughly
2. Identify any anti-patterns
3. Check for security vulnerabilities
... (continues for many lines)

Code to analyze:
${fullCodeContent}
`;

// After: Compressed with template reference
const PROMPT_TEMPLATE_PATH = 'templates/analyzer-prompt.md';

const prompt = `
[TEMPLATE: ${PROMPT_TEMPLATE_PATH}]
[CODE_PATH: ${codePath}]
[FOCUS: patterns, security]
`;

// Or use key instructions only
const prompt = `
Analyze ${codePath} for: patterns, security, performance.
Return JSON: { issues: [], severity: string }
`;
```

**Risk**: Low
**Verification**: Compare token count before/after compression

---

### Strategy: lazy_loading

**Purpose**: Pass file paths instead of full content, let consumers load if needed.

**Implementation**:
```javascript
// Before: Full content in prompt
const content = Read(filePath);
const prompt = `Analyze this content:\n${content}`;

// After: Path reference with lazy loading instruction
const prompt = `
Analyze file at: ${filePath}
(Read the file content if you need to examine it)
Return: { summary: string, issues: [] }
`;

// For agent calls
const result = await Task({
  subagent_type: 'universal-executor',
  prompt: `
    [FILE_PATH]: ${dataPath}
    [TASK]: Analyze the file and extract key metrics.
    [NOTE]: Read the file only if needed for your analysis.
  `
});
```

**Risk**: Low
**Verification**: Verify agents can still access required data

---

### Strategy: output_minimization

**Purpose**: Configure agents to return minimal, structured output instead of verbose text.

**Implementation**:
```javascript
// Before: Verbose output expectation
const prompt = `
Analyze the code and provide a detailed report including:
- Executive summary
- Detailed findings with explanations
- Code examples for each issue
- Recommendations with rationale
...
`;

// After: Minimal structured output
const prompt = `
Analyze the code. Return ONLY this JSON:
{
  "status": "pass|review|fail",
  "issues": [{ "id": string, "severity": string, "file": string, "line": number }],
  "summary": "one sentence"
}
Do not include explanations or code examples.
`;

// Validation
const result = JSON.parse(agentOutput);
if (!result.status || !Array.isArray(result.issues)) {
  throw new Error('Invalid output format');
}
```

**Risk**: Low
**Verification**: JSON.parse succeeds, output size reduced

---

### Strategy: state_field_reduction

**Purpose**: Audit and consolidate state fields to minimize serialization overhead.

**Implementation**:
```typescript
// Before: Bloated state
interface State {
  status: string;
  target: TargetInfo;
  user_input: string;
  parsed_input: ParsedInput;      // Remove - temporary
  intermediate_result: any;       // Remove - not persisted
  debug_info: DebugInfo;          // Remove - debugging only
  analysis_cache: any;            // Remove - session cache
  full_history: HistoryEntry[];   // Remove - unbounded
  step1_output: any;              // Remove - intermediate
  step2_output: any;              // Remove - intermediate
  step3_output: any;              // Remove - intermediate
  final_result: FinalResult;
  error_log: string[];            // Remove - debugging
  metrics: Metrics;               // Remove - optional
}

// After: Minimal state (≤15 fields)
interface State {
  status: 'pending' | 'running' | 'completed' | 'failed';
  target: { name: string; path: string };
  input_summary: string;          // Summarized user input
  result_path: string;            // Path to final result
  quality_gate: 'pass' | 'fail';
  error?: string;                 // Only if failed
}
```

**Audit Checklist**:
```javascript
function auditStateFields(stateSchema) {
  const removeCandidates = [];

  for (const [key, type] of Object.entries(stateSchema)) {
    // Identify removal candidates
    if (key.startsWith('debug_')) removeCandidates.push(key);
    if (key.endsWith('_cache')) removeCandidates.push(key);
    if (key.endsWith('_temp')) removeCandidates.push(key);
    if (key.includes('intermediate')) removeCandidates.push(key);
    if (key.includes('step') && key.includes('output')) removeCandidates.push(key);
  }

  return {
    total_fields: Object.keys(stateSchema).length,
    remove_candidates: removeCandidates,
    estimated_reduction: removeCandidates.length
  };
}
```

**Risk**: Medium (ensure no essential data removed)
**Verification**: State field count ≤ 15, all essential data preserved

---

### Strategy: in_memory_consolidation

**Purpose**: Consolidate outputs into single file, eliminate redundant report files.

**Implementation**:
```javascript
// Before: Multiple output files
Write(`${workDir}/diagnosis-report.md`, reportMarkdown);
Write(`${workDir}/diagnosis-summary.json`, summaryJson);
Write(`${workDir}/state.json`, JSON.stringify(state));
Write(`${workDir}/tuning-report.md`, tuningReport);
Write(`${workDir}/tuning-summary.md`, finalSummary);

// After: Single source of truth
const consolidatedState = {
  ...state,
  final_report: {
    summary: summaryJson,
    details_available_in_state: true,
    generated_at: new Date().toISOString()
  }
};
Write(`${workDir}/state.json`, JSON.stringify(consolidatedState, null, 2));

// Report can be rendered from state on-demand
function renderReport(state) {
  return `
# Tuning Report: ${state.target_skill.name}
Status: ${state.status}
Quality: ${state.quality_gate}
Issues: ${state.issues.length}
...
`;
}
```

**Benefits**:
- Single file to read/write
- No data duplication
- On-demand rendering

**Risk**: Low
**Verification**: Only state.json exists as output, rendering works correctly
