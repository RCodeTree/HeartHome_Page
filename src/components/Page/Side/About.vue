<template>
    <div class="about-container">
        <div class="bubbles">
            <div class="bubble" v-for="n in 100" :key="n"></div>
        </div>
        <div class="container py-5">
            <div class="row g-4">
                <!-- 网站使命 -->
                <div class="col-12 mb-4">
                    <div class="mission-card card custom-card h-100">
                        <div class="card-body text-center">
                            <h2 class="card-title mb-4">我们的使命</h2>
                            <p class="card-text lead">为每一颗受伤的心灵提供温暖的港湾</p>
                            <p class="card-text">在这个快节奏的世界里，我们致力于创造一个安全、温暖的空间，让每个人都能找到倾诉和理解。</p>
                        </div>
                    </div>
                </div>

                <!-- 网站目标 -->
                <div class="col-md-6 mb-4">
                    <div class="purpose-card card custom-card h-100">
                        <div class="card-body">
                            <h3 class="card-title mb-3">我们的目标</h3>
                            <ul class="list-unstyled">
                                <li class="mb-3"><i class="bi bi-heart-fill text-danger me-2"></i>建立互助社区，分享生活中的喜怒哀乐</li>
                                <li class="mb-3"><i class="bi bi-people-fill text-primary me-2"></i>连接心友，互相倾听、支持与鼓励</li>
                                <li class="mb-3"><i class="bi bi-shield-fill-check text-success me-2"></i>为心理健康提供专业支持和资源
                                </li>
                                <li><i class="bi bi-sun-fill text-warning me-2"></i>传播积极能量，共同成长</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 创始人介绍 -->
                <div class="col-md-6 mb-4">
                    <div class="founder-card card custom-card h-100">
                        <div class="card-body">
                            <h3 class="card-title mb-3">关于创始人</h3>
                            <p class="card-text">作为一名热爱生活、关注心理健康的年轻人，我深知在现代社会中保持心理健康的重要性。</p>
                            <p class="card-text">这个平台源于一个简单的愿望：让每个人都能找到倾诉的对象，获得理解和支持，一起走向更好的明天。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.about-container {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 90px);
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    transition: all 0.3s ease;
    margin-left: 20px;
    width: calc(100% - 20px);
}



/* 移动端样式优化 */
@media (max-width: 991.98px) {
    .about-container {
        min-height: 100%;
        margin-left: 0;
        width: 100%;
        padding-bottom: 70px;
        overflow-y: auto;
    }
}

.custom-card {
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
}

.custom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.mission-card {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
}

.purpose-card {
    background-color: white;
}

.founder-card {
    background-color: white;
}

.card-title {
    color: #2d3748;
    font-weight: 600;
}

.mission-card .card-title,
.mission-card .card-text {
    color: white;
}

.list-unstyled li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    transition: transform 0.2s ease;
}

.list-unstyled li:hover {
    transform: translateX(5px);
}

@media (max-width: 768px) {
    .custom-card {
        margin-bottom: 1rem;
    }
}

.bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
}

.bubble {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    opacity: 0;
    animation: float var(--float-duration, 15s) var(--float-delay, 0s) infinite;
}

.bubble:nth-child(1) {
    --float-duration: 12s;
    --float-delay: 0s;
    left: 10%;
    animation-name: float-left;
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
}

.bubble:nth-child(2) {
    --float-duration: 15s;
    --float-delay: 1s;
    left: 20%;
    animation-name: float-right;
    background: linear-gradient(45deg, #6C5B7B, #C06C84);
}

.bubble:nth-child(3) {
    --float-duration: 18s;
    --float-delay: 2s;
    left: 30%;
    animation-name: float-top;
    background: linear-gradient(45deg, #45B7D1, #E4A853);
}

.bubble:nth-child(4) {
    --float-duration: 20s;
    --float-delay: 3s;
    left: 40%;
    animation-name: float-bottom;
    background: linear-gradient(45deg, #2E86AB, #A23B72);
}

.bubble:nth-child(5) {
    --float-duration: 16s;
    --float-delay: 4s;
    left: 50%;
    animation-name: float-left;
    background: linear-gradient(45deg, #F18F01, #99B898);
}

.bubble:nth-child(6) {
    --float-duration: 14s;
    --float-delay: 5s;
    left: 60%;
    animation-name: float-right;
    background: linear-gradient(45deg, #8A2BE2, #FF69B4);
}

.bubble:nth-child(7) {
    --float-duration: 17s;
    --float-delay: 6s;
    left: 70%;
    animation-name: float-top;
    background: linear-gradient(45deg, #3498DB, #E74C3C);
}

.bubble:nth-child(8) {
    --float-duration: 19s;
    --float-delay: 7s;
    left: 80%;
    animation-name: float-bottom;
    background: linear-gradient(45deg, #2ECC71, #F1C40F);
}

.bubble:nth-child(9) {
    --float-duration: 13s;
    --float-delay: 8s;
    left: 90%;
    animation-name: float-left;
    background: linear-gradient(45deg, #9B59B6, #E67E22);
}

.bubble:nth-child(10) {
    --float-duration: 16s;
    --float-delay: 9s;
    left: 95%;
    animation-name: float-right;
    background: linear-gradient(45deg, #1ABC9C, #D35400);
}

@keyframes float-left {
    0% {
        transform: translateX(-100%) translateY(100%) scale(0.3);
        opacity: 0;
    }

    50% {
        transform: translateX(50%) translateY(-50%) scale(1);
        opacity: 0.8;
    }

    100% {
        transform: translateX(200%) translateY(-200%) scale(0.3);
        opacity: 0;
    }
}

@keyframes float-right {
    0% {
        transform: translateX(100%) translateY(100%) scale(0.3);
        opacity: 0;
    }

    50% {
        transform: translateX(-50%) translateY(-50%) scale(1);
        opacity: 0.8;
    }

    100% {
        transform: translateX(-200%) translateY(-200%) scale(0.3);
        opacity: 0;
    }
}

@keyframes float-top {
    0% {
        transform: translateY(-100%) translateX(-50%) scale(0.3);
        opacity: 0;
    }

    50% {
        transform: translateY(50%) translateX(50%) scale(1);
        opacity: 0.8;
    }

    100% {
        transform: translateY(200%) translateX(150%) scale(0.3);
        opacity: 0;
    }
}

@keyframes float-bottom {
    0% {
        transform: translateY(100%) translateX(50%) scale(0.3);
        opacity: 0;
    }

    50% {
        transform: translateY(-50%) translateX(-50%) scale(1);
        opacity: 0.8;
    }

    100% {
        transform: translateY(-200%) translateX(-150%) scale(0.3);
        opacity: 0;
    }
}
</style>