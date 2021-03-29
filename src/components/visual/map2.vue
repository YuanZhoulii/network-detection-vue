<!-- 商家分布图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
// import axios from 'axios'
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      myData: [
        { name: '北京', value: 100 },
        { name: '天津', value: 39.13 },
        { name: '上海', value: 31.22 },
        { name: '重庆', value: 66 },
        { name: '河北', value: 147 },
        { name: '河南', value: 113 },
        { name: '云南', value: 25.04 },
        { name: '辽宁', value: 50 },
        { name: '黑龙江', value: 114 },
        { name: '湖南', value: 175 },
        { name: '安徽', value: 117 },
        { name: '山东', value: 92 },
        { name: '新疆', value: 84 },
        { name: '江苏', value: 67 },
        { name: '浙江', value: 84 },
        { name: '江西', value: 96 },
        { name: '湖北', value: 273 },
        { name: '广西', value: 59 },
        { name: '甘肃', value: 99 },
        { name: '山西', value: 39 },
        { name: '内蒙古', value: 58 },
        { name: '陕西', value: 61 },
        { name: '吉林', value: 51 },
        { name: '福建', value: 29 },
        { name: '贵州', value: 71 },
        { name: '广东', value: 38 },
        { name: '青海', value: 57 },
        { name: '西藏', value: 24 },
        { name: '四川', value: 58 },
        { name: '宁夏', value: 52 },
        { name: '海南', value: 54 },
        { name: '台湾', value: 88 },
        { name: '香港', value: 66 },
        { name: '澳门', value: 77 },
        { name: '南海诸岛', value: 55 },
      ],
    }
  },
  mounted() {
    this.initChart()
    // this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    mapOption() {
      //将数组排序，得到最大值和最小值
      let sortData = this.allData.sort((a, b) => b.value - a.value)
      let max = sortData[0].value
      let min = sortData[sortData.length - 1].value
      // console.log('max,min :>> ', max, min)
      let option = {
        title: {
          text: '▎ 全国分布',
          left: 10,
          top: 10,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b0}: {c0}',
        },
        geo: {
          type: 'map',
          map: 'china', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: false, // 设置允许缩放以及拖动的效果
          top: '5%',
          bottom: '5%',

          label: {
            show: true, // 展示标签
            align: 'left',
            verticalAlign: 'top',
            color: 'black',
            fontWeight: 'bold',
          },
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333',
          },
        },
        series: [
          {
            data: this.allData,
            geoIndex: 0, // 将数据和第0个geo配置关联在一起
            type: 'map',
          },
        ],
        visualMap: {
          min: min,
          max: max,
          text: ['High', 'Low'],
          left: '5%',
          bottom: '5%',
          inRange: {
            color: ['white', '#2e72bf'], // 控制颜色渐变的范围
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          calculable: true, // 出现滑块
        },
      }
      return option
    },
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      this.chartInstance.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
      })

      this.getData()

      // 获取中国地图的矢量数据
      const ret = await this.$http.get('static/map/china.json')
      // console.log('ret', ret)
      this.$echarts.registerMap('china', ret.data)
      setTimeout(() => {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(this.mapOption)
      }, 100)
    },
    async getData() {
      // 获取服务器的数据, 对this.myData进行赋值之后, 调用updateChart方法更新图表
      const { data } = await this.$http.get('visual/echarts/map')

      this.allData = data.data
      this.updateChart()
    },
    updateChart() {
      // console.log('myData', this.myData)
      this.chartInstance.setOption(this.mapOption)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize / 1.6,
          },
        },
        visualMap: {
          itemWidth: titleFontSize / 1.5,
          itemHeight: titleFontSize * 3,
        },
        geo: {
          label: {
            // fontSize: titleFontSize / 2.8,
            fontSize: titleFontSize / 2,
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
  },
}
</script>

<style lang='less' scoped>
</style>
