import { ref, computed } from 'vue' // 导入 ref 和 computed
import { defineStore } from 'pinia'



/* 
HeartHomeStore 状态管理
*/

// 登录/注册状态管理
export let loginStore = defineStore('HeartHomeStoreForLogIn', () => {
    /*
     --- State (状态) ---
     */
    const currentUser = ref(null) // 存储当前登录的用户信息，初始为 null
    const token = ref(null) // 存储当前登录的 token 信息，初始为 null
    const registeredDatas = ref([]) // 存储已注册用户列表

    /*
     --- Getters (计算属性) ---
     */
    // 用于判断登录、自动登录
    const isLoggedIn = computed(() => !!currentUser.value) // 判断当前用户是否登录
    const isRegistered = computed(() => registeredDatas.value.length > 0) // 判断当前是否存在注册用户
    const isToken = computed(() => !!token.value) // 判断当前 token 是否存在



    /*
     --- Actions (方法) ---
     */
    // 全局持久化登录用户数据
    function loginUser(userData) {
        // 存储用户数据
        currentUser.value = userData
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log("用户数据已存储到 Pinia store", userData)
    }

    // 获取登录用户数据 初始化
    const getUser = localStorage.getItem('userData')
    if (getUser) {
        currentUser.value = JSON.parse(getUser)
    }

    // 临时全局持久化注册的用户数据
    async function registerData(registerData) {

    }

    // 存储 token 到 localStorage
    function setToken(jwtToken) {
        token.value = jwtToken
        localStorage.setItem('jwtToken', jwtToken)
        console.log("token 已存储到 Pinia store", jwtToken)
    }

    // 获取 token 数据 初始化
    const getToken = localStorage.getItem('jwtToken')
    if (getToken) {
        console.log(`正在获取 token 数据...`)
        token.value = getToken
        console.log(`获取到的 token 为: ${getToken}`)
    }

    // 移除 token 数据
    function removeStore() {
        currentUser.value = null
        token.value = null
        localStorage.removeItem('userData')
        localStorage.removeItem('jwtToken')
        console.log("已经移除 token 数据")
        console.log("已经移除用户数据")
    }



    return {
        currentUser,
        registeredDatas,
        isLoggedIn,
        isRegistered,
        token,
        isToken,
        loginUser,
        getToken,
        setToken,
        registerData,
        removeStore
    }
})


// export const otherStore = defineStore('HeartHomeStoreForOther', () => {
//     // --- State (状态) ---
//     const currentUser = ref(null) // 存储当前登录的用户信息，初始为 null
//     const token = ref(null) // 存储当前登录的 token 信息，初始为 null
//     const registeredUsers = ref([]) // 存储已注册用户列表

//     // --- Getters (计算属性) ---
//     const isLoggedIn = computed(() => !!currentUser.value) // 判断当前用户是否登录
// })