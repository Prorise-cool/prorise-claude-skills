# Scrapling CLI 速查

适用于不想先写 Python 脚本，只想快速在命令行验证目标站点的场景。

## 安装

```bash
uv tool install "scrapling[shell]"
scrapling install
```

## 常用命令

### 静态页面

```bash
scrapling extract get "https://example.com" page.md
```

### JS 页面

```bash
scrapling extract fetch "https://example.com" page.md --network-idle
```

### Cloudflare / 反爬页面

```bash
scrapling extract stealthy-fetch "https://example.com" page.md --solve-cloudflare
```

### 指定 CSS 选择器

```bash
scrapling extract get "https://example.com" article.md --css-selector "article"
```

### 带 cookie

```bash
scrapling extract get "https://example.com" content.md --cookies "session=abc123; user=john"
```

## 何时不用 CLI

- 需要复杂登录流程或多步交互。
- 需要可复用、可提交的正式抓取脚本。
- 需要批量逻辑、去重、错误处理和结果持久化。
