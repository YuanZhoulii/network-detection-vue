<!-- 全国top10条形图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="bar_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      barData: null, //服务器返回数据
      //一页只显示5条，需要进行分页
      currentPage: 1, //当前显示页数
      totalPage: 0, //总页数
      timerId: null, //定时器标识
    }
  },

  // 方法集合
  methods: {
    //初始化echartInstance对象
    initChart() {
      //设置主题chalk
      this.chartInstance = this.$echarts.init(this.$refs.bar_ref, 'chalk')
      this.chartInstance.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
      })
      const initOption = {
        title: {
          text: '▎ 全国TOP10',
          //设置标题左边距和上边距
          left: 10,
          top: 10,
        },
        //配置坐标轴边距
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          // 距离包含坐标轴文字
          containLabel: true,
        },
        //x轴
        xAxis: {
          type: 'value',
        },
        //y轴
        yAxis: {
          type: 'category',
        },
        tooltip: {
          //鼠标移动到坐标轴时显示标签和value
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            //把层级调低，避免遮挡图形
            z: 0,
            lineStyle: {
              color: '#2D3443',
            },
          },
        },
        series: [
          {
            type: 'bar',
            label: {
              //在每个条形右边显示value，颜色为黑色
              show: true,
              position: 'right',
              textStyle: {
                color: 'white',
              },
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              //0 0         1 0
              //0 1         1 1
              //0,0,1,0是从左往右
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: '#5052EE',
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: '#AB6EE5',
                },
              ]),
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
      //对图表对象进行鼠标事件监听
      //鼠标移动到图表时关闭自动切换图表定时器
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      //鼠标移开时重新开始切换
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    //获取服务器数据
    async getData() {
      //http://localhost:88/api/visual/bar
      //   this.$http({
      //     url: 'visual/echarts/bar/top10',
      //     method: 'get',
      //     params: this.$http.adornParams({}),
      //   }).then(({ data }) => {
      //     console.log(data)
      //     this.barData = data.data
      //     this.updateChart()
      //   })
      const { data } = await this.$http.get('visual/echarts/bar/top10')
      // console.log('data', data)
      this.barData = data.data
      this.barData.sort((a, b) => {
        return a.value - b.value //按value值从小到大排序
      })
      //每5个元素显示一页
      this.totalPage =
        this.barData.length % 5 == 0
          ? this.barData.length / 5
          : this.barData.length / 5 + 1
      //根据获取到的服务器数据更新图表
      this.updateChart()
      // 启动图表切换定时器
      this.startInterval()
    },
    //更新图表
    updateChart() {
      //计算每页的开始与结束索引
      const start = (this.currentPage - 1) * 5 //0
      const end = this.currentPage * 5 //5
      //将数据进行切分
      const showData = this.barData.slice(start, end) //[0,5)
      //得到数据标签
      const labels = showData.map((item) => {
        return item.name
      })
      //得到数据value
      const values = showData.map((item) => {
        return item.value
      })
      //数据设置
      const dataOption = {
        //y轴
        yAxis: {
          data: labels,
        },

        series: [
          {
            data: values,
          },
        ],
      }

      setTimeout(() => {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(dataOption)
      }, 100)
    },
    startInterval() {
      //清空之前定时器
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      //每3秒执行一次切换
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000)
    },
    //当浏览器大小发生变化时调用，完成屏幕适配
    screenAdapter() {
      // console.log(this.$refs.seller_ref.offsetWidth)
      const titleFontSize = (this.$refs.bar_ref.offsetWidth / 100) * 3.6
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            //设置标题字体大小
            // fontSize: titleFontSize / 1.6,
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            //设置每个条形的宽度
            barWidth: titleFontSize,
            itemStyle: {
              //设置每个条形圆角效果
              //左上 右上 右下 左下
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    },
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initChart()
    this.getData()
    //窗口变化事件监听
    window.addEventListener('resize', this.screenAdapter)
    //在页面加载完成后进行屏幕适配
    this.screenAdapter()
    // var video = document.getElementById('myvideo')
    // video.style.display = 'none'
  },

  destroyed() {
    //关闭定时器
    clearInterval(this.timerId)
    //关闭事件监听
    window.removeEventListener('resize', this.screenAdapter)
  },
}
</script>
<style scoped>
</style>