<template>
    <ToastNotification ref="toastNotificationForFriend" />
    <div class="friend-list-container" ref="scrollContainer">
        <div class="friend-header sticky top-0 bg-white shadow-sm z-10 p-4 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-800 mb-3">心友</h2>

            <!-- 添加好友按钮和搜索框 -->
            <div class="friend-actions flex items-center justify-between">
                <div v-show="!isSearching" class="min-w-[44px] min-h-[44px] w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200" @click="toggleSearch" title="添加好友">
                    <i class="text-white text-lg font-bold">+</i>
                </div>
                <div v-show="isSearching" class="flex items-center space-x-2 flex-1">
                    <input type="text" v-model="searchQuery" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="搜索好友..."
                        @keyup.enter="searchFriends" ref="searchInput">
                    <button class="min-h-[44px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200" @click="searchFriends">搜索</button>
                    <button class="min-h-[44px] px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200" @click="toggleSearch">取消</button>
                </div>
            </div>
        </div>

        <!-- 骨架屏 -->
        <div v-if="loading" class="p-4 space-y-4">
            <div v-for="i in 10" :key="i" class="flex items-center space-x-3 p-3 animate-pulse">
                <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>

        <!-- 好友列表 -->
        <transition-group name="friend-list" tag="div" class="p-4 space-y-2">
            <div v-for="friend in displayedFriends" :key="friend.username" class="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
                @click="selectFriend(friend)">
                <img :src="friend.avatarUrl" :alt="friend.username" class="w-12 h-12 rounded-full object-cover border-2 border-gray-200">
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 truncate">{{ friend.username }}</div>
                    <div class="text-sm" :class="friend.status == 1 ? 'text-green-600' : 'text-gray-500'">
                        {{ friend.status == 1 ? '在线' : formatLastActiveTime(Date.now()) }}
                    </div>
                </div>
            </div>
        </transition-group>

        <!-- 加载中提示 -->
        <div v-if="loadingMore && friends.length > 0" class="text-center py-4">
            <div class="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" role="status">
                <span class="sr-only">加载中...</span>
            </div>
            <span class="ml-2 text-gray-600">加载中...</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { loginStore } from '../../stores/HeartHomeStore'
import { GetUserFriendListService } from '../../Service/User/UserService'
import ToastNotification from '../../components/Animations/ToastNotification.vue'


const friends = ref([])
const loading = ref(true)
const loadingMore = ref(true)
const page = ref(1)
const pageSize = 10
const hasMoreFriends = ref(true)
const isSearching = ref(false) // 是否处于搜索状态
const searchQuery = ref('') // 搜索关键词
const scrollContainer = ref(null) // 滚动容器的引用
const store = loginStore()
const displayedFriends = ref(friends.value)

// 吐司消息
const toastNotificationForFriend = ref(null)
const showToast = (message, isSuccess) => {
    if (toastNotificationForFriend.value) {
        toastNotificationForFriend.value.showToast(message, isSuccess)
    }
}

const handleToastMessage = (message) => {
    const isSuccess = message.includes('成功') ? true : false
    showToast(message, isSuccess)
}

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


// 加载更多好友 --- 类似分页加载
const loadMoreFriends = async () => {
    if (loadingMore.value || !hasMoreFriends.value) return

    loadingMore.value = true

    try {
        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 如果没有更多数据，设置hasMoreFriends为false
        hasMoreFriends.value = false

        page.value += 1
    } catch (error) {
        console.error('加载更多好友失败:', error)
    } finally {
        loadingMore.value = false
    }
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
        friend.username.toLowerCase().includes(query)
    )
}



onMounted(async () => {
    // 等待DOM更新完成后执行
    nextTick(() => {
        if (scrollContainer.value) {
            scrollContainer.value.addEventListener('scroll', handleScroll)
        }
    })

    try {
        /*
        调用API
        */
        // 获取用户好友列表
        const FriendListResponse = await GetUserFriendListService(store.currentUser.username)
        if (FriendListResponse.data.code === 200) {
            friends.value = FriendListResponse.data.data
            displayedFriends.value = friends.value

            // 如果返回的数据少于pageSize，说明没有更多数据了
            if (friends.value.length < pageSize) {
                hasMoreFriends.value = false
            }

            // 成功提醒
            handleToastMessage(FriendListResponse.data.msg)
        } else {
            // 失败提醒
            handleToastMessage(FriendListResponse.data.msg)
        }

    } catch (error) {
        // bug提醒 --- 要么程序有问题，要么服务器停了
        handleToastMessage('似乎出现了不可预知的bug')
    } finally {
        loading.value = false
        loadingMore.value = false
    }
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
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
    transition: all 0.3s ease;
    padding: 0;
}

.friend-list-container::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
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