# HeartHome - 心灵之所 (前端部分)

这是一个为心理和烦恼消遣打造的社交平台的前端项目。

## ✨ 功能特性

- **用户认证**: 提供完整的登录和注册流程。
- **好友管理**: 支持添加、搜索和展示好友列表。
- **即时通讯**: 支持用户间发送和接收消息。
- **个人中心**: 用户可以管理个人资料。
- **响应式布局**: 适配桌面和移动设备，提供一致的用户体验。

## 🛠️ 技术栈

- **核心框架**: [Vue 3](https://vuejs.org/) (使用 Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 框架**: [Tailwind CSS 3](https://tailwindcss.com/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **HTTP 请求**: [Axios](https://axios-http.com/)

## 📁 项目结构

```
src/
├── Pages/              # 页面组件 (路由视图)
│   ├── Head/           # 顶部导航相关页面
│   ├── Side/           # 侧边栏相关页面 (消息, 好友等)
│   ├── Foot/           # 底部导航相关页面
│   └── Page.vue        # 主布局文件
├── components/         # 可复用的公共组件
├── stores/             # Pinia 状态管理
├── router/             # 路由配置
├── Service/            # API 服务层
├── axios/              # Axios 实例和拦截器配置
└── assets/             # 静态资源
```

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) (建议使用 v16 或更高版本)
- [pnpm](https://pnpm.io/)

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone <your-repo-url>
    cd HeartHome_Page
    ```

2.  **安装依赖**
    ```bash
    pnpm install
    ```

3.  **启动开发服务器**
    ```bash
    pnpm dev
    ```
    项目将在 `http://localhost:5173` (或可用端口) 上运行。

## 📦 构建与部署

- **生产构建**
  ```bash
  pnpm build
  ```

- **预览构建结果**
  ```bash
  pnpm preview
  ```

