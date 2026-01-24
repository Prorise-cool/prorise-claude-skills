# CCW Loop Skill

无状态迭代开发循环工作流，支持开发 (Develop)、调试 (Debug)、验证 (Validate) 三个阶段，每个阶段都有独立的文件记录进展。

## Overview

CCW Loop 是一个自主模式 (Autonomous) 的 Skill，通过文件驱动的无状态循环，帮助开发者系统化地完成开发任务。

### 核心特性

1. **无状态循环**: 每次执行从文件读取状态，不依赖内存
2. **文件驱动**: 所有进度记录在 Markdown 文件中，可审计、可回顾
3. **Gemini 辅助**: 关键决策点使用 CLI 工具进行深度分析
4. **可恢复**: 任何时候中断后可继续
5. **双模式**: 支持交互式和自动循环

### 三大阶段

- **Develop**: 任务分解 → 代码实现 → 进度记录
- **Debug**: 假设生成 → 证据收集 → 根因分析 → 修复验证
- **Validate**: 测试执行 → 覆盖率检查 → 质量评估

## Installation

已包含在 `.claude/skills/ccw-loop/`，无需额外安装。

## Usage

### 基本用法

```bash
# 启动新循环
/ccw-loop "实现用户认证功能"

# 继续现有循环
/ccw-loop --resume LOOP-auth-2026-01-22

# 自动循环模式
/ccw-loop --auto "修复登录bug并添加测试"
```

### 交互式流程

```
1. 启动: /ccw-loop "任务描述"
2. 初始化: 自动分析任务并生成子任务列表
3. 显示菜单:
   - 📝 继续开发 (Develop)
   - 🔍 开始调试 (Debug)
   - ✅ 运行验证 (Validate)
   - 📊 查看详情 (Status)
   - 🏁 完成循环 (Complete)
   - 🚪 退出 (Exit)
4. 执行选择的动作
5. 重复步骤 3-4 直到完成
```

### 自动循环流程

```
Develop (所有任务) → Debug (如有需要) → Validate → 完成
```

## Directory Structure

```
.workflow/.loop/{session-id}/
├── meta.json              # 会话元数据 (不可修改)
├── state.json             # 当前状态 (每次更新)
├── summary.md             # 完成报告 (结束时生成)
├── develop/
│   ├── progress.md        # 开发进度时间线
│   ├── tasks.json         # 任务列表
│   └── changes.log        # 代码变更日志 (NDJSON)
├── debug/
│   ├── understanding.md   # 理解演变文档
│   ├── hypotheses.json    # 假设历史
│   └── debug.log          # 调试日志 (NDJSON)
└── validate/
    ├── validation.md      # 验证报告
    ├── test-results.json  # 测试结果
    └── coverage.json      # 覆盖率数据
```

## Action Reference

| Action | 描述 | 触发条件 |
|--------|------|----------|
| action-init | 初始化会话 | 首次启动 |
| action-menu | 显示操作菜单 | 交互模式下每次循环 |
| action-develop-with-file | 执行开发任务 | 有待处理任务 |
| action-debug-with-file | 假设驱动调试 | 需要调试 |
| action-validate-with-file | 运行测试验证 | 需要验证 |
| action-complete | 完成并生成报告 | 所有任务完成 |

详细说明见 [specs/action-catalog.md](specs/action-catalog.md)

## CLI Integration

CCW Loop 在关键决策点集成 CLI 工具:

### 任务分解 (action-init)
```bash
ccw cli -p "PURPOSE: 分解开发任务..."
  --tool gemini
  --mode analysis
  --rule planning-breakdown-task-steps
```

### 代码实现 (action-develop)
```bash
ccw cli -p "PURPOSE: 实现功能代码..."
  --tool gemini
  --mode write
  --rule development-implement-feature
```

### 假设生成 (action-debug - 探索)
```bash
ccw cli -p "PURPOSE: Generate debugging hypotheses..."
  --tool gemini
  --mode analysis
  --rule analysis-diagnose-bug-root-cause
```

### 证据分析 (action-debug - 分析)
```bash
ccw cli -p "PURPOSE: Analyze debug log evidence..."
  --tool gemini
  --mode analysis
  --rule analysis-diagnose-bug-root-cause
```

### 质量评估 (action-validate)
```bash
ccw cli -p "PURPOSE: Analyze test results and coverage..."
  --tool gemini
  --mode analysis
  --rule analysis-review-code-quality
```

## State Management

### State Schema

参见 [phases/state-schema.md](phases/state-schema.md)

### State Transitions

```
pending → running → completed
              ↓
         user_exit
              ↓
            failed
```

### State Recovery

如果 `state.json` 损坏，可从其他文件重建:
- develop/tasks.json → develop.*
- debug/hypotheses.json → debug.*
- validate/test-results.json → validate.*

## Examples

### Example 1: 功能开发

```bash
# 1. 启动循环
/ccw-loop "Add user profile page"

# 2. 系统初始化，生成任务:
#    - task-001: Create profile component
#    - task-002: Add API endpoints
#    - task-003: Implement tests

# 3. 选择 "继续开发"
#    → 执行 task-001 (Gemini 辅助实现)
#    → 更新 progress.md

# 4. 重复开发直到所有任务完成

# 5. 选择 "运行验证"
#    → 运行测试
#    → 检查覆盖率
#    → 生成 validation.md

# 6. 选择 "完成循环"
#    → 生成 summary.md
#    → 询问是否扩展为 Issue
```

### Example 2: Bug 修复

```bash
# 1. 启动循环
/ccw-loop "Fix login timeout issue"

# 2. 选择 "开始调试"
#    → 输入 bug 描述: "Login times out after 30s"
#    → Gemini 生成假设 (H1, H2, H3)
#    → 添加 NDJSON 日志
#    → 提示复现 bug

# 3. 复现 bug (在应用中操作)

# 4. 再次选择 "开始调试"
#    → 解析 debug.log
#    → Gemini 分析证据
#    → H2 确认为根因
#    → 生成修复代码
#    → 更新 understanding.md

# 5. 选择 "运行验证"
#    → 测试通过

# 6. 完成
```

## Templates

- [progress-template.md](templates/progress-template.md): 开发进度文档模板
- [understanding-template.md](templates/understanding-template.md): 调试理解文档模板
- [validation-template.md](templates/validation-template.md): 验证报告模板

## Specifications

- [loop-requirements.md](specs/loop-requirements.md): 循环需求规范
- [action-catalog.md](specs/action-catalog.md): 动作目录

## Integration

### Dashboard Integration

CCW Loop 与 Dashboard Loop Monitor 集成:
- Dashboard 创建 Loop → 触发此 Skill
- state.json → Dashboard 实时显示
- 任务列表双向同步
- 控制按钮映射到 actions

### Issue System Integration

完成后可扩展为 Issue:
- 维度: test, enhance, refactor, doc
- 自动调用 `/issue:new`
- 上下文自动填充

## Error Handling

| 情况 | 处理 |
|------|------|
| Session 不存在 | 创建新会话 |
| state.json 损坏 | 从文件重建 |
| CLI 工具失败 | 回退到手动模式 |
| 测试失败 | 循环回到 develop/debug |
| >10 迭代 | 警告用户，建议拆分 |

## Limitations

1. **单会话限制**: 同一时间只能有一个活跃会话
2. **迭代限制**: 建议不超过 10 次迭代
3. **CLI 依赖**: 部分功能依赖 Gemini CLI 可用性
4. **测试框架**: 需要 package.json 中定义测试脚本

## Troubleshooting

### Q: 如何查看当前会话状态？

A: 在菜单中选择 "查看详情 (Status)"

### Q: 如何恢复中断的会话？

A: 使用 `--resume` 参数:
```bash
/ccw-loop --resume LOOP-xxx-2026-01-22
```

### Q: 如果 CLI 工具失败怎么办？

A: Skill 会自动降级到手动模式，提示用户手动输入

### Q: 如何添加自定义 action？

A: 参见 [specs/action-catalog.md](specs/action-catalog.md) 的 "Action Extensions" 部分

## Contributing

添加新功能:
1. 创建 action 文件在 `phases/actions/`
2. 更新 orchestrator 决策逻辑
3. 添加到 action-catalog.md
4. 更新 action-menu.md

## License

MIT

---

**Version**: 1.0.0
**Last Updated**: 2026-01-22
**Author**: CCW Team
