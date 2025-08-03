import AxiosClient from '@/axios/AxiosClient'
import { loginStore } from '@/stores/HeartHomeStore'

// 用户作品获取服务
export const UserWorksService = async (username) => {
    const store = loginStore()
    return await AxiosClient.get(`/works/all/${username}`, // 使用路径参数 
        {
            headers: {
                'Authorization': `Bearer ${store.token}` // 传递token
            }
        })
}

// 用户文章获取服务
export const UserEssaysService = async (username) => {
    const store = loginStore()
    return await AxiosClient.get(`/works/essay/${username}`, // 使用路径参数 
        {
            headers: {
                'Authorization': `Bearer ${store.token}` // 传递token
            }
        })
}

// 用户图片获取服务
export const UserPhotosService = async (username) => {
    const store = loginStore()
    return await AxiosClient.get(`/works/image/${username}`, // 使用路径参数 
        {
            headers: {
                'Authorization': `Bearer ${store.token}` // 传递token
            }
        })
}
