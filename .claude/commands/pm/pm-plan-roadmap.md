---
name: plan-roadmap
description: 将战略和验证的机会转化为带有明确权衡的排序路线图。
argument-hint: "<时间范围、目标和候选计划>"
uses:
  - roadmap-planning
  - epic-hypothesis
  - prioritization-advisor
  - user-story-mapping
  - epic-breakdown-advisor
outputs:
  - 优先化的路线图
  - 史诗假设
  - 发布切片和排序理由
---

# /plan-roadmap

创建反映战略、风险和交付现实的路线图。

## 调用方式

```text
/plan-roadmap Q3-Q4 企业报表和权限计划
```

## 工作流

1. 使用 `roadmap-planning` 构建路线图背景
2. 将计划转化为 `epic-hypothesis` 声明
3. 通过 `prioritization-advisor` 选择正确的框架
4. 使用 `user-story-mapping` 创建交付切片
5. 使用 `epic-breakdown-advisor` 拆分过大的史诗

## 检查点

- 确保每个路线图项目与明确的结果挂钩
- 暴露未排序项目的原因
- 捕获依赖关系和排序风险

## 后续步骤

- 对最高路线图切片运行 `/write-prd`
- 对高度不确定的倡议运行 `/discover`
