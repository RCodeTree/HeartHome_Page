<template>
  <!-- 导航栏 -->
  <nav class="navbar d-lg-block d-none h-100 flex-column align-items-center fixed-left"
    :class="{ 'nav-expanded': isExpanded }" @mouseenter="showNav()" @mouseleave="hideNav()">
    <div class="container-fluid flex-column h-100">
      <ul class="navbar-nav flex-column w-100">
        <li class="nav-item">
          <router-link to="/message" class="nav-link text-dark d-flex align-items-center">
            <i class="bi bi-chat-dots-fill me-2"></i>
            <span>消息</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/friend" class="nav-link text-dark d-flex align-items-center">
            <i class="bi bi-people-fill me-2"></i>
            <span>心友</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/my" class="nav-link text-dark d-flex align-items-center">
            <i class="bi bi-person-fill me-2"></i>
            <span>我的</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link text-dark d-flex align-items-center">
            <i class="bi bi-info-circle-fill me-2"></i>
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
  // 发送侧边栏状态变化事件
  window.dispatchEvent(new CustomEvent('sidenav-change', { detail: { expanded: true } }))
}
// 隐藏导航栏
const hideNav = () => {
  isExpanded.value = false
  // 发送侧边栏状态变化事件
  window.dispatchEvent(new CustomEvent('sidenav-change', { detail: { expanded: false } }))
}
</script>

<style scoped>
.navbar {
  width: 250px;
  background-color: whitesmoke;
  background-image: linear-gradient(to right, #f5f5f5, #e9e9e9);
  background-size: 400% 400%;
  animation: gradientFlow 8s ease infinite;
  transition: all 0.3s ease;
  transform: translateX(-230px);
  /* 默认隐藏大部分，只露出一小部分 */
  opacity: 0.9;
  box-shadow: none;
  /* 确保默认状态下没有阴影 */
}

/* 展开状态 */
.nav-expanded {
  transform: translateX(0);
  opacity: 1;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.fixed-left {
  position: fixed;
  left: 0;
  top: 56px;
  height: calc(100vh - 56px - 2rem);
  margin-bottom: 1rem;
  z-index: 1020;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.nav-link {
  position: relative;
  font-weight: bolder;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: powderblue;
  transition: width 0.3s ease;
}

.nav-link:hover {
  transform: translateX(10px);
  color: #4a90e2 !important;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-link:hover i {
  transform: scale(1.2);
}

.nav-link span {
  font-size: 1rem;
}
</style>