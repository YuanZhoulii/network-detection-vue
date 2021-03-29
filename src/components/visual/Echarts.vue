<template>
  <!--background-color: #ffffff;-->
  <el-row
    type="flex"
    justify="center"
    align="middle"
    style="width: 100%; background-color: #ffffff"
  >
    <el-tabs v-model="activeName" @tab-click="tabClick" style="width: 90%">
      <el-tab-pane label="统计报告" name="first" style="width: 100%">
        <el-collapse v-model="activeNames" @change="handleChange">
          <item title="全国分布" name="1">
            <visual-map></visual-map>
          </item>
          <item title="全国Top10" name="2">
            <visual-map></visual-map>
          </item>
          <item :title="top1 + '数据分布'" name="3">
            <visual-map></visual-map>
          </item>
          <item :title="top1 + '数据统计'" name="4">
            <visual-map></visual-map>
          </item>
          <item title="端口分布" name="4">
            <visual-map></visual-map>
          </item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import Item from './my-el-collapse-item'
import VisualMap from './map'
export default {
  name: 'Echarts',
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      top1: '湖北',
      activeName: 'first',
    }
  },
  components: {
    Item,
    VisualMap,
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    tabClick(tab, event) {
      console.log(tab, event)
    },
  },
  mounted() {
    console.log(this.$route.params.name) // ming
    console.log(this.$route.params.age) // 18

    // this.$nextTick(() => {
    //   document.getElementsByClassName('navigation')[0].style.backgroundColor =
    //     'white'
    //   document.getElementById('mainContent').style.backgroundColor = 'white'
    // })
  },
}
</script>

<style scoped>
</style>



