# Firecrawl 命令速查

## 安装与认证

```bash
npm install -g firecrawl-cli
firecrawl --status
firecrawl login --browser
```

## 推荐升级顺序

1. `search`
2. `scrape`
3. `map`
4. `crawl`
5. `browser`

## 常用命令

### 搜索

```bash
firecrawl search "nextjs auth docs" --json -o .firecrawl/search-nextjs-auth.json
```

### 抓单页

```bash
firecrawl scrape "https://example.com" --only-main-content -o .firecrawl/example.md
```

### 结构化提取

```bash
firecrawl agent "Extract product info" --urls "https://example.com/product" --schema-file ./schema.json --wait -o .firecrawl/product.json
```

### 站点映射

```bash
firecrawl map "https://docs.example.com" --search "authentication" --json -o .firecrawl/docs-auth.json
```

### 整站 crawl

```bash
firecrawl crawl "https://docs.example.com" --include-paths /docs --limit 100 --wait -o .firecrawl/docs-crawl.json
```

## 经验规则

- URL 一律加引号，避免 shell 吃掉 `?` 和 `&`。
- 结果尽量输出到 `.firecrawl/`。
- 站点很大时不要先 crawl 全站，先 `map --search` 缩小范围。
- 需要 JS 渲染时再加等待或浏览器模式。
