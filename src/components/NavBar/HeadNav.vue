<template>
    <nav class="navbar navbar-expand-lg shadow-lg">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="#">Logo</a>
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" @click="handleMoblie()"
                data-bs-target="#offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class=" offcanvas offcanvas-end" id="offcanvasNavbar">
                <div class="offcanvas-header navbar">
                    <h5 class=" offcanvas-title text-white">菜单</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                        @click="handleMoblie()"></button>
                </div>
                <div class="offcanvas-body">
                    <!-- 非移动端 -->
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-show="isMobile === false">
                        <li class="nav-item">
                            <router-link to="/home" class="nav-link text-white">首页</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/service" class="nav-link text-white">服务</router-link>
                        </li>
                    </ul>

                    <!-- 移动端 -->
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-show="isMobile === true">
                        <!-- 搜索框 -->
                        <li class="search-container nav-item">
                            <input type="text" class="form-control" placeholder="搜索..." ref="searchInput" autofocus>
                        </li>
                        <li class="nav-item">
                            <router-link to="/message" class="nav-link text-dark">消息</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/friend" class="nav-link text-dark">心友</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/service" class="nav-link text-dark">服务</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link text-dark">关于</router-link>
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

.search-container .form-control {
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.search-container .form-control::placeholder {
    color: rgba(0, 0, 0, 0.6);
}

.search-container .form-control:focus {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
    color: #333;
}

/* 自定义offcanvas样式，使其不完全覆盖页面 */
.offcanvas {
    width: 80% !important;
    /* 控制菜单宽度为屏幕的80% */
    background-color: rgba(255, 255, 255, 0.95);
    /* 半透明背景 */
    backdrop-filter: blur(5px);
    /* 背景模糊效果 */
}

.navbar {
    background-image: linear-gradient(to right, #667eea, #5c78f6);
    background-size: 400% 400%;
    animation: gradientFlow 8s ease infinite;
    transition: all 0.5s ease;
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

.nav-link::after {
    background-color: #a1c4fd;
}

.nav-link {
    position: relative;
    font-weight: bolder;
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

.nav-link:hover::after {
    width: 100%;
}

/* 移动端菜单样式优化 */
@media (max-width: 991.98px) {
    .offcanvas-header {
        padding: 0.75rem 1rem;
        /* 减小头部内边距 */
    }

    .offcanvas-body {
        padding: 1rem;
        /* 调整内容区内边距 */
    }
}
</style>