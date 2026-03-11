# 第 01 阶段：Docker Compose 部署

## 目标
使用 Docker Compose 进行一命令生产部署，部署 RuoYi-Vue 应用程序堆栈（MySQL、Redis、后端服务器、Nginx）。

## 先决条件
- 安装了 Docker 和 Docker Compose (`docker version` 和 `docker-compose --version`)
- 构建后端 JAR (`mvn package -DskipTests`)
- 前端分布构建（`npm run build:prod`)

## 执行步骤

### 第1步：准备Docker目录结构

❌ **错误的做法**：将所有文件平放在一个目录中，没有组织结构。
```text
# Wrong: unorganized layout
/deploy/
  ruoyi-admin.jar
  docker-compose.yml
  ry_20xx.sql
  nginx.conf
  redis.conf
  dist/
```

✅ **正确方法**：组织成逻辑子目录。
```text
/docker/
  docker-compose.yml
  db/
    ry_20240101.sql          # Database init script
  jar/
    ruoyi-admin.jar          # Backend application
  conf/
    nginx.conf               # Nginx configuration
    redis.conf               # Redis configuration
  html/
    dist/                    # Frontend build output
      index.html
      static/
  dockerfile                 # Java app Dockerfile
```

⚠️ **陷阱**：数据库脚本必须以 `SET NAMES 'utf8';` 防止Docker MySQL初始化时出现中文乱码。

### 步骤2：配置docker-compose.yml

❌ **错误的方法**：使用 `localhost` 用于服务间通信。
```yaml
# Wrong: containers cannot resolve localhost to each other
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ry-vue
  redis:
    host: localhost
```

✅ **正确方法**：使用 Docker 服务名称作为主机名。
```yaml
version: "3"
services:
  ruoyi-mysql:
    image: mysql:5.7
    container_name: ruoyi-mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: ry-vue
    volumes:
      - ./db:/docker-entrypoint-initdb.d
      - ./mysql/data:/var/lib/mysql
    ports:
      - "3306:3306"
    command: --character-set-server=utf8mb4

  ruoyi-redis:
    image: redis
    container_name: ruoyi-redis
    volumes:
      - ./conf/redis.conf:/etc/redis/redis.conf
    ports:
      - "6379:6379"
    command: redis-server /etc/redis/redis.conf

  ruoyi-server:
    build:
      context: .
      dockerfile: dockerfile
    container_name: ruoyi-server
    ports:
      - "8080:8080"
    depends_on:
      - ruoyi-mysql
      - ruoyi-redis

  ruoyi-nginx:
    image: nginx
    container_name: ruoyi-nginx
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf
      - ./html/dist:/home/ruoyi/projects/ruoyi-ui
    ports:
      - "80:80"
    depends_on:
      - ruoyi-server
```

⚠️ **陷阱**： `depends_on` 仅等待容器启动，而不等待服务准备就绪。服务器启动时 MySQL 可能尚未准备好。在应用程序中使用运行状况检查或启动重试。

### 第 3 步：创建 Dockerfile 并更新应用程序配置

❌ **错误的方法**：在 Dockerfile COPY 命令中使用错误的 JAR 文件名。
```dockerfile
# Wrong: filename mismatch causes build failure
FROM java:8
COPY ./jar/ruoyi.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

✅ **正确方法**：匹配确切的 JAR 文件名并设置时区。
```dockerfile
FROM java:8
COPY ./jar/ruoyi-admin.jar /app.jar
ENV TZ=Asia/Shanghai
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

更新 `application-druid.yml` 使用 Docker 服务名称：
```yaml
spring:
  datasource:
    druid:
      master:
        url: jdbc:mysql://ruoyi-mysql:3306/ry-vue?useUnicode=true
  redis:
    host: ruoyi-redis
    port: 6379
```

⚠️ **陷阱**：Dockerfile 中的 JAR 文件名必须与中的文件完全匹配 `./jar/`。后 `mvn package`，默认名称是 `ruoyi-admin.jar` -- 验证 `ls jar/` 在建造之前。

### 第 4 步：构建并启动

```bash
# Build all images
docker-compose build

# Start all services (detached)
docker-compose up -d

# Verify all containers are running
docker-compose ps

# Check logs if server fails to start
docker-compose logs ruoyi-server
```

⚠️ **陷阱**：如果服务器容器立即退出，请检查 `docker-compose logs ruoyi-server` MySQL 连接拒绝错误。等待30秒后 `docker-compose up` 让 MySQL 初始化，然后重新启动服务器： `docker-compose restart ruoyi-server`.

## 完成标准
- 所有 4 个容器都在运行： `ruoyi-mysql`, `ruoyi-redis`, `ruoyi-server`, `ruoyi-nginx`
- 访问`http://localhost:80` 显示若一登录页面
- 登录成功，后端API通过Nginx代理响应
- 数据通过安装的卷在容器重新启动时保留

## 下一步
-> [03-数据库开关.md](./03-database-switch.md)
