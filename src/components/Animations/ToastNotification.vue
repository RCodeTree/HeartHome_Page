<template>
    <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
        <div ref="liveToastRef" id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div ref="toastBodyRef" class="toast-body text-center" id="toastBody">
                <!-- 消息内容将在这里显示 -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js'

const liveToastRef = ref(null)
const toastBodyRef = ref(null)
let liveToastInstance = null

onMounted(() => {
    if (liveToastRef.value) {
        liveToastInstance = new Toast(liveToastRef.value, { delay: 3000 })
    }
})

const showToast = (message, isSuccess) => {
    if (toastBodyRef.value && liveToastInstance) {
        toastBodyRef.value.innerText = message
        liveToastRef.value.classList.remove('text-bg-success', 'text-bg-danger')
        if (isSuccess) {
            liveToastRef.value.classList.add('text-bg-success')
        } else {
            liveToastRef.value.classList.add('text-bg-danger')
        }
        liveToastInstance.show()
    }
}

defineExpose({
    showToast
})
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>