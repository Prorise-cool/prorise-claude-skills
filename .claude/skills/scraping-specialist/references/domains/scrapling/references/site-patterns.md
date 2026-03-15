# 站点抓取模式经验库

每次成功抓取新类型站点后，Agent 应提示用户是否将经验追加到此文件。

---

## Discourse 论坛 (linux.do, meta.discourse.org 等)

**站点特征**: Cloudflare 保护 + Ember.js SPA + 登录态区分
**推荐 Fetcher**: StealthyFetcher
**关键参数**:
- `solve_cloudflare=True` — 必须
- `network_idle=True` — 等待 Ember 渲染完成
- `timeout=60000` — CF 验证耗时长，至少 60 秒（毫秒单位）
**登录 cookie 字段**: `_forum_session`, `_t`
**不需要**: `cf_clearance`（StealthyFetcher 自动获取）
**JSON API**: `/t/topic/{id}.json`（需过 CF 后才可用）
**选择器参考**:
- 帖子列表: `.topic-post`
- 作者: `[data-user-card]::attr(data-user-card)`
- 内容: `.cooked` → `.get_all_text(strip=True)`

---

## 静态博客/文档站 (GitHub Pages, Hugo, Jekyll)

**站点特征**: 纯静态 HTML，无 JS 渲染依赖，无反爬
**推荐 Fetcher**: Fetcher（最快）
**关键参数**: `impersonate='chrome'`, `timeout=30`
**选择器参考**: `article`, `.content`, `.post-body`

---

## SPA 应用 (React/Vue/Next.js)

**站点特征**: JS 渲染，内容不在初始 HTML 中
**推荐 Fetcher**: DynamicFetcher
**关键参数**:
- `network_idle=True` — 等待 API 请求完成
- `wait_selector='.content-loaded'` — 等待关键元素（按实际调整）
- `disable_resources=True` — 跳过字体/图片加速
**备注**: 优先检查是否有 API 端点可直接用 Fetcher 请求（更快更稳定）

---

## API 端点 (REST/GraphQL)

**站点特征**: 返回 JSON，无需解析 HTML
**推荐 Fetcher**: Fetcher
**关键参数**: `impersonate='chrome'`, 自定义 `headers`
**处理方式**: `page.text` 获取 JSON → `json.loads()` 解析
**备注**: 如果 API 有反爬，可能需要带 Referer/Origin 等 header

---

## TAPD 项目管理 (tapd.cn)

**站点特征**: React SPA + 企业登录态 + 分页懒加载（"展开更多"按钮）
**推荐方案**: Playwright 直接控制（非 scrapling Fetcher）
**原因**: DynamicFetcher 可渲染首屏但无法点击交互；scrapling Fetcher 调 API 时 `page.text` 始终为空；curl 可达 API 但返回 500（需浏览器环境的 CSRF 校验）
**关键流程**:
1. Playwright + cookies 加载页面，`wait_until='networkidle'`
2. 循环点击"展开更多"按钮加载全部数据
3. `page.inner_text('body')` 提取纯文本，按行解析
**Cookie 格式**: `list[dict]`，必填 `name/value/domain/path`，domain 为 `.tapd.cn`
**API 端点**（参考，浏览器内部使用）: `POST /api/my_worktable/my_worktable/get_my_worktable_by_page`
**CSRF**: cookie `dsc-token` 的值需作为 `DSC-TOKEN` header 发送（由 axios interceptor 自动添加）
**已知限制**: scrapling Fetcher 对 TAPD API 返回空响应（`page.text` 为空），需用 Playwright 或 curl
**数据结构**: 文本按行排列，类型前缀(P/E/PROGRAM/TEST/BUG) → 标题 → 状态 → 优先级 → ...

---

## 模板：添加新站点模式

复制以下模板，替换具体内容后追加到此文件：

```markdown
## 站点名称/类型 (代表域名)

**站点特征**: 描述
**推荐 Fetcher**: Fetcher / StealthyFetcher / DynamicFetcher
**关键参数**:
- `参数名=值` — 说明
**选择器参考**: CSS 选择器示例
**备注**: 踩坑经验
```
