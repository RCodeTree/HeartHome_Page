import AxiosClient from "../../axios/AxiosClient"
import { loginStore } from "../../stores/HeartHomeStore"




// 登录服务
export const SignInService = async (username, password) => {
    return await AxiosClient.post('/user/login/signin', {
        username,
        password
    })

}

// 注册服务
export const SignUpService = async (username, password) => {
    return await AxiosClient.post('/user/login/signup', {
        username,
        password
    })

}

// 用户资料信息服务
export const UserInfoService = async (username) => {
    const store = loginStore()
    return await AxiosClient.get(`/user/userInfo/${username}`, // 使用路径参数 
        {
            headers: {
                'Authorization': `Bearer ${store.token}` // 传递token
            }
        })
}

// 获取用户好友列表服务
export const GetUserFriendListService = async (username) => {
    const store = loginStore()
    return await AxiosClient.get(`/user/friends/${username}`, // 使用路径参数 
        {
            headers: {
                'Authorization': `Bearer ${store.token}` // 传递token
            }
        })
}

