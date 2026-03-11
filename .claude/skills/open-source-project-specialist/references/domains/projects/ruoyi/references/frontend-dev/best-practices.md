# 最佳实践：前端开发

## 常见陷阱和解决方案

### 1. 保活名称不匹配

**触发器**：路线 `name` 和导出的组件 `name` 不匹配。

**症状**：选项卡切换时页面丢失状态；每次用户返回选项卡时都会重新加载数据。

**修复**：确保路线的 `name` 属性与组件的完全匹配 `export default { name: 'XxxName' }`。所有组件的名称必须是唯一的，以避免递归渲染或内存溢出。

### 2. 非标准元件的许可指令

**触发**：使用 `v-hasPermi` 在 `el-tab-pane`, `el-table-column`，或其他不支持 DOM 删除的组件。

**症状**：尽管缺乏权限，元素仍然可见，或者有关指令绑定的控制台错误。

**修复**：导入 `checkPermi` 和 `checkRole` 从 `@/utils/permission` 并使用 `v-if="checkPermi(['perm:string'])"` 而不是指令。

### 3. 字典类型未加载

**触发**：声明 `dicts: ['wrong_type_key']` 后端字典管理中不存在类型字符串。

**症状**：下拉菜单显示空选项； `dict-tag` 显示原始值而不是标签。

**修复**：验证系统管理>词典管理中的词典类型键。该字符串必须匹配 `dictType` 字段准确无误，包括大小写。

### 4. 缺少分页.sync修饰符

**触发**：绑定 `:page="queryParams.pageNum"` 没有 `.sync`.

**症状**：点击分页组件中的第2页不更新 `queryParams.pageNum`;表格保留在第 1 页。

**修复**：始终使用 `:page.sync="queryParams.pageNum"` 和 `:limit.sync="queryParams.pageSize"`.

### 5. 加载叠加层永不消失

**触发**：呼叫 `this.$modal.loading()` 但不打电话 `this.$modal.closeLoading()` 当异步操作失败时。

**症状**：全屏加载遮罩永久保留，阻止所有用户交互。

**修复**：始终关闭成功和错误路径中的加载：
```javascript
this.$modal.loading('Exporting...')
exportData().then(res => {
  this.$download.saveAs(res, 'data.xlsx')
}).catch(err => {
  this.$modal.msgError('Export failed')
}).finally(() => {
  this.$modal.closeLoading()
})
```

### 6. vue-i18n版本不兼容

**触发器**：安装 `vue-i18n` Vue 2 项目中的最新版本 (v9+)。

**症状**： `VueI18n is not a constructor` 或者 `createI18n is not a function` 启动时出错。

**修复**：固定到 `vue-i18n@7.3.2` 对于 Vue 2 项目。 Vue 3 项目应该使用 `vue-i18n@9.x`.

### 7. API 参数与数据混淆

**触发**：使用 `data` 对于 GET 请求或 `params` 用于 POST 请求。

**症状**：GET 请求忽略过滤器（空查询字符串）； POST 请求发送带有查询字符串参数的空正文。

**修复**：GET 使用 `params` （作为查询字符串附加到 URL）。 POST/PUT 使用 `data` （作为请求正文发送）。这是由 axios 强制执行的标准行为 `request.js`.

### 8. 多级路由缺少router-view

**触发器**：三层或多层嵌套路由，无中间层 `<router-view>` 成分。

**症状**：子路由组件不渲染；页面仅显示父布局。

**修复**：对于三级或三级以上的路线，添加 `<router-view />` 在中级的组件中。注意：最新的 RuoYi 版本会自动处理此问题，但旧版本需要手动设置。

### 9. 路由更改后未应用范围样式

**触发器**：错误使用深度选择器或忘记使用深度选择器 `scoped` 属性。

**症状**：样式泄漏到其他页面，或者样式不适用于子组件。

**修复**：始终添加 `<style scoped>` 对于特定于页面的样式。使用 `::v-deep` （或者 `/deep/`) 在需要时设置子组件内部的样式。全局样式属于 `src/assets/styles/`.

### 10. 公共端点不跳过令牌

**触发**：设置 `isToken: false` 作为请求标头中的字符串而不是布尔值。

**症状**：当不存在令牌时，公共端点（验证码、语言更改）失败并返回 401。

**修复**：使用 `headers: { isToken: false }` （布尔值，不是字符串）。拦截器检查 `=== false`.

## 开发标准

### 文件组织

| 类别 | 地点 | 习俗 |
|---|---|---|
| 意见 | `src/views/<module>/index.vue` | 一条路径=一个文件；子文件夹中的子模块 |
| 应用程序编程接口 | `src/api/<module>/<entity>.js` | 每个后端实体/模型一个文件 |
| 全球组件 | `src/components/<Name>/index.vue` | 可在所有模块中重复使用 |
| 页面组件 | `src/views/<module>/components/` | 模块特定组件 |
| 全局样式 | `src/assets/styles/` | 共享 CSS/SCSS |
| 页面样式 | `<style scoped>` 在 `.vue` 文件 | 总是使用 `scoped` |

### 插件对象快速参考

| 目的 | 地点 | 关键方法 |
|---|---|---|
| `$tab` | `plugins/tab.js` | `openPage()`, `closePage()`, `closeOpenPage()`, `refreshPage()`, `closeAllPage()` |
| `$modal` | `plugins/modal.js` | `msg()`, `msgSuccess()`, `msgError()`, `confirm()`, `loading()`, `closeLoading()` |
| `$auth` | `plugins/auth.js` | `hasPermi()`, `hasPermiOr()`, `hasPermiAnd()`, `hasRole()`, `hasRoleOr()` |
| `$cache` | `plugins/cache.js` | `local.set/get/setJSON/getJSON/remove()`, `session.set/get/setJSON/getJSON/remove()` |
| `$download` | `plugins/download.js` | `name()`, `resource()`, `zip()`, `saveAs()` |

### 组件道具快速参考

| 成分 | 关键道具 | 笔记 |
|---|---|---|
| `dict-tag` | `options`, `value`, `separator`, `showValue` | 与使用 `dicts` 组件选项 |
| `pagination` | `total`, `page.sync`, `limit.sync`, `@pagination` | 全球注册 |
| `editor` | `v-model`, `height`, `minHeight`, `readOnly`, `fileSize` | 基于鹅毛笔的富文本 |
| `image-upload` | `v-model`, `limit`, `fileSize`, `fileType`, `drag` | 默认文件类型是文档；覆盖图像 |
| `file-upload` | `v-model`, `limit`, `fileSize`, `fileType`, `isShowTip` | 支持拖动排序 |
| `right-toolbar` | `showSearch.sync`, `columns`, `gutter` | 搜索切换+列可见性 |
| `image-preview` | `src`, `width`, `height` | 内嵌图像预览 |

### 路由配置清单

- [ ] 静态路由（登录、404、401） `constantRoutes` 仅有的
- [ ] 通过后端菜单系统管理动态路线
- [ ] 成分 `name` 匹配路线 `name` 为了 `keep-alive`
- [ ] `meta.title` 设置侧边栏和面包屑显示
- [ ] `meta.icon` 设置有效的 SVG 名称或 `el-icon-x` 班级
- [ ] `meta.activeMenu` 在详细信息页面上设置以突出显示父菜单
- [ ] `hidden: true` 不应出现在侧边栏中的路线

### 权限实施清单

- [ ] 按钮级： `v-hasPermi="['module:entity:action']"` 在 `el-button`
- [ ] 选项卡/动态元素： `v-if="checkPermi(['perm'])"` 具有导入功能
- [ ] 程序化检查： `this.$auth.hasPermi('perm')` 返回布尔值
- [ ] 基于角色： `v-hasRole` 指令或 `this.$auth.hasRole('role')`
- [ ] 后端总是重新验证权限（前端仅限 UI）
