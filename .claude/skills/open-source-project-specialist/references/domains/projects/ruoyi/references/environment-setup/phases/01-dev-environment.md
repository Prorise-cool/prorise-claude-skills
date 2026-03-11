# 第一阶段：搭建开发环境

## 目标
所有必需的软件（JDK、MySQL、Redis、Maven、Node）已安装并验证，准备运行 RuoYi-Vue。

## 先决条件
- 操作系统：Windows/macOS/Linux
- 访问互联网以下载依赖项
- 安装的管理员/sudo 权限

## 执行步骤

### 第1步：安装并验证JDK

JDK 设置的错误和正确方法。

❌ **错误做法**：安装任意JDK版本而不检查兼容性
```bash
# Wrong: using JDK 11+ may cause issues with Spring Boot 2.x default branch
sudo apt install default-jdk
java -version
# openjdk 17 -- may conflict with Boot 2.x dependencies
```

✅ **正确做法**：安装JDK 1.8（推荐）匹配 `RuoYi-Vue` 启动 2.x 要求
```bash
# Verify JDK >= 1.8 (recommended 1.8 for Boot 2.x branch)
java -version
# java version "1.8.0_xxx"

# For SpringBoot3 branch, use JDK 17+
# git checkout springboot3

# Set JAVA_HOME in shell profile
export JAVA_HOME=/path/to/jdk1.8
export PATH=$JAVA_HOME/bin:$PATH

# Verify Maven picks up correct JDK
mvn -version
# Apache Maven 3.x.x
# Java version: 1.8.0_xxx
```

⚠️ **陷阱**：在默认主分支 (Boot 2.x) 中使用 JDK 17+ -> 在 JDK 17 中移动到 jakarta.* 的 javax.* 包上出现编译错误

### 第2步：安装和配置MySQL

MySQL 数据库设置的错误和正确方法。

❌ **错误的做法**：创建数据库而不导入所需的 SQL 脚本
```sql
-- Wrong: missing quartz.sql causes scheduler failures at runtime
CREATE DATABASE ruoyi;
-- only import one SQL file, forget quartz.sql
SOURCE ry_2021xxxx.sql;
```

✅ **正确方法**：创建数据库 `ry-vue` 并导入两者 `ry_2021xxxx.sql` 和 `quartz.sql`
```sql
-- MySQL >= 5.7 required
CREATE DATABASE `ry-vue` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ry-vue`;

-- Import schema and data (both files required)
SOURCE sql/ry_2021xxxx.sql;
SOURCE sql/quartz.sql;

-- Verify tables created
SHOW TABLES;
-- Expected: 30+ tables including sys_user, sys_role,
-- qrtz_job_details, qrtz_triggers, etc.
```

⚠️ **陷阱**：在 Linux 上，MySQL 表名默认区分大小写 -> 添加 `lower_case_table_names=1` 在 `/etc/my.cnf` 并重启MySQL服务

### 第三步：安装并启动Redis

Redis 配置的错误和正确方法。

❌ **错误方法**：跳过 Redis 安装，假设它是可选的
```bash
# Wrong: RuoYi requires Redis for token storage and caching
# Application will fail to start without Redis connection
```

✅ **正确方法**：安装 Redis >= 3.0 并验证连接匹配 `application.yml` 默认值
```bash
# Install Redis (example: Ubuntu)
sudo apt install redis-server
sudo systemctl start redis-server

# Verify connection on default port 6379
redis-cli ping
# Expected: PONG

# Default config in application.yml:
# spring.redis.host: localhost
# spring.redis.port: 6379
# spring.redis.database: 0
# spring.redis.password: (empty)
```

⚠️ **陷阱**：设置 Redis 密码而不更新 `spring.redis.password` 在 `application.yml` -> 启动时连接被拒绝错误

### 步骤 4：安装 Node.js 并配置 npm 注册表

前端工具链的错误和正确方法。

❌ **错误做法**：直接使用cnpm安装依赖
```bash
# Wrong: cnpm causes inconsistent dependency trees and phantom bugs
npm install -g cnpm
cnpm install
```

✅ **正确方法**：安装 Node >= 12，使用带有 npmmirror 注册表标志的 npm
```bash
# Verify Node version
node -v
# v12.x.x or higher

# Install frontend dependencies with registry override
cd ruoyi-ui
npm install --registry=https://registry.npmmirror.com

# Start development server
npm run dev

# Access at http://localhost:80
# Default credentials: admin / admin123
```

⚠️ **陷阱**：使用 `cnpm install` 直接 -> 幻像依赖错误、缺少对等依赖以及不一致的锁定文件

## 完成标准
- `java -version` 显示 JDK >= 1.8
- `mysql -u root -p -e "SHOW DATABASES"` 列表 `ry-vue`
- `redis-cli ping` 回报 `PONG`
- `node -v` 显示 >= 12， `npm -v` 显示有效版本
- `mvn -version` 显示 Maven >= 3.0

## 下一步
-> [第三阶段：后端部署](./03-backend-deploy.md)
