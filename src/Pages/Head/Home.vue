<template>
    <div class="container-fluid d-flex flex-column ps-lg-4 content-wrapper">
        <div class="content-area overflow-auto flex-grow-1">
            <div class="text-center p-4 p-sm-3 bg-white bg-opacity-90 rounded-3 shadow custom-card my-4">
                <h2 class="text-primary fw-bold mb-3 mobile-title">欢迎访问我们的网站</h2>
                <p class="text-secondary fs-5 mobile-text">这里是网站的主要内容区域，您可以在这里展示重要信息。</p>
            </div>

        </div>
    </div>
</template>

<script setup>
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


</style>