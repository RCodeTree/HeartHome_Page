<template>
    <div class="message-container p-3" :class="{ 'container-expanded': isExpanded }">
        <!-- 批量操作区域 -->
        <div
            class="batch-operation-header sticky-top bg-white shadow-sm d-flex justify-content-between align-items-center mb-3">
            <div class="form-check d-flex align-items-center">
                <input class="form-check-input" type="checkbox" v-model="showCheckboxes">
                <label class="form-check-label me-5">选择</label>
                <input class="form-check-input" type="checkbox" v-model="allMessagesSelected"
                    :disabled="!showCheckboxes">
                <label class="form-check-label">全选</label>
            </div>
            <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="batchMarkAsRead"
                    :disabled="!hasSelected">标记已读</button>
                <button class="btn btn-outline-danger btn-sm" @click="batchDelete"
                    :disabled="!hasSelected">批量删除</button>
            </div>
        </div>

        <!-- 骨架屏 -->
        <div v-if="loading && messages.length === 0" class="skeleton-container">
            <div v-for="i in 10" :key="i" class="skeleton-item">
                <div class="skeleton-checkbox"></div>
                <div class="skeleton-content">
                    <div class="skeleton-name"></div>
                    <div class="skeleton-time"></div>
                </div>
                <div class="skeleton-avatar"></div>
            </div>
        </div>

        <!-- 消息列表 -->
        <div class="list-group">
            <div v-for="message in messages" :key="message.id"
                class="list-group-item list-group-item-action message-item"
                @contextmenu.prevent="showContextMenu($event, message)" @touchstart="handleTouchStart($event, message)"
                @touchend="handleTouchEnd">
                <!-- 消息内容 -->
                <div class="d-flex justify-content-between align-items-center position-relative">
                    <div class="form-check" v-show="showCheckboxes">
                        <input class="form-check-input" type="checkbox" v-model="message.selected">
                    </div>
                    <div class="d-flex align-items-center flex-grow-1 justify-content-end">
                        <div class="unread-dot" v-show="!message.isRead"></div>
                        <div class="message-content me-3">
                            <h6 class="mb-1">{{ message.nickname }}</h6>
                            <small class="text-muted">{{ formatTime(message.timestamp) }}</small>
                        </div>
                        <div class="message-avatar">
                            <img :src="message.avatar" :alt="message.nickname" class="rounded-circle" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 加载中提示 -->
        <div v-if="loading && messages.length > 0" class="text-center mt-3 mb-4">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">加载中...</span>
            </div>
            <span class="ms-2">加载中...</span>
        </div>

        <!-- 上下文菜单 -->
        <div v-if="showMenu" class="context-menu" :style="menuPosition">
            <div class="menu-item" @click="markAsRead(selectedMessage)">标记为已读</div>
            <div class="menu-item" @click="deleteMessage(selectedMessage)">删除消息</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

/** 
 * 消息列表数据
 */
const messages = ref([])
const loading = ref(true) // 加载状态
const page = ref(1) // 当前页码
const pageSize = 10 // 每页消息数量
const hasMoreMessages = ref(true) // 是否有更多消息

// 模拟用户头像数组
const avatarImages = [
    '/image/OIP-C (1).jpg',
    '/image/OIP-C (2).jpg',
    '/image/OIP-C (3).jpg',
    '/image/OIP-C (4).jpg',
    '/image/OIP-C (5).jpg',
    '/image/OIP-C (6).jpg',
    '/image/OIP-C (7).jpg',
    '/image/OIP-C (8).jpg',
    '/image/OIP-C (9).jpg',
    '/image/OIP-C (10).jpg'
]

// 模拟用户昵称数组
const nicknames = [
    '阳光男孩', '快乐精灵', '梦想家', '编程达人',
    '音乐发烧友', '旅行者', '美食家', '运动健将',
    '艺术家', '读书人', '摄影师', '设计师',
    '创意达人', '游戏玩家', '电影迷', '科技控',
    '文艺青年', '户外探险家', '宅家达人', '时尚达人'
]

// 模拟获取消息数据
const fetchMessages = async () => {
    try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500))

        // 生成随机消息数据
        const newMessages = Array(pageSize).fill().map((_, index) => ({
            id: messages.value.length + index + 1,
            nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
            avatar: avatarImages[Math.floor(Math.random() * avatarImages.length)],
            timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // 随机时间戳（最近7天内）
            isRead: Math.random() > 0.7, // 70%概率未读
            selected: false
        }))

        messages.value.push(...newMessages)
        hasMoreMessages.value = newMessages.length === pageSize
        loading.value = false
    } catch (error) {
        console.error('获取消息列表失败:', error)
        loading.value = false
    }
}

// 加载更多消息
const loadMoreMessages = async () => {
    if (loading.value || !hasMoreMessages.value) return

    loading.value = true
    page.value += 1
    await fetchMessages()
}

/** 
* 批量操作相关 
*/
const showCheckboxes = ref(false) // 控制列表项复选框的显示
const hasSelected = computed(() => messages.value.some(m => m.selected)) // 有选中的消息

// 计算属性，用于全选复选框
const allMessagesSelected = computed({
    get: () => messages.value.length > 0 && messages.value.every(m => m.selected),
    set: (value) => {
        messages.value.forEach(message => {
            // 只有在显示复选框时才响应全选操作
            if (showCheckboxes.value) {
                message.selected = value;
            }
        });
    }
});

// 批量标记为已读
const batchMarkAsRead = () => {
    messages.value.forEach(message => {
        if (message.selected) {
            message.isRead = true
            message.selected = false // 标记后取消选中
        }
    })
    // 不需要手动设置 allMessagesSelected，计算属性会自动更新
    // 如果希望操作后隐藏选择框，可以设置 showCheckboxes.value = false
}

// 批量删除
const batchDelete = () => {
    messages.value = messages.value.filter(message => !message.selected)
    // 不需要手动设置 allMessagesSelected，计算属性会自动更新
    // 如果希望操作后隐藏选择框，可以设置 showCheckboxes.value = false
}

/**
 * 时间处理
 */
// 时间戳
let timer = null

// 格式化时间显示
const formatTime = (timestamp) => {
    // 计算时间差并返回友好显示
    const now = Date.now() // 当前时间戳
    const diff = now - timestamp // 时间差（毫秒）
    const minutes = Math.floor(diff / 60000) // 分钟
    const hours = Math.floor(minutes / 60) // 小时
    const days = Math.floor(hours / 24) // 天数

    if (days > 0) return `${days}天前` // 超过一天
    if (hours > 0) return `${hours}小时前` // 超过一小时
    if (minutes > 0) return `${minutes}分钟前` // 超过一分钟
    return '刚刚' // 小于一分钟
}

// 每分钟更新一次时间
const updateTimes = () => {
    messages.value = [...messages.value] // 触发视图更新
}

/**
* 根据侧边栏状态变化调整消息列表伸缩状态
*/
// 侧边栏展开状态
const isExpanded = ref(false)

// 监听侧边栏状态变化事件
const handleSideNavChange = (event) => {
    if (event.detail && typeof event.detail.expanded === 'boolean') {
        isExpanded.value = event.detail.expanded
    }
}
// 监听滚动事件，实现滚动到底部自动加载更多
const handleScroll = () => {
    const container = document.querySelector('.message-container')
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    // 当滚动到距离底部100px时触发加载更多
    if (scrollHeight - scrollTop - clientHeight < 100 && !loading.value && hasMoreMessages.value) {
        loadMoreMessages()
    }
}

// 监听侧边栏状态变化事件
onMounted(() => {
    // 初始加载消息数据
    fetchMessages()

    // 设置定时器更新时间显示
    timer = setInterval(updateTimes, 60000) // 每分钟更新一次时间

    // 添加侧边栏状态变化事件监听
    window.addEventListener('sidenav-change', handleSideNavChange)

    // 添加滚动事件监听
    const container = document.querySelector('.message-container')
    if (container) {
        container.addEventListener('scroll', handleScroll)
    }

    // 添加点击事件监听关闭上下文菜单
    document.addEventListener('click', () => {
        showMenu.value = false
    })
})

// 组件卸载时清除定时器和事件监听
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
    }

    // 移除侧边栏状态变化事件监听
    window.removeEventListener('sidenav-change', handleSideNavChange)

    // 移除滚动事件监听
    const container = document.querySelector('.message-container')
    if (container) {
        container.removeEventListener('scroll', handleScroll)
    }

    // 移除点击事件监听
    document.removeEventListener('click', () => {
        showMenu.value = false
    })
})

/**
 * 上下文菜单相关
 */
const showMenu = ref(false) // 显示菜单
const menuPosition = ref({
    top: '0px',
    left: '0px'
})
const selectedMessage = ref(null) // 选中的消息
let touchTimer = null // 长按定时器

// 显示上下文菜单
const showContextMenu = (event, message) => {
    event.preventDefault()
    showMenu.value = true
    menuPosition.value = {
        top: `${event.clientY}px`,
        left: `${event.clientX}px`
    }
    selectedMessage.value = message
}

// 长按消息显示菜单
const handleTouchStart = (event, message) => {
    touchTimer = setTimeout(() => {
        showMenu.value = true
        const touch = event.touches[0]
        menuPosition.value = {
            top: `${touch.clientY}px`,
            left: `${touch.clientX}px`
        }
        selectedMessage.value = message
    }, 500) // 长按500ms触发
}

// 取消长按
const handleTouchEnd = () => {
    if (touchTimer) {
        clearTimeout(touchTimer)
    }
}

// 标记为已读
const markAsRead = (message) => {
    message.isRead = true
    showMenu.value = false
}

// 删除消息
const deleteMessage = (message) => {
    const index = messages.value.findIndex(m => m.id === message.id)
    if (index > -1) {
        messages.value.splice(index, 1)
    }
    showMenu.value = false
}

// 注意：点击其他地方关闭菜单的事件监听已移至主onMounted钩子中
</script>

<style scoped>
/* 
消息列表容器 
*/
.message-container {
    width: 100%;
    height: calc(100vh - 90px);
    overflow-y: auto;
    padding-bottom: 20px;
    transition: all 0.3s ease;
    /* 自定义滚动条样式 */
    scrollbar-width: thin;
    scrollbar-color: #1890ff #f0f2f5;
    -ms-overflow-style: none;
}

/* 
批量操作区域 
*/
.batch-operation-header {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    z-index: 1000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Webkit浏览器的滚动条样式 */
.message-container::-webkit-scrollbar {
    width: 6px;
}

.message-container::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 3px;
}

.message-container::-webkit-scrollbar-thumb {
    background: #1890ff;
    border-radius: 3px;
}

.message-container::-webkit-scrollbar-thumb:hover {
    background: #40a9ff;
}

/* 
响应式布局 
*/
/* 移动端样式优化 */
@media (max-width: 991.98px) {
    .message-container {
        height: calc(100vh - 120px);
        /* 增加底部导航栏的空间 */
        padding-bottom: 60px;
        /* 确保内容不被底部导航栏遮挡 */
    }
}

/* 响应侧边栏展开状态 */
@media (min-width: 992px) {
    .message-container {
        margin-left: 20px;
        width: calc(100% - 20px);
    }

    .message-container.container-expanded {
        margin-left: 250px;
        width: calc(100% - 250px);
    }
}

/*
消息列表项
*/
.message-item {
    transition: all 0.3s ease;
    border: none;
    margin-bottom: 10px;
    background-color: #f8f9fa;
}

.message-item:hover {
    transform: scale(1.01);
    background-color: #e9ecef;
}

.message-avatar img {
    width: 40px;
    height: 40px;
    object-fit: cover;
}

/* 移动端消息项样式优化 */
@media (max-width: 991.98px) {
    .message-item {
        padding: 8px;
        margin-bottom: 8px;
    }

    .message-avatar img {
        width: 35px;
        height: 35px;
    }

    .message-content h6 {
        font-size: 0.9rem;
    }

    .message-content small {
        font-size: 0.75rem;
    }
}

.message-content {
    text-align: right;
}

/* 
未读消息提示红点 
*/
.unread-dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #ff4d4f;
    border-radius: 50%;
}

/*
上下文菜单
*/
.context-menu {
    position: fixed;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.menu-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

/* 移动端上下文菜单优化 */
@media (max-width: 991.98px) {
    .context-menu {
        min-width: 120px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .menu-item {
        padding: 12px 16px;
        /* 增大点击区域 */
        font-size: 0.9rem;
    }
}

/*
骨架屏样式
*/
.skeleton-container {
    padding: 0 0.5rem;
}

.skeleton-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-bottom: 10px;
    background-color: #f8f9fa;
    border-radius: 0.25rem;
    animation: pulse 1.5s infinite;
}

.skeleton-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #e9ecef;
    margin-right: 1rem;
}

.skeleton-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9ecef;
}

.skeleton-content {
    flex: 1;
    margin-right: 1rem;
    text-align: right;
}

.skeleton-name {
    height: 18px;
    width: 120px;
    background-color: #e9ecef;
    border-radius: 4px;
    margin-bottom: 8px;
    margin-left: auto;
}

.skeleton-time {
    height: 14px;
    width: 80px;
    background-color: #e9ecef;
    border-radius: 4px;
    margin-left: auto;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

/*
加载更多按钮
*/
.load-more {
    text-align: center;
    margin-bottom: 1.5rem;
}

.load-more-btn {
    padding: 0.375rem 1rem;
    transition: all 0.3s ease;
}

.load-more-btn:hover {
    transform: translateY(-2px);
}
</style>