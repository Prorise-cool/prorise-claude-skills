# 阶段 05：组件使用

## 目标
使用 RuoYi 内置插件对象（`$tab`, `$modal`, `$download`）和 UI 组件（`dict-tag`, `pagination`, `editor`, `image-upload`).

## 先决条件
- 第 03 阶段已完成（请求流程和身份验证工作）
- `main.js` 有插件注册（默认包含）
- 后台菜单系统配置的词典数据

## 执行步骤

### 第 1 步：使用 $tab 进行选项卡管理

❌ **错误的方法**：使用 `$router.push` 然后手动管理标签视图状态
```javascript
// Wrong: tags-view not updated, stale tabs remain
this.$router.push('/system/user')
```

✅ **正确方法**：使用 `$tab` 方法来自 `plugins/tab.js` 对于选项卡生命周期
```javascript
this.$tab.openPage('User Management', '/system/user')  // open tab
this.$tab.closeOpenPage({ path: '/system/role' })       // close current, open new
this.$tab.closePage()                                    // close current tab
this.$tab.closePage({ path: '/system/user', name: 'User' }) // close specific
this.$tab.refreshPage()                                  // refresh current
this.$tab.closeAllPage()                                 // close all tabs
this.$tab.closeLeftPage()                                // close tabs to left
this.$tab.closeRightPage()                               // close tabs to right
this.$tab.closeOtherPage()                               // close other tabs
// All return Promises: this.$tab.closePage().then(() => { ... })
```

⚠️ **陷阱**： `closePage(obj)` 不匹配 `name` -> 未找到选项卡； `name` 必须匹配路线 `name`

### 第 2 步：使用 $modal 的对话框和消息

❌ **错误方法**：使用 Element UI `Message` 和 `MessageBox` 直接地
```javascript
import { Message, MessageBox } from 'element-ui'  // inconsistent, uncentralized
```

✅ **正确方法**：使用 `$modal` 从 `plugins/modal.js` 对于所有反馈
```javascript
// Inline messages (auto-dismiss toast)
this.$modal.msgSuccess('Operation successful')
this.$modal.msgError('Operation failed')
this.$modal.msgWarning('Please check input')

// Alert dialogs (click to dismiss)
this.$modal.alertSuccess('Saved')
this.$modal.alertError('Critical error')

// Notifications (top-right corner)
this.$modal.notifySuccess('Export completed')

// Confirm dialog (Promise-based)
this.$modal.confirm('Delete this record?').then(() => {
  return delRecord(id)
}).then(() => {
  this.$modal.msgSuccess('Deleted')
}).catch(() => {})  // user cancelled

// Loading overlay
this.$modal.loading('Exporting...')
this.$modal.closeLoading()  // MUST call in both success and error paths
```

⚠️ **陷阱**：忘记 `closeLoading()` 在错误路径中 -> 加载覆盖永远卡住；使用 `.finally()`

### 第 3 步：使用 $download 下载文件

❌ **错误的方法**：使用 `window.open` 用于下载（无身份验证令牌）
```javascript
window.open('/common/download?fileName=' + name)  // no token, no error handling
```

✅ **正确方法**：使用 `$download` 从 `plugins/download.js`
```javascript
this.$download.name('report.xlsx')            // from server download path
this.$download.name('report.xlsx', true)      // delete after download
this.$download.resource('/profile/upload/2021/09/27/avatar.png') // upload path
this.$download.zip('/tool/gen/batchGenCode?tables=' + names, 'code')  // zip
// Custom blob save
const blob = new Blob([data], { type: 'text/plain;charset=utf-8' })
this.$download.saveAs(blob, 'export.txt')
this.$download.saveAs('https://example.com/file.pdf', 'doc.pdf') // URL save
```

⚠️ **陷阱**： `$download.name()` 使用完整路径而不是文件名 -> 404；仅传递文件名

### 第4步：带有dict-tag的词典显示

❌ **错误的做法**：对每个状态值进行手动条件渲染
```html
<span v-if="row.status === '0'">Normal</span>
<span v-else-if="row.status === '1'">Disabled</span>
```

✅ **正确方法**：在组件选项中加载字典，使用 `dict-tag` 在模板中
```javascript
export default {
  dicts: ['sys_normal_disable', 'sys_user_sex'],  // load dict types
}
```
```html
<!-- Dropdown in forms -->
<el-select v-model="form.status">
  <el-option v-for="dict in dict.type.sys_normal_disable"
    :key="dict.value" :label="dict.label" :value="dict.value" />
</el-select>
<!-- Display in tables -->
<el-table-column label="Status" align="center">
  <template slot-scope="scope">
    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
  </template>
</el-table-column>
<!-- Multi-value: separator=";" for custom delimiter -->
<dict-tag :options="dict.type.sys_user_sex" value="0,1" />
```

⚠️ **陷阱**：错误的字典类型字符串 `dicts` 数组 -> 空下拉列表；在词典管理中验证姓名

### 第5步：分页组件

❌ **错误的做法**：使用 el-pagination 手动实现分页
```html
<el-pagination @current-change="handlePage" :total="total" />
```

✅ **正确方法**：使用内置 `pagination` 组件（全局注册）
```html
<pagination v-show="total > 0" :total="total"
  :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
  @pagination="getList" />
<!-- Props: total, page, limit, pageSizes([10,20,30,50]),
     autoScroll(true), hidden(false) -->
```

⚠️ **陷阱**：缺失 `.sync` 在 `:page` 和 `:limit` -> 点击时页码永远不会更新

### 第6步：编辑并上传组件

❌ **错误的方法**：安装单独的编辑器而不检查内置插件
```bash
npm install vue-quill-editor  # unnecessary, already built-in
```

✅ **正确方法**：使用内置 `editor`, `image-upload`, `file-upload` 成分
```html
<!-- Rich text editor (Quill-based) -->
<editor v-model="form.content" :min-height="200" />
<!-- Props: value, height, minHeight, readOnly, fileSize(MB), type(url|base64) -->

<!-- Image upload -->
<image-upload v-model="form.avatar" :limit="1" :fileSize="5"
  :fileType="['png','jpg','jpeg']" />

<!-- File upload -->
<file-upload v-model="form.doc" :limit="3" :fileType="['doc','pdf']" />

<!-- Image preview -->
<image-preview :src="form.avatar" :width="100" :height="100" />

<!-- Right toolbar (search toggle + column visibility) -->
<right-toolbar :showSearch.sync="showSearch" :columns="columns" />
```

⚠️ **陷阱**： `image-upload` 默认 `fileType` 是文件；必须覆盖 `:fileType="['png','jpg','jpeg']"` 对于图像

## 完成标准
- `$tab` 方法管理选项卡； `$modal.confirm()` 显示对话框； `$download` 触发文件保存
- `dict-tag` 渲染字典标签 `dicts` 组件中的选项
- `pagination` 处理页面更改 `.sync` 绑定
- `editor`, `image-upload`, `file-upload` 组件正确渲染和上传

## 下一步
-> [阶段 07：国际化和主题化](./07-i18n-theming.md)
