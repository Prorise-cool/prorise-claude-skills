# 阶段 03：单表 CRUD 生成工作流程

## 目标
使用RuoYi代码生成器生成完整的单表CRUD模块（后端+前端）。

## 先决条件
- 代码生成器配置为 [01-生成器设置.md](./01-generator-setup.md)
- 使用正确的列类型和注释创建的目标数据库表

## 执行步骤

### 步骤一：设计数据库表

❌ **错误的做法**：创建没有注释或没有主键的表。
```sql
-- Wrong: no comments, no standard RuoYi audit columns
CREATE TABLE product (
  id INT,
  name VARCHAR(100),
  price DECIMAL
);
```

✅ **正确做法**：包括主键、列注释和标准审核字段。
```sql
CREATE TABLE biz_product (
  product_id    BIGINT(20)   NOT NULL AUTO_INCREMENT COMMENT 'Product ID',
  product_name  VARCHAR(100) NOT NULL DEFAULT ''     COMMENT 'Product name',
  product_type  CHAR(1)      DEFAULT '0'             COMMENT 'Type (0=normal 1=special)',
  price         DECIMAL(10,2) DEFAULT 0              COMMENT 'Price',
  status        CHAR(1)      DEFAULT '0'             COMMENT 'Status (0=active 1=disabled)',
  create_by     VARCHAR(64)  DEFAULT ''              COMMENT 'Created by',
  create_time   DATETIME                             COMMENT 'Created time',
  update_by     VARCHAR(64)  DEFAULT ''              COMMENT 'Updated by',
  update_time   DATETIME                             COMMENT 'Updated time',
  remark        VARCHAR(500) DEFAULT NULL             COMMENT 'Remark',
  PRIMARY KEY (product_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Product information';
```

⚠️ **陷阱**：列注释在生成的 Vue 页面中用作表单标签。空注释会在 UI 中产生空白标签。

### 第 2 步：导入并配置生成设置

❌ **错误方法**：接受所有默认值而不编辑列显示类型。
```text
# Wrong: not reviewing the column configuration
Import table -> Generate immediately -> Deploy
```

✅ **正确做法**：导入，然后微调每一列的显示类型和查询模式。
```text
1. System Tools -> Code Generation -> Import -> Select biz_product
2. Click "Edit" on the imported table row
3. Tab "Generation Info":
   - Template: CRUD (single table)
   - Module Name: business
   - Business Name: product
   - Package Path: com.ruoyi.business
4. Tab "Field Info" - configure each column:
   - product_type: Display Type = select, Dict Type = biz_product_type
   - status: Display Type = radio, Dict Type = sys_normal_disable
   - price: Display Type = input (number)
   - remark: Display Type = textarea
   - create_by/update_by: uncheck Insert/Edit (auto-filled)
   - create_time/update_time: uncheck Insert/Edit (auto-filled)
5. Tab "Field Info" - set Query Type:
   - product_name: Query Type = LIKE (fuzzy search)
   - product_type: Query Type = EQ (exact match)
   - status: Query Type = EQ
```

⚠️ **陷阱**：设置 `dictType` 不存在的值 `sys_dict_type` 表导致下拉列表在前端呈现为空。首先创建字典条目。

### 第 3 步：生成、部署和验证

❌ **错误的做法**：只复制Java文件，跳过SQL和Vue文件。
```bash
# Wrong: partial deployment
cp -r main/java/com/ruoyi/business/ ruoyi-system/src/main/java/com/ruoyi/business/
# Missing: mapper XML, Vue pages, API JS, menu SQL
```

✅ **正确方法**：部署所有工件并执行菜单 SQL。
```bash
# 1. Execute generated SQL for menu and permission entries
mysql -u root -p ry-vue < sql/productMenu.sql

# 2. Copy backend files
cp -r main/java/com/ruoyi/business/ \
  ruoyi-system/src/main/java/com/ruoyi/business/
cp -r main/resources/mapper/business/ \
  ruoyi-system/src/main/resources/mapper/business/

# 3. Copy frontend files
cp -r vue/views/business/ ruoyi-ui/src/views/business/
cp -r vue/api/business/ ruoyi-ui/src/api/business/

# 4. Restart backend and frontend, then verify
# Backend: mvn spring-boot:run
# Frontend: npm run dev
```

⚠️ **陷阱**：如果后端模块是 `ruoyi-admin` （单个模块），将 Java 文件复制到那里而不是 `ruoyi-system`。查看 `@ComponentScan` Application 类中的基础包。

## 完成标准
- 生成的 CRUD 页面可通过菜单访问
- 列表/添加/编辑/删除/导出操作全部功能
- 使用模糊搜索和基于字典的下拉菜单进行查询
- 每个角色强制执行的权限按钮（查询/添加/编辑/删除/导出）

## 下一步
-> [05-树表.md](./05-tree-table.md)
