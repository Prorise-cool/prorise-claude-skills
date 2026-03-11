---
name: scraping-specialist
description: 提供网站抓取、结构化数据提取、浏览器自动化、站点映射、搜索广告情报、社媒内容采集、评论分析与垂直站点采集能力。当任务涉及 scrape、crawl、extract、抓取网页、批量采集、Firecrawl、Playwright、Google Ads SERP、Facebook Ad Library、X/Twitter、Trustpilot 或求职平台数据采集时使用。
---
# Scraping Specialist

提供网站抓取、结构化数据提取、浏览器自动化、站点映射、搜索广告情报、社媒内容采集、评论分析与垂直站点采集能力。当任务涉及 scrape、crawl、extract、抓取网页、批量采集、Firecrawl、Playwright、Google Ads SERP、Facebook Ad Library、X/Twitter、Trustpilot 或求职平台数据采集时使用。

## Domain Index

- `references/domains/general-web-scraping/`
- `references/domains/structured-extraction/`
- `references/domains/firecrawl/`
- `references/domains/search-ad-intelligence/`
- `references/domains/facebook-ad-library/`
- `references/domains/social-intelligence/`
- `references/domains/review-intelligence/`
- `references/domains/job-platforms/`

## Skill Index

<!-- AUTO-GENERATED-SKILL-INDEX:START -->
以下索引由 `node scripts/update-skill-index.js` 自动生成，用于让 Claude 在顶层专家触发后继续路由到最相关的子技能。

### Claude 使用说明

1. 先将用户当前任务与每个子技能的 `触发语义` 进行语义匹配，不要只看目录名。
2. 一旦找到最相关的子技能，立即打开其 `相对路径` 指向的 `SKILL.md`，把它作为下一层入口文件。
3. 进入子技能后，再根据该子技能自己的说明按需加载同目录下的 `references/`、`scripts/`、`assets/`，不要在顶层专家中预先展开大段细节。
4. 如果多个子技能都相关，先加载最贴近主目标的那个，再按需补充其他子技能，避免一次性加载过多上下文。
5. 下方 `相对路径` 均相对于当前顶层专家目录。

### 子技能索引

#### facebook-ad-library (1)
- `facebook-ad-library-scraper`
  - 触发语义: 当需要抓取 Facebook Ad Library 广告素材、下载图片和视频、提取转写内容、整理品牌广告素材库或分析竞品创意形式时使用。适用于“抓 Facebook 广告库”“把某品牌广告素材存下来”“分析广告视频文案和创意样式”等场景。
  - 相对路径: `references/domains/facebook-ad-library/SKILL.md`

#### firecrawl (1)
- `firecrawl-web-extraction`
  - 触发语义: 当需要使用 Firecrawl 完成网页搜索、单页抓取、结构化提取、截图、URL 映射、整站 crawl 或 JavaScript 渲染页面内容提取时使用。适用于“搜索并抓网页内容”“提取某个 URL 的主体内容”“把网页字段按 schema 抽出来”“批量抓文档站”以及需要 Firecrawl CLI 的场景。
  - 相对路径: `references/domains/firecrawl/SKILL.md`

#### general-web-scraping (1)
- `web-scraping-playbook`
  - 触发语义: 当需要对任意网站制定抓取方案、做站点侦察、发现 sitemap 或 API、选择最优抓取路径、处理 403/Cloudflare/限流，或把抓取逻辑升级为可维护的生产方案时使用。适用于“抓这个站”“先判断有没有接口”“被反爬挡住了”“把这个抓取流程做成可持续运行的 scraper” 等场景。
  - 相对路径: `references/domains/general-web-scraping/SKILL.md`

#### job-platforms (1)
- `taiwan-job-platform-scraper`
  - 触发语义: 当需要抓取台湾求职平台的职位列表、跨站汇总 104、CakeResume、Yourator 的岗位信息，或按关键词和地点整理职位样本时使用。适用于“搜前端工程师职位”“整理台湾招聘市场样本”“对比多个求职平台结果”等场景。
  - 相对路径: `references/domains/job-platforms/SKILL.md`

#### review-intelligence (1)
- `trustpilot-review-intelligence`
  - 触发语义: 当需要抓取 Trustpilot 评论、分析评分分布、提炼正负面主题、生成竞品口碑洞察或为广告与转化文案提供评论情报时使用。适用于“抓某品牌 Trustpilot 评论”“分析差评主题”“导出评论 CSV/JSON”“做口碑竞品研究”等场景，脚本位于 `scripts/tpscraper.js`。
  - 相对路径: `references/domains/review-intelligence/SKILL.md`

#### search-ad-intelligence (1)
- `google-serp-ad-intelligence`
  - 触发语义: 当需要抓取 Google 搜索广告、分析竞品广告文案、按关键词和地域观察 Google Ads SERP、做 PPC 竞品情报或零 API 成本的广告页采集时使用。适用于“抓某地区这些关键词的广告”“分析竞品广告怎么写”“查看 Google Ads 版位和附加信息”等场景，执行脚本位于 `scripts/scrape-ads-playwright.cjs`。
  - 相对路径: `references/domains/search-ad-intelligence/SKILL.md`

#### social-intelligence (1)
- `x-topic-intelligence`
  - 触发语义: 当需要在 X/Twitter 上围绕某个主题收集热门帖子、趋势讨论、KOL 内容、钩子写法、回复驱动内容或社媒情报数据集时使用。适用于内容调研、舆情研究、话题扫描、社媒竞品观察和内容机会分析等场景，优先快速模式，深入采集时再做多轮 DOM 抓取。
  - 相对路径: `references/domains/social-intelligence/SKILL.md`

#### structured-extraction (1)
- `structured-web-data-extractor`
  - 触发语义: 当需要把网页目录、联系人、校友录、参会者、商家列表、会员名录、公司列表或分页列表页数据提取成 CSV、JSON 或表格时使用。适用于“把这个页面所有记录抓成表格”“抓取登录后的名录”“批量导出目录页数据”“提取滚动加载列表”等场景，优先使用 Playwright MCP。
  - 相对路径: `references/domains/structured-extraction/SKILL.md`

<!-- AUTO-GENERATED-SKILL-INDEX:END -->

## Notes

- 顶层 `SKILL.md` 只负责路由，不在这里展开具体抓取脚本和长篇战术说明。
- 优先根据任务语义匹配子技能，再进入对应目录按需读取 `references/` 或执行 `scripts/`。
- 遇到陌生站点时，优先进入通用抓取子技能，先做侦察与策略选择，再决定是否转入 Firecrawl、浏览器自动化或垂直场景子技能。
