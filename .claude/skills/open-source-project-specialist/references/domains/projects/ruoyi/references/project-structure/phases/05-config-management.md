# 阶段 05：配置管理

## 目标
了解所有 RuoYi-Vue 配置文件、它们的属性以及如何正确自定义它们。

## 先决条件
- 01、03阶段完成（了解后端和前端结构）
- 访问 `resources/` 后端项目中的目录

## 执行步骤

### 第一步：大师 `application.yml` 配置

❌ **错误的方法**：更改数据库设置 `application.yml` 而不是 `application-druid.yml`
```yaml
# Wrong: database config belongs in application-druid.yml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ry-vue  # Wrong location
```

✅ **正确做法**：了解 `application.yml` 部分及其目的
```yaml
# application.yml - Main configuration file

# --- RuoYi custom properties ---
ruoyi:
  name: RuoYi
  version: 3.3.0
  demoEnabled: true
  profile: D:/ruoyi/uploadPath   # File upload path (OS-specific)
  addressEnabled: false           # IP address lookup
  captchaType: math              # math=arithmetic, char=character

# --- Server config ---
server:
  port: 8080
  servlet:
    context-path: /

# --- Spring config ---
spring:
  profiles:
    active: druid                # Activates application-druid.yml
  redis:
    host: localhost
    port: 6379
    database: 0

# --- Token (JWT) config ---
token:
  header: Authorization          # HTTP header name
  secret: abcdefghijklmnopqrstuvwxyz  # JWT signing key
  expireTime: 30                 # Token validity in minutes
```

⚠️ **陷阱**：改变 `spring.profiles.active` 从 `druid` 到另一个值 -> Druid 数据源配置未加载，应用程序无法连接到数据库

### 第 2 步：配置 `application-druid.yml` 数据来源

❌ **错误方法**：使用最小池值进行生产
```yaml
# Wrong: pool too small for production traffic
spring:
    datasource:
        druid:
            initialSize: 1
            minIdle: 1
            maxActive: 5
            # Result: connection pool exhaustion under load
```

✅ **正确方法**：使用适当的池大小和监控来配置 Druid
```yaml
# application-druid.yml - Full data source config
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            master:
                url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: password
            slave:
                enabled: false       # Enable for read replicas
            initialSize: 5           # Initial connections
            minIdle: 10              # Min idle connections
            maxActive: 20            # Max total connections
            maxWait: 60000           # Max wait for connection (ms)
            timeBetweenEvictionRunsMillis: 60000
            minEvictableIdleTimeMillis: 300000
            maxEvictableIdleTimeMillis: 900000
            validationQuery: SELECT 1 FROM DUAL
            testWhileIdle: true
            testOnBorrow: false
            testOnReturn: false
            # Monitoring dashboard
            statViewServlet:
                enabled: true
                url-pattern: /druid/*
            # Slow SQL logging
            filter:
                stat:
                    enabled: true
                    log-slow-sql: true
                    slow-sql-millis: 1000
                    merge-sql: true
```

⚠️ **陷阱**：设置 `testOnBorrow: true` 和 `testOnReturn: true` -> 性能严重下降；使用 `testWhileIdle: true` 代替后台验证

### 第 3 步：配置 `generator.yml` 用于代码生成

❌ **错误的方法**：生成自定义模块时保留默认包名称
```yaml
# Wrong: generated code goes into system package instead of custom module
gen:
  packageName: com.ruoyi.system
  autoRemovePre: false
  tablePrefix: sys_
```

✅ **正确方法**：定制 `generator.yml` 适合您的业务模块
```yaml
# generator.yml - Code generation configuration
gen:
  # Author name in generated file headers
  author: ruoyi
  # Target package - MUST match your business module
  # Change from com.ruoyi.system to your module name
  packageName: com.ruoyi.business
  # Auto-remove table prefix from class names
  autoRemovePre: false
  # Table prefix to strip (when autoRemovePre is true)
  # e.g., biz_order -> Order (strips biz_ prefix)
  tablePrefix: biz_

# Example: table biz_product with autoRemovePre=true, tablePrefix=biz_
# Generated class: Product.java (not BizProduct.java)
# Generated in: com.ruoyi.business.domain.Product
# Controller:   com.ruoyi.business.controller.ProductController
# Service:      com.ruoyi.business.service.IProductService
# Mapper:       com.ruoyi.business.mapper.ProductMapper
```

⚠️ **陷阱**：设置 `autoRemovePre: true` 无需配置 `tablePrefix` -> 类名称包括带前缀的完整表名称（例如， `SysUser` 而不是 `User`)

### 第 4 步：附加配置部分

❌ **错误的方法**：覆盖单个模块的 MyBatis 映射器位置
```yaml
# Wrong: overriding mapperLocations loses all other module mappings
mybatis:
  mapperLocations: classpath:mapper/business/*Mapper.xml
  # Missing: classpath*: prefix and ** glob for multi-module scanning
```

✅ **正确方法**：使用通配符映射器扫描并了解每个配置部分
```yaml
# --- MyBatis config (application.yml) ---
mybatis:
  typeAliasesPackage: com.ruoyi.**.domain
  mapperLocations: classpath*:mapper/**/*Mapper.xml
  # classpath* scans all modules; **/ matches any subdirectory
  configLocation: classpath:mybatis/mybatis-config.xml

# --- PageHelper pagination ---
pagehelper:
  helperDialect: mysql
  reasonable: true          # Page < 1 returns first page
  supportMethodsArguments: true
  params: count=countSql

# --- Swagger API docs ---
swagger:
  enabled: true             # Set false in production
  pathMapping: /dev-api     # API prefix for docs

# --- XSS protection ---
xss:
  enabled: true
  excludes: /system/notice/*           # Skip XSS filter
  urlPatterns: /system/*,/monitor/*,/tool/*  # Apply filter
```

⚠️ **陷阱**：使用 `classpath:` （不带星号）在 `mapperLocations` -> 仅扫描管理模块的映射器 XML，忽略来自其他模块的映射器文件，例如 `ruoyi-system`

## 完成标准
- 可以识别哪个配置文件拥有每个属性
- 了解 Druid 矿池参数和 `classpath*:` 与 `classpath:` 用于多模块扫描
- 可定制 `generator.yml` 用于新业务模块

## 下一步
-> [最佳实践](../best-practices.md)
