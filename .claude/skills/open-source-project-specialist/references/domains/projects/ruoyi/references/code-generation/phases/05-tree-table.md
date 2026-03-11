# 阶段05：树表结构生成

## 目标
使用 RuoYi 代码生成器生成具有父子层次结构的树形结构 CRUD 模块（例如部门、类别）。

## 先决条件
- 单表生成工作流程可理解 [03-单表.md](./03-single-table.md)
- 数据库表包含自引用父 ID 列

## 执行步骤

### 第 1 步：设计树表

❌ **错误的做法**：缺少父参考列或树名称列。
```sql
-- Wrong: no parent_id, cannot form tree structure
CREATE TABLE biz_category (
  category_id   BIGINT(20) NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(100),
  PRIMARY KEY (category_id)
);
```

✅ **正确方法**：包含 ID、父 ID 和显示名称列以进行树渲染。
```sql
CREATE TABLE biz_category (
  category_id   BIGINT(20)   NOT NULL AUTO_INCREMENT COMMENT 'Category ID',
  parent_id     BIGINT(20)   DEFAULT 0               COMMENT 'Parent category ID',
  category_name VARCHAR(100) NOT NULL DEFAULT ''      COMMENT 'Category name',
  order_num     INT(4)       DEFAULT 0               COMMENT 'Display order',
  status        CHAR(1)      DEFAULT '0'              COMMENT 'Status (0=active 1=disabled)',
  create_by     VARCHAR(64)  DEFAULT ''               COMMENT 'Created by',
  create_time   DATETIME                              COMMENT 'Created time',
  update_by     VARCHAR(64)  DEFAULT ''               COMMENT 'Updated by',
  update_time   DATETIME                              COMMENT 'Updated time',
  PRIMARY KEY (category_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Category tree';
```

⚠️ **陷阱**：使用 `pid` 或者 `parentId` 作为列名而不是匹配配置的 `treeParentCode` 字段使树构建器生成平面列表而不是层次结构。

### 步骤 2：配置树代码字段

❌ **错误的做法**：选择“CRUD”模板而不是“树表”模板。
```text
# Wrong: using single-table template for tree data
Template: CRUD
# Result: flat table with no expand/collapse, no parent selection
```

✅ **正确方法**：选择“树表”模板并映射三个所需的树字段。
```text
1. System Tools -> Code Generation -> Edit table config
2. Tab "Generation Info":
   - Template: Tree table (not CRUD)
   - Tree Code Field: category_id (node identifier)
   - Tree Parent Code Field: parent_id (parent reference)
   - Tree Name Field: category_name (display label)
3. Tab "Field Info":
   - parent_id: Display Type = treeselect (tree dropdown picker)
   - order_num: Display Type = input (number)
   - status: Display Type = radio, Dict Type = sys_normal_disable
4. Generate code
```

⚠️ **陷阱**：交换“树代码”和“树父代码”字段会生成一个倒置的树，其中子项显示为根，反之亦然。始终验证：树代码 = 主键列，树父代码 = 父级的外键。

### 第3步：插入根节点并部署

❌ **错误的方法**：在数据库中没有根节点的情况下进行部署。
```sql
-- Wrong: no root entry, tree renders empty
-- All records have parent_id > 0 but no root with parent_id = 0
```

✅ **正确方法**：插入至少一个根节点 `parent_id = 0`.
```sql
-- Insert root node before deploying
INSERT INTO biz_category (category_id, parent_id, category_name, order_num, status)
VALUES (100, 0, 'Root Category', 0, '0');

-- Insert child nodes
INSERT INTO biz_category (category_id, parent_id, category_name, order_num, status)
VALUES (101, 100, 'Electronics', 1, '0');
INSERT INTO biz_category (category_id, parent_id, category_name, order_num, status)
VALUES (102, 100, 'Clothing', 2, '0');
```

⚠️ **陷阱**：树组件期望 `parent_id = 0` 默认为根节点。使用 `parent_id = NULL` 导致树不渲染任何内容，因为递归构建器会跳过 NULL 父级。

## 完成标准
- 树页面呈现可扩展的父子节点
- 添加子节点通过树下拉菜单正确设置父节点
- 通过显示中反映的 order_num 拖动或重新排序
- 编辑/删除带有子节点的级联或警告

## 下一步
-> [07-子表.md](./07-sub-table.md)
