<template>
  <!-- <div class="screen-container">
    <div class="screen-body"> -->
  <el-container
    class="screen-container"
    v-loading="!$store.getters.isChartLoading"
  >
    <el-aside
      style="width: 40%; height: 100%; padding-right: 20px; position: relative"
    >
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="width: 100%; height: 50%; position: relative"
      >
        <Hot></Hot>
      </el-row>
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="width: 100%; height: 50%; position: relative; padding-top: 25px"
      >
        <Bar></Bar>
      </el-row>
    </el-aside>
    <el-main style="width: 60%; height: 100%">
      <el-container style="width: 100%; height: 100%">
        <el-aside style="width: 100%; height: 100%; position: relative"
          ><Map></Map
        ></el-aside>
        <!-- <el-main style="width: 40%; height: 100%">
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="width: 100%; height: 50%; position: relative"
          >
            <Rank></Rank>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="
              width: 100%;
              height: 50%;
              position: relative;
              padding-top: 25px;
            "
          >
            <Trend></Trend> </el-row
        ></el-main> -->
      </el-container>
    </el-main>
  </el-container>

  <!-- <Bar></Bar>
      <Trend></Trend> -->
  <!-- </div>
  </div> -->
</template>

<script>
import Hot from './pie.vue'
import Map from './map.vue'
import Bar from './bar.vue'

import Rank from './rank.vue'
import Trend from './trend.vue'

// import { getThemeValue } from '@/utils/theme_utils'
export default {
  created() {
    // 注册接收到数据的回调函数
    // const loading = this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)',
    // })
  },
  destroyed() {},
  data() {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
      },
    }
  },
  methods: {
    changeSize(chartName) {},
    // 接收到全屏数据之后的处理
    recvData(data) {},
    handleChangeTheme() {},
    recvThemeChange() {},
  },
  components: {
    Hot,
    Map,
    Rank,
    Bar,
    Trend,
  },
  computed: {
    // logoSrc() {
    //   return '/static/img/' + getThemeValue(this.theme).logoSrc
    // },
    // headerSrc() {
    //   return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    // },
    // themeSrc() {
    //   return '/static/img/' + getThemeValue(this.theme).themeSrc
    // },
    // containerStyle() {
    //   return {
    //     backgroundColor: getThemeValue(this.theme).backgroundColor,
    //     color: getThemeValue(this.theme).titleColor,
    //   }
    // },
  },
}
</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 10px;
  //   margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 47%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
