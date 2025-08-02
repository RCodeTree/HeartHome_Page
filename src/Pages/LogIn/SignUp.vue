<template>
    <div>
        <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="reg-username" placeholder="昵称"
                    v-model="registerForm.username" :class="{ 'is-invalid': registerErrors.username }" required />
                <label for="reg-username">昵称</label>
                <div class="invalid-feedback" v-if="registerErrors.username">
                    {{ registerErrors.username }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="reg-password"
                    placeholder="密码" v-model="registerForm.password" :class="{ 'is-invalid': registerErrors.password }"
                    required />
                <label for="reg-password">密码</label>
                <span class="password-toggle" @click="togglePassword">
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
                <div class="invalid-feedback" v-if="registerErrors.password">
                    {{ registerErrors.password }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="reg-confirm-password"
                    placeholder="确认密码" v-model="registerForm.confirmPassword"
                    :class="{ 'is-invalid': registerErrors.confirmPassword }" required />
                <label for="reg-confirm-password">确认密码</label>
                <div class="invalid-feedback" v-if="registerErrors.confirmPassword">
                    {{ registerErrors.confirmPassword }}
                </div>
            </div>



            <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                {{ isLoading ? '注册中...' : '注册' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { SignUpService } from '../../Service/User/UserService'
import { useRouter } from 'vue-router'
import { loginStore } from '../../stores/HeartHomeStore'



const router = useRouter()
const store = loginStore()
const emit = defineEmits(['message'])

const showPassword = ref(false) // 密码显示状态
const isLoading = ref(false) // 注册按钮加载状态

const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})

const registerErrors = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})


const togglePassword = () => { // 切换密码显示状态
    showPassword.value = !showPassword.value
}

const validateRegisterForm = () => { // 验证注册表单
    let isValid = true
    registerErrors.username = ''
    registerErrors.password = ''
    registerErrors.confirmPassword = ''
    registerErrors.agreeTerms = ''

    if (!registerForm.username.trim()) {
        registerErrors.username = '请输入用户名'
        isValid = false
    } else if (registerForm.username.length < 3) {
        registerErrors.username = '用户名长度不能少于3个字符'
        isValid = false
    }

    if (!registerForm.password) {
        registerErrors.password = '请输入密码'
        isValid = false
    } else if (registerForm.password.length < 6) {
        registerErrors.password = '密码长度不能少于6个字符'
        isValid = false
    }

    // 确认密码
    if (!registerForm.confirmPassword) {
        registerErrors.confirmPassword = '请确认密码'
        isValid = false
    } else if (registerForm.confirmPassword !== registerForm.password) {
        registerErrors.confirmPassword = '两次输入的密码不一致'
        isValid = false
    }



    return isValid
}


// --- 注册业务逻辑 ---
const handleRegister = async () => {
    if (!validateRegisterForm()) return // 如果表单验证失败，直接返回
    isLoading.value = true

    // 调用注册服务
    const response = await SignUpService(registerForm.username, registerForm.confirmPassword)
    console.log('注册请求响应数据:', response)

    const registerData = response.data // 后端返回的注册数据
    const registerCode = response.data.code // 后端返回的状态码


    // --- 处理注册失败逻辑 ---
    if (registerCode == 500) {
        emit('message', registerData.msg)
        isLoading.value = false
        registerForm.username = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        return
    }

    // --- 处理注册成功逻辑 ---
    if (registerCode == 200) {
        emit('message', registerData.msg)
        isLoading.value = false
        registerForm.username = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        store.registerData(registerData) // 注册成功后，将注册数据存储到 Pinia 状态中做临时本地持久化
        router.replace('/login') // 注册成功后，跳转到登录页面
        return
    }
    isLoading.value = false
}

</script>

<style scoped>
.register-form {
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
</style>
