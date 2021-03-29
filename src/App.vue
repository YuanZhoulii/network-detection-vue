<template>
  <div id="app">
    <my-bg></my-bg>
    <el-container class="com-container">
      <el-header class="com-header">
        <my-header></my-header>
      </el-header>
      <el-main class="com-main">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/common/header'
import BackGround from './components/common/background'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    'my-header': Header,
    'my-bg': BackGround,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['initUser', 'clearUser']),
    async getLoginUser() {
      try {
        const { data } = await this.$http.get('auth/current')
      } catch (error) {
        //请求服务器失败
        this.showErrMsg('无法连接服务器')
        //清空之前保存的用户信息
        if (this.user) {
          this.clearUser()
        }
        //回到登录页
        this.$router.replace('/login')
      }
    },
    showRouteMsg() {
      if (!this.user && this.$route.meta.auth) {
        this.showMsg('您尚未登录', 'warning')
      }
      if (this.user && !this.$route.meta.auth) {
        this.showMsg('您已登录')
      }
    },
  },

  created() {
    // this.showRouteMsg()
  },

  watch: {
    $route(to, from) {
      console.log('route change')
      this.getLoginUser()
      this.showRouteMsg()
    },
  },
}
</script>

<style>
/* @import "../static/css/style.css"; */

.com-main {
  width: 100%;
  height: 80%;
  padding: 0;
  overflow: hidden;
}
/*导航菜单*/
.com-header {
  height: 20%;
  width: 100%;
}
</style>
