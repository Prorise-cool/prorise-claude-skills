# 第 03 阶段：前端目录结构

## 目标
了解RuoYi-Vue前端目录布局 `ruoyi-ui/src/` 以及每个目录的用途。

## 先决条件
- 第一阶段完成（了解后端模块结构）
- 安装的节点 >= 12， `npm install` 完成于 `ruoyi-ui/`

## 执行步骤

### 第 1 步：了解顶级源结构

浏览前端代码库的错误和正确方法。

❌ **错误方法**：将所有文件平放在 `src/` 不遵循目录约定
```
src/
  MyComponent.vue      <-- Wrong: components go in src/components/
  myApi.js             <-- Wrong: API calls go in src/api/
  myPage.vue           <-- Wrong: pages go in src/views/
```

✅ **正确方法**：遵循既定的方法 `ruoyi-ui/src/` 目录结构
```
ruoyi-ui/src/
  |-- api/             // API request modules (one file per backend module)
  |-- assets/          // Static resources (themes, fonts, images)
  |-- components/      // Global reusable components
  |-- directive/       // Custom Vue directives
  |-- layout/          // Page layout components (sidebar, navbar, etc.)
  |-- plugins/         // Plugin registrations and utility methods
  |-- router/          // Vue Router configuration
  |-- store/           // Vuex store modules
  |-- utils/           // Global utility functions
  |-- views/           // Page-level view components
  |-- App.vue          // Root component (entry page)
  |-- main.js          // Entry point (loads components, initializes app)
  |-- permission.js    // Route guard (permission management)
  |-- settings.js      // System-level settings
```

⚠️ **陷阱**：添加页面组件 `src/components/` 而不是 `src/views/` -> 可重用组件和页面级视图之间的混淆；组件是共享的，视图是路由绑定的

### 第 2 步：API 层约定（`src/api/`)

组织 API 调用的错误和正确方法。

❌ **错误的做法**：直接在 Vue 组件中内联 API 调用
```javascript
// Wrong: axios calls scattered in .vue files
export default {
  methods: {
    async loadUsers() {
      const res = await axios.get('/system/user/list')
      this.users = res.data
    }
  }
}
```

✅ **正确的方法**：在中创建API模块 `src/api/` 匹配后端控制器路径
```javascript
// src/api/system/user.js
import request from '@/utils/request'

// Query user list - maps to SysUserController.list()
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// Add user - maps to SysUserController.add()
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// Usage in component:
// import { listUser, addUser } from '@/api/system/user'
```

⚠️ **陷阱**：不使用 `request` 效用来自 `@/utils/request` -> 缺少令牌注入、错误处理和响应拦截器 `request.js` 提供

### 步骤 3：视图和路由器约定 (`src/views/`, `src/router/`)

添加新页面的错误和正确方法。

❌ **错误的做法**：在视图中添加没有匹配目录结构的路由
```javascript
// Wrong: flat file naming, no directory grouping
// src/views/userList.vue
// src/views/userEdit.vue
// src/views/roleList.vue
```

✅ **正确方法**：镜像后端模块路径 `src/views/` 目录
```
src/views/
  |-- system/          // System management views
  |   |-- user/        // User management
  |   |   |-- index.vue       // List page (route: /system/user)
  |   |   |-- profile/        // User profile sub-pages
  |   |-- role/        // Role management
  |   |   |-- index.vue       // List page (route: /system/role)
  |   |-- menu/        // Menu management
  |   |-- dept/        // Department management
  |-- monitor/         // System monitoring views
  |-- tool/            // Development tools views
  |-- login.vue        // Login page
  |-- register.vue     // Registration page

// src/router/index.js - Define constant routes
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '', component: Layout, children: [
    { path: 'index', component: () => import('@/views/index') }
  ]}
]
// Dynamic routes loaded via permission.js from backend menu API
```

⚠️ **陷阱**：静态定义所有路由 `router/index.js` 而不是使用来自后端的动态路由 -> 绕过权限系统； RuoYi根据用户角色动态加载菜单路由

### 步骤4：状态管理和配置文件

Vuex 存储和全局设置的错误和正确方法。

❌ **错误的方法**：将所有状态存储在单个 Vuex 模块中
```javascript
// Wrong: monolithic store file with all state mixed together
const store = new Vuex.Store({
  state: { user: null, roles: [], sidebar: {}, routes: [] },
  mutations: { /* 50+ mutations */ }
})
```

✅ **正确的做法**：使用模块化的Vuex store `src/store/` 并通过配置 `settings.js`
```javascript
// src/store/modules/ - Separated by concern
// store/modules/user.js    -> User auth state, token, roles
// store/modules/app.js     -> Sidebar state, device type
// store/modules/settings.js -> Theme, layout settings
// store/modules/permission.js -> Dynamic routes

// src/settings.js - System-wide configuration
module.exports = {
  title: 'RuoYi Management System',  // Page title
  showSettings: true,                  // Show settings panel
  topNav: false,                       // Enable top navigation
  tagsView: true,                      // Enable tags view
  fixedHeader: false,                  // Fixed header
  sidebarLogo: true,                   // Show logo in sidebar
  dynamicTitle: false,                 // Dynamic page title
  errorLog: 'production'              // Error log environment
}

// src/permission.js - Route guard
// Controls page access based on token and user roles
// Loads dynamic routes from backend API on first login
```

⚠️ **陷阱**：修改 `src/permission.js` 在不了解保护流程的情况下列入白名单 -> 访问需要身份验证的页面时无限重定向循环

## 完成标准
- 可以按功能类别（api、视图、组件、存储等）定位任何前端文件
- 理解映射： `src/api/system/user.js` <-> `src/views/system/user/index.vue`
- 知道入口文件： `main.js` （应用程序初始化）， `permission.js` （路线守卫）， `settings.js` （配置）
- 了解后端动态路由加载与静态加载 `constantRoutes`

## 下一步
-> [阶段 05：配置管理](./05-config-management.md)
