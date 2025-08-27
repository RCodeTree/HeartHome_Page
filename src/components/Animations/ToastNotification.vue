<template>
    <Transition name="toast" appear>
        <div v-if="isVisible" 
             :class="[
                 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-center min-w-64 max-w-sm',
                 isSuccess ? 'bg-green-500' : 'bg-red-500'
             ]"
             role="alert" 
             aria-live="assertive" 
             aria-atomic="true">
            {{ message }}
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')
const isSuccess = ref(true)
let timeoutId = null

const showToast = (msg, success = true) => {
    // 清除之前的定时器
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    
    message.value = msg
    isSuccess.value = success
    isVisible.value = true
    
    // 3秒后自动隐藏
    timeoutId = setTimeout(() => {
        isVisible.value = false
    }, 3000)
}

defineExpose({
    showToast
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
}
</style>