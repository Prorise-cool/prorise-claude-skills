# 插件集成最佳实践

## 一般集成原则

1. **一次一个插件** - 在组合之前独立集成和验证每个插件。调试两个同时集成的难度呈指数级增长。
2. **每个集成分支** - 为每个插件创建一个 Git 分支（例如， `feature/minio`, `feature/springboot3`）。仅在完全验证后合并。
3. **首先测试基线** - 在集成之前，确保现有项目编译、启动并通过所有测试。损坏的基线使得无法隔离插件问题。
4. **阅读官方差异** - RuoYi 提供 ZIP 包，其中包含要修改的确切文件。在手动编辑之前下载并比较。

## Docker部署

| 实践 | 细节 |
|----------|---------|
| 使用服务名称作为主机 | `ruoyi-mysql` 和 `ruoyi-redis` 在应用程序配置中，而不是 `localhost` |
| 在 Dockerfile 中设置时区 | `ENV TZ=Asia/Shanghai` 防止容器中的时间漂移 |
| 添加 `SET NAMES 'utf8'` 到 SQL | init脚本第一行防止中文乱码 |
| 完全匹配 JAR 文件名 | Dockerfile `COPY` 路径必须与实际 JAR 名称匹配 `mvn package` |
| 使用健康检查 | 服务器启动时MySQL可能还没有准备好；添加重试逻辑或健康检查 |
| 卷挂载以实现持久性 | 山 `/var/lib/mysql` 和 `/data` 避免容器重建时数据丢失 |

## 数据库切换（PostgreSQL）

| 实践 | 细节 |
|----------|---------|
| 替换所有反引号 | 映射器 XML 文件中的全局查找替换；单个反引号会破坏 PostgreSQL |
| 更新语法函数 | `sysdate()` -> `now()`, `IF()` -> `CASE WHEN`, `IFNULL()` -> `COALESCE()` |
| 铸造批次 ID | 添加 `::bigint` 用于 ID 数组的批量操作 |
| 更改验证查询 | `select 1` 或者 `select version()` 而不是 MySQL 特定的查询 |
| 更新代码生成器 | `gen_table` 查询使用 `information_schema` PostgreSQL 中的情况有所不同 |

## SpringBoot 3 升级

| 实践 | 细节 |
|----------|---------|
| Java 17 是强制性的 | 在开始迁移之前将 IDE、CI 和运行时配置为 JDK 17+ |
| javax 与 jakarta 清单 | 改变： `annotation`, `servlet`, `validation`。保持： `imageio`, `ssl`, `sql`, `crypto` |
| 安全 6 迁移 | 代替 `WebSecurityConfigurerAdapter` 和 `SecurityFilterChain` 豆 |
| 方法匹配器重命名 | `antMatchers()` -> `requestMatchers()` 贯穿所有安全配置 |
| Redis 命名空间更改 | `spring.redis.*` -> `spring.data.redis.*` 在 YAML 配置中 |
| 更新代码生成器模板 | `controller.java.vm` 必须使用 `jakarta.servlet` 进口 |
| 增量测试 | 在每个步骤（POM、javax、安全性）之后，在继续之前进行编译和修复 |

## MinIO/OSS 集成

| 实践 | 细节 |
|----------|---------|
| 上传前先创建bucket | 存储桶必须存在，否则首次上传会抛出异常 `ErrorResponseException` |
| 保留本地上传作为后备 | 添加新的 `/uploadMinio` 端点而不是替换 `/upload` |
| 外部化凭证 | 使用 `application.yml` 属性，切勿在 Java 中进行硬编码 |
| 检查 OkHttp 版本 | MinIO SDK 8.x 需要 OkHttp 4.x；解决与SpringBoot托管版本的冲突 |
| 设置存储桶访问策略 | 如果文件需要公共 URL 访问，请配置存储桶策略以允许匿名读取 |

## MyBatis-Plus 集成

| 实践 | 细节 |
|----------|---------|
| 删除旧的 MyBatisConfig | 两者兼具 `MyBatisConfig` 和 `MybatisPlusConfig` 导致重复扫描 |
| 更改 YAML 命名空间 | `mybatis:` -> `mybatis-plus:` 在 application.yml 中 |
| 使用正确的启动器 | SpringBoot 2： `mybatis-plus-boot-starter`，SpringBoot 3： `mybatis-plus-spring-boot3-starter` |
| 观看版本冲突 | `mybatis-plus` 捆绑自己的MyBatis；显式 mybatis 依赖可能会发生冲突 |
| 保留现有的映射器 | MP 与现有的 XML 映射器完全兼容；不需要重写它们 |

## 监控工具

| 实践 | 细节 |
|----------|---------|
| ehcache版本很重要 | SpringBoot 2： `net.sf.ehcache:ehcache`，SpringBoot 3： `org.ehcache:ehcache` 3.x 与 `type: jcache` |
| WebSocket部署方式 | 嵌入式Tomcat：注册 `ServerEndpointExporter`。外部 Tomcat：不要注册它 |
| 缓存类型切换 | 使用 `spring.cache.type` 之间切换的属性 `ehcache`/`jcache`/`redis` 无需更改代码 |

## 故障排除矩阵

| 症状 | 可能的原因 | 使固定 |
|---------|-------------|-----|
| 容器立即退出 | MySQL 未准备好，连接被拒绝 | 添加重试/等待逻辑，检查 `docker-compose logs` |
| `PSQLException: syntax error` | 映射器 XML 中的反引号 | 全局替换所有 XML 文件中的反引号 |
| `NoSuchMethodError: antMatchers` | Spring Security 6 API 更改 | 替换为 `requestMatchers()` |
| `ClassNotFoundException: javax.servlet` | 失踪的雅加达移民 | 代替 `javax.servlet` 和 `jakarta.servlet` |
| `MappedStatement already exists` | 重复的 MyBatis 配置 bean | 删除旧的 `MyBatisConfig.java` |
| 空 MinIO 上传响应 | 桶不存在 | 通过MinIO控制台或SDK创建bucket |
| WebSocket 404 | 丢失的 `ServerEndpointExporter` 豆 | 添加 `WebSocketConfig` 与豆子 |
| 高速缓存 `ClassNotFoundException` | SpringBoot版本的ehcache版本错误 | SB2 使用 ehcache 2.x，SB3 使用 ehcache 3.x |
