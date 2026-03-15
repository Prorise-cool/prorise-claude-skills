# 抽取与批量策略

## 优先级

1. CSS / XPath schema 提取
2. Markdown 输出后再做规则处理
3. LLM 提取

默认先走前两种，只有页面结构太不稳定时才上 LLM。

## 常见模式

### 文档站转 Markdown

```bash
crwl https://docs.example.com -o markdown > docs.md
```

### CSS 结构化抽取

```bash
crwl https://example.com \
  -e extract_css.yml \
  -s css_schema.json \
  -o json
```

### 多 URL 批量抓取

CLI 顺序执行：

```bash
for url in url1 url2 url3; do
  crwl "$url" -o markdown
done
```

SDK 并发执行：

```python
results = await crawler.arun_many(urls, config=config)
```

### 动态内容

- 使用 `wait_for`
- 拉长 `page_timeout`
- 必要时加 `scan_full_page`
- 需要登录时配置 `session_id`

## 抓取建议

- 开发期保留缓存，验证新结果时再 `--bypass-cache`
- 页面结构明确时，永远优先 schema 提取
- 批量任务先抓 3 到 5 个 URL 做 smoke test
