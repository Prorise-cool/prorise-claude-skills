# 第01阶段：路由和菜单系统

## 目标
配置静态和动态路由，了解路由元属性，并实现基于权限的路由。

## 先决条件
- RuoYi-Vue前端项目运行中（`npm run dev`)
- 可访问后端 API（菜单 API 返回动态路由）
- Vue 路由器基础知识

## 执行步骤

### 第 1 步：定义静态路由

❌ **错误的做法**：将包括受保护页面在内的所有路由放入 `src/router/index.js`
```javascript
// Wrong: protected pages should not be static routes
export const constantRoutes = [
  { path: '/system/user', component: () => import('@/views/system/user') },
  { path: '/system/role', component: () => import('@/views/system/role') }
]
```

✅ **正确做法**：只有公共页面（登录、404）才能进入 `constantRoutes` 在 `src/router/index.js`
```javascript
// src/router/index.js - static routes only
export const constantRoutes = [
  { path: '/redirect', component: Layout, hidden: true, children: [
    { path: '/redirect/:path(.*)', component: () => import('@/views/redirect') }
  ]},
  { path: '/login', component: () => import('@/views/login'), hidden: true },
  { path: '/404', component: () => import('@/views/error/404'), hidden: true },
  { path: '/401', component: () => import('@/views/error/401'), hidden: true },
  { path: '', component: Layout, redirect: 'index', children: [
    { path: 'index', component: () => import('@/views/index'),
      name: 'Index', meta: { title: 'Home', icon: 'dashboard', affix: true }}
  ]}
]
```

⚠️ **陷阱**：添加业务页面 `constantRoutes` -> 无论权限如何，所有用户都可以看到所有菜单项

### 步骤 2：配置路由元属性

❌ **错误的做法**：省略 `name` 使用时从路由配置 `keep-alive`
```javascript
// Wrong: missing name breaks keep-alive caching
{ path: 'config', component: () => import('@/views/system/config/index'),
  meta: { title: 'Config', icon: 'edit' }
}
```

✅ **正确方法**：设置所有元属性； `name` 必须与组件的导出匹配 `name`
```javascript
// Route declaration
{ path: 'config', component: () => import('@/views/system/config/index'),
  name: 'Config',
  meta: {
    title: 'Config',         // sidebar and breadcrumb display name
    icon: 'edit',            // sidebar icon (svg-class or el-icon-x)
    noCache: false,          // true = skip keep-alive cache
    breadcrumb: true,        // false = hide from breadcrumb
    affix: false,            // true = pin in tags-view
    activeMenu: '/system',   // highlight this sidebar item instead
    link: null               // external link URL (http/https)
  }
}
// Component must match: export default { name: 'Config' }
```

⚠️ **陷阱**：路线 `name: 'Config'` 但组件 `name: 'SysConfig'` -> 页面从未被缓存 `keep-alive`，选项卡切换上的陈旧数据

### 第 3 步：来自后端的动态路由

❌ **错误的做法**：在前端代码中手动添加菜单路由
```javascript
// Wrong: hardcoding dynamic routes defeats permission system
router.addRoutes([
  { path: '/system/user', component: () => import('@/views/system/user') }
])
```

✅ **正确的方法**：通过加载动态路由 `store/modules/permission.js` 从后端菜单API
```javascript
// permission.js (navigation guard) handles the full flow:
// 1. Check token exists in cookie
// 2. If no user info loaded -> dispatch('GetInfo') to get roles
// 3. dispatch('GenerateRoutes') -> calls getRouters() API
// 4. Backend returns menu JSON -> converted to Vue routes
// 5. router.addRoutes(accessRoutes) adds them dynamically

// Backend menu format returned by API:
{
  name: 'System', path: '/system', hidden: false,
  redirect: 'noRedirect', component: 'Layout',
  alwaysShow: true, meta: { title: 'System', icon: 'system' },
  children: [{ name: 'User', path: 'user',
    component: 'system/user/index',
    meta: { title: 'Users', icon: 'user' }
  }]
}
// loadView() resolves component string to lazy import in production
```

⚠️ **陷阱**：后端菜单 `component` 值与文件路径不匹配 `@/views/` -> 空白页，没有控制台错误；查看 `loadView` 解决

### 第4步：导航和路线参数

❌ **错误的方法**：使用 `window.location.href` 用于内部导航
```javascript
// Wrong: full page reload, loses Vuex state and session context
window.location.href = '/system/user?id=1'
```

✅ **正确方法**：使用 `this.$router.push` 和 `path` 和 `query`
```javascript
// Navigate to a page
this.$router.push({ path: '/system/user' })

// Navigate with query parameters
this.$router.push({
  path: '/system/user',
  query: { id: '1', name: 'admin' }
})
// URL becomes: /system/user?id=1&name=admin

// Open in new tab via $tab plugin
this.$tab.openPage('User Detail', '/system/user?id=1')
```

⚠️ **陷阱**：使用 `params` 和 `path` 在 `$router.push` -> 默默地忽略参数；使用 `query` 和 `path` 或者 `params` 和 `name`

## 完成标准
- 静态路由（登录、404、home）加载无需身份验证
- 登录后根据用户权限在侧边栏中显示动态路由
- 路由元属性 (`title`, `icon`, `noCache`) 在侧边栏和面包屑中正确呈现
- `keep-alive` 缓存组件所在的页面 `name` 匹配路线 `name`

## 下一步
-> [第 03 阶段：请求流程和身份验证](./03-request-auth.md)
