import AxiosClient from "../../axios/AxiosClient"

// 登录服务
export const SignInService = async (username, password) => {
    try {
        return await AxiosClient.post('/user/login/signin', {
            username,
            password
        })
    } catch (error) {
        return '登录失败' + error
    }
}

// 注册服务
export const SignUpService = async (username, password) => {
    try {
        return await AxiosClient.post('/user/login/signup', {
            username,
            password
        })
    } catch (error) {
        return '注册失败' + error
    }
}
