<template>
  <div>
    <ToastNotification ref="toastRef" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { loginStore } from './stores/HeartHomeStore'
import ToastNotification from './components/Utils/Animations/ToastNotification.vue'

const store = loginStore()
const toastRef = ref(null)

watch(() => store.currentUser, (newValue) => {
  if (newValue) {
    toastRef.value.showToast('登录成功！', true)
  }
})
</script>

<style scoped>
/* 可以保留或移除样式 */
</style>
