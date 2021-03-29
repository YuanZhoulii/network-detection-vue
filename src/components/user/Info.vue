<!-- 个人资料 -->
<template>
  <el-row type="flex" justify="center" align="middle" class="com-container">
    <!-- <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="2"> -->
    <el-card class="cardstyle">
      <el-form
        :model="infoForm"
        status-icon
        :rules="rules"
        ref="infoForm"
        label-position="right"
        style="width: 350px"
      >
        <div class="form-title">我的信息</div>
        <el-form-item prop="nickname">
          <el-input
            v-model="infoForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>

        <el-form-item prop="oldPassword">
          <el-input
            type="password"
            v-model="infoForm.oldPassword"
            autocomplete="off"
            placeholder="请输入原密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="newPassword">
          <el-input
            type="password"
            v-model="infoForm.newPassword"
            autocomplete="off"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="infoForm.email"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <el-form-item class="flex button-line">
          <el-button
            type="primary"
            @click="submitForm('infoForm')"
            class="button-submit"
            :loading="isSubmitLoading"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- </el-col> -->
  </el-row>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      //表单数据
      infoForm: {
        nickname: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        mobile: '',
        gender: '',
        avatar: '',
      },
      isSubmitLoading: false,
      rules: {
        nickname: [{ required: true, trigger: 'blur' }],
        // password: [{ required: true, trigger: 'blur' }],
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    submitForm(formName) {
      //按钮显示加载中动画
      this.isSubmitLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
        }
      })
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log('this.$route :>> ', this.$route.params.name)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
</style>