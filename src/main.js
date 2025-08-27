import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router/router.js' // 引入vue-router
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.use(pinia) // 使用 Pinia 
app.use(router)
app.mount('#app')
