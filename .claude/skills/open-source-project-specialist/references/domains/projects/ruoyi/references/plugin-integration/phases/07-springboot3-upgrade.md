# 阶段07：SpringBoot 3升级

## 目标
将 RuoYi-Vue 从 SpringBoot 2.x 升级到 SpringBoot 3.x，包括 Java 17 迁移、Jakarta EE 命名空间更改和 Spring Security 6 配置。

## 先决条件
- JDK 17+ 安装并配置为项目 SDK
- 当前项目在 SpringBoot 2.x 上编译并通过所有测试
- 开始迁移之前完整备份项目代码

## 执行步骤

### 第 1 步：更新 POM 依赖关系

❌ **错误的做法**：只更改SpringBoot父版本而不更新依赖库。
```xml
<!-- Wrong: version mismatch causes NoClassDefFoundError -->
<spring-boot.version>3.3.0</spring-boot.version>
<!-- Still using mybatis-spring-boot-starter 2.x -->
```

✅ **正确方法**：在父级中一起更新所有版本属性 `pom.xml`.
```xml
<!-- Update Java version -->
<java.version>17</java.version>

<!-- New required version properties -->
<mybatis-spring-boot.version>3.0.3</mybatis-spring-boot.version>
<mysql.version>8.2.0</mysql.version>
<jakarta.version>6.0.0</jakarta.version>

<!-- SpringBoot 3.3.0 BOM -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>3.3.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

<!-- MySQL connector updated group -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>${mysql.version}</version>
</dependency>

<!-- Jakarta Servlet -->
<dependency>
    <groupId>jakarta.servlet</groupId>
    <artifactId>jakarta.servlet-api</artifactId>
    <version>${jakarta.version}</version>
</dependency>
```

⚠️ **陷阱**：MySQL 连接器从 `mysql:mysql-connector-java` 到 `com.mysql:mysql-connector-j`。使用旧的工件会产生 `ClassNotFoundException: com.mysql.cj.jdbc.Driver`.

### 步骤 2：将 javax 迁移到 jakarta 命名空间

❌ **错误的方法**：对所有 javax 导入不加区别地使用 IDE 查找替换。
```java
// Wrong: some javax packages must NOT be changed
import jakarta.imageio.ImageIO;        // WRONG - stays as javax
import jakarta.sql.DataSource;         // WRONG - stays as javax
import jakarta.net.ssl.SSLContext;     // WRONG - stays as javax
```

✅ **正确的做法**：仅替换 EE 相关的 javax 包。
```java
// These MUST change to jakarta:
javax.annotation   -> jakarta.annotation
javax.servlet      -> jakarta.servlet
javax.validation   -> jakarta.validation

// These must STAY as javax (JDK built-ins):
javax.imageio.ImageIO          // Keep
javax.net.ssl.*                // Keep
javax.sql.DataSource           // Keep
javax.crypto.*                 // Keep
javax.xml.bind                 // Keep (or add jaxb-api dependency)
```

还更新代码生成器模板：
```text
# ruoyi-generator/resources/vm/java/controller.java.vm
# Change: import javax.servlet.http.HttpServletResponse;
# To:     import jakarta.servlet.http.HttpServletResponse;
```

⚠️ **陷阱**：甚至缺少一个 `javax.servlet` import导致编译失败。使用IDE搜索 `import javax.` 并回顾每一次发生的情况。安全规则：如果它来自 `javax.annotation`, `javax.servlet`， 或者 `javax.validation`，改变它。

### 步骤 3：迁移 Spring Security 6 配置

❌ **错误的方法**：保留已弃用的内容 `WebSecurityConfigurerAdapter` 图案。
```java
// Wrong: removed in Spring Security 6
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) {
        http.antMatchers("/login").permitAll();
    }
}
```

✅ **正确方法**：使用 `SecurityFilterChain` 带有 lambda DSL 的 bean。
```java
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Configuration
public class SecurityConfig {
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return new ProviderManager(provider);
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> {
                permitAllUrl.getUrls().forEach(url -> auth.requestMatchers(url).permitAll());
                auth.requestMatchers("/login", "/register", "/captchaImage").permitAll()
                    .anyRequest().authenticated();
            })
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

主要变化：
- `antMatchers()` -> `requestMatchers()`
- `@EnableGlobalMethodSecurity` -> `@EnableMethodSecurity`
- `spring.redis.*` -> `spring.data.redis.*` 在 YAML 中

⚠️ **陷阱**： `antMatchers()` 安全 6 中不存在。单个剩余物 `antMatchers()` 调用阻止应用程序启动 `NoSuchMethodError`.

## 完成标准
- 项目使用 Java 17 和 SpringBoot 3.3.0 进行编译
- 不 `javax.servlet` / `javax.annotation` / `javax.validation` 保留导入（JDK 内置除外）
- 安全配置用途 `SecurityFilterChain` 和 `requestMatchers()`
- Redis 配置使用 `spring.data.redis` 名称空间
- 登录、身份验证和权限检查所有功能

## 下一步
-> [09-监控工具.md](./09-monitoring-tools.md)
