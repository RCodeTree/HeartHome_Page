<template>
    <HeadNav></HeadNav>
    <SideNav></SideNav>
    <div class="main-content">
        <router-view></router-view>
    </div>
    <FootNav></FootNav>
</template>

<script setup>
import HeadNav from '../components/NavBar/HeadNav.vue'
import SideNav from '../components/NavBar/SideNav.vue'
import FootNav from '../components/NavBar/FootNav.vue'
</script>

<style scoped>
.main-content {
    margin-top: 56px; /* 顶部导航栏高度 */
    margin-bottom: 56px; /* 底部导航栏高度 */
    min-height: calc(100vh - 112px); /* 确保内容区域至少占满剩余高度 */
    position: relative;
    z-index: 1; /* 确保内容在导航栏下方，但不影响toast显示 */
}

/* 大屏幕时为侧边导航栏留出空间 */
@media (min-width: 1024px) {
    .main-content {
        margin-left: 0; /* 侧边栏默认隐藏，不需要预留空间 */
    }
}
</style>
