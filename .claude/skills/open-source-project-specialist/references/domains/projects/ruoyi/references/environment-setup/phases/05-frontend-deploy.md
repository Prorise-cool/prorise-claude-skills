# 阶段 05：前端部署

## 目标
前端专为生产而构建，通过 Nginx 提供服务，并通过 API 代理连接到后端。

## 先决条件
- 第 03 阶段完成（后端在端口 8080 上运行）
- 已安装 Node >= 12，npm 可用
- Nginx安装在部署服务器上

## 执行步骤

### 第 1 步：构建生产包

构建前端的错误和正确方法。

❌ **错误方法**：部署 `npm run dev` 输出或使用错误的构建命令
```bash
# Wrong: dev server is not for production
npm run dev
# Also wrong: using build:stage for production
npm run build:stage
```

✅ **正确方法**：使用 `npm run build:prod` 生成优化的 `dist/` 文件夹
```bash
cd ruoyi-ui

# Install dependencies first
npm install --registry=https://registry.npmmirror.com

# Build production bundle
npm run build:prod

# Output structure:
# dist/
#   index.html      # Entry page
#   static/
#     css/           # Compiled stylesheets
#     js/            # Compiled JavaScript bundles
#     fonts/         # Font files
#     img/           # Image assets

# Verify dist was created
ls -la dist/
```

⚠️ **陷阱**：跑步 `npm run build:stage` 对于生产 -> 应用预发布环境变量，API 端点可能指向临时服务器

### 步骤 2：配置 publicPath 进行部署

静态资产路径配置的错误和正确方法。

❌ **错误做法**：部署到子目录而不调整 `publicPath`
```javascript
// Wrong: default publicPath '/' breaks when served from subdirectory
// vue.config.js
module.exports = {
  publicPath: '/'  // Assets fail to load at /subdir/
}
```

✅ **正确做法**：修改 `vue.config.js` `publicPath` 匹配部署路径
```javascript
// vue.config.js
module.exports = {
  publicPath: './',  // Relative path for flexible deployment
  // Or absolute: '/admin/' if deployed to /admin/ subdirectory
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
}

// For hash-based routing (avoids 404 on page refresh):
// src/router/index.js
export default new Router({
  mode: 'hash',  // Use 'hash' to avoid server-side routing issues
})
```

⚠️ **陷阱**：使用 `publicPath: '/'` 部署到子目录路径时 -> 所有 JS/CSS 引用返回 404

### 步骤 3：配置 Nginx 以服务前端和代理 API

Nginx 配置的错误和正确方法。

❌ **错误的方法**：提供静态文件而不需要 `try_files` 或 API 代理
```nginx
# Wrong: SPA routing breaks on page refresh, API calls fail
server {
    listen 80;
    location / {
        root /home/ruoyi/projects/ruoyi-ui;
        index index.html;
        # Missing: try_files for SPA routing
        # Missing: /prod-api/ proxy to backend
    }
}
```

✅ **正确的方法**：完整的 Nginx 配置 `try_files`, API 代理 `/prod-api/`和字符集
```nginx
server {
    listen       80;
    server_name  localhost;
    charset utf-8;

    location / {
        root   /home/ruoyi/projects/ruoyi-ui;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }

    location /prod-api/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:8080/;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

⚠️ **陷阱**：缺失 `try_files $uri $uri/ /index.html` -> Vue Router 历史记录模式在页面刷新或直接 URL 访问时返回 Nginx 404

### 第 4 步：启用 Gzip 压缩

Nginx 中 Gzip 的错误和正确方法。

❌ **错误方法**：跳过 Gzip 或不加区别地压缩所有文件类型
```nginx
# Wrong: compressing images wastes CPU, no size benefit
gzip on;
gzip_types *;  # Compresses everything including already-compressed images
```

✅ **正确方法**：在 Nginx 中添加 Gzip 配置 `http` 阻止定位基于文本的资产
```nginx
# Add inside http { } block in nginx.conf
gzip on;
gzip_min_length 1k;
gzip_buffers 16 64K;
gzip_http_version 1.1;
gzip_comp_level 5;
gzip_types text/plain application/x-javascript text/css
           application/xml application/javascript;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";

# Reload Nginx to apply
# nginx -s reload
```

⚠️ **陷阱**：设置 `gzip_comp_level` 至 9 -> CPU 使用率过高，且大小在 5 级以上减少；推荐范围是 4-6

## 完成标准
- `dist/` 文件夹包含 `index.html` 和 `static/` 资产
- `卷曲 http://localhost/` 返回 Vue SPA HTML
- `卷曲 http://localhost/prod-api/captchaImage` 代理到后端并返回 JSON
- 存在 Gzip 标头： `Content-Encoding: gzip` 作为回应

## 下一步
-> [阶段 07：生产部署](./07-production-deploy.md)
