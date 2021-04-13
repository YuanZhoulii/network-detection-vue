<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    class="header-container"
    :style="headerStyle"
  >
    <el-col :span="7">
      <el-button
        :type="screenButtonType"
        icon="el-icon-pie-chart"
        @click="toScreen"
        >可视化</el-button
      >
    </el-col>
    <el-col :span="10" class="header-title" v-show="showTitle">
      网络资源可视化
    </el-col>
    <el-col :span="7">
      <div v-show="!user">
        <!--el-row-100-->
        <el-row type="flex" justify="end" align="middle">
          <el-button
            type="primary"
            icon="el-icon-s-custom"
            @click="$router.replace('/login')"
            >登录</el-button
          >
          <!-- <el-button
                  icon="el-icon-circle-plus"
                  @click="$router.push('/regist')"
                  >注册</el-button
                > -->
        </el-row>
      </div>

      <el-row type="flex" justify="end" v-show="user">
        <!--头像及下拉菜单-->

        <el-dropdown
          @command="dropdownRouter"
          placement="bottom"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
          "
        >
          <el-avatar
            size="large"
            fit="fit"
            :src="circleUrl"
            style="cursor: pointer; margin: 0 auto; margin-top: 10px"
            @click.native="dropdownRouter('info')"
            ><i class="el-icon-arrow-down el-icon--right"></i>
          </el-avatar>
          <span
            style="
              font-size: 18px;
              font-weight: bold;
              cursor: text;
              color: #c0c4cc;
            "
          >
            {{ user ? user.nickname : '' }}
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 143px; flex-direction: column"
          >
            <el-dropdown-item command="info"
              ><i
                style="font-size: 18px; font-weight: bold"
                class="el-icon-user"
              >
                我的信息</i
              ></el-dropdown-item
            >
            <el-dropdown-item command="exit"
              ><i
                style="font-size: 18px; font-weight: bold"
                class="el-icon-close"
              >
                退出</i
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'my-header',
  data() {
    return {
      //头像默认图片地址
      circleUrl: require('../../../src/assets/img/avatar.png'),
      // bgUrl: require('../../../src/assets/img/1.jpg'),
    }
  },
  methods: {
    toScreen() {
      if (this.user !== null) {
        this.$router.replace('/screen')
      } else {
        this.showMsg('您尚未登录', 'warning')
      }
    },
    //下拉菜单路由
    dropdownRouter(command) {
      if (command === 'exit') {
        this.logout()
      } else if (command === 'info') {
        if (this.user && this.user.nickname) {
          this.$router.replace('/info/' + this.user.nickname)
        }
      } else {
        this.$router.replace('/' + command)
      }
    },
    async logout() {
      const { data } = await this.$http.get('auth/exit')
      if (data.code === 0) {
        this.showMsg('登出成功')
        this.$store.commit('updateLogOut', true)
        this.$store.commit('clearUser')
        this.$router.replace('/login')
      }
    },
  },
  created() {
    // console.log('header created')
    // this.$store.dispatch('getLoginUser')
  },
  destroyed() {
    // console.log('header destroyed')
  },
  mounted() {},
  computed: {
    showTitle() {
      return this.$route.path === '/screen'
    },
    headerStyle() {
      return this.$route.path === '/screen'
        ? { backgroundColor: '#161522' }
        : {}
    },
    screenButtonType() {
      return this.$store.state.user === null ? 'info' : 'primary'
    },
    ...mapState(['user']),
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    // $route: ['updateStatus'],
  },
}
</script>

<style lang='less' scoped>
// @import '../../assets/css/header.less';
// 网络资源可视化标题样式
.header-title {
  color: white;
  font-size: 25px;
  text-align: center;
  font-family: '黑体';
}
.header-container {
  width: 100%;
  padding: 0 20px;
  margin: 0;
  height: 100%;
}
</style>