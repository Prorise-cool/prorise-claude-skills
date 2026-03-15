---
name: structured-web-data-extractor
description: 当需要把网页目录、联系人、校友录、参会者、商家列表、会员名录、公司列表或分页列表页数据提取成 CSV、JSON 或表格时使用。适用于“把这个页面所有记录抓成表格”“抓取登录后的名录”“批量导出目录页数据”“提取滚动加载列表”等场景，优先使用 Playwright MCP。
---

<!-- AUTO-GENERATED-RESOURCE-MAP:START -->

### Resource Map

> 基准路径: `.claude/skills/scraping-specialist/references/domains/structured-extraction/`

```
structured-extraction/
├── scripts/
│   └── setup.sh
└── SKILL.md
```

<!-- AUTO-GENERATED-RESOURCE-MAP:END -->

# 结构化网页数据提取

此技能专注于“把网页上的一批记录整理成结构化输出”。它适合目录页、滚动列表、分页列表和轻度登录站点，不适合先做大规模侦察或处理复杂反爬。

## 启动前检查

1. 确认当前环境有可用的 Playwright MCP / 浏览器自动化能力。
2. 如果用户是第一次使用，或提到环境没配好，先执行：

```bash
bash scripts/setup.sh
```

## 一次性收集的输入

开始抓取前，一次性确认：

- 目标 URL
- 要提取的字段
- 结果格式：CSV / JSON / Markdown 表
- 是否需要登录
- 分页范围或最大记录数
- 去重键，例如 `profile_url`、`email`、`company_name`

## 推荐流程

### 1. 验证页面结构

- 打开页面，确认记录卡片的稳定选择器。
- 判断是页码分页、滚动加载还是按钮加载。
- 先抓 3 到 5 条样本，确认字段都能取到。

### 2. 建立字段映射

对于每条记录，至少明确：

- 标题字段
- 次级字段
- 跳转链接
- 去重字段
- 可选扩展字段

### 3. 执行批量采集

- 分页抓取或滚动抓取。
- 每页都先解析为同一数据结构。
- 进入下一页前先做去重。

### 4. 输出与复核

- CSV：适合名录、线索、清单导出。
- JSON：适合后续自动化处理。
- Markdown 表：适合少量人工复核。

## 质量要求

- 不接受字段列错位。
- 不接受分页重复。
- 登录态页面必须在用户授权的前提下操作。
- 样本验证不过时，不要直接放大规模。
