<template>
    <div>
        <form @submit.prevent="handleRegister" class="register-form">
            <div class="relative mb-6">
                <input type="text" id="reg-username" placeholder=" " v-model="registerForm.username" 
                    :class="{ 'border-red-500': registerErrors.username }" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-blue peer transition-all duration-300" required />
                <label for="reg-username" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-custom-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">昵称</label>
                <div class="text-red-500 text-sm mt-1 animate-slide-up" v-if="registerErrors.username">
                    {{ registerErrors.username }}
                </div>
            </div>

            <div class="relative mb-6">
                <input :type="showPassword ? 'text' : 'password'" id="reg-password" placeholder=" " v-model="registerForm.password" 
                    :class="{ 'border-red-500': registerErrors.password }" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-blue peer transition-all duration-300" required />
                <label for="reg-password" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-custom-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">密码</label>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="togglePassword">
                    <EyeIcon v-if="!showPassword" class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                    <EyeSlashIcon v-else class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                </span>
                <div class="text-red-500 text-sm mt-1 animate-slide-up" v-if="registerErrors.password">
                    {{ registerErrors.password }}
                </div>
            </div>

            <div class="relative mb-6">
                <input :type="showConfirmPassword ? 'text' : 'password'" id="reg-confirm-password" placeholder=" " v-model="registerForm.confirmPassword" 
                    :class="{ 'border-red-500': registerErrors.confirmPassword }" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-blue peer transition-all duration-300" required />
                <label for="reg-confirm-password" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-custom-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">确认密码</label>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="toggleConfirmPassword">
                    <EyeIcon v-if="!showConfirmPassword" class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                    <EyeSlashIcon v-else class="w-5 h-5 text-gray-400 hover:text-custom-blue transition-colors duration-200 transform hover:scale-110" />
                </span>
                <div class="text-red-500 text-sm mt-1 animate-slide-up" v-if="registerErrors.confirmPassword">
                    {{ registerErrors.confirmPassword }}
                </div>
            </div>



            <button type="submit" class="w-full text-white bg-custom-blue hover:bg-custom-blue-dark focus:ring-4 focus:outline-none focus:ring-custom-blue/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95" :disabled="isLoading">
                <span v-if="isLoading" class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-hidden="true"></span>
                {{ isLoading ? '注册中...' : '注册' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { SignUpService } from '../../Service/User/UserService'
import { useRouter } from 'vue-router'
import { loginStore } from '../../stores/HeartHomeStore'



const router = useRouter()
const store = loginStore()
const emit = defineEmits(['message'])

const showPassword = ref(false) // 密码显示状态
const showConfirmPassword = ref(false) // 确认密码显示状态
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

const toggleConfirmPassword = () => { // 切换确认密码显示状态
    showConfirmPassword.value = !showConfirmPassword.value
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
</style>
