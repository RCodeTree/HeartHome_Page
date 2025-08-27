<template>
    <div>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="relative mb-6">
                <input type="text" id="username" placeholder=" " v-model="loginForm.username"
                    :class="{ 'border-red-500': loginErrors.username }" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-blue peer transition-all duration-300" required />
                <label for="username" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-custom-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">昵称</label>
                <div class="text-red-500 text-sm mt-1 animate-slide-up" v-if="loginErrors.username">{{ loginErrors.username }}</div>
            </div>

            <div class="relative mb-6">
                <input :type="showPassword ? 'text' : 'password'" id="password" placeholder=" " v-model="loginForm.password" 
                    :class="{ 'border-red-500': loginErrors.password }" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-blue peer transition-all duration-300" required />
                <label for="password" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-custom-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">密码</label>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="togglePassword">
                    <EyeIcon v-if="!showPassword" class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                    <EyeSlashIcon v-else class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                </span>
                <div class="text-red-500 text-sm mt-1 animate-slide-up" v-if="loginErrors.password">{{ loginErrors.password }}</div>
            </div>

            <div class="flex items-center mb-6">
                <input type="checkbox" id="rememberMe" v-model="loginForm.rememberMe" 
                    class="w-4 h-4 text-custom-blue bg-gray-100 border-gray-300 rounded focus:ring-custom-blue focus:ring-2 transition-all duration-200" />
                <label for="rememberMe" class="ml-2 text-sm font-medium text-gray-900">记住我</label>
            </div>

            <button type="submit" class="w-full text-white bg-custom-blue hover:bg-custom-blue-dark focus:ring-4 focus:outline-none focus:ring-custom-blue/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95" :disabled="isLoading">
                <span v-if="isLoading" class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-hidden="true"></span>
                {{ isLoading ? '登录中...' : '登录' }}
            </button>

            <div class="text-center mt-4">
                <a href="#/login" class="text-custom-blue hover:text-custom-blue-dark text-sm font-medium transition-colors duration-200">忘记密码?</a>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { loginStore } from '../../stores/HeartHomeStore'
import { SignInService } from '../../Service/User/UserService'

/* 
插件导入
*/
const router = useRouter() // 路由插件
const store = loginStore()
const emit = defineEmits(['message'])

/* 
状态变量
*/
const showPassword = ref(false) // 密码可见性控制
const isLoading = ref(false) // 登录按钮加载状态控制


// 登录表单数据 --- 用户名、密码
const loginForm = reactive({
    username: '',
    password: '',
    rememberMe: false
})

// 用于存储用户输入的错误数据 --- 用户名、密码
const loginErrors = reactive({
    username: '',
    password: ''
})


/* 
方法 
*/
// 切换密码可见性
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

// 表单验证 --- 控制表单验证，检查用户输入是否正确
const validateLoginForm = () => {
    let isValid = true
    loginErrors.username = ''
    loginErrors.password = ''

    if (!loginForm.username.trim()) { // 用户名不能为空
        loginErrors.username = '请输入用户名'
        isValid = false
    }

    if (!loginForm.password.trim()) { // 密码不能为空
        loginErrors.password = '请输入密码'
        isValid = false
    } else if (loginForm.password.length < 6) { // 密码长度不能少于6个字符
        loginErrors.password = '密码长度不能少于6个字符'
        isValid = false
    }

    return isValid // 返回验证结果
}

//  --- 登录业务逻辑 ---
const handleLogin = async () => {
    if (!validateLoginForm()) return // 如果验证失败，则不进行登录请求

    isLoading.value = true
    // 清除之前用户输入错误的数据
    loginErrors.username = ''
    loginErrors.password = ''

    // 调用登录服务
    const response = await SignInService(loginForm.username, loginForm.password)
    console.log('登录请求响应数据:', response)

    const loginCode = response.data.code // 后端返回的状态码
    // --- 处理登录失败逻辑 ---
    if (loginCode == 500) {
        emit('message', response.data.msg)
        isLoading.value = false
        loginForm.username = ''
        loginForm.password = ''
        loginForm.rememberMe = false
        isLoading.value = false
        return
    }


    const loginData = response.data.data.user // 后端返回的用户数据
    const token = response.data.data.jwtToken // 后端返回的 token
    // --- 处理登录成功逻辑 ---
    if (loginCode == 200 && loginData && token) {
        store.loginUser(loginData) // 登录成功，将用户数据存储到 Pinia 状态中 并本地持久化
        store.setToken(token) // 登录成功，将 token 存储到 Pinia 状态中 并本地持久化
        router.replace('/home')
    }

    isLoading.value = false
}

</script>

<style scoped>
.login-form {
    width: 100%;
}
</style>
