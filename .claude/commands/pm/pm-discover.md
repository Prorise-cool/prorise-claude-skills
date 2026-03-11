---
name: discover
description: 运行结构化的发现流程，从问题定义到机会映射和验证规划。
argument-hint: "<问题、机会或功能领域>"
uses:
  - discovery-process
  - problem-framing-canvas
  - discovery-interview-prep
  - opportunity-solution-tree
  - pol-probe-advisor
outputs:
  - 发现计划
  - 优先级假设
  - 验证实验待办事项
---

# /discover

运行完整的发现循环，无需手动拼接技能。

## 调用方式

```text
/discover 减少新 SMB 用户的注册流失
```

## 工作流

1. 使用 `problem-framing-canvas` 定义问题
2. 使用 `discovery-interview-prep` 规划访谈和证据收集
3. 使用 `opportunity-solution-tree` 映射机会和选项
4. 使用 `pol-probe-advisor` 选择验证探针
5. 使用 `discovery-process` 合成具体的执行计划

## 检查点

- 在解决方案设计前确认目标用户和业务成果
- 按风险优先级排序前 2-3 个假设
- 在投入工程资源前选择快速实验

## 后续步骤

- 对最有希望的验证解决方案运行 `/write-prd`
- 当多个解决方案路径通过验证时运行 `/prioritize`
