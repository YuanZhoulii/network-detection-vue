<!-- 网页背景（图片/视频） -->
<template>
  <div class="net-bg">
    <!--图片全屏-->
    <!-- <img :src="bgUrl" width="100%" height="100%" alt="" /> -->

    <!-- <video
        src="./assets/video/video.mp4"
        muted="muted"
        autoplay="autoplay"
        loop="loop"
        style="
          position: fixed;
          top: 0;
          left: 0;
          height: 1000px;
          z-index: -99;
          margin-top: -15%;
        "
      ></video> -->
    <video
      ref="myvideo"
      src="../../assets/video/video.mp4"
      muted="muted"
      autoplay="autoplay"
      loop="loop"
      v-show="isShowVideo"
    ></video>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {
    isShowVideo() {
      let routes = ['screen']
      //去除path中的第一个斜杠
      let path = this.$route.path.substr(1)
      let find = routes.includes(path)
      return !find
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log('background created')
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {
    // console.log('background destroyed')
  }, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
/*背景*/
.net-bg {
  height: 100%;
  width: 100%;
  object-fit: fill;
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  /**模糊效果 */
  /* filter: blur(1px); */
}

video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>