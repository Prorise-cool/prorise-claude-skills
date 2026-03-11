# 阶段09：多数据源配置

## 目标
服务方法通过以下方式访问不同的数据库（主/从或特定于业务） `@DataSource` 注释，由 RuoYi 的动态数据源框架处理自动路由。

## 先决条件
- 数据范围配置为 [07-数据范围.md](./07-data-scope.md)
- 多个可用的数据库实例（例如，主服务器用于写入，从服务器用于读取）

## 执行步骤

### 步骤1：在application-druid.yml中配置数据源

❌ **错误的方法**：仅配置一个数据源并尝试通过原始 JDBC 连接到第二个数据库。
```java
// Wrong: bypasses connection pool, no transaction support, resource leaks
Connection conn = DriverManager.getConnection("jdbc:mysql://slave-host/db", "user", "pass");
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM report_data");
```

✅ **正确方法**：定义主从数据源 `application-druid.yml`.
```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driverClassName: com.mysql.cj.jdbc.Driver
    druid:
      master:
        url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8
        username: root
        password: root123
      slave:
        enabled: true  # Must be true to activate
        url: jdbc:mysql://slave-host:3306/ry-vue-slave?useUnicode=true&characterEncoding=utf8
        username: reader
        password: reader123
      # Connection pool settings (shared)
      initialSize: 5
      minIdle: 10
      maxActive: 20
```

⚠️ **陷阱**：如果 `slave.enabled` 是 `false` （默认），从属数据源未注册。使用 `@DataSource(DataSourceType.SLAVE)` 然后默默地回退到 master，没有错误，掩盖了错误配置。

### 步骤2：使用@DataSource注解切换数据源

❌ **错误的做法**：在控制器级别切换数据源。
```java
// Wrong: @DataSource on Controller doesn't work -- AOP intercepts Service layer
@DataSource(value = DataSourceType.SLAVE)
@GetMapping("/report")
public AjaxResult report() {
    return AjaxResult.success(reportService.getReport());
}
```

✅ **正确做法**：放置 `@DataSource` 在服务类或方法级别。
```java
// Method-level: this specific method uses slave datasource
@DataSource(value = DataSourceType.SLAVE)
public List<ReportData> selectReportList(ReportData query) {
    return reportMapper.selectReportList(query);
}

// Class-level: all methods in this service use slave by default
@DataSource(value = DataSourceType.SLAVE)
@Service
public class ReportServiceImpl implements IReportService {
    public List<ReportData> selectReportList(ReportData query) {
        return reportMapper.selectReportList(query);
    }
    // All methods in this class use SLAVE unless overridden
}
```

方法级注释覆盖类级：
```java
@DataSource(value = DataSourceType.SLAVE)
@Service
public class ReportServiceImpl implements IReportService {

    // Uses SLAVE (inherited from class)
    public List<ReportData> selectReportList(ReportData query) {
        return reportMapper.selectReportList(query);
    }

    // Uses MASTER (method overrides class)
    @DataSource(value = DataSourceType.MASTER)
    public int insertReport(ReportData data) {
        return reportMapper.insert(data);
    }
}
```

⚠️ **陷阱**： `@DataSource` 使用AOP代理拦截。呼叫一个 `@DataSource(SLAVE)` 同一类中的方法（自调用）不会切换数据源，因为代理被绕过。

### 步骤 3：使用多数据源处理事务边界

❌ **错误的方法**：使用 `@Transactional` 和 `@DataSource` 用同样的方法。
```java
// Wrong: @Transactional acquires a connection before @DataSource switches it
@Transactional
@DataSource(value = DataSourceType.SLAVE)
public List<ReportData> selectReportList(ReportData query) {
    return reportMapper.selectReportList(query);
}
```

✅ **正确方法**：避免组合 `@Transactional` 和 `@DataSource` 用同样的方法。构造代码以分离读取和写入操作。
```java
// Read service - no transaction needed for reads
@DataSource(value = DataSourceType.SLAVE)
public List<ReportData> selectReportList(ReportData query) {
    return reportMapper.selectReportList(query);
}

// Write service - uses default MASTER with transaction
@Transactional(rollbackFor = Exception.class)
public int insertReport(ReportData data) {
    return reportMapper.insert(data);
}
```

对于需要一致性的跨数据库操作，请使用分布式事务框架（例如Seata）或设计补偿事务。

⚠️ **陷阱**： `@Transactional` 从当前数据源上下文打开连接。如果 `@DataSource` 尚未切换（由于 AOP 排序），事务绑定到 MASTER。确保 `@DataSource` AOP 阶数高于 `@Transactional` 在配置中。

## 完成标准
- 服务方法注释为 `@DataSource(DataSourceType.SLAVE)` 查询从数据库
- 未注释的方法默认为主数据源
- 方法级 `@DataSource` 覆盖类级别注释
- Slave数据源在Druid监控中显示为已连接（`/druid`)

## 下一步
-> [../最佳实践.md](../best-practices.md)
