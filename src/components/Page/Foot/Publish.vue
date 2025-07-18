<template>
    <div class="publish-container p-3">
        <!-- 气泡背景 -->
        <div class="bubbles bubbles-left">
            <div class="bubble" v-for="i in 50" :key="i"></div>
        </div>
        <div class="bubbles bubbles-right">
            <div class="bubble" v-for="i in 50" :key="i"></div>
        </div>
        <!-- 发布卡片 -->
        <div class="card shadow-sm">
            <div class="card-body">
                <h2 class="card-title mb-4">发布作品</h2>

                <form @submit.prevent="handleSubmit">
                    <!-- 标题输入 -->
                    <div class="mb-3">
                        <label for="title" class="form-label">作品标题</label>
                        <input type="text" class="form-control" id="title" v-model="formData.title" required>
                    </div>

                    <!-- 简短描述 -->
                    <div class="mb-3">
                        <label for="description" class="form-label">简短描述</label>
                        <textarea class="form-control" id="description" rows="2" v-model="formData.description"
                            required></textarea>
                    </div>

                    <!-- 图片上传区域 -->
                    <!-- 
                    fileInput的值通过ref(null)初始化，当用户选择文件时，通过@change事件触发handleFileSelect函数，此时fileInput.value会包含用户选择的文件信息。这些文件信息随后被传递给handleFiles函数进行处理，最终更新到formData.images数组中。每次选择新文件时，这个过程都会重复执行。
                    Vue中使用$refs是为了直接访问DOM元素或组件实例。在这个场景中，我们需要通过$refs.fileInput.click()来触发文件选择对话框，因为这是一个原生DOM操作，不能通过Vue的响应式系统直接实现。虽然ref()也可以引用DOM元素，但$refs提供了更直接的访问方式，特别是在需要触发原生DOM事件时更加方便。
                    -->
                    <div class="mb-3">
                        <label class="form-label">上传图片</label>
                        <div class="upload-area p-4 border rounded" :class="{ 'dragover': isDragging }"
                            @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                            @dragover.prevent @drop.prevent="handleDrop">
                            <div v-if="!formData.images.length" class="text-center">
                                <i class="bi bi-cloud-upload fs-1"></i>
                                <p class="mt-2">拖拽图片到此处或点击上传</p>
                                <input type="file" class="d-none" ref="fileInput" @change="handleFileSelect" multiple
                                    accept="image/*">
                                <button type="button" class="btn btn-outline-primary" @click="$refs.fileInput.click()">
                                    选择图片
                                </button>
                            </div>
                            <div v-else class="image-preview-container">
                                <div v-for="(image, index) in formData.images" :key="index" class="image-preview-item">
                                    <img :src="image.url" class="img-thumbnail" alt="Preview">
                                    <button type="button" class="btn-close" @click="removeImage(index)"></button>
                                </div>
                                <input type="file" class="d-none" ref="fileInput" @change="handleFileSelect" multiple
                                    accept="image/*">
                                <div class="add-more-images" @click="$refs.fileInput.click()">
                                    <i class="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 详细描述（富文本编辑器） -->
                    <div class="mb-4">
                        <label class="form-label">详细描述</label>
                        <div class="editor-container border rounded">
                            <div ref="editorElement"></div>
                        </div>
                    </div>

                    <!-- 提交按钮 -->
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                            {{ isSubmitting ? '发布中...' : '发布作品' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// 表单数据
const formData = reactive({
    title: '',
    description: '',
    content: '',
    images: []
})

/* 
状态变量
*/
// 拖拽状态和提交状态
const isDragging = ref(false)
// 提交状态
const isSubmitting = ref(false)
// 图片上传输入元素
const fileInput = ref(null)
// Quill编辑器元素
const editorElement = ref(null)
let quill = null


/**
 * 富文本编辑器相关
 */
// Quill编辑器配置
const quillOptions = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ]
    },
    theme: 'snow'
}

// 初始化Quill编辑器
onMounted(() => {
    if (editorElement.value) {
        quill = new Quill(editorElement.value, quillOptions)
        quill.on('text-change', () => {
            formData.content = quill.root.innerHTML
        })
    }
})

// 组件卸载前清理
onBeforeUnmount(() => {
    if (quill) {
        quill.off('text-change')
    }
})


/**
 * 图片上传处理相关
 */
// 处理图片拖放
const handleDrop = (e) => {
    isDragging.value = false
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    handleFiles(files)
}

// 处理图片选择
const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
}

// 处理图片文件
const handleFiles = (files) => {
    files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
            formData.images.push({
                file,
                url: e.target.result
            })
        }
        reader.readAsDataURL(file)
    })
}

// 移除图片
const removeImage = (index) => {
    formData.images.splice(index, 1)
}

/**
 * 表单提交处理相关
 */
// 处理表单提交
const handleSubmit = async () => {
    try {
        isSubmitting.value = true
        // TODO: 实现作品发布逻辑
        await new Promise(resolve => setTimeout(resolve, 1500)) // 模拟提交延迟
        console.log('提交的表单数据：', formData)
    } catch (error) {
        console.error('发布失败：', error)
    } finally {
        isSubmitting.value = false // 提交完成后重置状态
    }
}
</script>

<style scoped>
.publish-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    height: calc(100vh - 56px);
    overflow-y: auto;
    padding-bottom: 5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.publish-container::-webkit-scrollbar {
    display: none;
}

.bubbles {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    top: 0;
    left: 0;
    pointer-events: none;
}

.bubbles-left {
    width: calc((100% - 1200px) / 2);
}

.bubbles-right {
    left: auto;
    right: 0;
    width: calc((100% - 1200px) / 2);
}

.bubble {
    position: absolute;
    left: var(--bubble-left-offset);
    bottom: -75%;
    background-color: var(--bubble-color);
    border-radius: 50%;
    animation: rise var(--bubble-duration) infinite ease-in-out;
    width: var(--bubble-size);
    height: var(--bubble-size);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.bubble:nth-child(1) {
    --bubble-left-offset: 10%;
    --bubble-size: 40px;
    --bubble-duration: 12s;
    animation-delay: 0s;
    --bubble-color: rgba(255, 182, 193, 0.6);
}

.bubble:nth-child(2) {
    --bubble-left-offset: 25%;
    --bubble-size: 50px;
    --bubble-duration: 15s;
    animation-delay: 1s;
    --bubble-color: rgba(135, 206, 235, 0.6);
}

.bubble:nth-child(3) {
    --bubble-left-offset: 40%;
    --bubble-size: 35px;
    --bubble-duration: 11s;
    animation-delay: 2s;
    --bubble-color: rgba(255, 192, 203, 0.6);
}

.bubble:nth-child(4) {
    --bubble-left-offset: 55%;
    --bubble-size: 45px;
    --bubble-duration: 14s;
    animation-delay: 3s;
    --bubble-color: rgba(173, 216, 230, 0.6);
}

.bubble:nth-child(5) {
    --bubble-left-offset: 70%;
    --bubble-size: 30px;
    --bubble-duration: 13s;
    animation-delay: 4s;
    --bubble-color: rgba(255, 182, 193, 0.6);
}

.bubble:nth-child(6) {
    --bubble-left-offset: 85%;
    --bubble-size: 42px;
    --bubble-duration: 16s;
    animation-delay: 5s;
    --bubble-color: rgba(135, 206, 235, 0.6);
}

.bubble:nth-child(7) {
    --bubble-left-offset: 15%;
    --bubble-size: 38px;
    --bubble-duration: 17s;
    animation-delay: 6s;
    --bubble-color: rgba(255, 192, 203, 0.6);
}

.bubble:nth-child(8) {
    --bubble-left-offset: 95%;
    --bubble-size: 48px;
    --bubble-duration: 18s;
    animation-delay: 7s;
    --bubble-color: rgba(173, 216, 230, 0.6);
}

@keyframes rise {
    0% {
        bottom: -75%;
        transform: translateX(0) scale(0.3) rotate(0deg);
        opacity: 0.3;
    }

    50% {
        transform: translateX(-20px) scale(0.7) rotate(180deg);
        opacity: 0.7;
    }

    100% {
        bottom: 120%;
        transform: translateX(-40px) scale(0.3) rotate(360deg);
        opacity: 0;
    }
}

.card {
    margin-bottom: 2rem;
}

.upload-area {
    min-height: 200px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
    cursor: pointer;
}

.upload-area.dragover {
    background-color: #e9ecef;
    border-color: #0d6efd !important;
}

.image-preview-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
}

.image-preview-item {
    position: relative;
}

.image-preview-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.image-preview-item .btn-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.8);
}

.add-more-images {
    height: 150px;
    border: 2px dashed #dee2e6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-more-images:hover {
    border-color: #0d6efd;
}

.editor-container {
    min-height: 200px;
}

.ql-container {
    min-height: 150px;
}

.ql-editor {
    min-height: 150px;
}

@media (max-width: 768px) {
    .publish-container {
        padding: 1rem !important;
        padding-bottom: 6rem !important;
    }

    .card {
        margin-bottom: 1rem;
    }

    .image-preview-container {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .image-preview-item img {
        height: 120px;
    }
}
</style>