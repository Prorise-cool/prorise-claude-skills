# 后端 CRUD 最佳实践

## 分页规则

1. **`startPage()` 必须是查询之前的最后一个语句** - 之间没有日志记录、变量分配或条件逻辑 `startPage()` 和 MyBatis 查询调用。 PageHelper 使用 ThreadLocal 并绑定到下一个执行的查询。
2. **总是回来 `TableDataInfo`** - 使用 `getDataTable(list)` 从 `BaseController` 它包裹着 `rows` 和 `total`。绝不返回原始数据 `List` 来自分页端点。
3. **在过滤器更改时重置页面** - 当用户在前端更改搜索条件时，设置 `queryParams.pageNum = 1` 打电话之前 `getList()` 以避免请求不存在的页面。
4. **使用 `v-show` 不是 `v-if` 用于分页** - `v-if` 销毁组件并重置内部状态； `v-show` 保留它。

## 导入/导出规则

1. **`readConverterExp` 格式严格** - 必须 `key=value,key=value` 周围没有空格 `=`。例子： `"0=Male,1=Female,2=Unknown"`.
2. **使用 `dictType` 超过 `readConverterExp` 如果可能** - 基于字典的转换与系统字典保持同步并避免硬编码值。
3. **放 `type` 在 @Excel 上用于方向字段** - 使用 `Type.IMPORT` 对于仅导入字段（例如 `deptId`), `Type.EXPORT` 仅用于导出（如计算字段），以及 `Type.ALL` （默认）两者都适用。
4. **始终添加 `@Log(businessType = BusinessType.EXPORT)` 导出时** - 这是审计跟踪合规性所必需的。
5. **使用 `@Excels` 和 `targetAttr` 对于嵌套对象** - 直接 `@Excel` 在对象字段输出上 `toString()`，而不是嵌套属性。

## 上传/下载规则

1. **始终包含授权标头** - `el-upload` 不继承axios拦截器。手动设置 `headers: { Authorization: "Bearer " + getToken() }`.
2. **清除 `fileList` 表单重置** - 如果未明确清除，则先前编辑的过时文件将保留在上传组件中。
3. **存储相对路径，而不是绝对路径** - `/common/upload` 端点返回相对路径。让 Nginx 或开发代理处理物理到 URL 的映射。
4. **使用 `<a download>` 用于文件下载** - `window.open()` 在浏览器中显示文件而不是下载它们。

## 验证规则

1. **使用 `@NotBlank` 对于字符串， `@NotNull` 对于其他人** - `@NotNull` on String 允许为空 `""` 通过。
2. **始终配对 `@Validated` 和 `@RequestBody`** - 实体字段上的注释没有任何作用 `@Validated` 关于控制器参数。
3. **杠杆作用 `GlobalExceptionHandler`** - 不要抓住 `MethodArgumentNotValidException` 在控制器中手动操作。若艺在全球范围内处理。
4. **更喜欢 `@Validated` 超过 `@Valid`** - `@Validated` 支持不同操作的组验证（添加与编辑）。

## 常见陷阱

| 陷阱 | 症状 | 使固定 |
|---------|---------|-----|
| `startPage()` 查询后 | 返回完整数据集，无分页 | 移动 `startPage()` 直接在查询调用之前 |
| 丢失的 `getToken()` 在上传标头中 | 401 文件上传未经授权 | 添加 `headers: { Authorization: "Bearer " + getToken() }` |
| `readConverterExp` 格式错误 | 导出的 Excel 中的原始数值 | 使用精确的 `0=Male,1=Female` 格式不带空格 |
| `@NotBlank` 没有 `@Validated` | 无错误保存无效数据 | 添加 `@Validated` 在控制器方法参数上 |
| `@Excel` 在物场上没有 `targetAttr` | `toString()` Excel 单元格中的输出 | 使用 `@Excels` 和 `targetAttr` 对于嵌套属性 |
| `v-if` 关于分页 | 数据刷新时页面重置为 1 | 更改为 `v-show` 保留组件状态 |
| 跨域下载链接 | `download` 浏览器忽略的属性 | 提供同源文件或使用后端代理 |
