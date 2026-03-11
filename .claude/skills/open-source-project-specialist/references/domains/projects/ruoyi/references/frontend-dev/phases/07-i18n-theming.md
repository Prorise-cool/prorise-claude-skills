# 阶段 07：国际化和主题化

## 目标
整合 `vue-i18n` 用于多语言支持并配置主题定制。

## 先决条件
- 第 05 阶段已完成（组件正在工作）
- 安装的节点模块
- 后端 `SecurityConfig` 允许 `/changeLanguage` 终点

## 执行步骤

### 第1步：安装并配置vue-i18n

❌ **错误方法**：安装为 Vue 3 设计的最新 vue-i18n (v9+)
```bash
npm install vue-i18n  # v9.x requires Vue 3, incompatible with RuoYi Vue 2
```

✅ **正确方法**：安装 `vue-i18n@7.3.2` 并创造 `src/lang/` 目录
```javascript
// Install: npm install vue-i18n@7.3.2 --save

// src/lang/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)
const messages = {
  en_US: { ...enLocale, ...elementEnLocale },
  zh_CN: { ...zhLocale, ...elementZhLocale }
}
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh_CN',
  messages
})
export default i18n
```

⚠️ **陷阱**： `vue-i18n` v8+/v9+ 与 Vue 2 -> `VueI18n is not a constructor`;固定到 `7.3.2`

### 第2步：创建语言文件

❌ **错误的方法**：没有模块命名空间的平键
```javascript
export default { title: 'System', username: 'Username' }  // key collisions
```

✅ **正确方法**：使用嵌套键按模块组织翻译
```javascript
// src/lang/zh.js
export default {
  login: { title: 'RuoYi Management', logIn: 'Login',
    username: 'Username', password: 'Password',
    code: 'Captcha', rememberMe: 'Remember me' },
  tagsView: { refresh: 'Refresh', close: 'Close',
    closeOthers: 'Close Others', closeAll: 'Close All' },
  settings: { title: 'Layout Settings', theme: 'Theme Color',
    tagsView: 'Tags-View', fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo' }
}
// src/lang/en.js - same structure with English values
export default {
  login: { title: 'RuoYi Login Form', logIn: 'Login',
    username: 'Username', password: 'Password',
    code: 'Code', rememberMe: 'Remember Me' },
  tagsView: { refresh: 'Refresh', close: 'Close',
    closeOthers: 'Close Others', closeAll: 'Close All' },
  settings: { title: 'Page Style Setting', theme: 'Theme Color',
    tagsView: 'Open Tags-View', fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo' }
}
```

⚠️ **陷阱**：之间的键不匹配 `zh.js` 和 `en.js` -> 缺少翻译显示原始密钥

### 第三步：在main.js和Vuex中注册i18n

❌ **错误方法**：在没有 Element UI 集成的情况下注册 i18n
```javascript
new Vue({ i18n, render: h => h(App) })  // Element UI stays in Chinese
```

✅ **正确方法**：将 i18n 传递给 Element UI 并注入到 Vue 实例中
```javascript
// src/main.js
import i18n from './lang'
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: Cookies.get('size') || 'medium'
})
new Vue({ el: '#app', router, store, i18n, render: h => h(App) })

// src/store/modules/app.js - add language state
const state = { language: Cookies.get('language') || 'zh_CN' }
const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}
const actions = {
  setLanguage({ commit }, language) { commit('SET_LANGUAGE', language) }
}
// src/store/getters.js: language: state => state.app.language,
```

⚠️ **陷阱**：未将 i18n 回调传递给 `Vue.use(Element, {...})` -> 日期选择器和分页保持中文

### 第 4 步：在模板中使用翻译

❌ **错误的方法**：在模板中硬编码文本
```html
<h3>RuoYi Management System</h3>
<el-input placeholder="Please enter username" />
```

✅ **正确方法**：使用 `$t()` 在模板和脚本中
```html
<h3>{{ $t('login.title') }}</h3>
<el-input :placeholder="$t('login.username')" v-model="form.username" />
<el-input :placeholder="$t('login.password')" v-model="form.password" />
<el-checkbox>{{ $t('login.rememberMe') }}</el-checkbox>
<el-button @click="handleLogin">{{ $t('login.logIn') }}</el-button>

<!-- In script: this.$t('tagsView.refresh') -->
```

⚠️ **陷阱**： `placeholder="$t('key')"` 不带冒号 -> 呈现文字字符串；必须使用 `:placeholder`

### 第 5 步：语言切换器组件

❌ **错误的方法**：更改区域设置而不保留或同步后端
```javascript
this.$i18n.locale = 'en_US'  // reverts on refresh, backend not updated
```

✅ **正确方法**：创建 `LangSelect` 同步 Vuex、cookie 和后端
```html
<template> <!-- src/components/LangSelect/index.vue -->
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <div><svg-icon icon-class="language" /></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh_CN'" command="zh_CN">Chinese</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en_US'" command="en_US">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { changeLanguage } from '@/api/login'
export default {
  computed: { language() { return this.$store.getters.language } },
  methods: {
    handleSetLanguage(value) {
      this.$i18n.locale = value
      this.$store.dispatch('app/setLanguage', value)
      changeLanguage(value).then(() => { window.location.reload() })
    }
  }
}
</script>
```

⚠️ **陷阱**：不打电话 `window.location.reload()` -> 缓存组件保留旧语言

### 第6步：主题颜色定制

❌ **错误的做法**：在node_modules中编辑Element UI SCSS源文件
```scss
// node_modules/element-ui/.../var.scss - lost on npm install
$--color-primary: #1890ff;
```

✅ **正确方法**：使用 RuoYi 设置面板或作用域 CSS 覆盖
```html
<!-- Settings panel (top-right) changes theme at runtime via store/modules/settings.js -->
<!-- Custom styles: always use scoped -->
<style scoped>
.custom-section { color: var(--color-primary, #409EFF); }
</style>
<!-- SVG icon inherits parent color: fill: currentColor -->
<svg-icon icon-class="user" style="color: #409EFF;" />
```

⚠️ **陷阱**：添加全局样式而不需要 `scoped` -> 样式泄漏到所有组件

## 完成标准
- `vue-i18n@7.3.2` 安装， `src/lang/` 有 `index.js`, `zh.js`, `en.js`
- `{{ $t('key') }}` 提供翻译； Element UI 尊重语言设置
- LangSelect 切换语言并通过 cookie 保留
- 主题颜色可通过设置面板更改

## 下一步
-> [最佳实践](../best-practices.md)
