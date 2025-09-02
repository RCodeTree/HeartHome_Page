# HeartHome 前端开发项目规则

## 项目概述

**项目名称**: HeartHome - 心灵之家  
**技术栈**: Vue 3 + Vite + Tailwind CSS + Pinia + Vue Router  
**项目类型**: 心理和烦恼消遣社交平台  
**开发模式**: SPA (单页应用)

## 技术规范

### 1. 技术栈要求

#### 核心框架
- **Vue 3**: 使用 Composition API 开发模式
- **Vite**: 构建工具，支持热更新和快速构建
- **Vue Router 4**: 路由管理，使用 Hash 模式
- **Pinia**: 状态管理，替代 Vuex

#### UI 框架
- **Tailwind CSS 3**: 原子化 CSS 框架
- **Heroicons**: Vue 专用图标组件

#### 工具库
- **Axios**: HTTP 请求库
- **Quill**: 富文本编辑器

### 2. 项目结构规范

```
src/
├── Pages/              # 页面组件
│   ├── Head/           # 顶部页面 (首页、服务等)
│   ├── Side/           # 侧边页面 (消息、好友、我的、关于)
│   ├── Foot/           # 底部页面 (发布等)
│   ├── LogIn/          # 登录注册页面
│   ├── Error/          # 错误页面
│   └── Page.vue        # 主布局组件
├── components/         # 公共组件
│   ├── NavBar/         # 导航栏组件
│   └── Animations/     # 动画组件
├── stores/             # Pinia 状态管理
├── router/             # 路由配置
├── Service/            # API 服务层
│   ├── User/           # 用户相关服务
│   └── Works/          # 作品相关服务
├── axios/              # HTTP 配置
├── directives/         # 自定义指令
└── assets/             # 静态资源
```

## 开发规范

### 1. 代码风格

#### Vue 组件规范
- 使用 `<script setup>` 语法
- 组件名使用 PascalCase
- 文件名使用 PascalCase (如: `SignIn.vue`)
- 必须包含 `<template>`, `<script setup>`, `<style scoped>`

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 使用 Composition API
import { ref, reactive, computed, onMounted } from 'vue'
</script>

<style scoped>
/* 组件样式 */
</style>
```

#### JavaScript 规范
- 使用 ES6+ 语法
- 变量命名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 函数名使用动词开头的CamelCase

#### CSS 规范
- 优先使用 Tailwind CSS 类名
- 自定义样式使用 scoped
- 响应式设计必须考虑移动端适配
- 使用 CSS 变量定义主题色彩

### 2. 组件开发规范

#### 组件分类
1. **页面组件** (Pages/): 路由对应的页面级组件
2. **布局组件** (components/NavBar/): 导航栏等布局组件
3. **功能组件** (components/): 可复用的功能组件
4. **动画组件** (components/Animations/): 动画效果组件

#### 组件设计原则
- 单一职责原则
- 高内聚低耦合
- 可复用性
- 响应式设计

### 3. 状态管理规范

#### Pinia Store 结构
```javascript
export const useStore = defineStore('storeName', () => {
  // State (状态)
  const state = ref(initialValue)
  
  // Getters (计算属性)
  const computedValue = computed(() => state.value)
  
  // Actions (方法)
  const updateState = (newValue) => {
    state.value = newValue
  }
  
  return {
    state,
    computedValue,
    updateState
  }
})
```

#### 状态持久化
- 用户登录信息需要本地持久化
- 使用 localStorage 存储用户 token 和基本信息

### 4. 路由规范

#### 路由结构
- 使用嵌套路由结构
- 主应用使用 Page.vue 作为布局组件
- 登录页面使用独立布局

#### 路由守卫
- 实现登录验证路由守卫
- 未登录用户重定向到登录页
- 已登录用户访问登录页重定向到首页

### 5. API 服务规范

#### 服务层结构
```javascript
// Service/User/UserService.js
import AxiosClient from '../../axios/AxiosClient'
import { loginStore } from '../../stores/HeartHomeStore'

export const ServiceName = async (params) => {
  const store = loginStore()
  return await AxiosClient.method('/api/endpoint', {
    headers: {
      'Authorization': `Bearer ${store.token}`
    }
  })
}
```

#### HTTP 请求规范
- 统一使用 Axios 实例
- 请求需要携带 Authorization 头
- 错误处理统一在服务层

## UI/UX 设计规范

### 1. 设计原则
- **现代化**: 使用现代化的设计语言
- **简洁**: 界面简洁，避免冗余元素
- **一致性**: 保持设计风格一致
- **可访问性**: 考虑无障碍访问

### 2. 色彩规范
```css
:root {
  --color-primary: #667eea;      /* 主色调 */
  --color-primary-dark: #5a6fd1; /* 主色调深色 */
  --color-secondary: #764ba2;     /* 辅助色 */
  --color-success: #10b981;       /* 成功色 */
  --color-warning: #f59e0b;       /* 警告色 */
  --color-error: #ef4444;         /* 错误色 */
}
```

### 3. 响应式设计

#### 断点规范
- **移动端**: < 640px
- **平板端**: 640px - 1024px
- **桌面端**: > 1024px

#### 适配要求
- 移动端优先设计
- 确保在所有设备上的可用性
- 触摸友好的交互设计

### 4. 动画规范
- 使用 CSS 过渡和动画，配合Tailwind CSS的动画类
- 动画触发条件：用户交互、状态变化
- 动画时长控制在 200-500ms
- 提供流畅的用户体验
- 避免过度动画影响性能

## 性能优化规范

### 1. 代码优化
- 使用 Vue 3 的 Composition API
- 合理使用 `computed` 和 `watch`
- 避免不必要的响应式数据
- 使用 `v-memo` 优化列表渲染

### 2. 资源优化
- 图片使用懒加载 (v-lazy 指令)
- 路由组件使用懒加载
- 合理使用 CDN 资源

### 3. 构建优化
- 使用 Vite 的代码分割
- 生产环境压缩代码
- 移除开发环境代码

## 部署规范

### 1. 构建命令
- 包管理器主要使用pnpm，安装依赖使用pnpm install

```bash
# 开发环境
pnpm dev

# 生产构建
pnpm build

# 预览构建结果
pnpm preview
```

### 2. 环境配置
- 开发环境: 本地开发服务器
- 测试环境: 测试服务器部署
- 生产环境: 生产服务器部署

### 3. 版本管理
- 使用 Git 进行版本控制
- 遵循 Git Flow 工作流
- 提交信息使用规范格式

## 安全规范

### 1. 数据安全
- 敏感信息不得硬编码
- 用户密码必须加密传输
- Token 安全存储和使用

### 2. XSS 防护
- 用户输入内容过滤
- 使用 `v-html` 时注意安全
- CSP 内容安全策略

### 3. 权限控制
- 路由级别权限验证
- API 接口权限验证
- 用户操作权限控制

## 文档规范

### 1. 代码注释
- 复杂逻辑必须添加注释
- 组件功能说明
- API 接口文档

### 2. README 文档
- 项目介绍和功能说明
- 安装和运行指南
- 技术栈说明

### 3. 变更日志
- 记录重要功能更新
- 记录 Bug 修复
- 记录破坏性变更

## 团队协作规范

### 1. 代码审查
- 所有代码变更需要审查
- 关注代码质量和规范
- 及时反馈和修改

### 2. 分支管理
- `main`: 主分支(开发分支)

### 3. 沟通协作
- 定期技术分享
- 问题及时沟通
- 文档及时更新