# 侦察与策略选择

## 侦察目标

在正式抓取前，最少确认以下五类信息：

1. 渲染方式：静态 HTML、SSR、CSR、混合渲染。
2. 数据入口：HTML、XHR / Fetch、GraphQL、内嵌 JSON、站点地图。
3. 列表推进方式：页码、滚动、按钮、游标分页。
4. 保护机制：登录、Cookie、Cloudflare、验证码、频率限制。
5. 输出要求：字段、去重键、样本规模、最终格式。

## 推荐侦察顺序

### 1. 浏览器打开真实页面

观察：
- 首屏是否立刻出内容。
- 打开开发者工具后是否持续发接口请求。
- 滚动、筛选、搜索、分页是否触发网络请求。

### 2. 检查 sitemap

优先检查：
- `/robots.txt`
- `/sitemap.xml`
- `/sitemap_index.xml`

只要 sitemap 能提供完整 URL 清单，就不要用页面点击去“爬出”所有详情页。

### 3. 检查 API

重点关注：
- `/api/`
- `/graphql`
- `/_next/data/`
- 返回 JSON 的 XHR / Fetch 请求

判断标准：
- 是否能直接拿到完整字段。
- 是否有分页参数。
- 是否受 Cookie / token 限制。

### 4. 决策抓取策略

优先级如下：

1. `Sitemap + API`
2. `API`
3. `Sitemap + HTML`
4. `静态 HTML`
5. `浏览器自动化`
6. `混合回退`

## 推荐输出模板

```markdown
站点: example.com
渲染: Next.js + 客户端补数据
数据入口: GET /api/items?page=1
分页方式: page + pageSize
阻断情况: 无登录，60/min 后开始限流
推荐方案: API 直取详情，浏览器只用于验证
先验证: 抓 10 条记录，确认字段完整和分页总数
```
