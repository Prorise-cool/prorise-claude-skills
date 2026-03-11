# 阶段 07：主从（子表）生成

## 目标
使用 RuoYi 代码生成器生成主从 CRUD 模块，其中主表具有嵌入式子表（例如订单 + 订单项目）。

## 先决条件
- 单表生成理解为 [03-单表.md](./03-single-table.md)
- 两个相关表：主表和带有外键的明细（子）表

## 执行步骤

### 第 1 步：设计主表和明细表

❌ **错误的做法**：主表和明细表之间没有外键关系。
```sql
-- Wrong: no FK reference, generator cannot link tables
CREATE TABLE biz_order (
  order_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE biz_order_item (
  item_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100)
  -- Missing: order_id foreign key column
);
```

✅ **正确方法**：明细表必须有一列引用主表的主键。
```sql
CREATE TABLE biz_order (
  order_id     BIGINT(20)    NOT NULL AUTO_INCREMENT COMMENT 'Order ID',
  order_no     VARCHAR(50)   NOT NULL DEFAULT ''     COMMENT 'Order number',
  customer     VARCHAR(100)  DEFAULT ''               COMMENT 'Customer name',
  total_amount DECIMAL(10,2) DEFAULT 0               COMMENT 'Total amount',
  status       CHAR(1)       DEFAULT '0'              COMMENT 'Status (0=pending 1=completed)',
  create_by    VARCHAR(64)   DEFAULT ''               COMMENT 'Created by',
  create_time  DATETIME                               COMMENT 'Created time',
  PRIMARY KEY (order_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Order master';

CREATE TABLE biz_order_item (
  item_id      BIGINT(20)    NOT NULL AUTO_INCREMENT COMMENT 'Item ID',
  order_id     BIGINT(20)    NOT NULL DEFAULT 0      COMMENT 'Order ID (FK)',
  product_name VARCHAR(100)  DEFAULT ''               COMMENT 'Product name',
  quantity     INT(6)        DEFAULT 1               COMMENT 'Quantity',
  unit_price   DECIMAL(10,2) DEFAULT 0               COMMENT 'Unit price',
  PRIMARY KEY (item_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Order items';
```

⚠️ **陷阱**：明细表中的外键列名必须与您配置的“子表外键”完全匹配。不匹配会导致编辑时详细信息行为空。

### 步骤2：配置子表关系

❌ **错误的做法**：将两个表分别导入为独立的 CRUD 模块。
```text
# Wrong: generating two independent single-table CRUDs
Import biz_order -> Generate as CRUD
Import biz_order_item -> Generate as CRUD
# Result: two unrelated pages, no master-detail form
```

✅ **正确做法**：配置主表通过外键引用子表。
```text
1. Import both biz_order and biz_order_item tables
2. Edit biz_order generation config:
   Tab "Generation Info":
     - Template: Sub-table (master-detail)
     - Sub-table Name: biz_order_item (select from dropdown)
     - Sub-table Foreign Key: order_id (column in biz_order_item)
   Tab "Field Info" (master):
     - Configure order fields normally
   Tab "Field Info" (sub-table tab appears):
     - Configure item columns display types
     - item_id: uncheck all (auto-generated)
     - order_id: uncheck all (auto-filled by relationship)
3. Generate code for biz_order only (sub-table is included)
```

⚠️ **陷阱**：单独为子表和主表生成代码会导致重复的 Mapper 文件和编译错误。只从主表生成；子表代码已嵌入。

### 第 3 步：部署并验证主从表单

❌ **错误的做法**：只部署主表文件而忽略子表域/映射器。
```text
# Wrong: missing sub-table artifacts
Deployed: OrderController, Order.java, OrderMapper
Missing: OrderItem.java, OrderItemMapper, OrderItemMapper.xml
```

✅ **正确做法**：部署所有生成的文件，包括子表domain和mapper。
```text
Generated files include:
  controller/BizOrderController.java  (handles both master + detail)
  domain/BizOrder.java                (contains List<BizOrderItem> field)
  domain/BizOrderItem.java            (sub-table entity)
  mapper/BizOrderMapper.java
  mapper/BizOrderItemMapper.java
  service/IBizOrderService.java       (CRUD includes cascading detail ops)
  service/impl/BizOrderServiceImpl.java

Mapper XMLs:
  BizOrderMapper.xml                  (includes sub-table join queries)
  BizOrderItemMapper.xml

Vue files:
  views/business/order/index.vue      (master-detail form with embedded table)
  api/business/order.js

SQL:
  orderMenu.sql                       (menu + permissions for master)
```

⚠️ **陷阱**：生成的 `insertXxx` ServiceImpl 中的方法包括使用循环批量插入子表项。对于大型细节集（100+），考虑替换为 MyBatis 批处理执行器以提高性能。

## 完成标准
- 主列表页面显示具有标准 CRUD 操作的订单
- 添加/编辑表单包括订单项目的嵌入式详细信息表
- 在明细表中添加项目会保留在主记录中
- 删除主记录会级联删除其详细信息行
- 生成的 SQL 为主实体创建正确的菜单层次结构

## 下一步
-> [../最佳实践.md](../best-practices.md)
