---
name: prioritize
description: 使用适合你背景的正确优先级方法选择下一步工作。
argument-hint: "<候选计划、约束和决策背景>"
uses:
  - prioritization-advisor
  - feature-investment-advisor
  - acquisition-channel-advisor
  - finance-based-pricing-advisor
  - recommendation-canvas
outputs:
  - 排序的选项
  - 决策理由
  - 明确的权衡和后续行动
---

# /prioritize

使用上下文感知的财务和战略严谨性对计划进行优先级排序。

## 调用方式

```text
/prioritize Q2 激活、留存和定价实验的待办事项
```

## 工作流

1. 使用 `prioritization-advisor` 选择正确的框架
2. 使用 `feature-investment-advisor` 评估功能级回报
3. 通过 `acquisition-channel-advisor` 考虑渠道质量
4. 使用 `finance-based-pricing-advisor` 评估定价影响
5. 在 `recommendation-canvas` 中捕获最终建议

## 检查点

- 将可逆决策与不可逆决策分开
- 识别可能导致排名结果翻转的假设
- 明确每个排名决策的置信度

## 后续步骤

- 对最高风险赌注运行 `/discover`
- 对已批准的计划运行 `/plan-roadmap`
