import axios from "axios"
import { loginStore } from "../stores/HeartHomeStore"
let AxiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
AxiosClient.interceptors.request.use(config => {
    const store = loginStore()
    const token = store.getToken
    if (token) {
        // 设置请求头
        config.headers['jwtToken'] = token
    }
    return config // 携带 token 到请求头
}, error => {
    return Promise.reject(error) // 处理请求错误
})

// 响应拦截器
// AxiosClient.interceptors.response.use(response => {
//     return response
// }, error => {
//     if (error.response && error.response.status === 401) {
//         // 处理未授权的情况，例如跳转到登录页
//         router.push('/login')
//     }
//     return Promise.reject(error)
// })

export default AxiosClient
