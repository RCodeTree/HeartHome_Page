<template>
    <div class="service-container p-4">
        <div class="bubbles">
            <div class="bubble" v-for="n in 10" :key="n"></div>
        </div>
        <!-- 页面标题 -->
        <div class="page-header text-center mb-5">
            <h1 class="display-4 fw-bold text-gradient">心灵服务</h1>
            <p class="lead">为每一颗受伤的心灵提供温暖的港湾</p>
            <div class="header-underline mx-auto"></div>
        </div>

        <!-- 服务类型卡片 -->
        <div class="row g-4 mb-5">
            <div class="col-md-4" v-for="(service, index) in services" :key="index">
                <div class="service-card h-100">
                    <div class="card-icon mb-4">
                        <i :class="service.icon"></i>
                    </div>
                    <h3 class="card-title mb-3">{{ service.title }}</h3>
                    <p class="card-text">{{ service.description }}</p>
                </div>
            </div>
        </div>

        <!-- 服务流程 -->
        <div class="service-process mb-5">
            <h2 class="text-center mb-4">服务流程</h2>
            <div class="process-timeline">
                <div class="process-step" v-for="(step, index) in processSteps" :key="index">
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-content">
                        <h4>{{ step.title }}</h4>
                        <p>{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 联系我们 -->
        <div class="contact-section p-4 rounded">
            <h2 class="text-center mb-4">联系我们</h2>
            <div class="row">
                <div class="col-md-4 mb-3 mb-md-0">
                    <div class="contact-item">
                        <i class="fas fa-envelope contact-icon"></i>
                        <h5>邮箱</h5>
                        <p>support@xinlingstation.com</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0">
                    <div class="contact-item">
                        <i class="fas fa-phone-alt contact-icon"></i>
                        <h5>心理热线</h5>
                        <p>400-888-9999</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt contact-icon"></i>
                        <h5>地址</h5>
                        <p>北京市海淀区心灵驿站大厦</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 服务类型数据
const services = [
    {
        title: '心理咨询',
        icon: 'fas fa-heart',
        description: '提供专业的一对一心理咨询服务，帮助您缓解压力、调节情绪、解决心理困扰，重获内心平静与力量。'
    },
    {
        title: '情绪管理',
        icon: 'fas fa-brain',
        description: '通过科学的情绪管理技巧和方法，帮助您识别、理解并有效调控自己的情绪，提升心理韧性。'
    },
    {
        title: '社区互助',
        icon: 'fas fa-users',
        description: '加入我们温暖的互助社区，分享生活中的喜怒哀乐，与志同道合的朋友互相倾听、支持与鼓励。'
    }
]

// 服务流程步骤
const processSteps = [
    {
        title: '初次接触',
        description: '通过简单的心理测评和沟通，了解您的心理状态和需求，建立初步的信任关系。'
    },
    {
        title: '个性化方案',
        description: '根据您的具体情况，制定个性化的心理支持方案，包括咨询频率、方式和重点关注领域。'
    },
    {
        title: '持续陪伴',
        description: '专业心理咨询师将全程陪伴您的心理成长历程，提供及时的支持和引导。'
    },
    {
        title: '成长回顾',
        description: '定期回顾心理成长历程，巩固积极变化，并根据需要调整后续支持方案。'
    }
]

</script>

<style scoped>
/* 容器样式 */
.service-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 90px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    /* 自定义滚动条样式 */
    scrollbar-width: thin;
    scrollbar-color: #4a90e2 #f0f2f5;
    -ms-overflow-style: none;
}

/* Webkit浏览器的滚动条样式 */
.service-container::-webkit-scrollbar {
    width: 6px;
}

.service-container::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 3px;
}

.service-container::-webkit-scrollbar-thumb {
    background: #4a90e2;
    border-radius: 3px;
}

.service-container::-webkit-scrollbar-thumb:hover {
    background: #357dcb;
}

/* 响应式布局 */
/* 移动端样式优化 */
@media (max-width: 991.98px) {
    .service-container {
        height: calc(100vh - 120px);
        /* 增加底部导航栏的空间 */
        padding-bottom: 60px;
        /* 确保内容不被底部导航栏遮挡 */
    }
}



/* 页面标题样式 */
.page-header {
    padding: 2rem 0;
}

.text-gradient {
    background: linear-gradient(90deg, #4a90e2, #5cb85c);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.header-underline {
    height: 4px;
    width: 80px;
    background: linear-gradient(90deg, #4a90e2, #5cb85c);
    margin-top: 1rem;
    border-radius: 2px;
}

/* 服务卡片样式 */
.service-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.card-icon {
    font-size: 2.5rem;
    color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.service-card:hover .card-icon {
    background: #4a90e2;
    color: #fff;
    transform: rotateY(180deg);
}

.card-title {
    color: #333;
    font-weight: 600;
}

.card-text {
    color: #666;
    line-height: 1.6;
}

/* 服务流程样式 */
.service-process {
    padding: 2rem 0;
}

.process-timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
}

.process-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50px;
    width: 3px;
    background: linear-gradient(to bottom, #4a90e2, #5cb85c);
    border-radius: 5px;
}

.process-step {
    display: flex;
    margin-bottom: 2rem;
    position: relative;
}

.step-number {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4a90e2, #5cb85c);
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.step-content {
    margin-left: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    flex: 1;
}

.step-content h4 {
    margin-bottom: 0.5rem;
    color: #4a90e2;
}

/* 联系我们部分样式 */
.contact-section {
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.05), rgba(92, 184, 92, 0.05));
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.contact-item {
    text-align: center;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.contact-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.contact-icon {
    font-size: 2rem;
    color: #4a90e2;
    margin-bottom: 1rem;
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.service-card,
.process-step,
.contact-item {
    animation: fadeIn 0.6s ease-out forwards;
}

/* 气泡背景效果 */
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

/* 移动端优化 */
@media (max-width: 768px) {
    .page-header {
        padding: 1.5rem 0;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .service-card {
        padding: 1.5rem;
    }

    .card-icon {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 1.8rem;
    }

    .process-timeline::before {
        left: 30px;
    }

    .step-number {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }

    .step-content {
        margin-left: 1rem;
        padding: 1rem;
    }

    .contact-item {
        padding: 1rem;
    }

    .contact-icon {
        font-size: 1.5rem;
    }
}
</style>