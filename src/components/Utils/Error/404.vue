<template>
  <div class="not-found-wrapper">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="clouds"></div>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="text-center bg-white p-5 rounded shadow-lg animated-content">
        <h1 class="display-1 fw-bold text-danger animated-404">404</h1>
        <p class="fs-3 animated-text"> <span class="text-danger">Opps!</span> 页面未找到</p>
        <p class="lead animated-text">
          抱歉，您访问的页面不存在
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以添加一些逻辑，例如记录 404 错误或进行其他处理
</script>

<style scoped>
.not-found-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stars,
.twinkling,
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.stars {
  background: transparent;
  z-index: 0;
}

.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 2px;
  height: 2px;
  box-shadow:
    0 0 4px #fff,
    2vw 4vh 4px #fff,
    -3vw -4vh 4px #fff,
    4vw -6vh 4px #fff,
    -2vw 3vh 4px #fff,
    6vw 7vh 4px #fff,
    -4vw -7vh 4px #fff,
    8vw 9vh 4px #fff,
    -6vw -9vh 4px #fff,
    10vw 11vh 4px #fff,
    -8vw -11vh 4px #fff,
    12vw 13vh 4px #fff,
    -10vw -13vh 4px #fff,
    14vw 15vh 4px #fff,
    -12vw -15vh 4px #fff,
    16vw 17vh 4px #fff,
    -14vw -17vh 4px #fff,
    18vw 19vh 4px #fff,
    -16vw -19vh 4px #fff,
    20vw 21vh 4px #fff;
  animation: space 10s linear infinite;
}

.twinkling {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%);
  z-index: 1;
  animation: twinkle 4s ease-in-out infinite;
}

.clouds {
  background: linear-gradient(45deg,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 75%,
      transparent);
  background-size: 100px 100px;
  z-index: 2;
  opacity: 0.3;
  animation: clouds 20s linear infinite;
}

@keyframes space {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100vh);
  }
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

@keyframes clouds {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
}

.animated-content {
  z-index: 3;
  animation: fadeInScale 1s ease-out forwards;
}

.animated-404 {
  animation: bounceIn 1s ease-out forwards;
}

.animated-text {
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animated-text:nth-of-type(1) {
  animation-delay: 0.5s;
}

.animated-text:nth-of-type(2) {
  animation-delay: 0.7s;
}

.animated-button {
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 1s;
  opacity: 0;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: hidden;
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    visibility: visible;
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>