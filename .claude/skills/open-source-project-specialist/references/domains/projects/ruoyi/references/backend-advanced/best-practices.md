# 后端高级最佳实践

## 权限控制规则

1. **使用 `@ss.hasPermi` 对于细粒度的许可， `@ss.hasRole` 对于基于角色的** - 权限格式为 `module:entity:action` （例如。， `system:user:list`）。角色键必须匹配 `sys_role.role_key`.
2. **超级管理员绕过所有检查** - userId=1 始终通过 `@PreAuthorize`。不要依赖注解来限制超级管理员。
3. **使用 `@Anonymous` 明确用于公共端点** - 切勿默默删除 `@PreAuthorize`. `@Anonymous` 记录意图并可通过代码搜索发现。
4. **避免班级级别 `@Anonymous`** - 将其放在控制器类上会使所有方法公开。改为按方法应用它。
5. **在服务层使用编程检查** - `SecurityUtils.hasPermi("sys:user:edit")` 和 `SecurityUtils.hasRole("admin")` 用于条件业务逻辑。

## 交易管理规则

1. **`@Transactional` 仅适用于公共方法** - Spring AOP 无法代理私有、受保护或包私有方法。交易默默地不适用。
2. **始终指定 `rollbackFor = Exception.class`** - 默认回滚仅涵盖 `RuntimeException`。检查异常（IOException、SQLException）将提交部分事务。
3. **地方 `@Transactional` 在服务上，而不是在控制器上** - 控制器处理 HTTP 映射；服务处理业务逻辑。混合关注点使测试和错误处理变得复杂。
4. **谨防自调用** - 调用 `@Transactional` 同一类中的方法绕过 AOP 代理。提取到单独的豆或使用 `AopContext.currentProxy()`.
5. **使用 `readOnly = true` 对于查询方法** - 提示数据库优化读取（无写锁、副本路由）。

## 系统日志规则

1. **添加 `@Log` 所有写操作** - INSERT、UPDATE、DELETE、EXPORT、IMPORT 都应该有 `@Log` 用于审计合规性。
2. **匹配 `title` 模块名称** - 在同一控制器中的所有方法中使用一致的标题（例如“用户管理”）。
3. **禁用敏感端点的请求/响应日志记录** - 使用 `@Log(isSaveRequestData = false)` 更改密码或 `@Log(isSaveResponseData = false)` 用于大数据返回。
4. **请勿使用 `@Log` 在只读列表/查询端点上** - 它会生成过多的日志条目。为状态更改操作保留日志记录。

## 任务调度规则

1. **使用管理面板，而不是硬编码 `@Scheduled`** - Quartz 任务可以在运行时配置，无需重新部署。 `@Scheduled` 需要更改代码并重新启动。
2. **Bean 名称必须与调用目标匹配** - `@Component("reportTask")` 映射到 `reportTask.methodName` 在管理面板中。
3. **将字符串参数用单引号括起来** - `reportTask.run('daily')` 不是 `reportTask.run(daily)` 或者 `reportTask.run("daily")`.
4. **禁用长任务的并发执行** - 防止重叠运行导致数据损坏或资源耗尽。
5. **进口 `quartz.sql`** - Quartz 调度程序表必须存在于数据库中。缺少它们会导致启动失败。

## 数据范围规则

1. **别名必须完全匹配** - `@DataScope(deptAlias = "d")` 需要使用 SQL `d` 作为部门表别名。
2. **实体必须扩展 `BaseEntity`** - 这 `params` 接收 SQL 片段所在范围的映射 `BaseEntity`.
3. **使用 `${params.dataScope}` 不是 `#{params.dataScope}`** - 它通过字符串替换注入 WHERE 子句片段，而不是参数绑定。
4. **地方 `@DataScope` on Service，而不是 Mapper** - AOP 方面拦截 Service 级别的方法。
5. **使用非管理员用户进行测试** - 管理员始终可以看到所有数据。与常规部门用户一起测试范围过滤。

## 多数据源规则

1. **显式启用从站** - 设置 `slave.enabled: true` 在 `application-druid.yml`。默认为 `false`.
2. **地方 `@DataSource` on Service，not Controller** - AOP拦截器工作在Service层。
3. **不要合并 `@Transactional` 和 `@DataSource`** - 在数据源切换可能发生之前，事务绑定到连接。单独的读取和写入方法。
4. **方法级别覆盖类级别** - 对于常见情况使用类级别，对于异常情况使用方法级别。
5. **谨防自调用** - 与 `@Transactional`: 打电话 `@DataSource(SLAVE)` 来自同一类的内部绕过代理。

## 常见陷阱

| 陷阱 | 症状 | 使固定 |
|---------|---------|-----|
| `@Transactional` 在私有方法上 | 错误时保存部分数据 | 将方法更改为公开 |
| 丢失的 `rollbackFor` | 检查异常提交部分数据 | 添加 `rollbackFor = Exception.class` |
| `@DataScope` 别名不匹配 | 列表查询时出现 SQL 错误 | 匹配 `deptAlias`/`userAlias` 到 SQL 表别名 |
| `@DataSource` 在控制器上 | 始终使用主数据源 | 移至服务类/方法 |
| `@Transactional` + `@DataSource` 一起 | 交易数据源错误 | 分成不同的方法 |
| 石英豆名称不匹配 | 任务执行失败并出现 NoSuchBeanDefinitionException | 确保 `@Component` 名称与调用目标匹配 |
| 自调用绕过AOP | 未应用事务/数据源/范围 | 提取分离豆 |
| `@Anonymous` 上课时 | 所有端点均公开 | 仅适用于每种方法 |
