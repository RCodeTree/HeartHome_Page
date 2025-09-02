<template>
  <div>
    <ToastNotification ref="toastRef" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { loginStore } from './stores/HeartHomeStore'
import ToastNotification from './components/Animations/ToastNotification.vue'

const store = loginStore()
const toastRef = ref(null)

// 监听登录状态变化
watch(() => store.currentUser, (newValue) => {
  if (newValue) {
    toastRef.value.showToast('登录成功！', true)
  }
})

// 全局toast事件处理
const handleGlobalToast = (event) => {
  if (toastRef.value && event.detail) {
    const { message, type } = event.detail
    // 将type转换为布尔值：success为true，error为false
    const isSuccess = type === 'success'
    toastRef.value.showToast(message, isSuccess)
  }
}

// 组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener('show-toast', handleGlobalToast)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('show-toast', handleGlobalToast)
})
</script>

<style scoped>
/* 可以保留或移除样式 */
</style>
