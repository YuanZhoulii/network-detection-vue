// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import echarts from 'echarts'
// import '@/assets/css/header.less'

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/utils/http';
//引入自定义less文件
import '@/assets/css/global.less'
import '@/assets/css/my-element.less'
//引入字体文件
import '@/assets/font/iconfont.css'
//引入vuex配置文件
import store from './store';
import myMsg from './utils/message';
Vue.use(ElementUI);
//安装全局消息显示函数
Vue.use(myMsg)
// 挂载全局
// Vue.prototype.$echarts = echarts
Vue.prototype.$echarts = window.echarts
Vue.prototype.$http = http


/* eslint-disable no-new */
new Vue({
  //挂载到vue实例中
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
