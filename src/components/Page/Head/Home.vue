<template>
    <div class="container-fluid d-flex flex-column ps-lg-4 content-wrapper"
        :class="{ 'container-expanded': isExpanded }">
        <div class="content-area overflow-auto flex-grow-1">
            <div class="text-center p-4 p-sm-3 bg-white bg-opacity-90 rounded-3 shadow custom-card my-4">
                <h2 class="text-primary fw-bold mb-3 mobile-title">欢迎访问我们的网站</h2>
                <p class="text-secondary fs-5 mobile-text">这里是网站的主要内容区域，您可以在这里展示重要信息。</p>
            </div>
            <!-- 图片流动展示区域 -->
            <div class="image-flow-container my-4">
                <!-- 第一行图片 从左到右 -->
                <div class="image-row flow-left">
                    <div class="image-track">
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (1).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (2).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (3).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (4).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (5).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (6).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (7).jpg" class="card-img-top" alt="flow image">
                        </div>
                    </div>
                    <div class="image-track">
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (1).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (2).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (3).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (4).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (5).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (6).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (7).jpg" class="card-img-top" alt="flow image">
                        </div>
                    </div>
                </div>
                <!-- 第二行图片 从右到左 -->
                <div class="image-row flow-right">
                    <div class="image-track">
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (8).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (9).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (10).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (11).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (12).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (13).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C.jpg" class="card-img-top" alt="flow image">
                        </div>
                    </div>
                    <div class="image-track">
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (8).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (9).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (10).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (11).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (12).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C (13).jpg" class="card-img-top" alt="flow image">
                        </div>
                        <div class="card image-card mx-2">
                            <img src="/image/OIP-C.jpg" class="card-img-top" alt="flow image">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 文字卡片 从左到右 -->
            <div class="text-flow-container my-4">
                <div class="card-row flow-left">
                    <div class="card-track">
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">创新科技</h5>
                                <p class="card-text">探索前沿科技，引领创新未来</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">智能生活</h5>
                                <p class="card-text">打造智能家居，享受品质生活</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">绿色环保</h5>
                                <p class="card-text">致力环境保护，共建美好家园</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">教育发展</h5>
                                <p class="card-text">培养未来人才，助力教育创新</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">健康医疗</h5>
                                <p class="card-text">关注健康科技，提供优质医疗</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">文化传承</h5>
                                <p class="card-text">弘扬传统文化，创新现代表达</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-track">
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">创新科技</h5>
                                <p class="card-text">探索前沿科技，引领创新未来</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">智能生活</h5>
                                <p class="card-text">打造智能家居，享受品质生活</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">绿色环保</h5>
                                <p class="card-text">致力环境保护，共建美好家园</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">教育发展</h5>
                                <p class="card-text">培养未来人才，助力教育创新</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">健康医疗</h5>
                                <p class="card-text">关注健康科技，提供优质医疗</p>
                            </div>
                        </div>
                        <div class="card custom-card-flow mx-3">
                            <div class="card-body">
                                <h5 class="card-title">文化传承</h5>
                                <p class="card-text">弘扬传统文化，创新现代表达</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 侧边栏展开状态
const isExpanded = ref(false)

// 监听侧边栏状态变化事件
const handleSideNavChange = (event) => {
    if (event.detail && typeof event.detail.expanded === 'boolean') {
        isExpanded.value = event.detail.expanded
    }
}

// 添加事件监听
onMounted(() => {
    window.addEventListener('sidenav-change', handleSideNavChange)
})

// 移除事件监听
onBeforeUnmount(() => {
    window.removeEventListener('sidenav-change', handleSideNavChange)
})
</script>

<style scoped>
.content-wrapper {
    height: calc(100vh - 56px - 56px);
    /* 减去顶部和底部导航栏的高度 */
    position: relative;
    /* 添加相对定位 */
    overflow: hidden;
    /* 防止内容溢出 */
}

.content-area {
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 100%;
    /* 确保内容区域填满容器 */
    position: relative;
    /* 添加相对定位 */
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.content-area::-webkit-scrollbar {
    display: none;
}

.custom-card {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    transform: translateY(0);
}

.custom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
}

.text-primary {
    color: #667eea !important;
}

/* 图片流动展示区域样式 */
.image-flow-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    /* 添加相对定位，使内部绝对定位元素有参考点 */
}

.image-row {
    display: flex;
    margin: 1rem 0;
    overflow: hidden;
}

.image-track {
    display: flex;
    animation: scroll 20s linear infinite;
}

.image-card {
    width: 200px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease;
}

.image-card:hover {
    transform: scale(1.05);
}

.card-img-top {
    height: 150px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.flow-left .image-track {
    animation: scroll-left 20s linear infinite;
}

.flow-right .image-track {
    animation: scroll-right 20s linear infinite;
}

.image-row:hover .image-track {
    animation-play-state: paused;
}

@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes scroll-right {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0);
    }
}

/* 响应式调整 */
@media (max-width: 991.98px) {
    .content-area {
        margin-bottom: 60px;
        /* 为底部导航栏留出空间 */
    }

    .custom-card {
        max-width: 95%;
        margin: 0.5rem auto;
    }

    .mobile-title {
        font-size: 1.5rem;
    }

    .mobile-text {
        font-size: 1rem !important;
    }

    .image-card {
        width: 160px;
    }

    .card-img-top {
        height: 120px;
    }
}

@media (max-width: 576px) {
    .mobile-title {
        font-size: 1.25rem;
    }

    .mobile-text {
        font-size: 0.875rem !important;
    }

    .image-card {
        width: 130px;
    }

    .card-img-top {
        height: 100px;
    }

    .mx-2 {
        margin-left: 0.25rem !important;
        margin-right: 0.25rem !important;
    }
}

/* 文字卡片流动区域样式 */
.text-flow-container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.card-row {
    display: flex;
    margin: 1rem 0;
    overflow: hidden;
}

.card-track {
    display: flex;
    animation: scroll 15s linear infinite;
}

.custom-card-flow {
    min-width: 300px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease;
}

.custom-card-flow:hover {
    transform: scale(1.05);
}

.card-title {
    color: #667eea;
    font-weight: bold;
}

.flow-left .card-track {
    animation: scroll-left 20s linear infinite;
}

.flow-right .card-track {
    animation: scroll-right 20s linear infinite;
}

.card-row:hover .card-track {
    animation-play-state: paused;
}

@media (max-width: 991.98px) {
    .custom-card-flow {
        min-width: 250px;
    }
}

@media (max-width: 576px) {
    .custom-card-flow {
        min-width: 200px;
    }
}

/* 响应侧边栏展开状态 */
@media (min-width: 992px) {
    .content-wrapper {
        margin-left: 20px;
        width: calc(100% - 20px);
        transition: all 0.3s ease;
    }

    .content-wrapper.container-expanded {
        margin-left: 250px;
        width: calc(100% - 250px);
    }
}
</style>