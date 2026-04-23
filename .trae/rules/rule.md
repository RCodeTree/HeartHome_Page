# 项目规则

## 1. 框架版本与依赖
- 固定技术栈：`Vue3 + TS + Vite + Vue Router + Pinia + Vuetify + Tailwind`，大版本升级需评审。
- 新增依赖必须说明用途、体积影响与替代方案，禁止重复能力依赖。

## 2. 目录与命名
- `src/views` 放页面，文件名大写开头（PascalCase），如 `UserCenter.vue`。
- `src/types` 放类型定义，文件名大写开头（PascalCase），如 `User.ts`。
- `src/components` 放公共复用组件，文件名小写开头（kebab/camel），如 `base-card.vue`。
- `src/router` 管路由，`src/store` 管状态，`src/api` 管接口；禁止跨层乱放代码。

## 3. 代码规范
- 所有必要语句必须加分号；统一使用 TypeScript；默认 `script setup`。
- 禁止滥用 `any`；import 优先 `@/` 别名；组件顺序固定：template -> script -> style。

## 4. 模块化与低耦合
- 页面仅做编排，业务逻辑下沉到 `composables/store/api`。
- 组件通过 `props/emits` 通信；禁止组件直接依赖接口细节。
- 公共能力沉淀到 `utils/composables/components`，禁止循环依赖。

## 5. 布局与适配
- 全局优先 Flex（局部可 Grid），移动优先开发，PC/移动都必须可用。
- 断点建议：`xs<640`、`sm>=640`、`md>=768`、`lg>=1024`、`xl>=1280`。
- 禁止关键功能只依赖 hover；图片媒体必须自适应。

## 6. API 与 RESTful
- 资源名用复数名词：`/users`、`/orders`；语义遵循 `GET/POST/PUT/PATCH/DELETE`。
- 必须统一封装 `src/api/http.ts`（鉴权、超时、错误处理、响应解包）。
- 所有接口必须定义请求/响应类型；禁止在页面内直接写请求细节。

## 7. 路由与状态
- 路由集中在 `src/router`，`name` 必填，路径 kebab-case，组件懒加载。
- `meta` 至少含 `title`，按需加 `requiresAuth`；鉴权统一前置守卫处理。
- Pinia 按业务域拆分，`state` 存共享状态，异步流程放 `actions`。

## 8. 测试与质量门禁
- 至少通过：`pnpm build`、类型检查、关键页面冒烟（首页/核心表单/核心列表）。
- 推荐补齐单元测试（Vitest）与组件测试（Vue Test Utils）；核心流程可加 E2E（Playwright）。
- 提交前必须无 TS 错误、无阻断性功能缺陷。

## 9. 禁止使用的 API/方式
- 禁止使用 `eval`、`new Function`、`document.write`、明文本地存储敏感信息。
- 禁止直接操作 DOM 替代 Vue 响应式（`getElementById` 改值等）。
- 禁止在组件中散落裸 `fetch`/`axios` 调用，必须走 `src/api` 统一封装。
