import axios from 'axios';
// import type { InternalAxiosRequestConfig } from 'axios';

// 创建axios实例
// const BASE_URL = import.meta.env.BASE_URL;
const http = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000
});

// 请求拦截器
/* http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}); */

// 响应拦截器
/* http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
); */

export default http;

