# 第03阶段：PostgreSQL数据库切换

## 目标
通过切换驱动、调整SQL语法、更新配置文件，将RuoYi-Vue从MySQL迁移到PostgreSQL。

## 先决条件
- PostgreSQL 10+已安装并正在运行
- RuoYi-Vue项目使用MySQL编译（基线）
- PostgreSQL数据库 `ry-vue` 使用 UTF-8 编码创建

## 执行步骤

### 第 1 步：更新驱动程序和方言配置

❌ **错误的做法**：仅更改 JDBC URL 而不更新驱动程序类和方言。
```yaml
# Wrong: MySQL driver with PostgreSQL URL causes ClassNotFoundException
spring:
  datasource:
    driverClassName: com.mysql.cj.jdbc.Driver
    url: jdbc:postgresql://127.0.0.1:5432/ry-vue
```

✅ **正确的方法**：更新所有三个：驱动程序、URL 和 PageHelper 方言。
```yaml
# application-druid.yml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driverClassName: org.postgresql.Driver
    druid:
      master:
        url: jdbc:postgresql://127.0.0.1:5432/ry-vue
        username: postgres
        password: postgres
      validationQuery: select version()

# application.yml - PageHelper dialect
pagehelper:
  helperDialect: postgresql
  reasonable: true
  supportMethodsArguments: true
  params: count=countSql
```

⚠️ **陷阱**：忘记改变 `helperDialect` 从 `mysql` 到 `postgresql` 导致 PageHelper 生成 `LIMIT` PostgreSQL 接受的语法，但计数查询可能会因复杂连接上的语法错误而失败。

### 步骤2：用PostgreSQL替换MySQL依赖

❌ **错误的方法**：添加 PostgreSQL 依赖项，同时保持 MySQL 依赖项处于活动状态。
```xml
<!-- Wrong: both drivers on classpath causes ambiguous auto-configuration -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```

✅ **正确做法**：将 MySQL 替换为 PostgreSQL `ruoyi-admin/pom.xml`.
```xml
<!-- Remove MySQL driver -->
<!-- <dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency> -->

<!-- Add PostgreSQL driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```

⚠️ **陷阱**：如果使用具有一个 MySQL 和一个 PostgreSQL 的多数据源，请保留两个驱动程序但显式设置 `driverClassName` 对于每个数据源以避免自动检测冲突。

### 步骤 3：迁移 SQL 语法差异

❌ **错误方法**：直接针对 PostgreSQL 运行 MySQL DDL 脚本。
```sql
-- Wrong: backticks and sysdate() are MySQL-specific
SELECT `user_name`, `dept_id` FROM `sys_user`
WHERE `create_time` > sysdate()
AND IF(`status` = '0', true, false)
```

✅ **正确方法**：将 MySQL 特定语法转换为 PostgreSQL 等效语法。
```sql
-- PostgreSQL equivalents
SELECT user_name, dept_id FROM sys_user
WHERE create_time > now()
AND CASE WHEN status = '0' THEN true ELSE false END

-- Key conversions:
--   Backticks `col`      -> Double quotes "col" or no quotes
--   sysdate()            -> now()
--   IF(cond, a, b)       -> CASE WHEN cond THEN a ELSE b END
--   IFNULL(a, b)         -> COALESCE(a, b)
--   FIND_IN_SET('a', col) -> col LIKE '%a%' or array operator
--   Batch ID binding      -> Add ::bigint type cast
--   AUTO_INCREMENT         -> SERIAL or BIGSERIAL
--   LIMIT x, y           -> LIMIT y OFFSET x
```

⚠️ **陷阱**：所有 Mapper XML 文件（`.xml`) 必须检查反引号引用的标识符。单个剩余的反引号会导致 `PSQLException: syntax error`。使用项目范围内的查找替换：替换 `` ` `` 在所有映射器 XML 中带有空字符串或双引号。

## 完成标准
- 应用程序启动时没有驱动程序/连接错误
- 登录、CRUD 操作和分页都可以在 PostgreSQL 上运行
- 代码生成器的 `gen_table` 查询更新为 `information_schema` （PostgreSQL 目录）
- 任何 Mapper XML 文件中都不会保留反引号

## 下一步
-> [05-oss-integration.md](./05-oss-integration.md)
