# 最佳实践：项目结构

## 模块组织原则

### 1. 尊重依赖链

**规则**：依赖关系朝一个方向流动： `admin -> system -> framework -> common`.

**反模式**：添加依赖项 `ruoyi-common` 到 `ruoyi-system` 创建循环依赖。 Common 必须保持无依赖性（相对于其他 RuoYi 模块）。

**正确做法**：如果common需要系统功能，则将共享逻辑提取到common中或创建一个新的中间模块。

### 2、新业务代码进入新模块

**规则**：切勿将特定于业务的域/映射器/服务类添加到 `ruoyi-system`.

**正确模式**：
1. 创造 `ruoyi-<module>/pom.xml` 从根继承
2. 取决于 `ruoyi-common` （和 `ruoyi-framework` 如果需要的话）
3. 添加 `ruoyi-<module>` 作为依赖 `ruoyi-admin/pom.xml`
4. 控制器位于 `ruoyi-admin` 或者在新模块自己的控制器包中

### 3. 可拆卸模块设计

**确定的可选模块**： `ruoyi-generator`, `ruoyi-quartz`.

要删除模块：
1. 删除模块目录
2. 消除 `<module>` 从根进入 `pom.xml`
3. 删除依赖关系 `ruoyi-admin/pom.xml`
4. 应用程序在没有删除模块的情况下继续运行

## 前端组织原则

### 4. API-视图镜像模式

**规则**： `src/api/` 目录结构应该镜像 `src/views/` 目录结构。

| 后端控制器 | API文件 | 查看目录 |
|---|---|---|
| `SysUserController` | `src/api/system/user.js` | `src/views/system/user/` |
| `SysRoleController` | `src/api/system/role.js` | `src/views/system/role/` |
| `SysMenuController` | `src/api/system/menu.js` | `src/views/system/menu/` |

### 5. 组件与视图的区别

**成分** （`src/components/`)：可在多个页面上重复使用。无状态或独立状态。示例： `Pagination`, `RightToolbar`, `FileUpload`.

**观看次数** (`src/views/`): 绑定到特定的路由。可能包含特定于页面的状态。例子： `views/system/user/index.vue`.

**反模式**：将特定于页面的组件放入 `src/components/` 仅由一个视图使用。

### 6. 使用 `@/utils/request` 对于所有 API 调用

**规则**：切勿使用 `axios` 直接在组件或 API 模块中。始终导入自 `@/utils/request`.

**为什么**： `request.js` 提供：
- 自动令牌注入通过 `Authorization` 标头
- 错误代码（401、500 等）的响应拦截器
- 请求超时配置
- 来自环境变量的基本 URL (`VUE_APP_BASE_API`)

## 配置管理原则

### 7. 配置文件所有权

| 文件 | 拥有 | 切勿放在这里 |
|---|---|---|
| `application.yml` | 服务器、Redis、令牌、MyBatis、Swagger、XSS | 数据库凭证 |
| `application-druid.yml` | Druid 数据源、池设置、监控 | 服务器端口、Redis 配置 |
| `generator.yml` | 代码生成：作者、包、前缀 | 业务逻辑配置 |
| `.env.production` | 前端环境变量 (`VUE_APP_*`) | 后端配置 |
| `vue.config.js` | 构建配置、publicPath、代理 | 运行时配置 |

### 8. 多模块映射器扫描

**规则**：始终使用 `classpath*:` （带星号）用于 `mapperLocations`.

```yaml
# Correct: scans all JARs/modules
mybatis:
  mapperLocations: classpath*:mapper/**/*Mapper.xml

# Wrong: only scans current module
mybatis:
  mapperLocations: classpath:mapper/**/*Mapper.xml
```

### 9. 每个操作系统的配置文件路径

**规则**： `ruoyi.profile` 在 `application.yml` 必须是部署操作系统上的有效路径。

| 操作系统 | 示例路径 |
|---|---|
| 视窗 | `D:/ruoyi/uploadPath` |
| Linux | `/home/ruoyi/uploadPath` |
| macOS | `/Users/<name>/ruoyi/uploadPath` |

确保该路径具有读/写权限。另请检查 `logback.xml` `log.path`.

## 常见错误清单

- [ ] 添加业务代码 `ruoyi-system` 而不是创建一个新模块
- [ ] 使用 `classpath:` 而不是 `classpath*:` 在映射器位置
- [ ] 将页面视图放置在 `src/components/` 而不是 `src/views/`
- [ ] 呼唤 `axios` 直接而不是使用 `@/utils/request`
- [ ] 为应使用基于动态菜单的路由的页面定义静态路由
- [ ] 离开 `swagger.enabled: true` 生产中
- [ ] 使用默认值 `token.secret` 生产价值
- [ ] 忘记添加新的模块依赖项 `ruoyi-admin/pom.xml`
- [ ] 修改 `permission.js` 不了解路由保护生命周期
- [ ] 环境 `gen.packageName` 到 `com.ruoyi.system` 用于定制业务模块
