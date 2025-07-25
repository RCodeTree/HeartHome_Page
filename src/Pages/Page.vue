<template>
    <HeadNav></HeadNav>
    <SideNav></SideNav>
    <router-view></router-view>
    <FootNav></FootNav>
</template>

<script setup>
import HeadNav from '../components/NavBar/HeadNav.vue'
import SideNav from '../components/NavBar/SideNav.vue'
import FootNav from '../components/NavBar/FootNav.vue'
</script>

<style scoped></style>
