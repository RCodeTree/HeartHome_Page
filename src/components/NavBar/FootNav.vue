<template>
    <!-- 底部导航栏 -->
    <nav class="navbar d-block d-lg-block flex-row align-items-center fixed-bottom">
        <div class="container-fluid">
            <!-- PC端导航内容 -->
            <div class="d-flex w-100 justify-content-between align-items-center d-none d-lg-flex">
                <!-- 用户信息区域 -->
                <div class="user-info d-flex align-items-center">
                    <router-link to="/my" class="text-decoration-none">
                        <div class="avatar-container me-2">
                            <img :src="avatar" alt="用户头像" class="rounded-circle">
                        </div>
                    </router-link>
                    <div class="user-details">
                        <div class="user-name text-white fw-bold">
                            <router-link to="/my" class=" text-decoration-none text-white-50">{{ username
                            }}</router-link>
                        </div>
                        <div class="user-status small text-white-50 d-flex align-items-center">
                            <span class="status-dot"
                                :class="{ 'status-online': isLoggedIn, 'status-offline': !isLoggedIn }"></span>
                            <router-link to="/my" class="text-decoration-none text-white-50 ms-1">{{ isLoggedIn ?
                                '已登录' : '未登录' }}</router-link>
                        </div>
                    </div>
                </div>
                <!-- 导航链接 -->
                <div class="d-none d-lg-flex flex-row justify-content-end align-items-center">
                    <!-- 搜索框 -->
                    <div class="search-container me-3">
                        <input type="text" class="form-control" placeholder="搜索...">
                    </div>
                    <!-- 发布按钮 -->
                    <router-link to="/publish" class="nav-link text-white publish-btn d-flex align-items-center">
                        <i class="bi bi-plus-circle-fill me-2"></i>
                        <span>发布</span>
                    </router-link>
                </div>
            </div>

            <!-- 移动端用户信息 -->
            <div class="user-info-mobile d-flex d-lg-none align-items-center justify-content-between w-100 px-2 mb-1">
                <div class="d-flex align-items-center">
                    <router-link to="/my" class="text-decoration-none">
                        <router-link to="/my" class="text-decoration-none">
                            <div class="avatar-container-mobile me-2">
                                <img :src="avatar" alt="用户头像" class="rounded-circle">
                            </div>
                        </router-link>
                    </router-link>
                    <div class="user-details-mobile">
                        <div class="user-name-mobile text-white fw-bold small">
                            <router-link to="/my" class="text-decoration-none text-white-50">{{ username
                                }}</router-link>
                        </div>
                        <div class="user-status-mobile text-white-50 small d-flex align-items-center">
                            <span class="status-dot status-dot-mobile"
                                :class="{ 'status-online': isLoggedIn, 'status-offline': !isLoggedIn }"></span>
                            <router-link to="/my" class="text-decoration-none text-white-50 ms-1">{{ isLoggedIn ? '已登录'
                                : '未登录' }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 移动端导航内容 -->
            <ul class="navbar-nav d-flex d-lg-none flex-row w-100 justify-content-around">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link text-white">
                        <i class="bi bi-house-door-fill"></i>
                        <div class="small">首页</div>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/my" class="nav-link text-white">
                        <i class="bi bi-person-circle"></i>
                        <div class="small">我的</div>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/publish" class="nav-link text-white">
                        <i class="bi bi-plus-circle-fill"></i>
                        <div class="small">发布</div>
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
/*
 底部导航栏样式 
*/
.navbar {
    background-image: linear-gradient(to right, #667eea, #5c78f6);
    background-size: 400% 400%;
    animation: gradientFlow 8s ease infinite;
    transition: all 0.3s ease;
    height: 56px;
    padding: 0;
    z-index: 1020;
}

@media (min-width: 992px) {
    .navbar {
        left: 0;
        width: 100%;
    }
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
    padding: 0.5rem 1rem;
    text-align: center;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #a1c4fd;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

/* 用户头像样式 */
.avatar-container img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.user-info {
    padding: 0 1rem;
}

/* 移动端样式优化 */
@media (max-width: 991.98px) {
    .navbar {
        left: 0;
        width: 100%;
        height: 90px;
        /* 增加移动端导航栏高度，为用户信息留出空间 */
    }

    /* 移动端用户信息样式 */
    .avatar-container-mobile img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .user-info-mobile {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.15rem 0.5rem;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .nav-link i {
        font-size: 1.1rem;
        margin-right: 0.3rem;
        margin-bottom: 0;
        transition: transform 0.3s ease;
    }

    .nav-link .small {
        font-size: 0.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        transition: color 0.3s ease;
        line-height: 1;
    }

    .nav-link:hover,
    .nav-link:active {
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    .nav-link i {
        font-size: 1.25rem;
        margin-bottom: 0.15rem;
        transition: transform 0.3s ease;
    }

    .nav-link:hover i {
        transform: scale(1.2);
        color: #ffffff;
    }

    .nav-link .small {
        font-size: 0.7rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        transition: color 0.3s ease;
    }

    .nav-link:hover .small {
        color: #ffffff;
    }
}

/*
发布按钮相关样式 
移除publish-btn相关的样式 
*/
.publish-btn {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.publish-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.publish-btn i {
    color: #ffffff;
    font-size: 1.4rem !important;
}

.publish-btn .small {
    color: #ffffff !important;
}

/*
 搜索框样式 
 */
.search-container {
    position: relative;
}

.search-container .form-control {
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.search-container .form-control::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.search-container .form-control:focus {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.1);
    color: #ffffff;
}

/* 
状态小圆点基础样式 
*/
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s ease;
}

/* 移动端状态小圆点样式 */
.status-dot-mobile {
    width: 6px;
    height: 6px;
}

/* 在线状态样式 */
.status-online {
    background-color: #28a745;
    box-shadow: 0 0 4px rgba(40, 167, 69, 0.5);
}

/* 离线状态样式 */
.status-offline {
    background-color: #dc3545;
    box-shadow: 0 0 4px rgba(220, 53, 69, 0.5);
}
</style>