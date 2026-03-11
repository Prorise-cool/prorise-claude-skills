# Orchestrator

Autonomous orchestrator for skill-tuning workflow. Reads current state and selects the next action based on diagnosis progress and quality gates.

## Role

Drive the tuning workflow by:
1. Reading current session state
2. Selecting the appropriate next action
3. Executing the action via sub-agent
4. Updating state with results
5. Repeating until termination conditions met

## State Management

### Read State

```javascript
const state = JSON.parse(Read(`${workDir}/state.json`));
```

### Update State

```javascript
function updateState(updates) {
  const state = JSON.parse(Read(`${workDir}/state.json`));
  const newState = {
    ...state,
    ...updates,
    updated_at: new Date().toISOString()
  };
  Write(`${workDir}/state.json`, JSON.stringify(newState, null, 2));
  return newState;
}
```

## Decision Logic

```javascript
function selectNextAction(state) {
  // === Termination Checks ===

  // User exit
  if (state.status === 'user_exit') return null;

  // Completed
  if (state.status === 'completed') return null;

  // Error limit exceeded
  if (state.error_count >= state.max_errors) {
    return 'action-abort';
  }

  // Max iterations exceeded
  if (state.iteration_count >= state.max_iterations) {
    return 'action-complete';
  }

  // === Action Selection ===

  // 1. Not initialized yet
  if (state.status === 'pending') {
    return 'action-init';
  }

  // 1.5. Requirement analysis (在 init 后，diagnosis 前)
  if (state.status === 'running' &&
      state.completed_actions.includes('action-init') &&
      !state.completed_actions.includes('action-analyze-requirements')) {
    return 'action-analyze-requirements';
  }

  // 1.6. 如果需求分析发现歧义需要澄清，暂停等待用户
  if (state.requirement_analysis?.status === 'needs_clarification') {
    return null;  // 等待用户澄清后继续
  }

  // 1.7. 如果需求分析覆盖度不足，优先触发 Gemini 深度分析
  if (state.requirement_analysis?.coverage?.status === 'unsatisfied' &&
      !state.completed_actions.includes('action-gemini-analysis')) {
    return 'action-gemini-analysis';
  }

  // 2. Check if Gemini analysis is requested or needed
  if (shouldTriggerGeminiAnalysis(state)) {
    return 'action-gemini-analysis';
  }

  // 3. Check if Gemini analysis is running
  if (state.gemini_analysis?.status === 'running') {
    // Wait for Gemini analysis to complete
    return null;  // Orchestrator will be re-triggered when CLI completes
  }

  // 4. Run diagnosis in order (only if not completed)
  const diagnosisOrder = ['context', 'memory', 'dataflow', 'agent', 'docs', 'token_consumption'];

  for (const diagType of diagnosisOrder) {
    if (state.diagnosis[diagType] === null) {
      // Check if user wants to skip this diagnosis
      if (!state.focus_areas.length || state.focus_areas.includes(diagType)) {
        return `action-diagnose-${diagType}`;
      }
      // For docs diagnosis, also check 'all' focus_area
      if (diagType === 'docs' && state.focus_areas.includes('all')) {
        return 'action-diagnose-docs';
      }
    }
  }

  // 5. All diagnosis complete, generate report if not done
  const allDiagnosisComplete = diagnosisOrder.every(
    d => state.diagnosis[d] !== null || !state.focus_areas.includes(d)
  );

  if (allDiagnosisComplete && !state.completed_actions.includes('action-generate-report')) {
    return 'action-generate-report';
  }

  // 6. Report generated, propose fixes if not done
  if (state.completed_actions.includes('action-generate-report') &&
      state.proposed_fixes.length === 0 &&
      state.issues.length > 0) {
    return 'action-propose-fixes';
  }

  // 7. Fixes proposed, check if user wants to apply
  if (state.proposed_fixes.length > 0 && state.pending_fixes.length > 0) {
    return 'action-apply-fix';
  }

  // 8. Fixes applied, verify
  if (state.applied_fixes.length > 0 &&
      state.applied_fixes.some(f => f.verification_result === 'pending')) {
    return 'action-verify';
  }

  // 9. Quality gate check
  if (state.quality_gate === 'pass') {
    return 'action-complete';
  }

  // 10. More iterations needed
  if (state.iteration_count < state.max_iterations &&
      state.quality_gate !== 'pass' &&
      state.issues.some(i => i.severity === 'critical' || i.severity === 'high')) {
    // Reset diagnosis for re-evaluation
    return 'action-diagnose-context';  // Start new iteration
  }

  // 11. Default: complete
  return 'action-complete';
}

/**
 * 判断是否需要触发 Gemini CLI 分析
 */
function shouldTriggerGeminiAnalysis(state) {
  // 已完成 Gemini 分析，不再触发
  if (state.gemini_analysis?.status === 'completed') {
    return false;
  }

  // 用户显式请求
  if (state.gemini_analysis_requested === true) {
    return true;
  }

  // 发现 critical 问题且未进行深度分析
  if (state.issues.some(i => i.severity === 'critical') &&
      !state.completed_actions.includes('action-gemini-analysis')) {
    return true;
  }

  // 用户指定了需要 Gemini 分析的 focus_areas
  const geminiAreas = ['architecture', 'prompt', 'performance', 'custom'];
  if (state.focus_areas.some(area => geminiAreas.includes(area))) {
    return true;
  }

  // 标准诊断完成但问题未得到解决，需要深度分析
  const diagnosisComplete = ['context', 'memory', 'dataflow', 'agent', 'docs'].every(
    d => state.diagnosis[d] !== null
  );
  if (diagnosisComplete &&
      state.issues.length > 0 &&
      state.iteration_count > 0 &&
      !state.completed_actions.includes('action-gemini-analysis')) {
    // 第二轮迭代如果问题仍存在，触发 Gemini 分析
    return true;
  }

  return false;
}
```

## Execution Loop

```javascript
async function runOrchestrator(workDir) {
  console.log('=== Skill Tuning Orchestrator Started ===');

  let iteration = 0;
  const MAX_LOOP_ITERATIONS = 50;  // Safety limit

  while (iteration < MAX_LOOP_ITERATIONS) {
    iteration++;

    // 1. Read current state
    const state = JSON.parse(Read(`${workDir}/state.json`));
    console.log(`[Loop ${iteration}] Status: ${state.status}, Action: ${state.current_action}`);

    // 2. Select next action
    const actionId = selectNextAction(state);

    if (!actionId) {
      console.log('No action selected, terminating orchestrator.');
      break;
    }

    console.log(`[Loop ${iteration}] Executing: ${actionId}`);

    // 3. Update state: current action
    // FIX CTX-001: sliding window for action_history (keep last 10)
    updateState({
      current_action: actionId,
      action_history: [...state.action_history, {
        action: actionId,
        started_at: new Date().toISOString(),
        completed_at: null,
        result: null,
        output_files: []
      }].slice(-10)  // Sliding window: prevent unbounded growth
    });

    // 4. Execute action
    try {
      const actionPrompt = Read(`phases/actions/${actionId}.md`);
      // FIX CTX-003: Pass state path + key fields only instead of full state
      const stateKeyInfo = {
        status: state.status,
        iteration_count: state.iteration_count,
        issues_by_severity: state.issues_by_severity,
        quality_gate: state.quality_gate,
        current_action: state.current_action,
        completed_actions: state.completed_actions,
        user_issue_description: state.user_issue_description,
        target_skill: { name: state.target_skill.name, path: state.target_skill.path }
      };
      const stateKeyJson = JSON.stringify(stateKeyInfo, null, 2);

      const result = await Task({
        subagent_type: 'universal-executor',
        run_in_background: false,
        prompt: `
[CONTEXT]
You are executing action "${actionId}" for skill-tuning workflow.
Work directory: ${workDir}

[STATE KEY INFO]
${stateKeyJson}

[FULL STATE PATH]
${workDir}/state.json
(Read full state from this file if you need additional fields)

[ACTION INSTRUCTIONS]
${actionPrompt}

[OUTPUT REQUIREMENT]
After completing the action:
1. Write any output files to the work directory
2. Return a JSON object with:
   - stateUpdates: object with state fields to update
   - outputFiles: array of files created
   - summary: brief description of what was done
`
      });

      // 5. Parse result and update state
      let actionResult;
      try {
        actionResult = JSON.parse(result);
      } catch (e) {
        actionResult = {
          stateUpdates: {},
          outputFiles: [],
          summary: result
        };
      }

      // 6. Update state: action complete
      const updatedHistory = [...state.action_history];
      updatedHistory[updatedHistory.length - 1] = {
        ...updatedHistory[updatedHistory.length - 1],
        completed_at: new Date().toISOString(),
        result: 'success',
        output_files: actionResult.outputFiles || []
      };

      updateState({
        current_action: null,
        completed_actions: [...state.completed_actions, actionId],
        action_history: updatedHistory,
        ...actionResult.stateUpdates
      });

      console.log(`[Loop ${iteration}] Completed: ${actionId}`);

    } catch (error) {
      console.log(`[Loop ${iteration}] Error in ${actionId}: ${error.message}`);

      // Error handling
      // FIX CTX-002: sliding window for errors (keep last 5)
      updateState({
        current_action: null,
        errors: [...state.errors, {
          action: actionId,
          message: error.message,
          timestamp: new Date().toISOString(),
          recoverable: true
        }].slice(-5),  // Sliding window: prevent unbounded growth
        error_count: state.error_count + 1
      });
    }
  }

  console.log('=== Skill Tuning Orchestrator Finished ===');
}
```

## Action Catalog

| Action | Purpose | Preconditions | Effects |
|--------|---------|---------------|---------|
| [action-init](actions/action-init.md) | Initialize tuning session | status === 'pending' | Creates work dirs, backup, sets status='running' |
| [action-analyze-requirements](actions/action-analyze-requirements.md) | Analyze user requirements | init completed | Sets requirement_analysis, optimizes focus_areas |
| [action-diagnose-context](actions/action-diagnose-context.md) | Analyze context explosion | status === 'running' | Sets diagnosis.context |
| [action-diagnose-memory](actions/action-diagnose-memory.md) | Analyze long-tail forgetting | status === 'running' | Sets diagnosis.memory |
| [action-diagnose-dataflow](actions/action-diagnose-dataflow.md) | Analyze data flow issues | status === 'running' | Sets diagnosis.dataflow |
| [action-diagnose-agent](actions/action-diagnose-agent.md) | Analyze agent coordination | status === 'running' | Sets diagnosis.agent |
| [action-diagnose-docs](actions/action-diagnose-docs.md) | Analyze documentation structure | status === 'running', focus includes 'docs' | Sets diagnosis.docs |
| [action-gemini-analysis](actions/action-gemini-analysis.md) | Deep analysis via Gemini CLI | User request OR critical issues | Sets gemini_analysis, adds issues |
| [action-generate-report](actions/action-generate-report.md) | Generate consolidated report | All diagnoses complete | Creates tuning-report.md |
| [action-propose-fixes](actions/action-propose-fixes.md) | Generate fix proposals | Report generated, issues > 0 | Sets proposed_fixes |
| [action-apply-fix](actions/action-apply-fix.md) | Apply selected fix | pending_fixes > 0 | Updates applied_fixes |
| [action-verify](actions/action-verify.md) | Verify applied fixes | applied_fixes with pending verification | Updates verification_result |
| [action-complete](actions/action-complete.md) | Finalize session | quality_gate='pass' OR max_iterations | Sets status='completed' |
| [action-abort](actions/action-abort.md) | Abort on errors | error_count >= max_errors | Sets status='failed' |

## Termination Conditions

- `status === 'completed'`: Normal completion
- `status === 'user_exit'`: User requested exit
- `status === 'failed'`: Unrecoverable error
- `requirement_analysis.status === 'needs_clarification'`: Waiting for user clarification (暂停，非终止)
- `error_count >= max_errors`: Too many errors (default: 3)
- `iteration_count >= max_iterations`: Max iterations reached (default: 5)
- `quality_gate === 'pass'`: All quality criteria met

## Error Recovery

| Error Type | Recovery Strategy |
|------------|-------------------|
| Action execution failed | Retry up to 3 times, then skip |
| State parse error | Restore from backup |
| File write error | Retry with alternative path |
| User abort | Save state and exit gracefully |

## User Interaction Points

The orchestrator pauses for user input at these points:

1. **action-init**: Confirm target skill and describe issue
2. **action-propose-fixes**: Select which fixes to apply
3. **action-verify**: Review verification results, decide to continue or stop
4. **action-complete**: Review final summary
