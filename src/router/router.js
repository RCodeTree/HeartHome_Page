import { createRouter, createWebHashHistory } from "vue-router"
import { loginStore } from '../stores/HeartHomeStore'
import Page from '../Pages/Page.vue'
import LogIn from '../Pages/LogIn/LogIn.vue'




/* 
路由配置
*/
const routes = [
    // --- 顶层路由 ---
    // 登录/注册页面 (使用独立布局)
    {
        path: '/login',
        component: LogIn,
        redirect: '/login/signin',
        meta: { requiresAuth: false },
        children: [
            { path: 'signin', name: 'SignIn', component: () => import('../Pages/LogIn/SignIn.vue') },
            { path: 'signup', name: 'SignUp', component: () => import('../Pages/LogIn/SignUp.vue') },
        ]
    },

    // --- 主应用页面路由 (使用 Page.vue 布局) ---
    {
        path: '/',                  // 父路由路径
        component: Page,
        redirect: '/home',          // 默认重定向到 '/home'
        meta: { requiresAuth: true },
        children: [                 // 子路由定义 --- Head Side Foot 
            { path: 'home', name: 'Home', component: () => import('../Pages/Head/Home.vue') },
            { path: 'service', name: 'Service', component: () => import('../Pages/Head/Service.vue') },
            { path: 'about', name: 'About', component: () => import('../Pages/Side/About.vue') },
            { path: 'message', name: 'Message', component: () => import('../Pages/Side/Message/Message.vue') },
            { path: 'friend', name: 'Friend', component: () => import('../Pages/Side/Friend.vue') },
            { path: `my`, name: 'My', component: () => import('../Pages/Side/My.vue') },
            { path: 'publish', name: 'Publish', component: () => import('../Pages/Foot/Publish.vue') },
        ]
    },


    // 聊天窗口
    { path: '/message/chat', name: 'Chat', component: () => import('../Pages/Side/Message/ChatWindow/Chat.vue') },

    // 捕获所有未匹配路由的 404 页面
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../Pages/Error/404.vue'), meta: { requiresAuth: false } },
]

/* 
路由实例
*/
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

/* 
路由守卫 --- 拦截路由导航(验证用户登录)
*/
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth) // 查找需要用于登录验证的路由

    const store = loginStore() // 直接调用 loginStore() 获取 store 实例
    const isLoggedIn = store.isLoggedIn // 从 store 获取 isLoggedIn，用于判断用户是否登录
    const isToken = store.isToken // 从 store 获取 isToken，用于判断 token 是否存在

    if (requiresAuth && !isLoggedIn && !isToken) {
        console.log('用户未登录，重定向到 /login')
        next('/login')
    } else if (to.path.startsWith('/login') && isLoggedIn && isToken) {
        console.log('用户已登录，尝试访问登录页，重定向到 /home')
        next('/')
    } else {
        next()
    }
})

export default router