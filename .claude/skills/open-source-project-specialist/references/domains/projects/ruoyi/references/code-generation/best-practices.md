# 代码生成最佳实践

## 生成数据库设计

1. **始终添加列注释** - 它们在生成的代码中成为表单标签、表标题和 API 文档。
2. **使用标准审核栏** - 包括 `create_by`, `create_time`, `update_by`, `update_time`, `remark` 为了与若毅的保持一致 `BaseEntity`.
3. **将主键定义为 BIGINT AUTO_INCRMENT** - 生成器需要单个数字自动增量 PK。不支持复合键。
4. **使用 CHAR(1) 作为状态/类型字段** - 与 `sys_dict_type` 下拉/无线电渲染的条目（例如， `'0'` = 活跃， `'1'` = 禁用）。
5. **一致地给表添加前缀** - 设置 `tablePrefix` 在 `generator.yml` 并启用 `autoRemovePre` 产生干净的类名。

## 生成配置

1. **生成前检查每一列** - 检查每个字段的显示类型、查询类型和字典类型。对于非字符串类型，默认值通常是错误的。
2. **使用 `LIKE` 查询名称/标题列** - 将查询类型设置为 `LIKE` 对于可搜索的文本字段， `EQ` 对于代码/状态字段， `BETWEEN` 对于日期范围。
3. **隐藏自动管理列** - 取消选中插入/编辑 `create_by`, `create_time`, `update_by`, `update_time` 自从 `BaseEntity` 处理它们。
4. **设置正确的显示类型**：
   - `select` / `radio` / `checkbox` 对于字典支持的字段
   - `datetime` 对于日期列
   - `textarea` 对于长文本（备注、描述）
   - `imageUpload` / `fileUpload` 对于附件字段
   - `treeselect` 对于树表中的父 ID 字段

## 部署清单

1. **首先**执行生成的 SQL 以创建菜单和权限条目。
2. 将 Java 文件复制到正确的模块（`ruoyi-system` 对于域/映射器/服务， `ruoyi-admin` 对于控制器）。
3. 将映射器 XML 复制到 `src/main/resources/mapper/[module]/`.
4. 将 Vue 文件复制到 `src/views/[module]/` 和API JS `src/api/[module]/`.
5. 重新启动后端并验证没有编译错误。
6. 在角色管理中将新菜单分配给目标角色。
7. 清除浏览器缓存并验证页面是否正确呈现。

## 常见陷阱

| 陷阱 | 症状 | 使固定 |
|---------|---------|-----|
| 缺少菜单 SQL 执行 | 页面在侧边栏中不可见 | 运行生成的 `xxxMenu.sql` |
| 未创建字典类型 | 表单上的空下拉菜单/单选按钮 | 先在字典管理中创建字典 |
| 错误的模块目标 | API 调用时出现 404 | 验证控制器是否在扫描的包中 |
| 树表缺少根节点 | 空树显示 | 插入一行 `parent_id = 0` |
| 单独生成的子表 | 重复映射器错误 | 仅从主表生成 |
| 栏目评论为空 | 空白表格标签 | 添加 `COMMENT` 到 DDL 中的所有列 |

## 生成后定制

- **添加验证**：使用注释域字段 `@NotBlank`, `@Size`, `@Email` 根据需要。
- **自定义查询**：使用附加 SQL 语句扩展生成的 Mapper XML。
- **UI 调整**：修改生成的 Vue 组件以实现自定义布局、图表或多步骤表单。
- **字典集成**：使用 `<dict-tag>` 表列翻译组件和 `dicts` mixin 用于表单下拉菜单。
- **覆盖模板**：修改 `resources/vm/*.vm` 速度模板 `ruoyi-generator` 用于生成的代码模式的项目范围定制。
