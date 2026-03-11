# 阶段 07：生产部署

## 目标
使用 Nginx 完整配置、环境变量和可选的 Tomcat WAR 部署完成生产部署。

## 先决条件
- 第 05 阶段完成（前端构建，Nginx 在暂存中正确服务）
- 后端 jar/war 经过测试并正常工作
- 安装了 JDK、MySQL、Redis、Nginx 的生产服务器

## 执行步骤

### 步骤一：配置环境变量

管理特定于环境的配置的错误和正确方法。

❌ **错误的方法**：在源代码中硬编码 API URL 或使用无前缀的环境变量
```bash
# Wrong: env vars without VUE_APP_ prefix are NOT injected by webpack
API_BASE_URL=http://prod.example.com
BASE_URL=http://prod.example.com
```

✅ **正确方法**：定义变量 `.env.production` 和 `VUE_APP_` 前缀
```bash
# .env.production - Production environment config
# All variables MUST start with VUE_APP_ to be injected

VUE_APP_BASE_API = '/prod-api'
VUE_APP_TITLE = 'RuoYi Management System'

# .env.development - Development environment config
# VUE_APP_BASE_API = '/dev-api'

# Access in code:
# console.log(process.env.VUE_APP_BASE_API)
# console.log(process.env.VUE_APP_TITLE)

# After modifying .env files, MUST restart dev server
# npm run dev   (development)
# npm run build:prod  (rebuild for production)
```

⚠️ **陷阱**：修改 `.env.production` 无需重建 -> 更改无效；环境变量在构建时烘焙到包中，而不是在运行时读取

### 第 2 步：完整的 Nginx 生产配置

完整 Nginx 生产设置的错误和正确方法。

❌ **错误的方法**：使用最小的 Nginx 配置，没有安全标头或正确的工作设置
```nginx
# Wrong: single worker, no keepalive tuning, no security headers
worker_processes 1;
http {
    server {
        listen 80;
        location / {
            root /var/www/html;
        }
    }
}
```

✅ **正确方法**：完成 `nginx.conf` 具有工作人员、Gzip、代理和 SPA 路由
```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    # Gzip compression
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 16 64K;
    gzip_http_version 1.1;
    gzip_comp_level 5;
    gzip_types text/plain application/x-javascript
               text/css application/xml
               application/javascript;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    server {
        listen       80;
        server_name  your-domain.com;
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
            proxy_set_header X-Forwarded-For
                             $proxy_add_x_forwarded_for;
            proxy_pass http://localhost:8080/;
        }

        error_page  500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

⚠️ **陷阱**：缺失 `proxy_set_header X-Forwarded-For` -> 后端 `@Log` 注释中记录的是Nginx IP而不是真实的客户端IP `sys_oper_log` 桌子

### 步骤 3：Tomcat WAR 部署（替代）

在 Tomcat 中将前端部署为 WAR 的错误和正确方法。

❌ **错误的做法**：放置 `dist/` 直接在Tomcat中保存文件 `webapps/` 没有 `WEB-INF/web.xml`
```bash
# Wrong: Tomcat cannot handle SPA routing without web.xml error-page
cp -r dist/* /opt/tomcat/webapps/ROOT/
# Result: page refresh returns Tomcat 404 page
```

✅ **正确方法**：添加 `WEB-INF/web.xml` 在 `dist/` 使用 404 到索引重定向，配置 `server.xml`
```xml
<!-- Step 1: server.xml - Add Context in Host node -->
<Context docBase="" path="/" reloadable="true" source=""/>

<!-- Step 2: Create dist/WEB-INF/web.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
        http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
        version="3.1" metadata-complete="true">
    <display-name>Router for Tomcat</display-name>
    <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>
</web-app>
```

⚠️ **陷阱**：忘记 `error-page` 404 映射 -> Tomcat 返回其默认 404 页面，而不是路由到 Vue SPA `index.html`

### 第 4 步：后端生产运行配置

在生产中运行后端 jar 的错误和正确方法。

❌ **错误的方法**：在前台终端会话中运行 jar
```bash
# Wrong: process dies when SSH session disconnects
java -jar ruoyi-admin.jar
```

✅ **正确方法**：作为后台服务运行，并进行日志记录和正确的 JVM 设置
```bash
# Option 1: nohup with output redirect
nohup java -jar ruoyi-admin.jar \
  --spring.profiles.active=druid \
  > /home/ruoyi/logs/ruoyi.log 2>&1 &

# Option 2: systemd service (recommended)
# /etc/systemd/system/ruoyi.service
# [Unit]
# Description=RuoYi Backend
# After=network.target mysql.service redis.service
# [Service]
# Type=simple
# User=ruoyi
# ExecStart=/usr/bin/java -jar /home/ruoyi/ruoyi-admin.jar
# Restart=on-failure
# [Install]
# WantedBy=multi-user.target

# Verify backend is running
curl http://localhost:8080/captchaImage
```

⚠️ **陷阱**：不检查 `application.yml` `profile` 和 `logback.xml` `log.path` 对于生产服务器上的写权限 -> 文件上传或日志轮转时出现 FileNotFoundException

## 完成标准
- Nginx 在启用了 Gzip 的情况下在端口 80 上为前端提供服务
- `/prod-api/` 在端口 8080 上请求代理到后端
- 环境变量正确地融入到前端包中
- 后端作为后台进程/systemd 服务运行
- `卷曲 http://your-domain.com/` 返回 Vue SPA
- `卷曲 http://your-domain.com/prod-api/captchaImage` 返回有效的 JSON

## 下一步
-> [最佳实践](../best-practices.md)
