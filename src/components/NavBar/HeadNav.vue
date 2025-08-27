<template>
    <nav class="gradient-bg shadow-lg">
        <div class="w-full px-4">
            <a class="text-white font-bold text-xl" href="#">Logo</a>
            <button class="ml-auto lg:hidden p-2 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center" type="button" @click="handleMoblie()">
                <span class="block w-6 h-0.5 bg-white mb-1"></span>
                <span class="block w-6 h-0.5 bg-white mb-1"></span>
                <span class="block w-6 h-0.5 bg-white"></span>
            </button>
            <div class="fixed top-0 right-0 h-full w-4/5 bg-white/95 backdrop-blur-md transform transition-transform duration-300 z-50" 
                 :class="{ 'translate-x-0': isMobile, 'translate-x-full': !isMobile }" id="offcanvasNavbar">
                <div class="gradient-bg p-4 flex justify-between items-center">
                    <h5 class="text-white font-bold text-lg">菜单</h5>
                    <button type="button" class="text-white text-2xl p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" @click="handleMoblie()">&times;</button>
                </div>
                <div class="p-4">
                    <!-- 非移动端 -->
                    <ul class="hidden lg:flex ml-auto space-x-4" v-show="isMobile === false">
                        <li>
                            <router-link to="/home" class="text-white hover:text-blue-200 font-bold transition-colors duration-300">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/service" class="text-white hover:text-blue-200 font-bold transition-colors duration-300">服务</router-link>
                        </li>
                    </ul>

                    <!-- 移动端 -->
                    <ul class="space-y-4" v-show="isMobile === true">
                        <!-- 搜索框 -->
                        <li class="search-container">
                            <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300" 
                                   placeholder="搜索..." ref="searchInput" autofocus>
                        </li>
                        <li>
                            <router-link to="/message" class="block text-gray-800 hover:text-blue-600 font-medium py-2 transition-colors duration-300">消息</router-link>
                        </li>
                        <li>
                            <router-link to="/friend" class="block text-gray-800 hover:text-blue-600 font-medium py-2 transition-colors duration-300">心友</router-link>
                        </li>
                        <li>
                            <router-link to="/service" class="block text-gray-800 hover:text-blue-600 font-medium py-2 transition-colors duration-300">服务</router-link>
                        </li>
                        <li>
                            <router-link to="/about" class="block text-gray-800 hover:text-blue-600 font-medium py-2 transition-colors duration-300">关于</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 判断是移动端(true)还是pc端(false)
let isMobile = ref(false)
const handleMoblie = () => {
    // 判断是移动端还是pc端，并根据结果设置isMobile的值，以控制菜单和导航项的显示
    isMobile.value = !isMobile.value

    // 在移动端菜单打开时，延迟一下再聚焦，确保DOM已更新
    if (isMobile.value) {
        setTimeout(() => {
            searchInput.value?.focus()
        }, 300)
    }
}

// 搜索框ref
const searchInput = ref(null)

// 组件挂载时搜索框自动聚焦
onMounted(() => {
    if (isMobile.value) { // 如果是移动端
        searchInput.value?.focus() // 自动聚焦搜索框
    }
})
</script>

<style scoped>
/* 搜索框样式 */
.search-container {
    position: relative;
}

/* 导航链接悬停效果 */
a {
    position: relative;
}

a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #a1c4fd;
    transition: width 0.3s ease;
}

a:hover::after {
    width: 100%;
}

/* 移动端菜单背景遮罩 */
.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
}
</style>