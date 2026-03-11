# Problem Taxonomy

Classification of skill execution issues with detection patterns and severity criteria.

## When to Use

| Phase | Usage | Section |
|-------|-------|---------|
| All Diagnosis Actions | Issue classification | All sections |
| action-propose-fixes | Strategy selection | Fix Mapping |
| action-generate-report | Severity assessment | Severity Criteria |

---

## Problem Categories

### 0. Authoring Principles Violation (P0)

**Definition**: 违反 skill 撰写首要准则（简洁高效、去除存储、上下文流转）。

**Root Causes**:
- 不必要的中间文件存储
- State schema 过度膨胀
- 文件中转代替上下文传递
- 重复数据存储

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| APV-001 | `/Write\([^)]*temp-|intermediate-/` | 中间文件写入 |
| APV-002 | `/Write\([^)]+\)[\s\S]{0,50}Read\([^)]+\)/` | 写后立即读（文件中转） |
| APV-003 | State schema > 15 fields | State 字段过多 |
| APV-004 | `/_history\s*[.=].*push|concat/` | 无限增长数组 |
| APV-005 | `/debug_|_cache|_temp/` in state | 调试/缓存字段残留 |
| APV-006 | Same data in multiple state fields | 重复存储 |

**Impact Levels**:
- **Critical**: 中间文件 > 5 个，严重违反原则
- **High**: State 字段 > 20 个，或存在文件中转
- **Medium**: 存在调试字段或轻微冗余
- **Low**: 轻微的命名不规范

---

### 1. Context Explosion (P2)

**Definition**: Excessive token accumulation causing prompt size to grow unbounded.

**Root Causes**:
- Unbounded conversation history
- Full content passing instead of references
- Missing summarization mechanisms
- Agent returning full output instead of path+summary

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| CTX-001 | `/history\s*[.=].*push\|concat/` | History array growth |
| CTX-002 | `/JSON\.stringify\s*\(\s*state\s*\)/` | Full state serialization |
| CTX-003 | `/Read\([^)]+\)\s*[\+,]/` | Multiple file content concatenation |
| CTX-004 | `/return\s*\{[^}]*content:/` | Agent returning full content |
| CTX-005 | File length > 5000 chars without summarize | Long prompt without compression |

**Impact Levels**:
- **Critical**: Context exceeds model limit (128K tokens)
- **High**: Context > 50K tokens per iteration
- **Medium**: Context grows 10%+ per iteration
- **Low**: Potential for growth but currently manageable

---

### 2. Long-tail Forgetting (P3)

**Definition**: Loss of early instructions, constraints, or goals in long execution chains.

**Root Causes**:
- No explicit constraint propagation
- Reliance on implicit context
- Missing checkpoint/restore mechanisms
- State schema without requirements field

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| MEM-001 | Later phases missing constraint reference | Constraint not carried forward |
| MEM-002 | `/\[TASK\][^[]*(?!\[CONSTRAINTS\])/` | Task without constraints section |
| MEM-003 | Key phases without checkpoint | Missing state preservation |
| MEM-004 | State schema lacks `original_requirements` | No constraint persistence |
| MEM-005 | No verification phase | Output not checked against intent |

**Impact Levels**:
- **Critical**: Original goal completely lost
- **High**: Key constraints ignored in output
- **Medium**: Some requirements missing
- **Low**: Minor goal drift

---

### 3. Data Flow Disruption (P0)

**Definition**: Inconsistent state management causing data loss or corruption.

**Root Causes**:
- Multiple state storage locations
- Inconsistent field naming
- Missing schema validation
- Format transformation without normalization

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| DF-001 | Multiple state file writes | Scattered state storage |
| DF-002 | Same concept, different names | Field naming inconsistency |
| DF-003 | JSON.parse without validation | Missing schema validation |
| DF-004 | Files written but never read | Orphaned outputs |
| DF-005 | Autonomous skill without state-schema | Undefined state structure |

**Impact Levels**:
- **Critical**: Data loss or corruption
- **High**: State inconsistency between phases
- **Medium**: Potential for inconsistency
- **Low**: Minor naming inconsistencies

---

### 4. Agent Coordination Failure (P1)

**Definition**: Fragile agent call patterns causing cascading failures.

**Root Causes**:
- Missing error handling in Task calls
- No result validation
- Inconsistent agent configurations
- Deeply nested agent calls

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| AGT-001 | Task without try-catch | Missing error handling |
| AGT-002 | Result used without validation | No return value check |
| AGT-003 | > 3 different agent types | Agent type proliferation |
| AGT-004 | Nested Task in prompt | Agent calling agent |
| AGT-005 | Task used but not in allowed-tools | Tool declaration mismatch |
| AGT-006 | Multiple return formats | Inconsistent agent output |

**Impact Levels**:
- **Critical**: Workflow crash on agent failure
- **High**: Unpredictable agent behavior
- **Medium**: Occasional coordination issues
- **Low**: Minor inconsistencies

---

### 5. Documentation Redundancy (P5)

**Definition**: 同一定义（如 State Schema、映射表、类型定义）在多个文件中重复出现，导致维护困难和不一致风险。

**Root Causes**:
- 缺乏单一真相来源 (SSOT)
- 复制粘贴代替引用
- 硬编码配置代替集中管理

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| DOC-RED-001 | 跨文件语义比较 | 找到 State Schema 等核心概念的重复定义 |
| DOC-RED-002 | 代码块 vs 规范表对比 | action 文件中硬编码与 spec 文档的重复 |
| DOC-RED-003 | `/interface\s+(\w+)/` 同名扫描 | 多处定义的 interface/type |

**Impact Levels**:
- **High**: 核心定义（State Schema, 映射表）重复
- **Medium**: 类型定义重复
- **Low**: 示例代码重复

---

### 6. Token Consumption (P6)

**Definition**: Excessive token usage from verbose prompts, large state objects, or inefficient I/O patterns.

**Root Causes**:
- Long static prompts without compression
- State schema with too many fields
- Full content embedding instead of path references
- Arrays growing unbounded without sliding windows
- Write-then-read file relay patterns

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| TKN-001 | File size > 4KB | Verbose prompt files |
| TKN-002 | State fields > 15 | Excessive state schema |
| TKN-003 | `/Read\([^)]+\)\s*[\+,]/` | Full content passing |
| TKN-004 | `/.push\|concat(?!.*\.slice)/` | Unbounded array growth |
| TKN-005 | `/Write\([^)]+\)[\s\S]{0,100}Read\([^)]+\)/` | Write-then-read pattern |

**Impact Levels**:
- **High**: Multiple TKN-003/TKN-004 issues causing significant token waste
- **Medium**: Several verbose files or state bloat
- **Low**: Minor optimization opportunities

---

### 7. Documentation Conflict (P7)

**Definition**: 同一概念在不同文件中定义不一致，导致行为不可预测和文档误导。

**Root Causes**:
- 定义更新后未同步其他位置
- 实现与文档漂移
- 缺乏一致性校验

**Detection Patterns**:

| Pattern ID | Regex/Check | Description |
|------------|-------------|-------------|
| DOC-CON-001 | 键值一致性校验 | 同一键（如优先级）在不同文件中值不同 |
| DOC-CON-002 | 实现 vs 文档对比 | 硬编码配置与文档对应项不一致 |

**Impact Levels**:
- **Critical**: 优先级/类别定义冲突
- **High**: 策略映射不一致
- **Medium**: 示例与实际不符

---

## Severity Criteria

### Global Severity Matrix

| Severity | Definition | Action Required |
|----------|------------|-----------------|
| **Critical** | Blocks execution or causes data loss | Immediate fix required |
| **High** | Significantly impacts reliability | Should fix before deployment |
| **Medium** | Affects quality or maintainability | Fix in next iteration |
| **Low** | Minor improvement opportunity | Optional fix |

### Severity Calculation

```javascript
function calculateIssueSeverity(issue) {
  const weights = {
    impact_on_execution: 40,  // Does it block workflow?
    data_integrity_risk: 30,  // Can it cause data loss?
    frequency: 20,            // How often does it occur?
    complexity_to_fix: 10     // How hard to fix?
  };

  let score = 0;

  // Impact on execution
  if (issue.blocks_execution) score += weights.impact_on_execution;
  else if (issue.degrades_execution) score += weights.impact_on_execution * 0.5;

  // Data integrity
  if (issue.causes_data_loss) score += weights.data_integrity_risk;
  else if (issue.causes_inconsistency) score += weights.data_integrity_risk * 0.5;

  // Frequency
  if (issue.occurs_every_run) score += weights.frequency;
  else if (issue.occurs_sometimes) score += weights.frequency * 0.5;

  // Complexity (inverse - easier to fix = higher priority)
  if (issue.fix_complexity === 'low') score += weights.complexity_to_fix;
  else if (issue.fix_complexity === 'medium') score += weights.complexity_to_fix * 0.5;

  // Map score to severity
  if (score >= 70) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}
```

---

## Fix Mapping

| Problem Type | Recommended Strategies | Priority Order |
|--------------|----------------------|----------------|
| **Authoring Principles Violation** | eliminate_intermediate_files, minimize_state, context_passing | 1, 2, 3 |
| Context Explosion | sliding_window, path_reference, context_summarization | 1, 2, 3 |
| Long-tail Forgetting | constraint_injection, state_constraints_field, checkpoint | 1, 2, 3 |
| Data Flow Disruption | state_centralization, schema_enforcement, field_normalization | 1, 2, 3 |
| Agent Coordination | error_wrapping, result_validation, flatten_nesting | 1, 2, 3 |
| **Token Consumption** | prompt_compression, lazy_loading, output_minimization, state_field_reduction | 1, 2, 3, 4 |
| **Documentation Redundancy** | consolidate_to_ssot, centralize_mapping_config | 1, 2 |
| **Documentation Conflict** | reconcile_conflicting_definitions | 1 |

---

## Cross-Category Dependencies

Some issues may trigger others:

```
Context Explosion ──→ Long-tail Forgetting
     (Large context causes important info to be pushed out)

Data Flow Disruption ──→ Agent Coordination Failure
     (Inconsistent data causes agents to fail)

Agent Coordination Failure ──→ Context Explosion
     (Failed retries add to context)
```

When fixing, address in this order:
1. **P0 Data Flow** - Foundation for other fixes
2. **P1 Agent Coordination** - Stability
3. **P2 Context Explosion** - Efficiency
4. **P3 Long-tail Forgetting** - Quality
