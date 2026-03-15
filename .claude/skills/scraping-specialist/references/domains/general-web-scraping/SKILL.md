---
name: web-scraping-playbook
description: 当需要对任意网站制定抓取方案、做站点侦察、发现 sitemap 或 API、选择最优抓取路径、处理 403/Cloudflare/限流，或把抓取逻辑升级为可维护的生产方案时使用。适用于“抓这个站”“先判断有没有接口”“被反爬挡住了”“把这个抓取流程做成可持续运行的 scraper” 等场景。
---

<!-- AUTO-GENERATED-RESOURCE-MAP:START -->

### Resource Map

> 基准路径: `.claude/skills/scraping-specialist/references/domains/general-web-scraping/`

```
general-web-scraping/
├── references/
│   ├── anti-blocking-and-production.md
│   └── reconnaissance-and-strategy.md
└── SKILL.md
```

<!-- AUTO-GENERATED-RESOURCE-MAP:END -->

# 通用网站抓取作战手册

此技能用于陌生站点的第一轮判断与实施路线设计。目标不是立刻写大量代码，而是先确认最省成本、最稳的抓取路径。

## 使用原则

1. 先侦察，再实现。不要在未知页面结构上直接开写抓取代码。
2. 优先级遵循 `Sitemap > API > 轻量 HTTP 抓取 > 浏览器抓取 > 混合策略`。
3. 先用 5 到 10 条样本做小批量验证，再放大到全量。
4. 只有在确认站点需要时，才升级到代理、指纹、会话轮换或浏览器自动化。

## 标准流程

### 1. 站点侦察

优先读取 [侦察与策略选择](references/reconnaissance-and-strategy.md)。

需要确认：
- 页面是 SSR、静态 HTML 还是前端渲染 SPA。
- 数据是否直接来自 XHR / Fetch / GraphQL 接口。
- 是否存在 `robots.txt`、`sitemap.xml`、`sitemap_index.xml`。
- 列表页分页方式是 URL、API、滚动还是按钮加载。
- 是否存在登录、验证码、Cloudflare、速率限制、指纹检测。

### 2. 选择抓取路线

- 有 `sitemap` 时，优先从 sitemap 获取 URL 清单。
- 有稳定 JSON / GraphQL 接口时，优先走接口提取。
- 页面静态且结构稳定时，可考虑轻量 HTTP 抓取。
- 页面依赖 JS 执行、滚动、点击或登录态时，再使用浏览器自动化。
- URL 清单与详情数据分离时，采用混合路线，例如“sitemap 找 URL，API 取详情”。

### 3. 小批量验证

- 先抓 5 到 10 条记录。
- 核对字段是否完整、选择器是否稳定、分页是否准确、是否存在重复。
- 只在验证通过后再扩到全量。

### 4. 阻断与反爬处理

遇到 403、429、Cloudflare、验证码或空数据时，读取 [反爬、质量与生产化要点](references/anti-blocking-and-production.md)。

### 5. 生产化

当用户明确要求“长期运行”“部署”“Actor 化”“自动化调度”时，再进入生产化步骤：
- 规范输入输出。
- 增加重试、日志、断点续跑和失败处理。
- 必要时迁移到 Apify / Crawlee 或项目内稳定任务系统。

## 何时切换到专门子技能

- 已明确要用 Firecrawl 做搜索、抓单页、站点映射或整站 crawl 时，转入 `firecrawl-web-extraction`。
- 需要 Python 级 fetcher 选择、Cloudflare 绕过、会话登录或直接基于模板生成脚本时，转入 `scrapling-web-scraper`。
- 需要 `crwl` CLI、多 URL 并发、Markdown 流水线或 schema 化抽取时，转入 `crawl4ai-pipeline-builder`。

## 输出要求

在任何正式实现前，先形成一个最小侦察结论：

- 站点类型
- 数据入口
- 推荐策略
- 预期阻力
- 先做的小批量验证方案

没有这五项，不要直接跳到大规模抓取。
