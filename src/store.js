import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/utils/http';
Vue.use(Vuex)

export default new Vuex.Store({
    //所有共享的数据都要统一放在state中进行存储
    state: {
        user: null
    },
    //定义修改state的方法，只有mutations中的方法才能修改state
    mutations: {
        //保存用户登录信息
        initUser(state, user) {
            state.user = user
        },
        //清空用户登录信息
        clearUser(state) {
            state.user = null
        }
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

    }
})