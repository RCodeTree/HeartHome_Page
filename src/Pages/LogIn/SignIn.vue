<template>
    <div>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="username" placeholder="昵称" v-model="loginForm.username"
                    :class="{ 'is-invalid': loginErrors.username }" required />
                <label for="username">昵称</label>
                <div class="invalid-feedback" v-if="loginErrors.username">{{ loginErrors.username }}</div>
            </div>

            <div class="form-floating mb-3">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="密码"
                    v-model="loginForm.password" :class="{ 'is-invalid': loginErrors.password }" required />
                <label for="password">密码</label>
                <span class="password-toggle" @click="togglePassword">
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
                <div class="invalid-feedback" v-if="loginErrors.password">{{ loginErrors.password }}</div>
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="rememberMe" v-model="loginForm.rememberMe" />
                <label class="form-check-label" for="rememberMe">记住我</label>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                {{ isLoading ? '登录中...' : '登录' }}
            </button>

            <div class="text-center mt-3">
                <a href="#/login" class="text-decoration-none">忘记密码?</a>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginStore } from '../../stores/HeartHomeStore'
import { SignInService } from '../../Service/User/LogInService'

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

.form-control {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
    border-color: #667eea;
}

.password-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
    z-index: 10;
}

.form-check-label {
    user-select: none;
}

.btn-primary {
    background-color: #667eea;
    border-color: #667eea;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #5a6fd1;
    border-color: #5a6fd1;
}

.btn-primary:disabled {
    background-color: #667eea;
    border-color: #667eea;
    opacity: 0.65;
}

.text-decoration-none {
    color: #667eea;
    transition: color 0.3s ease;
}

.text-decoration-none:hover {
    color: #5a6fd1;
}
</style>
