<template>
  <div class="com-container">
    <div class="trend-title" :style="comstyle">
      <span>{{ '▎ ' + showTitle }}</span>
      <!--通过引入的字体实现下拉箭头-->
      <span
        class="iconfont title-icon"
        :style="comstyle"
        @click="showChoice = !showChoice"
        >&#xe6eb;</span
      >
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstane: null,
      allData: null, // 从服务器中获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: 'service', // 显示的数据类型
      titleFontSize: 0, // 指明标题的字体大小
    }
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
  computed: {
    selectTypes() {
      if (!this.allData) {
        return []
      } else {
        //下拉菜单不显示当前项
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType
        })
      }
    },
    showTitle() {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },

    //设置给标题的样式
    comstyle() {
      return {
        fontSize: this.titleFontSize / 1.6 + 'px',
        paddingTop: '14px',
        marginLeft: '5px',
      }
    },
    marginStyle() {
      return {
        paddingLeft: this.titleFontSize / 2.5 + 'px',
      }
    },
  },
  methods: {
    initChart() {
      this.chartInstane = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
        },
      }
      this.chartInstane.setOption(initOption)
    },
    async getData() {
      // 对allData进行赋值
      const { data } = await this.$http.get('visual/echarts/trend')
      this.allData = data.data
      console.log('allData', this.allData)
      this.updateChart()
    },
    updateChart() {
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)',
        'rgba(238, 221, 120, 0.5)',
        'rgba(115, 163, 115, 0.5)',
        'rgba(115, 185, 188, 0.5)',
        'rgba(114, 137, 171, 0.5)',
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)',
        'rgba(238, 221, 120, 0)',
        'rgba(115, 163, 115, 0)',
        'rgba(115, 185, 188, 0)',
        'rgba(114, 137, 171, 0)',
      ]
      //类目轴数据
      const timeArr = this.allData.common.years
      //y轴数据 series下的数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        console.log('index', index)
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          //堆叠效果
          stack: this.choiceType,
          //填充效果
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color:
                  index > colorArr1.length - 1
                    ? colorArr1[index % colorArr1.length]
                    : colorArr1[index],
              }, // %0的颜色值
              {
                offset: 1,
                color:
                  index > colorArr2.length - 1
                    ? colorArr2[index % colorArr2.length]
                    : colorArr2[index],
              }, // 100%的颜色值
            ]),
          },
        }
      })
      //图例数据
      const legendArr = valueArr.map((item) => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      }
      this.chartInstane.setOption(dataOption)
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.trend_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        //图例大小
        legend: {
          itemWidth: this.titleFontSize / 1.8,
          itemHeight: this.titleFontSize / 1.8,
          itemGap: this.titleFontSize / 1.8,
          textStyle: {
            fontSize: this.titleFontSize / 1.8,
          },
        },
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
    handleSelect(currentType) {
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
    },
  },
}
</script>

<style lang="less" scoped>
.trend-title {
  //设置后不会把下面100%宽高的盒子往下挤
  position: absolute;
  //   left: 20px;
  //   top: 20px;
  padding-left: 20px;
  padding-top: 10px;
  //设置层级
  z-index: 10;
  color: white;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-con {
    background-color: #222733;
  }
}
</style>
