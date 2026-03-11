# 第03阶段：Excel导入和导出

## 目标
实体字段注释为 `@Excel` 启用一键导出到 `.xlsx` 并使用 Excel 批量导入 `ExcelUtil`.

## 先决条件
- 分页查询工作按 [01-分页查询.md](./01-pagination-query.md)
- `ruoyi-common` 可用的依赖项（包含 `@Excel`, `ExcelUtil`)

## 执行步骤

### 第 1 步：使用 @Excel 注释实体字段

❌ **错误的方法**：使用 `readConverterExp` 分隔符格式错误。
```java
// Wrong: using Chinese comma or space instead of '=' and ','
@Excel(name = "Status", readConverterExp = "0 Active, 1 Disabled")
private String status;
```

✅ **正确方法**：使用严格 `key=value` 中以逗号分隔的对 `readConverterExp`.
```java
@Excel(name = "User ID", prompt = "User number")
private Long userId;

@Excel(name = "User Name")
private String userName;

@Excel(name = "Gender", readConverterExp = "0=Male,1=Female,2=Unknown")
private String sex;

@Excel(name = "Status", dictType = "sys_normal_disable")
private String status;

@Excel(name = "Avatar", cellType = ColumnType.IMAGE)
private String avatar;

@Excel(name = "Last Login", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
private Date loginDate;
```

⚠️ **陷阱**： `readConverterExp` 格式必须准确 `0=Male,1=Female` -- 周围任何空间 `=` 或使用 `:` 而不是 `=` 默默地输出原始值而不进行转换。

### 第2步：在控制器中实现导出

❌ **错误的方法**：缺失 `@Log` 导出端点的注释和权限检查。
```java
// Wrong: no audit log, no permission guard
@GetMapping("/export")
public AjaxResult export(SysUser user) {
    List<SysUser> list = userService.selectUserList(user);
    ExcelUtil<SysUser> util = new ExcelUtil<>(SysUser.class);
    return util.exportExcel(list, "userData");
}
```

✅ **正确方法**：添加 `@Log` 和 `BusinessType.EXPORT` 和 `@PreAuthorize` 允许。
```java
@Log(title = "User Management", businessType = BusinessType.EXPORT)
@PreAuthorize("@ss.hasPermi('system:user:export')")
@PostMapping("/export")
public void export(HttpServletResponse response, SysUser user) {
    List<SysUser> list = userService.selectUserList(user);
    ExcelUtil<SysUser> util = new ExcelUtil<>(SysUser.class);
    util.exportExcel(response, list, "userData");
}
```

使用 RuoYi 的前端触发器 `download` 混合：
```javascript
handleExport() {
  this.download('system/user/export', {
    ...this.queryParams
  }, `user_${new Date().getTime()}.xlsx`);
}
```

⚠️ **陷阱**：使用 `@GetMapping` for 导出会导致查询参数出现在 URL 中，这可能会超出大型过滤器集的浏览器 URL 长度限制。使用 `@PostMapping`.

### 第3步：通过模板下载实现导入

❌ **错误的做法**：省略 `Authorization` 标头输入 `el-upload`，导致 401 错误。
```javascript
// Wrong: no auth header -- server rejects with 401 Unauthorized
upload: {
  url: process.env.VUE_APP_BASE_API + "/system/user/importData"
}
```

✅ **正确做法**：设置 `headers` 带有不记名令牌并提供模板下载。
```javascript
import { getToken } from "@/utils/auth";

upload: {
  open: false,
  title: "User Import",
  isUploading: false,
  updateSupport: 0,
  headers: { Authorization: "Bearer " + getToken() },
  url: process.env.VUE_APP_BASE_API + "/system/user/importData"
},

importTemplate() {
  this.download('system/user/importTemplate', {},
    `user_template_${new Date().getTime()}.xlsx`);
}
```

后端导入和模板端点：
```java
@Log(title = "User Management", businessType = BusinessType.IMPORT)
@PostMapping("/importData")
public AjaxResult importData(MultipartFile file, boolean updateSupport)
        throws Exception {
    ExcelUtil<SysUser> util = new ExcelUtil<>(SysUser.class);
    List<SysUser> userList = util.importExcel(file.getInputStream());
    String operName = getUsername();
    String message = userService.importUser(userList, updateSupport, operName);
    return AjaxResult.success(message);
}

@PostMapping("/importTemplate")
public void importTemplate(HttpServletResponse response) {
    ExcelUtil<SysUser> util = new ExcelUtil<>(SysUser.class);
    util.importTemplateExcel(response, "userData");
}
```

⚠️ **陷阱**： `@Excel(type = Type.IMPORT)` 字段仅出现在导入模板中，而不出现在导出文件中。使用 `Type.EXPORT` 对于仅出口领域和 `Type.ALL` （默认）两者都适用。

### 第 4 步：使用 @Excels 处理嵌套对象导出

❌ **错误的方法**：尝试直接导出嵌套对象字段。
```java
// Wrong: @Excel on an object type outputs toString() garbage
@Excel(name = "Department Name")
private SysDept dept;
```

✅ **正确方法**：使用 `@Excels` 和 `targetAttr` 达到嵌套属性。
```java
@Excels({
    @Excel(name = "Dept Name", targetAttr = "deptName", type = Type.EXPORT),
    @Excel(name = "Dept Leader", targetAttr = "leader", type = Type.EXPORT)
})
private SysDept dept;
```

⚠️ **陷阱**： `targetAttr` 支持点表示法以进行更深层次的嵌套（例如， `dept.parent.deptName`)，但嵌套对象在导出时不能为 null，否则会发生 NullPointerException。

## 完成标准
- 导出按钮下载 `.xlsx` 具有正确转换的值（字典/表达式）
- 导入处理上传的 Excel 并返回成功/失败摘要消息
- 导入模板下载提供预先格式化的文件匹配 `@Excel` 领域

## 下一步
-> [05-上传-下载.md](./05-upload-download.md)
