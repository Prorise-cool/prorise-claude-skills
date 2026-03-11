# 第三阶段：后端部署

## 目标
RuoYi后端打包并部署为jar或war，可通过配置的端口访问。

## 先决条件
- 第 01 阶段完成（JDK、MySQL、Redis 运行）
- 数据库 `ry-vue` 使用两个 SQL 脚本初始化
- `application-druid.yml` 配置了正确的数据库凭据

## 执行步骤

### 步骤一：配置数据源

数据库连接的错误和正确方法 `application-druid.yml`.

❌ **错误方法**：使用默认占位符值而不更新连接 URL
```yaml
# Wrong: placeholder values cause connection failure
spring:
    datasource:
        druid:
            master:
                url: jdbc:mysql://localhost:3306/ry-vue
                username: root
                password: password  # default placeholder, not actual password
```

✅ **正确方法**：编辑 `resources/application-druid.yml` 具有实际凭据和完整 JDBC 参数
```yaml
# application-druid.yml - Data source configuration
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            master:
                url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: your_actual_password
            slave:
                enabled: false
            initialSize: 5
            minIdle: 10
            maxActive: 20
            maxWait: 60000
```

⚠️ **陷阱**：省略 `serverTimezone=GMT%2B8` 在 JDBC URL -> `java.sql.SQLException: The server time zone value` MySQL 8+ 上出现错误

### 步骤 2：配置应用程序属性

错误和正确的做法 `application.yml` 服务器和文件路径设置。

❌ **错误方法**：保留默认Windows `profile` Mac/Linux 上的路径
```yaml
# Wrong on Mac/Linux: Windows path does not exist
ruoyi:
  profile: D:/ruoyi/uploadPath
```

✅ **正确方法**：更新 `application.yml` 具有适合操作系统的 `profile` 路径和服务器配置
```yaml
# application.yml
ruoyi:
  name: RuoYi
  version: 3.3.0
  demoEnabled: true
  # Windows: D:/ruoyi/uploadPath
  # Linux/Mac: /home/ruoyi/uploadPath
  profile: /home/ruoyi/uploadPath
  addressEnabled: false
  captchaType: math

server:
  port: 8080
  servlet:
    context-path: /
  tomcat:
    uri-encoding: UTF-8
    max-threads: 800
    min-spare-threads: 30
```

⚠️ **陷阱**：在 Mac 上，忘记更改 `profile` 路径从 `D:/ruoyi/uploadPath` 到有效的 Unix 路径 -> 文件上传失败并出现“找不到路径”错误

### 第三步：打包为JAR并运行

jar 部署的错误和正确方法。

❌ **错误方法**：跑步 `mvn package` 在子模块目录中
```bash
# Wrong: must run from project root for multi-module build
cd ruoyi-admin
mvn package
# Missing dependency: ruoyi-common, ruoyi-framework, etc.
```

✅ **正确做法**：跑步 `package.bat` 或来自项目根目录的 Maven；罐子输出在 `ruoyi-admin/target/`
```bash
# Option 1: Use provided script
cd ruoyi
bin/package.bat    # Windows
# bin/package.sh   # Linux

# Option 2: Maven from project root
cd ruoyi
mvn clean package -DskipTests

# JAR is generated at: ruoyi-admin/target/ruoyi-admin.jar
# Run the application
java -jar ruoyi-admin/target/ruoyi-admin.jar

# Or use provided run script
bin/run.bat
```

⚠️ **陷阱**：跑步 `mvn package` 没有 `-DskipTests` 当数据库不可访问时 -> 构建在集成测试中失败

### 步骤4：打包为Tomcat的WAR

战争部署的错误和正确做法。

❌ **错误做法**：将打包改为war而不排除嵌入式Tomcat
```xml
<!-- Wrong: embedded Tomcat conflicts with external Tomcat -->
<packaging>war</packaging>
<!-- Missing: spring-boot-starter-tomcat exclusion -->
```

✅ **正确做法**：修改 `ruoyi-admin/pom.xml` 打包并排除嵌入的 Tomcat
```xml
<!-- Step 1: Change packaging in ruoyi-admin/pom.xml -->
<packaging>war</packaging>

<!-- Step 2: Exclude embedded Tomcat -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Step 3: Build and deploy -->
<!-- mvn clean package -DskipTests -->
<!-- Copy ruoyi-admin/target/ruoyi-admin.war to tomcat/webapps/ -->
```

⚠️ **陷阱**：不排除 `spring-boot-starter-tomcat` -> 类加载器冲突和 `LifecycleException` 在外部 Tomcat 中

## 完成标准
- `java -jar ruoyi-admin.jar` 启动时没有错误，显示 RuoYi 横幅
- 后端可通过`http://localhost:8080/`
- 或者部署在Tomcat中的WAR `webapps/` 并可通过 Tomcat URL 访问

## 下一步
-> [阶段 05：前端部署](./05-frontend-deploy.md)
