# 第09阶段：监控工具（ehcache、WebSocket、MyBatis-Plus）

## 目标
将本地缓存（ehcache）、实时通信（WebSocket）和增强型ORM（MyBatis-Plus）集成到RuoYi-Vue项目中。

## 先决条件
- 使用标准 Redis + MyBatis 配置运行的 RuoYi-Vue 项目
- 了解根据项目需求集成哪个组件

## 执行步骤

### 步骤1：集成ehcache作为本地缓存（替换Redis）

❌ **错误的做法**：添加ehcache依赖而不删除Redis缓存引用。
```xml
<!-- Wrong: both cache managers active causes ambiguous bean -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

✅ **正确的做法**：添加缓存依赖 `ruoyi-common/pom.xml` 并配置缓存类型。
```xml
<!-- SpringCache + Ehcache (SpringBoot 2.x) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>

<!-- For SpringBoot 3.x, use ehcache3 instead -->
<!-- <dependency>
    <groupId>org.ehcache</groupId>
    <artifactId>ehcache</artifactId>
    <version>3.10.8</version>
</dependency> -->
```

配置于 `application.yml`:
```yaml
spring:
  cache:
    # Switch between: ehcache (local) or redis (distributed)
    type: ehcache
    ehcache:
      config: classpath:ehcache.xml
```

⚠️ **陷阱**：对于 SpringBoot 3.x，ehcache 2.x 不兼容。使用ehcache 3.x（`org.ehcache:ehcache`） 和 `type: jcache` 而不是 `type: ehcache`。混合版本的原因 `ClassNotFoundException`.

### 步骤 2：集成 WebSocket 进行实时通信

❌ **错误的方法**：添加 WebSocket 依赖项而不配置端点或安全性。
```java
// Wrong: no ServerEndpointExporter bean registered
@ServerEndpoint("/websocket/{userId}")
@Component
public class WebSocketServer {
    // Endpoints never activate without the exporter bean
}
```

✅ **正确方法**：添加依赖项并注册端点导出器。
```xml
<!-- ruoyi-framework/pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

创建 WebSocket 配置：
```java
@Configuration
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

在SecurityConfig中配置匿名访问：
```java
// Allow WebSocket endpoint without authentication (optional)
.requestMatchers("/websocket/**").permitAll()
```

⚠️ **陷阱**：如果使用外部 Tomcat (WAR) 进行部署，请勿注册 `ServerEndpointExporter` 作为一颗豆子。外部容器对其进行管理。仅在使用嵌入式 Tomcat（JAR 部署）时注册。

### 步骤 3：集成 MyBatis-Plus 以增强 ORM

❌ **错误的方法**：将 mybatis-plus 与 mybatis 一起添加，而不删除旧的配置。
```xml
<!-- Wrong: dual mybatis starters cause mapper scanning conflicts -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
</dependency>
```

✅ **正确做法**：将mybatis替换为mybatis-plus `ruoyi-common/pom.xml`.
```xml
<!-- SpringBoot 2.x -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.1</version>
</dependency>

<!-- SpringBoot 3.x (use boot3 starter) -->
<!-- <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
    <version>3.5.10</version>
</dependency> -->
```

更新 `application.yml`:
```yaml
# Change mybatis: to mybatis-plus:
mybatis-plus:
  typeAliasesPackage: com.ruoyi.**.domain
  mapperLocations: classpath*:mapper/**/*Mapper.xml
  configLocation: classpath:mybatis/mybatis-config.xml
```

代替 `MyBatisConfig.java` 和 `MybatisPlusConfig.java`:
```java
@EnableTransactionManagement(proxyTargetClass = true)
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        return interceptor;
    }
}
```

⚠️ **陷阱**：你必须删除旧的 `MyBatisConfig.java`。两者兼具 `MyBatisConfig` 和 `MybatisPlusConfig` 原因 `MappedStatement already exists` 由于重复映射器扫描而导致的错误。

## 完成标准
- **ehcache**：应用程序在没有Redis的情况下启动，登录和操作使用本地缓存
- **WebSocket**：客户端连接到 `ws://host/websocket/{userId}` 并接收推送消息
- **MyBatis-Plus**：CRUD 操作使用 MP 方法（`getById`, `save`, `removeByIds`)、分页使用 `MybatisPlusInterceptor`

## 下一步
-> [../最佳实践.md](../best-practices.md)
