<template>
  <!--cursor: pointer显示手形-->
  <el-container class="outer">
    <el-main class="el-main-height-100">
      <el-row type="flex" justify="center" align="bottom" style="height: 50%">
        <div class="title" style="color: white">网络资源探测系统</div>
      </el-row>
      <el-row type="flex" justify="center" align="top" style="height: 50%">
        <el-autocomplete
          :ref="1235"
          class="inline-input"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          style="width: 600px"
          @select="handleSelect"
          :clearable="true"
          :autofocus="true"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"
            >搜索</el-button
          >
        </el-autocomplete>
      </el-row>
    </el-main>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      suggestions: [],
      state: '',
    }
  },
  methods: {
    search() {
      if (this.state.trim() !== '') {
        this.$router.push({
          name: 'echarts',
          params: {
            name: 'ming',
            age: 18,
          },
        })
      }

      console.log('search..............')
    },
    querySearch(queryString, cb) {
      var suggestions = this.suggestions
      // var results = queryString
      //   ? suggestions.filter(this.createFilter(queryString))
      //   : suggestions

      //使用map操作给搜索关键词添加建议列表中每个的value前缀
      var results = suggestions.map((val) => {
        let trans = {}
        trans.value = val.value + queryString.trim()
        return trans
      })

      //调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (suggestions) => {
        return (
          suggestions.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: 'IP:' },

        { value: 'SERVICE:' },
        { value: 'PORT:' },
        { value: 'OS:' },
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
  },
  mounted() {
    this.suggestions = this.loadAll()
    //加载组件聚焦输入框
    this.$refs['1235'].focus()
  },
}
</script>

<style scoped>
.el-main-height-100 {
  height: 100%;
}
.outer {
  height: 100%;
  width: 100%;
}
</style>