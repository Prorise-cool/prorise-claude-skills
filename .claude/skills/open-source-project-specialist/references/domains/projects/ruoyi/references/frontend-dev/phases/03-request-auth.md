# 第 03 阶段：请求流程和身份验证

## 目标
使用基于axios的API服务层实现 `request.js`，配置token认证，并使用 `$auth` 和 `$cache` 插件对象。

## 先决条件
- 第一阶段完成（路由和菜单工作）
- 启用 JWT 身份验证的后端运行
- axios拦截器的理解

## 执行步骤

### 第1步：创建API服务函数

❌ **错误的做法**：在Vue组件中直接调用axios
```javascript
// Wrong: no token injection, no unified error handling
import axios from 'axios'
export default {
  methods: {
    getUsers() { axios.get('/system/user/list').then(r => { this.list = r.data }) }
  }
}
```

✅ **正确的方法**：创建基于模块的 API 文件 `src/api/` 输入 `@/utils/request`
```javascript
// src/api/system/user.js
import request from '@/utils/request'

export function listUser(query) {
  return request({ url: '/system/user/list', method: 'get', params: query })
}
export function getUser(userId) {
  return request({ url: '/system/user/' + userId, method: 'get' })
}
export function addUser(data) {
  return request({ url: '/system/user', method: 'post', data: data })
}
export function updateUser(data) {
  return request({ url: '/system/user', method: 'put', data: data })
}
export function delUser(userId) {
  return request({ url: '/system/user/' + userId, method: 'delete' })
}
```

⚠️ **陷阱**：混合 `params` 和 `data` -> GET 请求使用 `params` （查询字符串），POST/PUT 使用 `data` （请求正文）；交换它们会导致 400 错误

### 第2步：在视图中使用API

❌ **错误的方法**：直接在视图中导入请求实用程序
```javascript
// Wrong: bypasses module organization, duplicates URL strings
import request from '@/utils/request'
request({ url: '/system/user/list', method: 'get' })
```

✅ **正确方法**：从 API 模块文件导入命名函数
```javascript
// src/views/system/user/index.vue
import { listUser, delUser } from '@/api/system/user'

export default {
  data() {
    return { userList: [], loading: true, queryParams: { pageNum: 1, pageSize: 10 } }
  },
  created() { this.getList() },
  methods: {
    getList() {
      this.loading = true
      listUser(this.queryParams).then(response => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleDelete(row) {
      this.$modal.confirm('Confirm delete user "' + row.userName + '"?').then(() => {
        return delUser(row.userId)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('Deleted')
      }).catch(() => {})
    }
  }
}
```

⚠️ **陷阱**：忘记 `.catch(() => {})` 后 `$modal.confirm` -> 当用户单击“取消”时未处理的承诺拒绝警告

### 第三步：了解请求拦截器

❌ **错误的做法**：在每个 API 调用中手动添加 Authorization 标头
```javascript
// Wrong: token logic duplicated; request.js already handles this
export function listUser(query) {
  return request({ url: '/system/user/list', method: 'get', params: query,
    headers: { 'Authorization': 'Bearer ' + getToken() } }) // redundant
}
```

✅ **正确的做法**： `request.js` 拦截器自动处理令牌和错误
```javascript
// request.js interceptor flow (already configured):
// REQUEST interceptor:
//   - Reads token via getToken() from cookie
//   - Sets header: Authorization = 'Bearer ' + token
//   - Skip if config.headers.isToken === false

// RESPONSE interceptor:
//   - code 200: return res.data (unwrapped)
//   - code 401: prompt re-login via MessageBox
//   - code 500: show Message error
//   - other codes: show Notification error

// To skip token for public endpoints:
export function getCodeImg() {
  return request({
    url: '/captchaImage', method: 'get',
    headers: { isToken: false }   // skip Bearer token
  })
}

// To override baseURL per request:
export function externalApi(data) {
  return request({
    url: '/external/endpoint', method: 'post', data,
    baseURL: process.env.VUE_APP_OTHER_API
  })
}
```

⚠️ **陷阱**：设置 `headers: { isToken: false }` 作为字符串 `'false'` 而不是布尔值 `false` -> 令牌仍然附加，因为 `=== false` 检查失败

### 步骤 4：使用 $auth 进行权限检查

❌ **错误做法**：通过直接读取Vuex store来检查权限
```javascript
// Wrong: verbose, not standardized
if (this.$store.state.user.permissions.includes('system:user:add')) { this.showAddBtn = true }
```

✅ **正确方法**：使用 `$auth` 插件方法来自 `plugins/auth.js`
```javascript
// Single permission check
this.$auth.hasPermi('system:user:add')         // returns boolean

// Any of multiple permissions (OR)
this.$auth.hasPermiOr(['system:user:add', 'system:user:edit'])

// All permissions required (AND)
this.$auth.hasPermiAnd(['system:user:add', 'system:user:edit'])

// Role checks work the same way
this.$auth.hasRole('admin')
this.$auth.hasRoleOr(['admin', 'common'])
this.$auth.hasRoleAnd(['admin', 'common'])

// Template directive usage:
// <el-button v-hasPermi="['system:user:add']">Add</el-button>
// <el-button v-hasRole="['admin']">Admin Only</el-button>

// For v-if scenarios (tabs, dynamic components), use functions:
import { checkPermi, checkRole } from '@/utils/permission'
// <el-tab-pane v-if="checkPermi(['system:user:add'])" label="Users" />
```

⚠️ **陷阱**：使用 `v-hasPermi` 在 `el-tab-pane` 或类似的非元素删除组件 -> 指令可能不起作用；使用 `v-if="checkPermi([...])"` 用导入函数代替

### 第5步：使用$cache进行存储

❌ **错误的方法**：使用 `localStorage` / `sessionStorage` 直接地
```javascript
// Wrong: tightly coupled to storage API, no abstraction
localStorage.setItem('config', JSON.stringify({ theme: 'dark' }))
```

✅ **正确方法**：使用 `$cache` 插件与 `local` 和 `session` 范围
```javascript
// Local storage (persistent across sessions)
this.$cache.local.set('key', 'value')       // primitive
this.$cache.local.get('key')                // 'value'
this.$cache.local.setJSON('cfg', { a: 1 }) // object
this.$cache.local.getJSON('cfg')            // { a: 1 }
this.$cache.local.remove('key')
// Session storage (tab lifetime) - same API:
// this.$cache.session.set/get/setJSON/getJSON/remove()
```

⚠️ **陷阱**：存储对象 `set()` 而不是 `setJSON()` -> 存储为 `[object Object]` 细绳;使用 `setJSON/getJSON` 对于非基元

## 完成标准
- 按模块组织的 API 文件 `src/api/` 和 `request` 进口
- 视图调用API函数；响应数据绑定到组件状态
- 代币自动注入； 401触发重新登录； `$auth`/`v-hasPermi` 控制界面
- `$cache.local` 和 `$cache.session` 存储和检索值

## 下一步
-> [阶段 05：组件使用](./05-components-usage.md)
