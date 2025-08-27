<template>
  <!-- 导航栏 -->
  <nav class="hidden lg:flex h-full flex-col items-center fixed left-0 top-14 z-30 w-64 bg-white/90 backdrop-blur-md shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out"
    :class="{ 'nav-expanded': isExpanded }" @mouseenter="showNav()" @mouseleave="hideNav()">
    <div class="w-full p-4 flex flex-col h-full">
      <ul class="flex flex-col w-full space-y-2">
        <li>
          <router-link to="/message" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <i class="bi bi-chat-dots-fill mr-3 text-lg group-hover:scale-110 transition-transform duration-300"></i>
            <span>消息</span>
          </router-link>
        </li>
        <li>
          <router-link to="/friend" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <i class="bi bi-people-fill mr-3 text-lg group-hover:scale-110 transition-transform duration-300"></i>
            <span>心友</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <i class="bi bi-person-fill mr-3 text-lg group-hover:scale-110 transition-transform duration-300"></i>
            <span>我的</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-medium group">
            <i class="bi bi-info-circle-fill mr-3 text-lg group-hover:scale-110 transition-transform duration-300"></i>
            <span>关于</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

/*
 * 根据侧边栏展开状态控制底部导航栏的展开和折叠
 */
// 控制导航栏展开状态
const isExpanded = ref(false)
// 显示导航栏
const showNav = () => {
  isExpanded.value = true
}
// 隐藏导航栏
const hideNav = () => {
  isExpanded.value = false
}
</script>

<style scoped>
/* 侧边导航栏样式 */
.nav-expanded {
  transform: translateX(0) !important;
}

/* 导航栏悬停效果 */
nav:hover {
  transform: translateX(0);
}

/* 默认隐藏状态 */
nav {
  transform: translateX(-200px);
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