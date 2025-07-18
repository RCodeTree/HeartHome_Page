<template>
    <ToastNotification ref="toastNotificationForLogin" />
    <div class="login-container" ref="containerRef">
        <div class="slogan-container" v-if="showSlogan">
            <h1 class="slogan-text">你的心灵之所</h1>
        </div>
        <div class="login-card-container">
            <div class="login-card">
                <!-- 卡片头部 -->
                <div class="card-header text-center">
                    <div class="tabs">
                        <button :class="['tab-btn', { active: activeTab === 'signin' }]"
                            @click="setActiveTab('signin')">
                            登录
                        </button>
                        <button :class="['tab-btn', { active: activeTab === 'signup' }]"
                            @click="setActiveTab('signup')">
                            注册
                        </button>
                    </div>
                </div>

                <!-- 卡片内容 -->
                <div class="card-body">
                    <Transition name="fade" mode="out-in">
                        <KeepAlive>
                            <component :is="activeComponent" @message="handleChildMessage" />
                        </KeepAlive>
                    </Transition>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import router from '../../router/router'
import ToastNotification from '../Utils/Animations/ToastNotification.vue'

// 当前激活的标签页
const activeTab = ref('signin')
const showSlogan = ref(false)
const containerRef = ref(null)

// 动态计算要渲染的组件和url
const activeComponent = computed(() => {
    activeTab.value = router.currentRoute.value.fullPath.endsWith('signin') ? 'signin' : 'signup'
    return activeTab.value === 'signin' ? SignIn : SignUp
})
// 设置当前激活的标签页和url
const setActiveTab = (tab) => {
    activeTab.value = tab
    router.replace(`/login/${activeTab.value}`)
}

// 懒加载标语和登录卡片
onMounted(() => {
    setTimeout(() => {
        showSlogan.value = true
    }, 500)

    setTimeout(() => {
        const loginCard = document.querySelector('.login-card')
        if (loginCard) {
            loginCard.classList.add('show')
        }
    }, 1000)
})

// 吐司消息
const toastNotificationForLogin = ref(null)

const showToast = (message, isSuccess) => {
    if (toastNotificationForLogin.value) {
        toastNotificationForLogin.value.showToast(message, isSuccess)
    }
}

const handleChildMessage = (message) => {
    const isSuccess = message.includes('成功') ? true : false
    showToast(message, isSuccess)
};


</script>

<style scoped>
/* --- 页面整体布局与背景 --- */
.login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
}

/* --- 标语样式与动画 --- */
.slogan-container {
    text-align: center;
    width: 100%;
    animation: fadeIn 1s ease-in-out;
    margin-bottom: 40px;
}

.slogan-text {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    letter-spacing: 2px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* --- 登录/注册卡片容器与卡片本身样式 --- */
.login-card-container {
    width: 100%;
    max-width: 450px;
    perspective: 1000px;
}

.login-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    transition: transform 0.6s, box-shadow 0.6s, opacity 0.5s ease;
    overflow: hidden;
    transform-style: preserve-3d;
    opacity: 0;
    transform: translateY(20px);
}

.login-card.show {
    opacity: 1;
    transform: translateY(0);
}

.login-card:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px) rotateX(5deg);
}

/* --- 卡片头部与标签页按钮样式 --- */
.card-header {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    padding: 20px;
    border-bottom: none;
}

.tabs {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.tab-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    padding: 8px 15px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.tab-btn::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
}

.tab-btn:hover {
    color: white;
}

.tab-btn:hover::after {
    width: 100%;
}

.tab-btn.active {
    color: white;
    font-weight: 600;
}

.tab-btn.active::after {
    width: 100%;
}

/* --- 卡片内容区域样式 --- */
.card-body {
    padding: 30px;
}

/* --- 组件切换过渡动画 --- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* --- 响应式调整 (小屏幕设备) --- */
@media (max-width: 576px) {
    .slogan-text {
        font-size: 2rem;
    }

    .slogan-container {
        margin-bottom: 30px;
    }

    .login-card-container {
        max-width: 100%;
    }

    .card-body {
        padding: 20px;
    }

    .tab-btn {
        font-size: 1rem;
        padding: 6px 12px;
    }
}
</style>