# 第 03 阶段：事务管理和系统日志记录

## 目标
写操作使用 `@Transactional` 为了原子性，所有 CRUD 操作都通过记录 `@Log` 用于审计跟踪。

## 先决条件
- 配置的权限控制 [01-权限控制.md](./01-permission-control.md)
- `ruoyi-framework` 模块可用（包含 AOP 日志处理程序）

## 执行步骤

### 第1步：添加@Transactional以实现数据库原子性

❌ **错误的做法**：添加 `@Transactional` 使用私有或非公共方法。
```java
// Wrong: Spring AOP cannot intercept private methods -- no transaction is created
@Transactional
private void saveUserAndDept(SysUser user, SysDept dept) {
    userMapper.insert(user);
    deptMapper.insert(dept);  // If this fails, user is NOT rolled back
}
```

✅ **正确方法**：使用 `@Transactional` 具有显式回滚规则的公共服务方法。
```java
@Transactional(rollbackFor = Exception.class)
public void saveUserAndDept(SysUser user, SysDept dept) {
    userMapper.insert(user);
    deptMapper.insert(dept);  // If this fails, user insert is also rolled back
}
```

对于只读操作：
```java
@Transactional(readOnly = true)
public List<SysUser> selectUserList(SysUser user) {
    return userMapper.selectUserList(user);
}
```

⚠️ **陷阱**：默认情况下， `@Transactional` 仅回滚未经检查的异常（`RuntimeException`）。检查异常（例如 `IOException`) 除非您指定，否则不会触发回滚 `rollbackFor = Exception.class`.

### 第二步：添加@Log进行操作审计

❌ **错误的方法**：手动记录操作 `System.out.println` 或自定义记录器调用。
```java
// Wrong: no structured audit trail, not searchable in admin panel
@PostMapping
public AjaxResult add(@RequestBody SysUser user) {
    System.out.println("User added: " + user.getUserName());
    return toAjax(userService.insertUser(user));
}
```

✅ **正确方法**：使用 `@Log` 注释与 `title` 和 `businessType` 从 `BusinessType` 枚举。
```java
@Log(title = "User Management", businessType = BusinessType.INSERT)
@PreAuthorize("@ss.hasPermi('system:user:add')")
@PostMapping
public AjaxResult add(@Validated @RequestBody SysUser user) {
    return toAjax(userService.insertUser(user));
}

@Log(title = "User Management", businessType = BusinessType.UPDATE)
@PreAuthorize("@ss.hasPermi('system:user:edit')")
@PutMapping
public AjaxResult edit(@Validated @RequestBody SysUser user) {
    return toAjax(userService.updateUser(user));
}

@Log(title = "User Management", businessType = BusinessType.DELETE)
@PreAuthorize("@ss.hasPermi('system:user:remove')")
@DeleteMapping("/{userIds}")
public AjaxResult remove(@PathVariable Long[] userIds) {
    return toAjax(userService.deleteUserByIds(userIds));
}

@Log(title = "User Management", businessType = BusinessType.EXPORT)
@PreAuthorize("@ss.hasPermi('system:user:export')")
@PostMapping("/export")
public void export(HttpServletResponse response, SysUser user) {
    // export logic
}
```

可用的 `BusinessType` 价值观：
```java
BusinessType.INSERT  // Add
BusinessType.UPDATE  // Edit
BusinessType.DELETE  // Delete
BusinessType.EXPORT  // Export
BusinessType.IMPORT  // Import
BusinessType.OTHER   // Other
BusinessType.GRANT   // Authorization
BusinessType.FORCE   // Force quit
BusinessType.GENCODE // Code generation
BusinessType.CLEAN   // Clear data
```

⚠️ **陷阱**： `@Log` 默认记录完整的请求参数和响应正文。对于敏感端点（密码更改、文件上传），日志可能会暴露秘密。使用 `isSaveRequestData = false` 或者 `isSaveResponseData = false` 于 `@Log` 注解。

### 步骤 3：正确组合事务和日志记录

❌ **错误方法**：放置 `@Transactional` 在控制器而不是服务上。
```java
// Wrong: Controller-level transaction wraps the entire HTTP request
@Transactional
@PostMapping
@Log(title = "User Management", businessType = BusinessType.INSERT)
public AjaxResult add(@RequestBody SysUser user) {
    return toAjax(userService.insertUser(user));
}
```

✅ **正确的做法**： `@Transactional` 关于服务， `@Log` 在控制器上。
```java
// Controller
@Log(title = "User Management", businessType = BusinessType.INSERT)
@PreAuthorize("@ss.hasPermi('system:user:add')")
@PostMapping
public AjaxResult add(@Validated @RequestBody SysUser user) {
    return toAjax(userService.insertUser(user));
}

// Service
@Transactional(rollbackFor = Exception.class)
public int insertUser(SysUser user) {
    int rows = userMapper.insertUser(user);
    insertUserRole(user);  // Also transactional
    return rows;
}
```

⚠️ **陷阱**：调用 `@Transactional` 同一类中的方法（自调用）绕过 AOP 代理。内部调用在没有事务的情况下运行。将其提取到单独的服务 bean 或使用 `AopContext.currentProxy()`.

## 完成标准
- 多表插入/更新在任何异常时完全回滚
- 操作日志出现在系统监控->操作日志中，业务类型正确
- 日志条目包括操作员名称、请求 URL、参数和执行时间

## 下一步
-> [05-任务调度.md](./05-task-scheduling.md)
