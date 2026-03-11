# 阶段01：分页查询

## 目标
后端列表 API 使用 PageHelper 返回分页数据，前端使用分页组件呈现它。

## 先决条件
- RuoYi 项目与后端和前端开发服务器一起运行
- 控制器延伸 `BaseController`，实体扩展 `BaseEntity`

## 执行步骤

### 第 1 步：使用 PageHelper 配置后端分页

❌ **错误做法**：打电话 `startPage()` 在查询方法之后。
```java
// Wrong: startPage() placed AFTER the query -- pagination never applies
public TableDataInfo list(SysUser user) {
    List<SysUser> list = userService.selectUserList(user);
    startPage(); // Too late, query already executed
    return getDataTable(list);
}
```

✅ **正确做法**：致电 `startPage()` 从 `BaseController` 紧接在查询之前。
```java
@PreAuthorize("@ss.hasPermi('system:user:list')")
@GetMapping("/list")
public TableDataInfo list(SysUser user) {
    startPage();  // Must be called BEFORE the query
    List<SysUser> list = userService.selectUserList(user);
    return getDataTable(list);
}
```

⚠️ **陷阱**：之间的任何 Java 语句 `startPage()` 并且查询方法（例如，日志记录、数据库调用的变量分配）导致 PageHelper 绑定到错误的查询并返回未分页的结果。

### 第 2 步：定义前端查询参数

❌ **错误的做法**：省略 `pageNum` 和 `pageSize` 在查询参数中。
```javascript
// Wrong: missing pagination params, backend receives no page info
queryParams: {
  userName: undefined
}
```

✅ **正确的方法**：包括 `pageNum` 和 `pageSize` 默认值在 `queryParams`.
```javascript
data() {
  return {
    userList: [],
    total: 0,
    queryParams: {
      pageNum: 1,
      pageSize: 10,
      userName: undefined
    }
  };
}
```

⚠️ **陷阱**：如果 `pageNum` 从 0 而不是 1 开始，第一页将被跳过，结果显示为偏移一页。

### 第三步：绑定分页组件和数据获取

❌ **错误的方法**：使用自定义分页而不同步页面状态。
```html
<!-- Wrong: no two-way sync, clicking pages does not re-query -->
<el-pagination :total="total" @current-change="changePage" />
```

✅ **正确做法**：使用若一的 `Pagination` 组件与 `.sync` 修饰符和 `@pagination` 事件。
```html
<pagination
  v-show="total > 0"
  :total="total"
  :page.sync="queryParams.pageNum"
  :limit.sync="queryParams.pageSize"
  @pagination="getList"
/>
```

```javascript
methods: {
  getList() {
    listUser(this.queryParams).then(response => {
      this.userList = response.rows;
      this.total = response.total;
    });
  }
}
```

⚠️ **陷阱**：使用 `v-if` 而不是 `v-show` 每次切换时都会销毁并重新创建分页组件，将当前页面重置为 1。

## 完成标准
- 单击页码将使用正确的数据切片重新加载表
- `response.rows` 填充表， `response.total` 驱动页数
- 更改页面大小会重置为第 1 页并获取新数据

## 下一步
-> [03-导入-导出.md](./03-import-export.md)
