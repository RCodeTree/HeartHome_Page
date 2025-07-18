<template>
    <div class="friend-list-container" ref="scrollContainer">
        <div class="friend-header sticky-top bg-white shadow-sm">
            <h2 class="friend-list-title">心友</h2>

            <!-- 添加好友按钮和搜索框 -->
            <div class="friend-actions">
                <div v-show="!isSearching" class="add-friend-btn" @click="toggleSearch" title="添加好友">
                    <i class="add-icon"></i>
                </div>
                <div v-show="isSearching" class="search-container">
                    <input type="text" v-model="searchQuery" class="search-input" placeholder="搜索好友..."
                        @keyup.enter="searchFriends" ref="searchInput">
                    <button class="search-btn" @click="searchFriends">搜索</button>
                    <button class="cancel-btn" @click="toggleSearch">取消</button>
                </div>
            </div>
        </div>

        <!-- 骨架屏 -->
        <div v-if="loading" class="skeleton-container">
            <div v-for="i in 10" :key="i" class="skeleton-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                    <div class="skeleton-name"></div>
                    <div class="skeleton-status"></div>
                </div>
            </div>
        </div>

        <!-- 好友列表 -->
        <transition-group name="friend-list" tag="div" class="friends-container">
            <div v-for="friend in displayedFriends" :key="friend.id" class="friend-item" @click="selectFriend(friend)">
                <img :src="friend.avatar" :alt="friend.name" class="friend-avatar">
                <div class="friend-info">
                    <span class="friend-name">{{ friend.name }}</span>
                    <span class="friend-status-time">
                        <span class="friend-status" :class="friend.online ? 'online' : 'offline'">
                            {{ friend.online ? '在线' : formatLastActiveTime(friend.lastActive) }}
                        </span>
                    </span>
                </div>
                </img>
            </div>
        </transition-group>

        <!-- 加载中提示 -->
        <div>
            <div v-if="loadingMore && friends.length > 0" class="text-center mt-3 mb-4">
                <div class="spinner-border spinner-border-sm text-primary" role="status">
                    <span class="visually-hidden">加载中...</span>
                </div>
                <span class="ms-2">加载中...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const friends = ref([])
const loading = ref(true)
const loadingMore = ref(true)
const page = ref(1)
const pageSize = 10
const hasMoreFriends = ref(true)
const isSearching = ref(false) // 是否处于搜索状态
const searchQuery = ref('') // 搜索关键词
const scrollContainer = ref(null) // 滚动容器的引用

const displayedFriends = ref(friends.value)

// 模拟好友头像数组
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

// 模拟好友昵称数组
const nicknames = [
    '阳光男孩', '快乐精灵', '梦想家', '编程达人',
    '音乐发烧友', '旅行者', '美食家', '运动健将',
    '艺术家', '读书人', '摄影师', '设计师',
    '创意达人', '游戏玩家', '电影迷', '科技控',
    '文艺青年', '户外探险家', '宅家达人', '时尚达人'
]

// 添加时间格式化函数
const formatLastActiveTime = (isoTimestamp) => {
    if (!isoTimestamp) return '离线' // 处理空时间戳

    const now = new Date()
    const lastActiveDate = new Date(isoTimestamp)
    const diffInSeconds = Math.floor((now - lastActiveDate) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 5) {
        return '刚刚在线' // 5分钟内都算刚刚在线
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}分钟前`
    } else if (diffInHours < 24 && now.getDate() === lastActiveDate.getDate()) {
        // 当天
        return `${diffInHours}小时前`
    } else if (diffInDays === 1 || (diffInHours < 48 && now.getDate() - lastActiveDate.getDate() === 1)) {
        // 昨天
        const hours = lastActiveDate.getHours().toString().padStart(2, '0')
        const minutes = lastActiveDate.getMinutes().toString().padStart(2, '0')
        return `昨天 ${hours}:${minutes}`
    } else if (diffInDays < 7) {
        // 7天内
        return `${diffInDays}天前`
    } else {
        // 更早时间，显示月日
        const month = (lastActiveDate.getMonth() + 1).toString().padStart(2, '0')
        const day = lastActiveDate.getDate().toString().padStart(2, '0')
        return `${month}月${day}日` // 可以选择是否显示时分
    }
}


// 模拟API请求
const fetchFriends = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        const newFriends = Array(10).fill().map((_, index) => ({
            id: friends.value.length + index + 1,
            name: nicknames[(friends.value.length + index) % nicknames.length],
            avatar: avatarImages[(friends.value.length + index) % avatarImages.length],
            online: Math.random() > 0.8, // 降低在线概率以便测试离线时间
            lastActive: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
            status: Math.random() > 0.7 ? '忙碌中' : '空闲'
        }))

        friends.value.push(...newFriends)
        hasMoreFriends.value = newFriends.length === pageSize
        loading.value = false
        loadingMore.value = false
    } catch (error) {
        console.error('获取好友列表失败:', error)
        loading.value = false
        loadingMore.value = false
    }
}

// 加载更多好友
const loadMoreFriends = async () => {
    if (loadingMore.value || !hasMoreFriends.value) return

    loadingMore.value = true
    page.value += 1
    await fetchFriends()
}

// 监听滚动事件，实现滚动到底部自动加载更多好友，当滚动到距离底部100px时触发加载更多
const handleScroll = () => {
    if (!scrollContainer.value) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loadingMore.value && hasMoreFriends.value) {
        loadMoreFriends();
    }
};




const selectFriend = (friend) => {
    // 处理好友选择逻辑
    console.log('选择的好友:', friend)
}

// 切换搜索状态
const toggleSearch = async () => {
    isSearching.value = !isSearching.value
    searchQuery.value = ''

    if (isSearching.value) {
        // 当切换到搜索状态时，等待DOM更新后聚焦输入框
        await nextTick()
        if (document.querySelector('.search-input')) {
            document.querySelector('.search-input').focus()
        }
    } else {
        // 退出搜索状态时，恢复显示所有好友
        displayedFriends.value = friends.value
    }
}

// 搜索好友
const searchFriends = () => {
    if (!searchQuery.value.trim()) {
        displayedFriends.value = friends.value
        return
    }

    const query = searchQuery.value.toLowerCase()
    displayedFriends.value = friends.value.filter(friend =>
        friend.name.toLowerCase().includes(query)
    )
}

onMounted(() => {
    fetchFriends()

    nextTick(() => {
        if (scrollContainer.value) {
            scrollContainer.value.addEventListener('scroll', handleScroll)
        }
    })
})

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
})
</script>

<style scoped>
.friend-list-container {
    width: 100%;
    margin: 0;
    height: calc(100vh - 60px);
    overflow-y: auto;
    position: relative;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    transition: all 0.3s ease;
    padding: 0;
}

.friend-list-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}





.friend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.friend-list-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 0;
}

.friend-actions {
    display: flex;
    align-items: center;
}

.add-friend-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ff4757;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
}

.add-friend-btn:hover {
    background: #ff6b81;
    transform: scale(1.05);
}

.add-icon {
    position: relative;
    width: 24px;
    height: 24px;
}

.add-icon::before {
    content: '♥';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: white;
}

.add-icon::after {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
}

.search-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.search-input {
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    outline: none;
    width: 180px;
    font-size: 0.875rem;
}

.search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.search-btn,
.cancel-btn {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s ease;
}

.search-btn {
    background: #3b82f6;
    color: white;
}

.search-btn:hover {
    background: #2563eb;
}

.cancel-btn {
    background: #e2e8f0;
    color: #4b5563;
}

.cancel-btn:hover {
    background: #cbd5e1;
}

/* 骨架屏样式 */
.skeleton-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skeleton-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    animation: pulse 1.5s infinite;
}

.skeleton-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e9ecef;
}

.skeleton-content {
    margin-left: 1rem;
    flex: 1;
}

.skeleton-name {
    height: 20px;
    width: 150px;
    background: #e9ecef;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.skeleton-status {
    height: 16px;
    width: 60px;
    background: #e9ecef;
    border-radius: 4px;
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

/* 好友列表样式 */
.friends-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    padding-top: 0.5rem;
}

.friend-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.friend-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.friend-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.friend-info {
    margin-left: 1rem;
    flex: 1;
    overflow: hidden;
}

.friend-name {
    display: block;
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.friend-status-time {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    color: #9ca3af;
}

.friend-status {
    display: flex;
    align-items: center;
}

.friend-status::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background: #9ca3af;
}

.friend-status.online {
    color: #10b981;
}

.friend-status.online::before {
    background: #10b981;
}

/* 加载更多按钮 */
.load-more {
    text-align: center;
    margin: 1rem 0 2rem;
    padding-bottom: 2rem;
}

@media (max-width: 640px) {
    .load-more {
        margin-bottom: 4rem;
        padding-bottom: 3rem;
    }
}

.load-more-btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.load-more-btn:hover {
    background: #2563eb;
}

/* 列表动画 */
.friend-list-enter-active,
.friend-list-leave-active {
    transition: all 0.3s ease;
}

.friend-list-enter-from,
.friend-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

/* 移动端适配 */
@media (max-width: 640px) {
    .friend-list-container {
        padding: 0.5rem;
    }

    .friend-item {
        padding: 0.75rem;
    }

    .friend-avatar {
        width: 32px;
        height: 32px;
    }

    .friend-name {
        font-size: 0.875rem;
    }

    .friend-status-time {
        font-size: 0.75rem;
    }

    .friend-status::before {
        width: 6px;
        height: 6px;
        margin-right: 0.3rem;
    }

    .friend-header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .friend-list-title {
        font-size: 1.25rem;
    }

    .add-friend-btn {
        width: 30px;
        height: 30px;
    }

    .add-icon {
        font-size: 1.25rem;
    }

    .search-container {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .search-input {
        width: 120px;
        padding: 0.35rem;
        font-size: 0.75rem;
    }

    .search-btn,
    .cancel-btn {
        padding: 0.35rem 0.5rem;
        font-size: 0.7rem;
    }
}
</style>