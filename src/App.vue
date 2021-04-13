<template>
  <div id="app">
    <!--背景视频-->
    <my-bg></my-bg>
    <!--布局容器-->
    <el-container class="com-container">
      <el-header class="com-header">
        <!--顶部导航栏-->
        <my-header></my-header>
      </el-header>
      <el-main class="com-main">
        <!--缓存组件，只创建一次组件，之后不再创建-->
        <keep-alive>
          <!--内容区域，根据当前路由动态切换-->
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//导入vuex操作函数和顶部导航栏组件、背景视频组件
import Header from './components/common/header'
import BackGround from './components/common/background'
export default {
  name: 'App',
  //注册导入的组件
  components: {
    'my-header': Header,
    'my-bg': BackGround,
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

 
