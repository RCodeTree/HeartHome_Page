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