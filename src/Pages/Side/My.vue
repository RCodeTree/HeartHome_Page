<template>
    <div class="w-full h-full flex flex-col lg:pl-4 content-wrapper" :class="{ 'container-expanded': isExpanded }">
        <div class="content-area h-full flex flex-col overflow-hidden">
            <!-- 页面加载状态 -->
            <div v-if="pageLoading" class="loading-container">
                <div class="animate-pulse space-y-4">
                    <!-- 用户信息骨架屏 -->
                    <div class="bg-white bg-opacity-90 rounded-2xl shadow-lg p-4 sm:p-6 my-4">
                        <div
                            class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                            <div class="flex-shrink-0">
                                <div class="w-24 h-24 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="flex-1 space-y-3">
                                <div class="h-6 bg-gray-300 rounded w-1/3"></div>
                                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div class="flex space-x-6">
                                    <div class="h-8 bg-gray-300 rounded w-16"></div>
                                    <div class="h-8 bg-gray-300 rounded w-16"></div>
                                    <div class="h-8 bg-gray-300 rounded w-16"></div>
                                </div>
                                <div class="h-4 bg-gray-300 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                    <!-- 作品区域骨架屏 -->
                    <div class="bg-white bg-opacity-90 rounded-2xl shadow-lg p-4 my-4">
                        <div class="flex space-x-1 mb-4">
                            <div class="h-10 bg-gray-300 rounded w-20"></div>
                            <div class="h-10 bg-gray-300 rounded w-24"></div>
                            <div class="h-10 bg-gray-300 rounded w-24"></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden">
                                <div class="w-full h-48 bg-gray-300"></div>
                                <div class="p-4 space-y-2">
                                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div class="h-3 bg-gray-300 rounded w-full"></div>
                                    <div class="h-3 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 用户信息卡片 -->
            <div v-else
                class="user-info-card bg-white bg-opacity-90 rounded-2xl shadow-lg my-4 relative overflow-hidden"
                :class="{ 'fade-in': userInfoLoaded }">
                <!-- 移动端专用布局 -->
                <div class="mobile-profile-layout md:hidden">
                    <!-- 退出登录按钮 -->
                    <div class="absolute top-3 right-3 z-10">
                        <button @click="logout"
                            class="px-3 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 flex items-center space-x-1 text-xs shadow-lg">
                            <i class="text-xs">→</i>
                            <span>退出登录</span>
                        </button>
                    </div>
                    
                    <!-- 用户头像和基本信息 -->
                    <div class="text-center pt-8 pb-4">
                        <!-- 头像 -->
                        <div class="relative inline-block mb-4">
                            <img v-lazy="userInfo?.avatarUrl"
                                class="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                                alt="用户头像">
                        </div>
                        
                        <!-- 用户名 -->
                        <h2 class="text-xl font-bold text-blue-600 mb-1">{{ userInfo?.username }}</h2>
                        
                        <!-- 地址信息 -->
                         <div class="flex items-center justify-center mb-3">
                             <i class="text-sm mr-1">📍</i>
                             <span class="text-sm text-gray-500">{{ userInfo?.address || '广西' }}</span>
                         </div>
                        
                        <!-- 加入时间 -->
                        <p class="text-xs text-gray-400 mb-4">
                            加入于 {{ userInfo?.createTime }}
                        </p>
                    </div>
                    
                    <!-- 统计数据 -->
                     <div class="px-6 pb-4">
                         <div class="bg-gray-50 rounded-xl py-4">
                             <div class="flex justify-around items-center">
                                 <div class="flex items-center space-x-2">
                                     <span class="text-2xl font-bold text-gray-800">{{ userInfo?.worksCount || '5' }}</span>
                                     <span class="text-sm text-gray-600">作品</span>
                                 </div>
                                 <div class="flex items-center space-x-2">
                                     <span class="text-2xl font-bold text-gray-800">{{ userInfo?.fansCount || '1' }}</span>
                                     <span class="text-sm text-gray-600">粉丝</span>
                                 </div>
                                 <div class="flex items-center space-x-2">
                                     <span class="text-2xl font-bold text-gray-800">{{ userInfo?.followsCount || '1' }}</span>
                                     <span class="text-sm text-gray-600">关注</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                    
                    <!-- 个人描述 -->
                    <div class="px-6 pb-6">
                        <p class="text-sm text-gray-700 leading-relaxed text-center">{{ userInfo?.personalDescription || '初始用户' }}</p>
                    </div>
                </div>

                <!-- 桌面端布局 -->
                <div class="desktop-profile-layout hidden md:block p-6">
                    <button @click="logout"
                        class="absolute top-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2 min-w-[44px] min-h-[44px]">
                        <i class="text-sm">→</i> <span>退出登录</span>
                    </button>
                    <div
                        class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
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
                            <p class="text-gray-700 leading-relaxed">{{ userInfo?.personalDescription || '该心友很懒什么都没有写'
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 用户作品标签页 -->
            <div v-if="!pageLoading"
                class="works-section bg-white bg-opacity-90 rounded-2xl shadow-lg p-4 my-4 flex flex-col flex-1 min-h-0"
                :class="{ 'fade-in-delayed': worksLoaded }">
                <div class="overflow-x-auto">
                    <div class="flex space-x-1 mb-4 border-b border-gray-200">
                        <button @click="setActiveTab('all-works')"
                            :class="{ 'border-blue-600 bg-blue-50 text-blue-600': activeTab === 'all-works', 'text-gray-600 hover:text-blue-600 hover:bg-gray-50': activeTab !== 'all-works' }"
                            class="px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg min-h-[44px] transition-colors duration-200">
                            心作
                        </button>
                        <button @click="setActiveTab('articles')"
                            :class="{ 'border-blue-600 bg-blue-50 text-blue-600': activeTab === 'articles', 'text-gray-600 hover:text-blue-600 hover:bg-gray-50': activeTab !== 'articles' }"
                            class="px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg min-h-[44px] transition-colors duration-200">
                            心理文章
                        </button>
                        <button @click="setActiveTab('photos')"
                            :class="{ 'border-blue-600 bg-blue-50 text-blue-600': activeTab === 'photos', 'text-gray-600 hover:text-blue-600 hover:bg-gray-50': activeTab !== 'photos' }"
                            class="px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg min-h-[44px] transition-colors duration-200">
                            治愈图片
                        </button>
                    </div>
                </div>

                <div class="works-content-container overflow-y-auto flex-1 min-h-0">
                    <!-- 心作 -->
                    <div v-show="activeTab === 'all-works'" class="tab-content">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="allWorks.length > 0">
                            <div v-for="(work, index) in displayedWorks" :key="index">
                                <div
                                    class="work-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    <img v-lazy="work.imageUrl" class="w-full h-48 object-cover" :alt="work.title">
                                    <div class="p-4 flex-1 flex flex-col">
                                        <h5 class="text-lg font-semibold text-gray-800 mb-2">{{ work.title }}</h5>
                                        <p class="text-gray-600 text-sm mb-4 flex-1">{{ work.shortDesc }}</p>
                                        <div class="flex justify-between items-center text-sm">
                                            <span class="text-gray-500">{{ work.createTime.slice(0, 10) }}</span>
                                            <div class="flex space-x-3 text-gray-500">
                                                <span class="flex items-center space-x-1">
                                                    <HeartIcon class="w-4 h-4 text-red-500" />
                                                    <span>{{ work.likesCount }}</span>
                                                </span>
                                                <span class="flex items-center space-x-1">
                                                    <ChatBubbleLeftIcon class="w-4 h-4 text-gray-400" />
                                                    <span>{{ work.commentsCount }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 滚动加载动画 -->
                        <div class="text-center mt-6" v-if="isLoading && hasMoreWorks">
                            <div class="flex items-center justify-center space-x-2 py-4">
                                <div class="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
                                    role="status"></div>
                                <span class="text-blue-500 text-sm">正在加载更多...</span>
                            </div>
                        </div>
                        <div class="text-center py-5" v-if="!allWorks || allWorks.length === 0">
                            <InboxIcon class="w-24 h-24 mx-auto text-gray-400" />
                            <p class="mt-3 text-gray-500">暂无作品</p>
                        </div>
                    </div>

                    <!-- 心理文章 -->
                    <div v-show="activeTab === 'articles'" class="tab-content">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                            v-if="articles && articles.length > 0">
                            <div v-for="(article, index) in articles" :key="index">
                                <div
                                    class="article-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col p-4">
                                    <h5 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">{{ article.title
                                        }}</h5>
                                    <p class="text-gray-600 text-sm mb-3 flex-1 line-clamp-3">{{ article.shortDesc }}
                                    </p>
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-500">{{ article.createTime.slice(0, 10) }}</span>
                                        <div class="flex space-x-3 text-gray-500">
                                            <span class="flex items-center space-x-1">
                                                <HeartIcon class="w-3 h-3 text-red-500" />
                                                <span>{{ article.likesCount }}</span>
                                            </span>
                                            <span class="flex items-center space-x-1">
                                                <ChatBubbleLeftIcon class="w-3 h-3 text-gray-400" />
                                                <span>{{ article.commentsCount }}</span>
                                            </span>
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
                    <div v-show="activeTab === 'photos'" class="tab-content">
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                            v-if="photos && photos.length > 0">
                            <div v-for="(photo, index) in photos" :key="index">
                                <div
                                    class="photo-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    <img v-lazy="photo.imageUrl" class="w-full h-32 object-cover" :alt="photo.title">
                                    <div class="p-2 flex-1 flex flex-col">
                                        <p class="text-xs text-gray-800 mb-1 line-clamp-2 flex-1">{{ photo.title }}</p>
                                        <small class="text-gray-500 text-xs">{{ photo.createTime.slice(0, 10) }}</small>
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
import { vLazy } from '../../directives/lazy.js'
// 移除本地ToastNotification导入，使用全局实例
import { InboxIcon, HeartIcon, ChatBubbleLeftIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/vue/24/solid'


const activeTab = ref('all-works');

const setActiveTab = (tabId) => {
    // 添加懒加载效果
    const currentTabContent = document.querySelector(`[v-show="activeTab === '${activeTab.value}'"]`);
    if (currentTabContent) {
        currentTabContent.style.opacity = '0';
        currentTabContent.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
        activeTab.value = tabId;

        // 新标签页内容淡入效果
        setTimeout(() => {
            const newTabContent = document.querySelector(`[v-show="activeTab === '${tabId}'"]`);
            if (newTabContent) {
                newTabContent.style.opacity = '1';
                newTabContent.style.transform = 'translateY(0)';
            }
        }, 50);
    }, 150);
};


/*
 设置全局登录状态
 */
const store = loginStore()
const router = useRouter() // 获取路由实例

/* 
 定义用户信息
*/
const username = computed(() => store.currentUser?.username || '访客') // 获取Pinia持久化数据查询用户信息
const userInfo = ref(null)

// 页面加载状态管理
const pageLoading = ref(true)
const userInfoLoaded = ref(false)
const worksLoaded = ref(false)
const apiLoadingStates = reactive({
    userInfo: false,
    works: false,
    articles: false,
    photos: false
})

/*
 Toast 通知引用
 */
// 移除本地toast引用，使用全局事件

// 退出登录方法
const logout = () => {
    store.removeStore()
    router.replace('/login') // 重定向到登录页面
}


// 作品(包含图片、标题、文字) - 使用模拟数据
const allWorks = ref([
    {
        title: "心灵治愈之旅",
        shortDesc: "探索内心深处的宁静与和谐，寻找属于自己的心灵归宿。",
        imageUrl: "/image/OIP-C (1).jpg",
        createTime: "2024-01-15T10:30:00",
        likesCount: 128,
        commentsCount: 45
    },
    {
        title: "阳光下的微笑",
        shortDesc: "每一个微笑都是心灵的阳光，温暖着周围的每一个人。",
        imageUrl: "/image/OIP-C (2).jpg",
        createTime: "2024-01-14T15:20:00",
        likesCount: 89,
        commentsCount: 23
    },
    {
        title: "静谧的森林",
        shortDesc: "在大自然的怀抱中找到内心的平静与安宁。",
        imageUrl: "/image/OIP-C (3).jpg",
        createTime: "2024-01-13T09:15:00",
        likesCount: 156,
        commentsCount: 67
    },
    {
        title: "梦想的翅膀",
        shortDesc: "每个人都有追逐梦想的权利，让我们一起飞翔。",
        imageUrl: "/image/OIP-C (4).jpg",
        createTime: "2024-01-12T14:45:00",
        likesCount: 203,
        commentsCount: 89
    },
    {
        title: "温暖的拥抱",
        shortDesc: "有时候，一个简单的拥抱就能治愈所有的伤痛。",
        imageUrl: "/image/OIP-C (5).jpg",
        createTime: "2024-01-11T11:30:00",
        likesCount: 175,
        commentsCount: 52
    },
    {
        title: "希望之光",
        shortDesc: "即使在最黑暗的时刻，也要相信希望的光芒。",
        imageUrl: "/image/OIP-C (6).jpg",
        createTime: "2024-01-10T16:20:00",
        likesCount: 142,
        commentsCount: 38
    }
])

// 作品(包含标题、文字) - 使用模拟数据
const articles = ref([
    {
        title: "如何管理焦虑情绪",
        shortDesc: "焦虑是现代人常见的情绪问题，学会正确的管理方法很重要。",
        createTime: "2024-01-15T08:30:00",
        likesCount: 95,
        commentsCount: 28
    },
    {
        title: "建立健康的人际关系",
        shortDesc: "良好的人际关系是心理健康的重要基础。",
        createTime: "2024-01-14T12:15:00",
        likesCount: 76,
        commentsCount: 19
    },
    {
        title: "冥想的力量",
        shortDesc: "通过冥想练习，我们可以获得内心的平静与专注。",
        createTime: "2024-01-13T18:45:00",
        likesCount: 134,
        commentsCount: 41
    }
])

// 作品(包含图片) - 使用模拟数据
const photos = ref([
    {
        title: "晨光",
        imageUrl: "/image/OIP-C (7).jpg",
        createTime: "2024-01-15T06:00:00"
    },
    {
        title: "花开",
        imageUrl: "/image/OIP-C (8).jpg",
        createTime: "2024-01-14T14:30:00"
    },
    {
        title: "海浪",
        imageUrl: "/image/OIP-C (9).jpg",
        createTime: "2024-01-13T17:20:00"
    },
    {
        title: "星空",
        imageUrl: "/image/OIP-C (10).jpg",
        createTime: "2024-01-12T21:45:00"
    },
    {
        title: "彩虹",
        imageUrl: "/image/OIP-C (12).jpg",
        createTime: "2024-01-11T13:15:00"
    },
    {
        title: "雪景",
        imageUrl: "/image/OIP-C (13).jpg",
        createTime: "2024-01-10T10:30:00"
    }
])

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

// 滚动监听器
const handleScroll = (event) => {
    const container = event.target
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight

    // 当滚动到底部附近时自动加载更多
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasMoreWorks.value && !isLoading.value) {
        loadMoreWorks()
    }
}



// 渐进式加载用户信息
const loadUserInfo = async (retryCount = 0) => {
    try {
        apiLoadingStates.userInfo = true
        const UserInfoResponse = await UserInfoService(username.value)
        userInfo.value = UserInfoResponse.data.data

        // 检查用户信息是否过期
        if (UserInfoResponse.data.code === 401 || !userInfo.value || userInfo.value === 'undefined') {
            window.dispatchEvent(new CustomEvent('show-toast', {
                detail: { message: `用户${UserInfoResponse.data.msg}，获取用户信息失败，3秒后自动跳转`, type: 'error' }
            }))

            setTimeout(() => {
                store.removeStore('userInfo')
                router.replace({ name: 'SignIn' })
            }, 3000)
            return false
        }

        // 用户信息加载完成，显示用户信息卡片
        setTimeout(() => {
            userInfoLoaded.value = true
        }, 100)

        return true

    } catch (error) {
        console.error('加载用户信息失败:', error)

        // 重试机制
        if (retryCount < 2) {
            console.log(`重试加载用户信息，第${retryCount + 1}次`)
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
            return await loadUserInfo(retryCount + 1)
        }

        // 重试失败后显示错误提示
        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: { message: '网络连接异常，请检查网络后刷新页面', type: 'error' }
        }))

        return false

    } finally {
        apiLoadingStates.userInfo = false
    }
}

// 渐进式加载作品数据 - 注释掉后端API调用，使用模拟数据
const loadWorksData = async (retryCount = 0) => {
    try {
        apiLoadingStates.works = true
        apiLoadingStates.articles = true
        apiLoadingStates.photos = true

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500))

        // 注释掉后端API调用
        // const [worksResponse, essaysResponse, photosResponse] = await Promise.all([
        //     UserWorksService(username.value),
        //     UserEssaysService(username.value),
        //     UserPhotosService(username.value)
        // ])

        // 注释掉后端数据设置
        // allWorks.value = Array.isArray(worksResponse?.data?.data) ? worksResponse.data.data : []
        // articles.value = Array.isArray(essaysResponse?.data?.data) ? essaysResponse.data.data : []
        // photos.value = Array.isArray(photosResponse?.data?.data) ? photosResponse.data.data : []

        // 使用模拟数据，数据已在上面定义
        console.log('使用模拟数据加载作品')

        // 作品数据加载完成，显示作品区域
        setTimeout(() => {
            worksLoaded.value = true
        }, 200)

        return true

    } catch (error) {
        console.error('加载作品数据失败:', error)

        // 重试机制
        if (retryCount < 2) {
            console.log(`重试加载作品数据，第${retryCount + 1}次`)
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
            return await loadWorksData(retryCount + 1)
        }

        // 重试失败后显示错误提示
        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: { message: '作品数据加载失败，请稍后重试', type: 'warning' }
        }))

        // 即使失败也要显示作品区域（显示空状态）
        setTimeout(() => {
            worksLoaded.value = true
        }, 200)

        return false

    } finally {
        apiLoadingStates.works = false
        apiLoadingStates.articles = false
        apiLoadingStates.photos = false
    }
}

// 检测是否为移动端
const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 组件挂载时的操作
onMounted(async () => {
    try {
        // 添加侧边栏状态变化事件监听
        window.addEventListener('sidenav-change', handleSideNavChange)

        // 移动端和PC端使用不同的加载时间
        const minLoadingTime = new Promise(resolve =>
            setTimeout(resolve, isMobile() ? 600 : 800)
        )

        // 渐进式加载数据
        const userInfoSuccess = await loadUserInfo()

        // 只有用户信息加载成功才继续加载作品数据
        if (userInfoSuccess) {
            await loadWorksData()
        }

        // 确保最小加载时间后再隐藏骨架屏
        await minLoadingTime
        pageLoading.value = false

        // 添加滚动监听器
        setTimeout(() => {
            const scrollContainer = isMobile()
                ? document.querySelector('.content-wrapper')
                : document.querySelector('.works-content-container')

            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
            }
        }, 500)

        // 移动端特定的优化
        if (isMobile()) {
            // 添加触摸反馈
            document.addEventListener('touchstart', () => { }, { passive: true })

            // 优化移动端滚动性能
            const contentWrapper = document.querySelector('.content-wrapper')
            if (contentWrapper) {
                contentWrapper.style.webkitOverflowScrolling = 'touch'
            }
        }

    } catch (error) {
        console.error('页面初始化失败:', error)

        // 即使出错也要隐藏加载状态
        pageLoading.value = false

        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: {
                message: isMobile() ? '加载失败，请刷新重试' : '页面加载异常，请刷新重试',
                type: 'error'
            }
        }))
    }
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

    // 移除滚动监听器
    const scrollContainer = isMobile()
        ? document.querySelector('.content-wrapper')
        : document.querySelector('.works-content-container')

    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
    }
})
</script>

<style scoped>
/* 页面懒加载动画 */
.loading-container {
    width: 100%;
    min-height: 100vh;
}

.fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in-delayed {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease-out 0.3s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 骨架屏动画优化 */
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.content-wrapper {
    width: 100%;
    height: calc(100vh - 112px);
    /* 减去顶部和底部导航栏高度 */
    overflow: hidden;
    padding-bottom: 20px;
    transition: all 0.3s ease;
}

/* 隐藏滚动条但保持滚动功能 */
.works-content-container {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

.works-content-container::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}

.content-wrapper::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}

.content-wrapper {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

/* 移动端滚动处理 */
@media (max-width: 768px) {
    .content-wrapper {
        overflow-y: auto;
        /* 移动端允许父容器滚动 */
        height: auto;
        min-height: calc(100vh - 112px);
        -webkit-overflow-scrolling: touch;
        /* iOS平滑滚动 */
        padding: 0 12px;
        /* 移动端增加左右内边距 */
        padding-bottom: 20px;
    }

    .content-area {
        overflow: visible;
        /* 移动端取消内容区域的overflow限制 */
        height: auto;
    }

    .works-content-container {
        overflow-y: visible;
        /* 移动端取消作品容器的独立滚动 */
        max-height: none;
        /* 移除高度限制 */
        height: auto;
    }

    /* 移动端用户信息卡片优化 */
    .user-info-card {
        margin: 12px 0;
        padding: clamp(14px, 4vw, 20px);
        /* 响应式内边距 */
        border-radius: 18px;
        max-width: 100%;
        box-sizing: border-box;
    }

    .user-info-card .flex {
        flex-direction: column;
        text-align: center;
        gap: clamp(12px, 3vw, 18px);
        /* 响应式间距 */
        align-items: center;
        justify-content: center;
    }

    /* 移动端头像和用户信息布局优化 */
    .user-info-card img {
        width: 88px;
        height: 88px;
        border-width: 3px;
    }

    /* 移动端用户信息文字优化 */
    .user-info-card h2 {
        font-size: 1.5rem;
        /* 调整为更适合的字体大小 */
        margin-bottom: 10px;
        line-height: 1.3;
    }

    .user-info-card p {
        font-size: 0.875rem;
        /* 14px，更清晰的阅读体验 */
        margin-bottom: 8px;
        line-height: 1.4;
    }

    /* 移动端统计数据布局 */
    .user-info-card .flex.flex-wrap {
        gap: 20px;
        margin-bottom: 16px;
    }

    .user-info-card .text-center .text-xl {
        font-size: 1.25rem;
        /* 20px，保持数据突出但不过大 */
    }

    .user-info-card .text-center .text-sm {
        font-size: 0.75rem;
        /* 12px，标签文字 */
    }

    /* 移动端作品区域优化 */
    .works-section {
        margin: clamp(8px, 2vw, 16px) 0;
        padding: clamp(12px, 3vw, 18px);
        border-radius: 16px;
        max-width: 100%;
        box-sizing: border-box;
    }

    /* 移动端网格布局优化 */
    .grid {
        gap: clamp(8px, 2vw, 14px);
        /* 响应式网格间距 */
        width: 100%;
        box-sizing: border-box;
    }

    .grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3 {
        grid-template-columns: 1fr;
        /* 移动端强制单列 */
        max-width: 100%;
    }

    .grid.grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4.xl\:grid-cols-5 {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        /* 自适应两列布局 */
        max-width: 100%;
    }

    /* 移动端作品卡片优化 */
    .work-card,
    .article-card,
    .photo-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        padding: clamp(12px, 3vw, 16px);
        /* 响应式内边距 */
        border-radius: clamp(12px, 2vw, 16px);
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }

    .work-card:active,
    .article-card:active,
    .photo-card:active {
        transform: scale(0.98);
    }

    /* 移动端卡片内容容器优化 */
    .work-card>div,
    .article-card>div {
        display: flex;
        flex-direction: column;
        gap: clamp(6px, 1.5vw, 10px);
        height: 100%;
    }

    .photo-card img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: clamp(8px, 1.5vw, 12px);
    }

    /* 移动端作品卡片内容字体优化 */
    .work-card h5 {
        font-size: 1rem;
        /* 16px，标题字体 */
        line-height: 1.4;
    }

    .work-card p {
        font-size: 0.875rem;
        /* 14px，描述文字 */
        line-height: 1.5;
    }

    .article-card h5 {
        font-size: 0.9375rem;
        /* 15px，文章标题 */
        line-height: 1.4;
    }

    .article-card p {
        font-size: 0.8125rem;
        /* 13px，文章描述 */
        line-height: 1.5;
    }

    .photo-card p {
        font-size: 0.75rem;
        /* 12px，图片标题 */
        line-height: 1.3;
    }

    /* 移动端标签页按钮优化 */
    .works-section button {
        min-height: clamp(44px, 10vw, 52px);
        /* 响应式触摸区域 */
        padding: clamp(10px, 2.5vw, 14px) clamp(14px, 3.5vw, 18px);
        font-size: 0.875rem;
        /* 14px，按钮文字 */
        border-radius: clamp(8px, 2vw, 12px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* 移动端按钮容器优化 */
    .works-section .flex {
        gap: clamp(6px, 1.5vw, 10px);
        flex-wrap: wrap;
        justify-content: center;
    }

    /* 移动端加载更多按钮优化 */
    .load-more-btn {
        min-height: clamp(44px, 10vw, 52px);
        padding: clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 28px);
        font-size: 0.9375rem;
        /* 15px */
        border-radius: clamp(10px, 2.5vw, 14px);
        box-sizing: border-box;
        width: auto;
        max-width: 100%;
    }

    /* 移动端退出登录按钮优化 */
    .logout-btn {
        font-size: 0.75rem;
        /* 12px */
        padding: clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 16px);
        border-radius: clamp(8px, 2vw, 12px);
        top: clamp(8px, 2vw, 14px);
        right: clamp(8px, 2vw, 14px);
        white-space: nowrap;
        min-height: clamp(32px, 8vw, 42px);
        min-width: clamp(70px, 18vw, 90px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logout-btn:hover {
        transform: scale(1.02);
        /* 移动端减少旋转效果 */
    }

    /* 移动端图标尺寸优化 */
    .HeartIcon,
    .ChatBubbleLeftIcon {
        width: 1rem !important;
        /* 16px */
        height: 1rem !important;
    }

    .InboxIcon,
    .DocumentTextIcon,
    .PhotoIcon {
        width: 4rem !important;
        /* 64px，空状态图标 */
        height: 4rem !important;
    }
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

/* 作品内容区域滚动条样式 */
.works-content-container {
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
}

.works-content-container::-webkit-scrollbar {
    width: 8px;
}

.works-content-container::-webkit-scrollbar-track {
    background: rgba(243, 244, 246, 0.5);
    border-radius: 4px;
}

.works-content-container::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4));
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.works-content-container::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6));
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
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
}

.work-card:hover,
.article-card:hover,
.photo-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.work-card:hover::before,
.article-card:hover::before,
.photo-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(80, 200, 120, 0.1));
    border-radius: 10px;
    z-index: -1;
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

/* 标签页内容懒加载效果 */
.tab-content {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.tab-content.fade-enter {
    opacity: 0;
    transform: translateY(10px);
}

.tab-content.fade-leave {
    opacity: 0;
    transform: translateY(-10px);
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

/* 小屏幕移动端优化 (320px - 576px) */
@media (max-width: 576px) {
    .content-wrapper {
        padding: 0 8px;
        padding-bottom: 16px;
    }

    /* 移动端用户信息卡片样式重置 */
    .mobile-profile-layout {
        padding: 0;
    }
    
    .mobile-profile-layout .text-center {
        padding: 16px 20px 12px;
    }
    
    .mobile-profile-layout img {
        width: 72px !important;
        height: 72px !important;
        border-width: 3px;
    }
    
    .mobile-profile-layout h2 {
        font-size: 1.125rem !important;
        margin-bottom: 6px !important;
    }
    
    .mobile-profile-layout p {
        font-size: 0.75rem !important;
        margin-bottom: 4px !important;
    }
    
    .mobile-profile-layout .px-6 {
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
    
    .mobile-profile-layout .text-2xl {
        font-size: 1.25rem !important;
    }
    
    .mobile-profile-layout .text-sm {
        font-size: 0.75rem !important;
    
        line-height: 1.2;
    }

    .works-section {
        margin: 8px 0;
        padding: 12px;
    }

    .grid {
        gap: 8px;
    }

    /* 小屏幕作品卡片字体优化 */
    .work-card h5 {
        font-size: 0.9375rem;
        /* 15px */
        line-height: 1.3;
    }

    .work-card p {
        font-size: 0.8125rem;
        /* 13px */
        line-height: 1.4;
    }

    .article-card h5 {
        font-size: 0.875rem;
        /* 14px */
        line-height: 1.3;
    }

    .article-card p {
        font-size: 0.75rem;
        /* 12px */
        line-height: 1.4;
    }

    .photo-card p {
        font-size: 0.6875rem;
        /* 11px */
        line-height: 1.2;
    }

    .works-section button {
        min-height: 44px;
        padding: 10px 12px;
        font-size: 0.8125rem;
        /* 13px */
    }

    .load-more-btn {
        min-height: 44px;
        padding: 10px 20px;
        font-size: 0.875rem;
        /* 14px */
    }

    /* 移动端退出登录按钮优化 */
    .mobile-profile-layout .absolute button {
        font-size: 0.6875rem !important;
        padding: 6px 10px !important;
        border-radius: 20px !important;
        min-height: 32px !important;
        min-width: 80px !important;
    }

    /* 小屏幕图标尺寸优化 */
    .HeartIcon,
    .ChatBubbleLeftIcon {
        width: 0.875rem !important;
        /* 14px */
        height: 0.875rem !important;
    }

    .InboxIcon,
    .DocumentTextIcon,
    .PhotoIcon {
        width: 3.5rem !important;
        /* 56px */
        height: 3.5rem !important;
    }
}

/* 中等屏幕移动端优化 (577px - 640px) */
@media (min-width: 577px) and (max-width: 640px) {
    .user-info-card h2 {
        font-size: 1.375rem;
        /* 22px */
        line-height: 1.3;
    }

    .user-info-card p {
        font-size: 0.9375rem;
        /* 15px */
        line-height: 1.4;
    }

    .work-card h5 {
        font-size: 1.0625rem;
        /* 17px */
    }

    .work-card p {
        font-size: 0.9375rem;
        /* 15px */
    }

    .article-card h5 {
        font-size: 1rem;
        /* 16px */
    }

    .article-card p {
        font-size: 0.875rem;
        /* 14px */
    }
}

/* 大屏幕移动端优化 (641px - 768px) */
@media (min-width: 641px) and (max-width: 768px) {
    .user-info-card {
        padding: 20px;
    }

    .user-info-card img {
        width: 96px;
        height: 96px;
    }

    .user-info-card h2 {
        font-size: 1.625rem;
        /* 26px */
        line-height: 1.3;
    }

    .user-info-card p {
        font-size: 1rem;
        /* 16px */
        line-height: 1.5;
    }

    .user-info-card .text-center .text-xl {
        font-size: 1.375rem;
        /* 22px */
    }

    .work-card h5 {
        font-size: 1.125rem;
        /* 18px */
    }

    .work-card p {
        font-size: 1rem;
        /* 16px */
    }

    .works-section button {
        font-size: 1rem;
        /* 16px */
        padding: 14px 18px;
    }
}
</style>