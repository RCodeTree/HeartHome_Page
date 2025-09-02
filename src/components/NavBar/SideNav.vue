<template>
  <!-- 触发区域 -->
  <div class="hidden lg:block fixed left-0 top-14 bottom-14 w-4 z-30" @mouseenter="showNav()"></div>
  
  <!-- 导航栏 -->
  <nav class="hidden lg:flex flex-col items-center fixed left-0 top-14 bottom-14 z-40 w-64 bg-white/90 backdrop-blur-md shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out"
    :class="{ 'nav-expanded': isExpanded }" @mouseenter="showNav()" @mouseleave="hideNav()">
    <div class="w-full p-4 flex flex-col h-full">
      <ul class="flex flex-col w-full space-y-2">
        <li>
          <router-link to="/message" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <ChatBubbleLeftRightIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span>消息</span>
          </router-link>
        </li>
        <li>
          <router-link to="/friend" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <UsersIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span>心友</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <UserIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span>我的</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <InformationCircleIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span>关于</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { ChatBubbleLeftRightIcon, UsersIcon, UserIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'

/*
 * 根据侧边栏展开状态控制底部导航栏的展开和折叠
 */
// 控制导航栏展开状态
const isExpanded = ref(false)
let hideTimer = null

// 显示导航栏
const showNav = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  isExpanded.value = true
}

// 隐藏导航栏（延迟隐藏）
const hideNav = () => {
  hideTimer = setTimeout(() => {
    isExpanded.value = false
  }, 300) // 300ms延迟隐藏
}
</script>

<style scoped>
/* 侧边导航栏样式 */
.nav-expanded {
  transform: translateX(0) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 导航栏悬停效果 */
nav:hover {
  transform: translateX(0);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 默认隐藏状态 */
nav {
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

/* 激活状态的链接样式 */
.router-link-active {
  @apply bg-blue-100 text-blue-700;
}

.router-link-active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #667eea, #5c78f6);
}
</style>