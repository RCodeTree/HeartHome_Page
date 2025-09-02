<template>
    <div class="w-full flex flex-col lg:pl-4 content-wrapper" :class="{ 'container-expanded': isExpanded }">
        <div class="content-area overflow-auto flex-grow">
            <!-- 用户信息卡片 -->
            <div class="bg-white bg-opacity-90 rounded-2xl shadow-lg p-4 sm:p-6 my-4 relative">
                <button @click="logout"
                    class="absolute top-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2 min-w-[44px] min-h-[44px]">
                    <i class="text-sm">→</i> <span>退出登录</span>
                </button>
                <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div class="flex-shrink-0 text-center">
                        <div class="mb-3 md:mb-0">
                            <img v-lazy="userInfo?.avatarUrl"
                                class="w-24 h-24 rounded-full object-cover border-4 border-blue-200" alt="用户头像">
                        </div>
                    </div>
                    <div class="flex-1 text-center md:text-left">
                        <h2 class="text-2xl font-bold text-blue-600 mb-2">{{ userInfo?.username }}</h2>
                        <p class="text-gray-600 mb-2 flex items-center justify-center md:justify-start">
                            <i class="mr-1">📍</i>{{ userInfo?.address || '心友很神秘获取不到地址🤡' }}
                        </p>
                        <p class="text-gray-600 mb-3 flex items-center justify-center md:justify-start">
                            <i class="mr-1">📅</i>加入于 {{ userInfo?.createTime }}
                        </p>
                        <div class="flex flex-wrap justify-center md:justify-start space-x-6 mb-3">
                            <div class="text-center">
                                <div class="text-xl font-bold text-gray-800">{{ userInfo?.worksCount }}</div>
                                <div class="text-sm text-gray-600">作品</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold text-gray-800">{{ userInfo?.fansCount }}</div>
                                <div class="text-sm text-gray-600">粉丝</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold text-gray-800">{{ userInfo?.followsCount }}</div>
                                <div class="text-sm text-gray-600">关注</div>
                            </div>
                        </div>
                        <p class="text-gray-700 leading-relaxed">{{ userInfo?.personalDescription || '该心友很懒什么都没有写' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- 用户作品标签页 -->
            <div class="bg-white bg-opacity-90 rounded-2xl shadow-lg p-4 my-4">
                <div class="overflow-x-auto">
                    <div class="flex space-x-1 mb-4 border-b border-gray-200" role="tablist">
                        <button
                            class="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50 rounded-t-lg min-h-[44px]"
                            id="all-tab" data-bs-toggle="tab" data-bs-target="#all-works" type="button" role="tab"
                            aria-controls="all-works" aria-selected="true">
                            心作
                        </button>
                        <button
                            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-t-lg transition-colors duration-200 min-h-[44px]"
                            id="articles-tab" data-bs-toggle="tab" data-bs-target="#articles" type="button" role="tab"
                            aria-controls="articles" aria-selected="false">
                            心理文章
                        </button>
                        <button
                            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-t-lg transition-colors duration-200 min-h-[44px]"
                            id="photos-tab" data-bs-toggle="tab" data-bs-target="#photos" type="button" role="tab"
                            aria-controls="photos" aria-selected="false">
                            治愈图片
                        </button>
                    </div>
                </div>

                <div id="worksTabContent">
                    <!-- 心作 -->
                    <div class="tab-pane fade show active" id="all-works" role="tabpanel" aria-labelledby="all-tab">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="allWorks.length > 0">
                            <div v-for="(work, index) in displayedWorks" :key="index">
                                <div
                                    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                                    <img v-lazy="work.imageUrl" class="w-full h-48 object-cover" :alt="work.title">
                                    <div class="p-4 flex-1 flex flex-col">
                                        <h5 class="text-lg font-semibold text-gray-800 mb-2">{{ work.title }}</h5>
                                        <p class="text-gray-600 text-sm mb-4 flex-1">{{ work.shortDesc }}</p>
                                        <div class="flex justify-between items-center text-sm">
                                            <span class="text-gray-500">{{ work.createTime.slice(0, 10) }}</span>
                                            <div class="flex space-x-3 text-gray-500">
                                                <span class="flex items-center space-x-1">
                                                    <i>❤️</i> <span>{{ work.likesCount }}</span>
                                                </span>
                                                <span class="flex items-center space-x-1">
                                                    <i>💬</i> <span>{{ work.commentsCount }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-6" v-if="hasMoreWorks">
                            <button
                                class="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                                @click="loadMoreWorks" :disabled="isLoading">
                                <span v-if="isLoading"
                                    class="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"
                                    role="status"></span>
                                {{ isLoading ? '加载中...' : '加载更多' }}
                            </button>
                        </div>
                        <div class="text-center py-5" v-if="!allWorks || allWorks.length === 0">
                            <InboxIcon class="w-24 h-24 mx-auto text-gray-400" />
                            <p class="mt-3 text-gray-500">暂无作品</p>
                        </div>
                    </div>

                    <!-- 心理文章 -->
                    <div class="tab-pane fade" id="articles" role="tabpanel" aria-labelledby="articles-tab">
                        <div class="row row-cols-1 row-cols-md-2 g-4" v-if="articles && articles.length > 0">
                            <div class="col" v-for="(article, index) in articles" :key="index">
                                <div class="card h-100 article-card">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ article.title }}</h5>
                                        <p class="card-text">{{ article.shortDesc }}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted">{{ article.createTime.slice(0, 10) }}</small>
                                            <div>
                                                <span class="me-2">
                                                    <HeartIcon class="w-4 h-4 inline" /> {{ article.likesCount
                                                    }}
                                                </span>
                                                <span>
                                                    <ChatBubbleLeftIcon class="w-4 h-4 inline" /> {{
                                                    article.commentsCount }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center py-5" v-if="!articles || articles.length === 0">
                            <DocumentTextIcon class="w-24 h-24 mx-auto text-gray-400" />
                            <p class="mt-3 text-gray-500">暂无心理文章</p>
                        </div>
                    </div>

                    <!-- 治愈图片 -->
                    <div class="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab">
                        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3" v-if="photos && photos.length > 0">
                            <div class="col" v-for="(photo, index) in photos" :key="index">
                                <div class="card h-100 photo-card">
                                    <img v-lazy="photo.imageUrl" class="card-img-top photo-image" :alt="photo.title">
                                    <div class="card-body p-2">
                                        <p class="card-text small mb-1">{{ photo.title }}</p>
                                        <small class="text-muted photo-date">{{ photo.createTime.slice(0, 10) }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center py-5" v-if="!photos || photos.length === 0">
                            <PhotoIcon class="w-24 h-24 mx-auto text-gray-400" />
                            <p class="mt-3 text-gray-500">暂无治愈图片</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { loginStore } from '../../stores/HeartHomeStore'
import { useRouter } from 'vue-router' // 导入 useRouter
import { UserInfoService } from '../../Service/User/UserService'
import { UserWorksService } from '../../Service/Works/WorksService'
import { UserEssaysService } from '../../Service/Works/WorksService'
import { UserPhotosService } from '../../Service/Works/WorksService'
import { vLazy } from '@/directives/lazy.js'
// 移除本地ToastNotification导入，使用全局实例
import { InboxIcon, HeartIcon, ChatBubbleLeftIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/vue/24/solid'




/*
 设置全局登录状态
 */
const store = loginStore()
const router = useRouter() // 获取路由实例

/* 
 定义用户信息
*/
const username = computed(() => store.currentUser?.username || '访客') // 获取Pinia持久化数据查询用户信息
let userInfo = ref(null)

/*
 Toast 通知引用
 */
// 移除本地toast引用，使用全局事件

// 退出登录方法
const logout = () => {
    store.removeStore()
    router.replace('/login') // 重定向到登录页面
}


// 作品(包含图片、标题、文字)
const allWorks = ref([])

// 作品(包含标题、文字)
const articles = ref([])

// 作品(包含图片)
const photos = ref([])

// 分页加载逻辑
const itemsPerPage = 3
const currentPage = ref(1)
const isLoading = ref(false)

const displayedWorks = computed(() => {
    return allWorks.value.slice(0, currentPage.value * itemsPerPage)
})

const hasMoreWorks = computed(() => {
    return displayedWorks.value.length < allWorks.value.length
})

const loadMoreWorks = async () => {
    if (hasMoreWorks.value && !isLoading.value) {
        isLoading.value = true
        // 模拟异步加载
        await new Promise(resolve => setTimeout(resolve, 800))
        currentPage.value++
        isLoading.value = false
    }
}

// 组件挂载时的操作
onMounted(async () => {
    // 初始化加载更多按钮
    const loadMoreBtn = document.querySelector('.load-more-btn')
    if (loadMoreBtn && window.IntersectionObserver) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && hasMoreWorks.value) {
                        loadMoreWorks()
                    }
                })
            },
            { threshold: 0.5 }
        )
        observer.observe(loadMoreBtn)
    }

    // 添加侧边栏状态变化事件监听
    window.addEventListener('sidenav-change', handleSideNavChange)

    /*
     调用API
     */
    // 获取用户信息
    const UserInfoResponse = await UserInfoService(username.value)
    userInfo.value = UserInfoResponse.data.data
    // 检查用户信息是否过期
    if (UserInfoResponse.data.code === 401 || !userInfo.value || userInfo.value === 'undefined') {
        // 显示错误提示
        // 使用全局toast事件
        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: { message: `用户${UserInfoResponse.data.msg}，获取用户信息失败，3秒后自动跳转`, type: 'error' }
        }))

        // 做三秒延时
        setTimeout(() => {
            store.removeStore('userInfo') // 移除本地存储的用户信息
            router.replace({ name: 'SignIn' }) // 跳转到登录页
        }, 3000)
    }

    // 获取用户作品
    const WorksResponse = await UserWorksService(username.value)
    allWorks.value = WorksResponse.data.data

    // 获取用户文章
    const EssaysResponse = await UserEssaysService(username.value)
    articles.value = EssaysResponse.data.data

    // 获取用户图片
    const PhotosResponse = await UserPhotosService(username.value)
    photos.value = PhotosResponse.data.data
})
// 侧边栏展开状态
const isExpanded = ref(false)

// 监听侧边栏状态变化事件
const handleSideNavChange = (event) => {
    if (event.detail && typeof event.detail.expanded === 'boolean') {
        isExpanded.value = event.detail.expanded
    }
}

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
    // 移除侧边栏状态变化事件监听
    window.removeEventListener('sidenav-change', handleSideNavChange)
})
</script>

<style scoped>
.content-wrapper {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    padding-bottom: 20px;
    transition: all 0.3s ease;
}

.content-area {
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #1890ff #f0f2f5;
    -ms-overflow-style: none;
}

.content-area::-webkit-scrollbar {
    display: none;
}

/* 用户头像样式 */
.user-avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 5px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.user-avatar:hover {
    transform: scale(1.05);
}

/* 用户统计数据样式 */
.user-stats {
    display: flex;
    gap: 1.5rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-weight: bold;
    font-size: 1.2rem;
    color: #4a90e2;
}

.stat-label {
    font-size: 0.9rem;
    color: #6c757d;
}

/* 用户简介样式 */
.user-bio {
    font-style: italic;
    color: #495057;
    line-height: 1.6;
    border-left: 3px solid #4a90e2;
    padding-left: 1rem;
    margin-top: 0.5rem;
}

/* 作品卡片样式 */
.work-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
}

.work-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.logout-btn {
    z-index: 10;
    font-size: 0.9rem;
    padding: 8px 15px;
    border-radius: 20px;
    transition: all 0.3s ease;
    background-color: #dc3545;
    /* 默认红色 */
    border-color: #dc3545;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logout-btn:hover {
    background-color: #c82333;
    /* 悬停深红色 */
    border-color: #bd2130;
    transform: scale(1.05) rotate(2deg);
    /* 放大并轻微旋转 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.logout-btn:active {
    transform: scale(0.95);
    /* 点击缩小 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-container {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.8), 0 0 0 8px rgba(0, 123, 255, 0.3);
    /* 多层边框效果 */
    transition: all 0.3s ease;
}

.user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.avatar-container:hover .user-avatar {
    transform: scale(1.05);
}

.user-stats .stat-item {
    text-align: center;
}

.user-stats .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
}

.user-stats .stat-label {
    font-size: 0.9rem;
    color: #6c757d;
}

.user-bio {
    font-size: 0.95rem;
    color: #495057;
    line-height: 1.6;
}

.works-container {
    background: linear-gradient(135deg, #ffffff, #f1f3f5);
    /* 渐变背景 */
    border: none;
    transition: all 0.3s ease;
}

.works-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.nav-tabs .nav-link {
    color: #6c757d;
    border: none;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.nav-tabs .nav-link.active {
    color: #007bff;
    border-bottom-color: #007bff;
    background-color: transparent;
}

.nav-tabs .nav-link:hover {
    border-color: transparent transparent #007bff;
}

.work-card,
.article-card,
.photo-card {
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.work-card:hover,
.article-card:hover,
.photo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.work-image,
.photo-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #343a40;
}

.card-text {
    font-size: 0.9rem;
    color: #6c757d;
}

.load-more-btn {
    border-radius: 20px;
    padding: 10px 30px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.load-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo-card .card-body {
    padding: 10px;
}

.photo-card .card-text {
    font-size: 0.85rem;
}

.photo-date {
    font-size: 0.75rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .user-profile-card {
        padding: 20px;
    }

    .avatar-container {
        width: 100px;
        height: 100px;
    }

    .user-stats .stat-value {
        font-size: 1.2rem;
    }

    .user-stats .stat-label {
        font-size: 0.8rem;
    }

    .nav-tabs .nav-link {
        font-size: 0.9rem;
    }

    /* 移动端退出登录按钮优化 */
    .logout-btn {
        font-size: 0.8rem;
        padding: 6px 12px;
        border-radius: 15px;
        top: 10px;
        right: 10px;
        min-width: auto;
        white-space: nowrap;
    }

    .logout-btn:hover {
        transform: scale(1.02);
        /* 移动端减少旋转效果 */
    }
}

@media (max-width: 576px) {
    .user-profile-card {
        padding: 15px;
        position: relative;
    }

    .user-stats {
        justify-content: center;
    }

    .stat-item {
        margin: 0 10px;
    }

    .nav-tabs {
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .nav-tabs::-webkit-scrollbar {
        display: none;
    }

    /* 小屏幕设备退出登录按钮进一步优化 */
    .logout-btn {
        font-size: 0.75rem;
        padding: 5px 10px;
        border-radius: 12px;
        top: 8px;
        right: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(5px);
        background-color: rgba(220, 53, 69, 0.9);
        border: 1px solid rgba(220, 53, 69, 0.8);
    }

    .logout-btn:hover {
        background-color: rgba(200, 35, 51, 0.95);
        border-color: rgba(189, 33, 48, 0.9);
        transform: scale(1.05);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    .logout-btn:active {
        transform: scale(0.98);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    /* 确保按钮在小屏幕上有足够的触摸区域 */
    .logout-btn {
        min-height: 32px;
        min-width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }

    .logout-btn i {
        font-size: 0.8rem;
    }
}
</style>