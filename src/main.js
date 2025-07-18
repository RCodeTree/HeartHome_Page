import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router/router.js' // 引入vue-router
import App from './App.vue'
import AxiosClient from './axios/AxiosClient.js'

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.use(pinia) // 使用 Pinia 
app.provide('axios', AxiosClient)
app.use(router)
app.mount('#app')
