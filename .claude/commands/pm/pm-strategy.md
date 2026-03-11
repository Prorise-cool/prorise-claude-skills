---
name: strategy
description: 从定位到机会和路线图决策，构建产品战略。
argument-hint: "<产品、市场和战略问题>"
uses:
  - product-strategy-session
  - positioning-workshop
  - problem-statement
  - opportunity-solution-tree
  - roadmap-planning
outputs:
  - 战略叙述
  - 核心战略选择
  - 排序后的路线图方向
---

# /strategy

运行端到端战略工作流，提供决策质量的输出。

## 调用方式

```text
/strategy B2B 电商中端市场的分析插件
```

## 工作流

1. 使用 `positioning-workshop` 明确客户和类别
2. 使用 `problem-statement` 锁定核心问题
3. 通过 `opportunity-solution-tree` 扩展选项
4. 使用 `product-strategy-session` 进行全面的战略梳理
5. 使用 `roadmap-planning` 排序承诺

## 检查点

- 将战略（选择）与执行待办事项分开
- 明确说明权衡和非目标
- 确认每个战略赌注的指标和领先指标

## 后续步骤

- 运行 `/plan-roadmap` 进行发布级别的排序
- 对最高优先级计划运行 `/write-prd`
