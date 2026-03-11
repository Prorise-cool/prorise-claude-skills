# 阶段 07：参数验证

## 目标
后端请求参数使用 Hibernate Validator 注释进行验证，在无效输入时返回结构化错误消息。

## 先决条件
- 上传/下载工作按 [05-上传-下载.md](./05-upload-download.md)
- `spring-boot-starter-validation` 对类路径的依赖（默认包含在 RuoYi 中）

## 执行步骤

### 第 1 步：向实体字段添加验证注释

❌ **错误的方法**：通过手动 if 检查在控制器方法主体中进行验证。
```java
// Wrong: manual validation is verbose, error-prone, and misses edge cases
@PostMapping
public AjaxResult add(@RequestBody SysUser user) {
    if (user.getUserName() == null || user.getUserName().isEmpty()) {
        return AjaxResult.error("Username cannot be empty");
    }
    if (user.getPassword().length() < 6) {
        return AjaxResult.error("Password too short");
    }
    return toAjax(userService.insertUser(user));
}
```

✅ **正确方法**：用注释实体字段 `javax.validation.constraints` 注释。
```java
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SysUser extends BaseEntity {
    @NotBlank(message = "Username cannot be empty")
    @Size(min = 2, max = 20, message = "Username must be 2-20 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, max = 50, message = "Password must be 6-50 characters")
    private String password;

    @Email(message = "Email format is invalid")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    private String email;

    @Size(max = 11, message = "Phone number must not exceed 11 characters")
    private String phonenumber;
}
```

⚠️ **陷阱**：使用 `@NotNull` 字符串字段允许空字符串 `""` 通过。使用 `@NotBlank` 对于必须包含非空白内容的字符串字段。

### 第 2 步：使用 @Validated 在控制器中启用验证

❌ **错误的方法**：在实体上添加验证注释但忘记了 `@Validated` 关于控制器参数。
```java
// Wrong: @RequestBody alone does NOT trigger validation
@PostMapping
public AjaxResult add(@RequestBody SysUser user) {
    return toAjax(userService.insertUser(user));
}
```

✅ **正确方法**：添加 `@Validated` 旁边的注释 `@RequestBody`.
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
```

⚠️ **陷阱**： `@Valid` 和 `@Validated` 两者都会触发验证，但是 `@Validated` 支持验证组（例如， `@Validated(AddGroup.class)`） 尽管 `@Valid` 没有。在若邑，更喜欢 `@Validated`.

### 步骤 3：通过全局异常处理程序处理验证错误

❌ **错误方法**：捕捉 `MethodArgumentNotValidException` 在每个控制器中。
```java
// Wrong: duplicate try-catch in every controller method
@PostMapping
public AjaxResult add(@Validated @RequestBody SysUser user) {
    try {
        return toAjax(userService.insertUser(user));
    } catch (MethodArgumentNotValidException e) {
        return AjaxResult.error(e.getMessage());
    }
}
```

✅ **正确做法**：若依的 `GlobalExceptionHandler` 已经处理验证错误。不需要额外的代码。
```java
// In GlobalExceptionHandler.java (already provided by RuoYi):
@ExceptionHandler(MethodArgumentNotValidException.class)
public AjaxResult handleMethodArgumentNotValidException(
        MethodArgumentNotValidException e) {
    String message = e.getBindingResult().getFieldError().getDefaultMessage();
    return AjaxResult.error(message);
}
```

前端接收：
```json
{ "code": 500, "msg": "Username cannot be empty" }
```

⚠️ **陷阱**：如果多个字段同时验证失败，默认只返回第一条错误信息。要返回所有错误，请自定义处理程序以收集 `getAllErrors()` 并加入消息。

## 完成标准
- 提交必填字段为空的表单会返回带有验证消息的 500 响应
- 无效的电子邮件格式会触发 `@Email` 约束消息
- `@Size` 违规返回配置的最小/最大边界消息
- 控制器主体中不存在手动验证代码

## 下一步
-> [../最佳实践.md](../best-practices.md)
