# 阶段05：定时任务配置

## 目标
业务任务使用 Quartz 按 cron 计划执行，可通过管理面板进行配置，无需重新部署代码。

## 先决条件
- 配置的事务/日志记录 [03-事务日志记录.md](./03-transaction-logging.md)
- `quartz.sql` 导入数据库（若一设置步骤）
- `ruoyi-quartz` 项目中包含的模块

## 执行步骤

### 步骤1：在ruoyi-quartz中创建任务类

❌ **错误的方法**：创建独立的 `@Scheduled` 带有硬编码 cron 表达式的 Spring 方法。
```java
// Wrong: hardcoded schedule, no admin UI control, no execution log
@Component
public class MyTask {
    @Scheduled(cron = "0 0 2 * * ?")
    public void cleanTempFiles() {
        // cleanup logic
    }
}
```

✅ **正确方法**：创建一个由 Quartz 调度程序调用的无参数方法的任务类。
```java
package com.ruoyi.quartz.task;

import org.springframework.stereotype.Component;

@Component("reportTask")
public class ReportTask {

    /**
     * No-arg method: configure as "reportTask.generateDaily" in admin panel
     */
    public void generateDaily() {
        // Daily report generation logic
    }

    /**
     * With-arg method: configure as "reportTask.generateByType('monthly')"
     */
    public void generateByType(String type) {
        // Report generation by type
    }
}
```

⚠️ **陷阱**： 中的 bean 名称 `@Component("reportTask")` 必须与您在管理面板的“调用目标”字段中输入的内容完全匹配。不匹配导致 `NoSuchBeanDefinitionException` 在执行时。

### 第 2 步：通过管理面板配置任务

❌ **错误的方法**：直接在数据库表中编辑 Quartz cron 触发器。
```sql
-- Wrong: manual SQL on quartz tables breaks scheduler state
INSERT INTO QRTZ_CRON_TRIGGERS (trigger_name, cron_expression)
VALUES ('myTrigger', '0 0 2 * * ?');
```

✅ **正确方法**：使用管理面板中的系统监控 -> 计划任务。
```text
1. Navigate: System Monitoring -> Scheduled Tasks -> Add Task
2. Fill in the form:
   - Task Name: Daily Report Generation
   - Task Group: DEFAULT
   - Invoke Target: reportTask.generateDaily
   - Cron Expression: 0 0 2 * * ?    (every day at 2:00 AM)
   - Execution Strategy: Execute immediately on misfire
   - Concurrent Execution: No (prevent overlap)
   - Status: Active
3. Save and the task begins scheduling immediately
```

常见的cron表达式：
```text
0 0/5 * * * ?      Every 5 minutes
0 0 2 * * ?        Every day at 2:00 AM
0 0 0 1 * ?        First day of each month at midnight
0 0 10,14,16 * * ? At 10:00, 14:00, and 16:00 daily
0 0/30 9-17 * * ?  Every 30 minutes during business hours (9-17)
```

⚠️ **陷阱**：将长时间运行的任务的“并发执行”设置为“是”会导致重叠执行。如果任务需要 10 分钟但每 5 分钟触发一次，则多个实例会同时运行，可能会损坏数据。

### 步骤 3：使用参数处理任务执行

❌ **错误的方法**：将复杂的对象作为任务参数传递。
```text
# Wrong: Quartz invoke target does not support JSON/object arguments
reportTask.generate({"type":"monthly","year":2024})
```

✅ **正确的方法**：使用简单的字符串、数字或布尔参数。
```text
# String parameter
reportTask.generateByType('monthly')

# Multiple parameters
reportTask.generateReport('monthly', 2024)

# Boolean parameter
reportTask.cleanup(true)
```

对应的Java方法签名：
```java
@Component("reportTask")
public class ReportTask {
    public void generateByType(String type) { /* ... */ }
    public void generateReport(String type, Integer year) { /* ... */ }
    public void cleanup(Boolean force) { /* ... */ }
}
```

⚠️ **陷阱**：调用目标中的字符串参数必须用单引号括起来（`'monthly'`)，而不是双引号。整数和布尔值不需要引号。使用 `reportTask.generateByType(monthly)` 不带引号会导致解析错误。

## 完成标准
- 任务按照配置的 cron 计划执行
- 执行结果在计划任务日志中可见（成功/失败并带有错误消息）
- 任务可以从管理面板暂停、恢复和执行一次
- 配置后并发执行预防起作用

## 下一步
-> [07-数据范围.md](./07-data-scope.md)
