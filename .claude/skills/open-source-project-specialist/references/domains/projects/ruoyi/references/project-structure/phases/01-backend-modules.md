# 第一阶段：后端模块结构

## 目标
了解RuoYi-Vue后端多模块Maven架构以及每个模块的职责。

## 先决条件
- RuoYi-Vue 源代码从 Gitee 克隆
- 具有 Maven 支持的 IDE（IntelliJ IDEA 或 Eclipse）

## 执行步骤

### 第 1 步：了解顶层模块布局

导航后端结构的错误和正确方法。

❌ **错误做法**：将所有业务代码放入 `ruoyi-admin` 将其视为一个整体
```java
// Wrong: mixing business logic directly in the admin module
// ruoyi-admin/src/main/java/com/ruoyi/web/controller/
//   UserController.java
//   UserService.java      <-- service should not be here
//   UserMapper.java        <-- mapper should not be here
//   UserDomain.java        <-- domain should not be here
```

✅ **正确的方法**：遵循设计中的多模块分离 `com.ruoyi` 包裹
```
com.ruoyi
  |-- common            // Utilities and shared code
  |-- framework         // Framework core (Spring Security, AOP, config)
  |-- ruoyi-generator   // Code generation module (removable)
  |-- ruoyi-quartz      // Scheduled tasks module (removable)
  |-- ruoyi-system      // System business code (domain, mapper, service)
  |-- ruoyi-admin       // Entry point (controllers, main class)
  |-- ruoyi-xxxxxx      // Custom business modules

Module dependency chain:
  ruoyi-admin --> ruoyi-system --> ruoyi-framework --> ruoyi-common
  ruoyi-admin --> ruoyi-generator (optional)
  ruoyi-admin --> ruoyi-quartz (optional)
```

⚠️ **陷阱**：添加服务/映射器类 `ruoyi-admin` 而不是 `ruoyi-system` -> 当其他模块需要引用这些服务时的循环依赖

### 第 2 步：探索 `com.ruoyi.common` 模块

使用通用实用程序模块的错误和正确方法。

❌ **错误的方法**：业务模块中重复的实用方法
```java
// Wrong: creating custom StringUtils in ruoyi-system
package com.ruoyi.system.util;
public class StringUtils {
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }
}
```

✅ **正确的方法**：使用现有的实用程序 `com.ruoyi.common` 子包
```
com.ruoyi.common
  |-- annotation/    // Custom annotations (@Log, @DataScope, @RateLimiter)
  |-- config/        // Global config (thread pool, i18n, etc.)
  |-- constant/      // Constants (UserConstants, HttpStatus, etc.)
  |-- core/          // Core classes (BaseEntity, AjaxResult, page objects)
  |-- enums/         // Enums (BusinessType, DataSourceType, etc.)
  |-- exception/     // Custom exceptions (ServiceException, etc.)
  |-- filter/        // Servlet filters (XSS filter, repeatable request)
  |-- utils/         // Utility classes (StringUtils, DateUtils, etc.)

// Usage example:
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.enums.BusinessType;
```

⚠️ **陷阱**：在业务模块中创建重复的实用程序类 -> 维护负担和不一致的行为；总是检查 `com.ruoyi.common.utils` 第一的

### 第 3 步：探索 `com.ruoyi.framework` 模块

理解框架层的错误和正确方法。

❌ **错误的方法**：覆盖业务模块中的框架安全配置
```java
// Wrong: creating a second SecurityConfig in ruoyi-system
@Configuration
public class MySecurityConfig extends WebSecurityConfigurerAdapter {
    // Conflicts with framework's SecurityConfig
}
```

✅ **正确做法**：通过框架子包设计的扩展点来理解和扩展框架子包
```
com.ruoyi.framework
  |-- aspectj/       // AOP implementations (@Log, @DataScope, @RateLimiter)
  |-- config/        // System configs (SecurityConfig, CorsConfig, etc.)
  |-- datasource/    // Dynamic data source switching
  |-- interceptor/   // Request interceptors (repeat submit check)
  |-- manager/       // Async manager (ShutdownManager, factory)
  |-- security/      // Spring Security (auth filter, handler, service)
  |-- web/           // Web layer (exception handler, domain config)

// To customize security, extend the existing config:
// Modify com.ruoyi.framework.config.SecurityConfig
// Add URL patterns to configure(HttpSecurity http)
// Do NOT create a separate SecurityConfig class
```

⚠️ **陷阱**：创建并行 `@Configuration` 另一个模块中的 Spring Security 类 -> Bean 定义冲突， `BeanDefinitionOverrideException` 启动时

### 第 4 步：了解可选模块和业务模块

添加自定义模块的错误和正确方法。

❌ **错误的做法**：修改 `ruoyi-system` 直接针对新业务功能
```xml
<!-- Wrong: coupling custom business with system module -->
<!-- Adding new tables and services directly in ruoyi-system -->
```

✅ **正确方法**：创建新模块如下 `ruoyi-xxxxxx` 模式，取决于 `ruoyi-common`
```xml
<!-- Step 1: Create ruoyi-business/pom.xml -->
<parent>
    <artifactId>ruoyi</artifactId>
    <groupId>com.ruoyi</groupId>
</parent>
<artifactId>ruoyi-business</artifactId>
<dependencies>
    <dependency>
        <groupId>com.ruoyi</groupId>
        <artifactId>ruoyi-common</artifactId>
    </dependency>
</dependencies>

<!-- Step 2: Add dependency in ruoyi-admin/pom.xml -->
<dependency>
    <groupId>com.ruoyi</groupId>
    <artifactId>ruoyi-business</artifactId>
    <version>${ruoyi.version}</version>
</dependency>
```

⚠️ **陷阱**：忘记添加新的模块依赖项 `ruoyi-admin/pom.xml` -> 新模块代码已编译但未包含在最终的 jar/war 中

## 完成标准
- 可以识别每个模块的职责（common、framework、system、admin、generator、quartz）
- 了解依赖链：admin -> system -> Framework -> common
- 知道在哪里放置新的业务代码（新 `ruoyi-xxxxxx` 模块）
- 可拆卸模块已确定： `ruoyi-generator`, `ruoyi-quartz`

## 下一步
-> [第三阶段：前端结构](./03-frontend-structure.md)
