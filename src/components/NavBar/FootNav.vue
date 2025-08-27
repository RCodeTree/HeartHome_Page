<template>
    <!-- 底部导航栏 -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-blue-600">
        <div class="w-full">
            <!-- PC端导航内容 -->
            <div class="flex w-full justify-between items-center hidden lg:flex">
                <!-- 用户信息区域 -->
                <div class="flex items-center px-4">
                    <router-link to="/my" class="no-underline">
                        <div class="mr-2">
                            <img :src="avatar" alt="用户头像" class="w-10 h-10 rounded-full border-2 border-white/50">
                        </div>
                    </router-link>
                    <div>
                        <div class="text-white font-bold">
                            <router-link to="/my" class="no-underline text-white/75">{{ username
                            }}</router-link>
                        </div>
                        <div class="text-sm text-white/75 flex items-center">
                            <span class="w-2 h-2 rounded-full"
                                :class="{ 'bg-green-400 shadow-sm': isLoggedIn, 'bg-red-400 shadow-sm': !isLoggedIn }"></span>
                            <router-link to="/my" class="no-underline text-white/75 ml-1">{{ isLoggedIn ?
                                '已登录' : '未登录' }}</router-link>
                        </div>
                    </div>
                </div>
                <!-- 导航链接 -->
                <div class="hidden lg:flex flex-row justify-end items-center">
                    <!-- 搜索框 -->
                    <div class="mr-3">
                        <input type="text" class="px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-lg focus:bg-white/30 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300" placeholder="搜索...">
                    </div>
                    <!-- 发布按钮 -->
                    <router-link to="/publish" class="text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center transition-all duration-300 hover:scale-105">
                        <i class="bi bi-plus-circle-fill mr-2 text-lg"></i>
                        <span>发布</span>
                    </router-link>
                </div>
            </div>

            <!-- 移动端用户信息 -->
            <div class="flex lg:hidden items-center justify-between w-full px-2 mb-1">
                <div class="flex items-center">
                    <router-link to="/my" class="no-underline">
                        <div class="mr-2">
                            <img :src="avatar" alt="用户头像" class="w-8 h-8 rounded-full border border-white/50">
                        </div>
                    </router-link>
                    <div>
                        <div class="text-white font-bold text-sm">
                            <router-link to="/my" class="no-underline text-white/75">{{ username
                                }}</router-link>
                        </div>
                        <div class="text-white/75 text-sm flex items-center">
                            <span class="w-1.5 h-1.5 rounded-full"
                                :class="{ 'bg-green-400': isLoggedIn, 'bg-red-400': !isLoggedIn }"></span>
                            <router-link to="/my" class="no-underline text-white/75 ml-1">{{ isLoggedIn ? '已登录'
                                : '未登录' }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 移动端导航内容 -->
            <ul class="flex lg:hidden flex-row w-full justify-around">
                <li>
                    <router-link to="/home" class="text-white flex flex-col items-center py-3 px-4 min-h-[48px] hover:bg-white/10 rounded-lg transition-all duration-300 group">
                        <i class="bi bi-house-door-fill text-lg group-hover:scale-110 transition-transform duration-300"></i>
                        <div class="text-xs mt-1">首页</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/message" class="text-white flex flex-col items-center py-3 px-4 min-h-[48px] hover:bg-white/10 rounded-lg transition-all duration-300 group">
                        <i class="bi bi-chat-dots-fill text-lg group-hover:scale-110 transition-transform duration-300"></i>
                        <div class="text-xs mt-1">消息</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/friend" class="text-white flex flex-col items-center py-3 px-4 min-h-[48px] hover:bg-white/10 rounded-lg transition-all duration-300 group">
                        <i class="bi bi-people-fill text-lg group-hover:scale-110 transition-transform duration-300"></i>
                        <div class="text-xs mt-1">好友</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/publish" class="text-white flex flex-col items-center py-3 px-4 min-h-[48px] hover:bg-white/10 rounded-lg transition-all duration-300 group">
                        <i class="bi bi-plus-circle-fill text-lg group-hover:scale-110 transition-transform duration-300"></i>
                        <div class="text-xs mt-1">发布</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/my" class="text-white flex flex-col items-center py-3 px-4 min-h-[48px] hover:bg-white/10 rounded-lg transition-all duration-300 group">
                        <i class="bi bi-person-fill text-lg group-hover:scale-110 transition-transform duration-300"></i>
                        <div class="text-xs mt-1">我的</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { loginStore } from '../../stores/HeartHomeStore'



/*
 设置全局登录状态
 */
const store = loginStore()
const isLoggedIn = store.isLoggedIn // 登录状态
const username = store.currentUser.username // 用户名
const avatar = store.currentUser.avatarUrl // 头像

</script>

<style scoped>
/* 激活状态的链接样式 */
.router-link-active {
  @apply bg-white/20 text-white;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
}

/* 用户头像样式 */
img {
  object-fit: cover;
}

/* 移动端分隔线 */
@media (max-width: 1023px) {
  .user-info-mobile {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>