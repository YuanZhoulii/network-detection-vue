import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/utils/http';
Vue.use(Vuex)

export default new Vuex.Store({
    //所有共享的数据都要统一放在state中进行存储
    state: {
        user: null,
        isLogin: false,
        //设一个标志位，代表是否从登录页到可视化页，避免再次请求登录状态
        loginToScreen: false,
        //设一个标志位，代表是否登出，避免再次请求登录状态
        isLogOut: false,
        areaData: null,
        //组件的数据是否加载完成
        loading: {
            map: false,
            //条形图
            hot: false,
            //饼图
            bar: false,
            header: false,
        }
    },
    //定义修改state的方法，只有mutations中的方法才能修改state
    mutations: {
        //保存用户登录信息
        initUser(state, user) {
            console.log("init user");

            state.user = user
        },
        //清空用户登录信息
        clearUser(state) {
            state.user = null
        },
        setAreaData(state, data) {
            state.areaData = data
        },
        //mutations中的方法只能传一个参数，有多个参数封装成对象再传
        updateLoading(state, data) {
            state.loading[data.type] = data.flag
        },
        updateLoginStatus(state, flag) {
            state.isLogin = flag
        },
        isLoginToScreen(state, flag) {
            state.loginToScreen = flag
        },
        updateLogOut(state, flag) {
            state.isLogOut = flag
        },

    },
    //处理异步任务
    actions: {
        getLoginUser(context) {
            console.log("getLoginUser");
            //获取登录状态
            http.get('auth/current').then(({ data }) => {
                if (data.code === 0) {
                    context.commit('initUser', data.data)
                } else {
                    context.commit('clearUser')
                }

            })
        }
    },
    //可以对Store中已有数据加工处理后形成新的数据，类似Vue的computed属性
    //state数据变化，getters数据也随之变化
    getters: {
        //返回是否加载完成
        isChartLoading: state => {
            let loaded = state.loading
            return loaded.map && loaded.hot && loaded.bar
        },
        isHeaderLoading: state => {
            return state.loading.header
        },

    }
})