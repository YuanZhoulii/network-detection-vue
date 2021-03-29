<!-- 热销商品图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle"
      >&#xe6ef;</span
    >
    <span class="iconfont arr-right" @click="toRight" :style="comStyle"
      >&#xe6ed;</span
    >
    <!-- <span class="cat-name" :style="comStyle">{{ catName }}</span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前所展示出的一级分类数据
      titleFontSize: 0,
    }
  },
  computed: {
    catName() {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px',
        marginBottom: '20px',
      }
    },
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, 'chalk')
      this.chartInstance.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
      })
      const initOption = {
        title: {
          left: 10,
          top: 10,
        },
        legend: {
          //   top: '15%',
          //   icon: 'circle',
          show: false,
        },
        tooltip: {
          show: true,
          trigger: 'item',
          //   formatter: '{b0}<br />合计：{c0}（{d}%）',
          formatter: (arg) => {
            // console.log('arg', arg)
            let result =
              arg.name + '<br/>Sum：' + arg.value + '（' + arg.percent + '%）'
            // if (this.catName === '端口') {
            //   result =
            //     '端口：' +
            //     arg.name +
            //     '<br/>Sum：' +
            //     arg.value +
            //     '（' +
            //     arg.percent +
            //     '%）'
            // } else if (this.catName === '操作系统') {
            //   result =
            //     '操作系统：' +
            //     arg.name +
            //     '<br/>Sum：' +
            //     arg.value +
            //     '（' +
            //     arg.percent +
            //     '%）'
            // }
            return result
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: true,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      const { data } = await this.$http.get('visual/echarts/hot')
      this.allData = data.data
      // console.log(this.allData)
      this.updateChart()
    },
    updateChart() {
      // 处理图表需要的数据
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => {
          return item.name
        }
      )
      // console.log('legendData', legendData)
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
          }
        }
      )
      // console.log('seriesData', seriesData)
      const dataOption = {
        // legend: {
        //   data: legendData,
        // },
        title: {
          text: '▎ ' + this.catName + '数据占比',
        },
        series: [
          {
            data: seriesData,
          },
        ],
      }
      setTimeout(() => {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(dataOption)
      }, 100)
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.hot_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
        legend: {
          itemWidth: this.titleFontSize / 2,
          itemHeight: this.titleFontSize / 2,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
        },
        series: [
          {
            center: ['50%', '55%'],
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    toLeft() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateChart()
    },
    toRight() {
      this.currentIndex++
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateChart()
    },
  },
}
</script>

<style lang='less' scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
