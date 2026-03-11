# 第一阶段：权限控制

## 目标
API端点受到权限和角色注释的保护，公共端点通过 `@Anonymous`.

## 先决条件
- 配置了 Spring Security 的 RuoYi 后端运行
- 系统菜单管理中定义的角色和权限

## 执行步骤

### 第 1 步：使用 @PreAuthorize 和 @ss.hasPermi 添加权限检查

❌ **错误的方法**：在方法体内手动检查权限。
```java
// Wrong: manual check is fragile, bypasses Spring Security filter chain
@GetMapping("/list")
public TableDataInfo list(SysUser user) {
    if (!SecurityUtils.hasPermi("system:user:list")) {
        throw new RuntimeException("No permission");
    }
    startPage();
    return getDataTable(userService.selectUserList(user));
}
```

✅ **正确方法**：使用 `@PreAuthorize` 和 `@ss` SpEL 表达式来自 `PermissionService`.
```java
// Require specific permission
@PreAuthorize("@ss.hasPermi('system:user:list')")
@GetMapping("/list")
public TableDataInfo list(SysUser user) {
    startPage();
    return getDataTable(userService.selectUserList(user));
}

// Require ANY of multiple permissions
@PreAuthorize("@ss.hasAnyPermi('system:user:add,system:user:edit')")
@PostMapping
public AjaxResult add(@RequestBody SysUser user) {
    return toAjax(userService.insertUser(user));
}

// Verify user LACKS a permission (inverse check)
@PreAuthorize("@ss.lacksPermi('system:user:remove')")
@GetMapping("/safe-view")
public AjaxResult safeView() {
    return AjaxResult.success();
}
```

⚠️ **陷阱**：超级管理员（userId=1）绕过所有权限检查。永远不要依赖 `@PreAuthorize` 限制超级管理员帐户——它总是返回true。

### 步骤 2：添加基于角色的访问控制

❌ **错误的方法**：在业务逻辑中硬编码角色名称。
```java
// Wrong: fragile string comparison, doesn't use Spring Security
if ("admin".equals(user.getRoleName())) {
    // allow admin operations
}
```

✅ **正确方法**：使用 `@ss.hasRole` 和 `@ss.hasAnyRoles` 注释。
```java
// Require specific role
@PreAuthorize("@ss.hasRole('admin')")
@DeleteMapping("/{userId}")
public AjaxResult remove(@PathVariable Long userId) {
    return toAjax(userService.deleteUser(userId));
}

// Require ANY of multiple roles
@PreAuthorize("@ss.hasAnyRoles('admin,manager')")
@GetMapping("/dashboard")
public AjaxResult dashboard() {
    return AjaxResult.success(dashboardService.getData());
}
```

服务层中的编程角色检查：
```java
if (SecurityUtils.hasRole("admin")) {
    // admin-specific logic
}
```

⚠️ **陷阱**：角色关键 `@ss.hasRole('admin')` 必须匹配 `roleKey` 领域在 `sys_role` 表，而不是 `roleName`。使用“管理员”等显示名称总是会失败。

### 第 3 步：使用 @Anonymous 公开公共端点

❌ **错误的方法**：注释掉权限注释并使端点在没有文档的情况下不受保护。
```java
// Wrong: silently removing security, no clear intent
// @PreAuthorize("@ss.hasPermi('system:notice:list')")
@GetMapping("/public/notices")
public AjaxResult publicNotices() {
    return AjaxResult.success(noticeService.selectPublicList());
}
```

✅ **正确方法**：使用 `@Anonymous` 用于显式标记公共端点的注释。
```java
@Anonymous
@GetMapping("/public/notices")
public AjaxResult publicNotices() {
    return AjaxResult.success(noticeService.selectPublicList());
}
```

⚠️ **陷阱**： `@Anonymous` 可以放置在类上以使所有方法公开。当只有一种方法应该公开时，将其放置在控制器类上会公开该控制器中的每个端点，而无需进行身份验证。

## 完成标准
- 受保护端点为没有所需权限的用户返回 403
- `@Anonymous` 无需登录即可访问端点（无需令牌）
- 无论分配的权限如何，超级管理员都可以访问所有受保护的端点

## 下一步
-> [03-事务日志记录.md](./03-transaction-logging.md)
