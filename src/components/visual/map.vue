<!-- 地图 -->
<template>
  <div id="visual-map" ref="visual-map"></div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      myData: [
        { name: '北京', value: 39.92 },
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
  // 监听属性 类似于data概念
  computed: {
    mapOption() {
      let option = {
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: false, // 设置允许缩放以及拖动的效果
          label: {
            show: true, // 展示标签
          },
        },
        series: [
          {
            data: this.myData,
            geoIndex: 0, // 将数据和第0个geo配置关联在一起
            type: 'map',
          },
        ],
        visualMap: {
          min: 0,
          max: 300,
          text: ['High', 'Low'],
          inRange: {
            color: ['white', 'blue'], // 控制颜色渐变的范围
          },
          calculable: true, // 出现滑块
        },
      }
      return option
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    myEcharts() {
      var vm = this
      // 基于准备好的dom，初始化echarts实例
      //   var myChart = this.$echarts.init(document.getElementById('visual-map'))
      var myChart = this.$echarts.init(vm.$refs['visual-map'],)

      axios.get('static/json/china.json').then(({ data, status }) => {
        // let { data,status } = res

        if (status === 200) {
          vm.$echarts.registerMap('chinaMap', data)
          myChart.setOption(vm.mapOption)
        }
      })
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.myEcharts()
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
#visual-map {
  width: 720px;
  height: 480px;
}
</style>