
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

//解决重复路由跳转报错
//https://blog.csdn.net/weixin_43242112/article/details/107595460
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//安装Router到Vue中
Vue.use(VueRouter)


//懒加载，打包时会在不同的js文件中，而不是全部在同一个js文件中，请求会很慢
const Login = () => import('@/components/user/Login')
const Regist = () => import('@/components/user/Regist')
const Info = () => import('@/components/user/Info')
const ScreenPage = () => import('@/views/screen-page')




//编写路由规则
const routes = [
  // {
  //   name: 'index',
  //   path: '/',
  //   component: Index
  // },
  {
    path: '',
    redirect: '/login',
  },
  {
    name: 'screen',
    path: '/screen',
    component: ScreenPage,
    //配置嵌套路由/screen/routename
    children: [
      // {
      //   //嵌套路由不加斜杠
      //   path: 'test',
      //   component:test,
      // }, 
    ],
    meta: {
      auth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    name: 'regist',
    path: '/regist',
    component: Regist,
    meta: {
      auth: false
    }
  },
  {
    name: 'info',
    //配置动态路由，比如路由至/info/zs时，可以通过this.$route.params.name获取到zs
    path: '/info/:name',
    component: Info,
    meta: {
      auth: true
    }
  },
  {
    path: '/info',
    redirect: '/screen'
  },
  // {
  //   name: 'echarts',
  //   path: '/echarts',
  //   component: Echarts
  // },
  // {
  //   name: 'barpage',
  //   path: '/barpage',
  //   component: BarPage
  // },
  // {
  //   name: 'trendpage',
  //   path: '/trendpage',
  //   component: TrendPage
  // },
  // {
  //   name: 'mappage',
  //   path: '/mappage',
  //   component: MapPage
  // },
  // {
  //   name: 'rankpage',
  //   path: '/rankpage',
  //   component: RankPage
  // },
  // {
  //   name: 'hotpage',
  //   path: '/hotpage',
  //   component: HotPage
  // },
  // {
  //   path: '*',
  //   name: 'any',
  //   redirect: '/login'
  // },

]

//创建Router对象
const router = new VueRouter({
  routes,
  //路径上不显示#
  // mode: 'history'
})

//路由前置守卫
router.beforeEach((to, from, next) => {
  console.log("router.beforeEach");
  //从from跳转到to
  // console.log('to.meta.auth :>> ', to.meta.auth);
  // console.log('to,from :>> ', to, from);
  // console.log('to.matched :>> ', to.matched);
  //要路由的组件需要登录状态时
  let user = store.state.user
  if (to.meta.auth === true) {
    console.log("auth true");
    user ? next() : next('/login')
  } else {
    console.log("auth false");
    user ? next('/screen') : next()
  }
  // next()
  //获取登录状态
  // try {
  //   const { data } = await http.get('auth/current')
  // } catch (error) {
  //   next()
  // }

  // if (data.code === 0) {
  //   //保存用户信息
  //   store.commit('initUser', data.data)
  //   if (to.meta.auth === true) {
  //     next()
  //   } else {
  //     //已登录跳转到可视化页面
  //     next('/screen')
  //   }
  // } else {
  //   //清空用户信息
  //   store.commit('clearUser')
  //   if (to.meta.auth === true) {
  //     //未登录回到登录页面
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // }


})

//路由后置钩子
router.afterEach((to, from) => {

})




//导出Router对象
export default router