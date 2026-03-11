# 最佳实践：环境设置

## 常见陷阱和解决方案

### 1.Mac文件路径配置错误

**触发器**：使用默认值 `application.yml` 在 macOS 上无需修改 `profile` 小路。

**现象**：文件上传返回500错误； `FileNotFoundException` 在日志中。

**修复**：更改 `ruoyi.profile` 从 `D:/ruoyi/uploadPath` 到 `/Users/<name>/ruoyi/uploadPath` 或另一个有效的 Unix 路径。还要验证 `logback.xml` `log.path` 是可写的。

### 2. Linux 区分大小写的表名

**触发器**：在Linux上部署MySQL，表名匹配默认区分大小写。

**症状**： `Table 'ry-vue.SYS_USER' doesn't exist` 尽管表存在错误 `sys_user`.

**修复**：添加 `lower_case_table_names=1` 在 `/etc/my.cnf` 在下面 `[mysqld]` 部分并重新启动 MySQL。为了保持一致的行为，必须在创建数据库之前应用此设置。

### 3. cnpm依赖问题

**触发**：使用 `cnpm install` 直接代替 npm 并覆盖注册表。

**症状**：随机构建失败、缺少对等依赖项、不一致 `node_modules` 结构。

**修复**：始终使用 `npm install --registry=https://registry.npmmirror.com`. 切勿直接使用 cnpm。

### 4.前端和后端必须同时运行

**触发器**：开发时仅启动前端或仅启动后端。

**症状**：登录页面加载，但 API 调用因网络错误而失败；或后端运行但无法访问 UI。

**修复**：两个服务必须同时运行。后端在端口 8080 上，前端开发服务器在端口 80 上。前端代理 `/dev-api/` 到后端。

### 5.环境变量命名约定

**触发器**：创建不需要的环境变量 `VUE_APP_` 前缀。

**症状**： `process.env.MY_VAR` 回报 `undefined` 在 Vue 代码中。

**修复**：所有自定义环境变量必须以 `VUE_APP_`。将它们定义在 `.env.development`, `.env.production`， 或者 `.env.staging`。更改后重新启动开发服务器或重建。

### 6. 需要Redis连接

**触发器**：尝试在没有运行 Redis 的情况下启动后端。

**症状**：应用程序启动失败 `RedisConnectionFailureException`.

**修复**：确保 Redis 正在配置的主机/端口上运行 `application.yml` (`spring.redis.host`, `spring.redis.port`）。默认为 `localhost:6379`.

### 7. 缺少quartz.sql导入

**触发器**：仅导入 `ry_2021xxxx.sql` 并跳过 `quartz.sql`.

**症状**：应用程序启动但计划任务失败 `Table 'ry-vue.QRTZ_LOCKS' doesn't exist`.

**修复**：将两个 SQL 文件导入到 `ry-vue` 数据库： `ry_2021xxxx.sql` 对于系统表和 `quartz.sql` 用于调度表。

## 部署清单

### 开发环境
- [ ] 已安装 JDK >= 1.8（Boot 2.x 为 1.8，Boot 3.x 为 17+）
- [ ] MySQL >= 5.7 正在运行， `ry-vue` 数据库已创建
- [ ] 两个都 `ry_2021xxxx.sql` 和 `quartz.sql` 进口的
- [ ] Redis >= 3.0 在配置的端口上运行
- [ ] 已安装 Maven >= 3.0
- [ ] 已安装节点 >= 12，已配置 npm 注册表
- [ ] `application-druid.yml` 数据库凭据已更新
- [ ] `application.yml` `profile` 对当前操作系统有效的路径

### 生产部署
- [ ] 后端 jar 作为后台进程或 systemd 服务运行
- [ ] 前端构建 `npm run build:prod`
- [ ] `vue.config.js` `publicPath` 匹配部署路径
- [ ] `.env.production` 正确设置的变量 `VUE_APP_` 前缀
- [ ] Nginx 配置为 `try_files` 用于 SPA 路由
- [ ] nginx `/prod-api/` 代理指向后端端口
- [ ] Nginx 中启用 Gzip 压缩 `http` 堵塞
- [ ] 文件上传路径（`ruoyi.profile`) 具有读/写权限
- [ ] 日志路径（`logback.xml` `log.path`) 有写权限

## 配置快速参考

| 配置文件 | 主要特性 | 目的 |
|---|---|---|
| `application.yml` | `ruoyi.profile`, `server.port`, `spring.redis.*` | 服务器、文件路径、Redis |
| `application-druid.yml` | `spring.datasource.druid.master.*` | 数据库连接 |
| `.env.production` | `VUE_APP_BASE_API` | 前端 API 端点 |
| `vue.config.js` | `publicPath`, `outputDir` | 构建输出配置 |
| `nginx.conf` | `proxy_pass`, `try_files`, `gzip` | 反向代理、SPA路由 |
