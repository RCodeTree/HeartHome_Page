<template>
    <div class="main-container">
        <HeadNav></HeadNav>
        <SideNav></SideNav>
        <router-view></router-view>
        <FootNav></FootNav>
    </div>
</template>

<script setup>
import HeadNav from '../NavBar/HeadNav.vue'
import SideNav from '../NavBar/SideNav.vue'
import FootNav from '../NavBar/FootNav.vue'
</script>

<style scoped>
/* 可以添加 .main-container 的样式来控制整体布局 */
.main-container {
    /* 例如: */
    /* display: grid; */
    /* grid-template-areas: */
    /*     "head head" */
    /*     "side main" */
    /*     "foot foot"; */
    /* grid-template-rows: auto 1fr auto; */
    /* grid-template-columns: auto 1fr; */
    /* height: 100vh; */
}
</style>
