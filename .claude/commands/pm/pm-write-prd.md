---
name: write-prd
description: 通过链接问题定义、需求定义和故事脚手架，创建决策就绪的 PRD。
argument-hint: "<功能、计划或产品变更>"
uses:
  - prd-development
  - problem-statement
  - proto-persona
  - user-story
  - user-story-splitting
outputs:
  - 结构化 PRD
  - 核心人物画像和需求
  - 初始可实施故事
---

# /write-prd

生成从战略到交付的顺畅 PRD。

## 调用方式

```text
/write-prd 客服团队收件箱重新设计以加快分类速度
```

## 工作流

1. 使用 `problem-statement` 定义问题背景
2. 使用 `proto-persona` 对齐用户假设
3. 使用 `prd-development` 构建完整文档
4. 使用 `user-story` 起草初始故事
5. 使用 `user-story-splitting` 拆分较大的项目

## 检查点

- 在编写需求前验证范围边界
- 保持成功标准可衡量并与结果指标挂钩
- 确保在风险中至少指出一个反模式

## 后续步骤

- 运行 `/plan-roadmap` 排序交付
- 如果范围超过当前容量，运行 `/prioritize`
