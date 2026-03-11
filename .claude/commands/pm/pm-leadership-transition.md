---
name: leadership-transition
description: 指导 PM 到 Director 再到 VP/CPO 的转变规划，包含角色适配诊断和入职指导。
argument-hint: "<当前角色、目标角色和转变场景>"
uses:
  - altitude-horizon-framework
  - director-readiness-advisor
  - vp-cpo-readiness-advisor
  - executive-onboarding-playbook
outputs:
  - 转变诊断
  - 角色准备计划
  - 30-60-90 领导行动
---

# /leadership-transition

在准备或过渡产品领导角色时使用。

## 调用方式

```text
/leadership-transition 高级 PM 进入成长型 SaaS 的首个总监角色
```

## 工作流

1. 使用 `altitude-horizon-framework` 锚定领导力模型
2. 使用 `director-readiness-advisor` 诊断当前准备情况
3. 对于高管过渡，应用 `vp-cpo-readiness-advisor`
4. 使用 `executive-onboarding-playbook` 构建执行计划

## 检查点

- 明确转变摩擦实际发生在何处（范围、 horizon、系统、叙事）
- 与利益相关者澄清决策权和期望
- 为前 30-60-90 天定义基于证据的里程碑

## 后续步骤

- 每季度重新运行以重新校准
- 如果还需要重置产品方向，结合 `/strategy`
