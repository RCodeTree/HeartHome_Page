<template>
    <HeadNav></HeadNav>
    <SideNav></SideNav>
    <router-view></router-view>
    <FootNav></FootNav>
</template>

<script setup>
import HeadNav from '../NavBar/HeadNav.vue'
import SideNav from '../NavBar/SideNav.vue'
import FootNav from '../NavBar/FootNav.vue'
</script>

<style scoped></style>
