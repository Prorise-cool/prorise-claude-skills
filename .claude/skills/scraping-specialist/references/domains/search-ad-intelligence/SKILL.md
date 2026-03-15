---
name: google-serp-ad-intelligence
description: 当需要抓取 Google 搜索广告、分析竞品广告文案、按关键词和地域观察 Google Ads SERP、做 PPC 竞品情报或零 API 成本的广告页采集时使用。适用于“抓某地区这些关键词的广告”“分析竞品广告怎么写”“查看 Google Ads 版位和附加信息”等场景，执行脚本位于 `scripts/scrape-ads-playwright.cjs`。
---

<!-- AUTO-GENERATED-RESOURCE-MAP:START -->

### Resource Map

> 基准路径: `.claude/skills/scraping-specialist/references/domains/search-ad-intelligence/`

```
search-ad-intelligence/
├── scripts/
│   └── scrape-ads-playwright.cjs
├── package.json
└── SKILL.md
```

<!-- AUTO-GENERATED-RESOURCE-MAP:END -->

# Google SERP 广告情报采集

此技能用于抓取真实搜索结果中的 Google Ads，并生成可用于 PPC 竞品分析的结构化输出。

## 启动前收集

一次性确认：

- `client name`：客户或项目名，用于输出目录
- `keywords`：逗号分隔的关键词
- `location`：`City,State/Region,Country`
- `proxy`：当抓取目标国家与当前 IP 不一致时使用

## 关键前提

- 需要 Node.js 18+
- 需要安装依赖，首次进入当前目录执行：

```bash
npm install
```

- 抓跨国广告时，通常必须使用目标国家 VPN 或代理，否则可能返回 0 条广告

## 执行方式

```bash
node scripts/scrape-ads-playwright.cjs <client-name> \
  --keywords "keyword 1,keyword 2" \
  --location "City,State,Country"
```

如果需要代理：

```bash
node scripts/scrape-ads-playwright.cjs <client-name> \
  --keywords "keyword 1,keyword 2" \
  --location "City,State,Country" \
  --proxy "socks5://127.0.0.1:1080"
```

## 输出结果

默认输出到 `clients/<client>/ads/`：

- `raw_ads_YYYY-MM-DD.json`
- `ads_data_YYYY-MM-DD.json`
- `ads_summary_YYYY-MM-DD.md`

## 采集后应该回报

- 共抓到多少广告
- 涉及多少唯一竞品域名
- 高频广告文案模式
- 明显的价格、紧迫感、社证或地域性诉求
