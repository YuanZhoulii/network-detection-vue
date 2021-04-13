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
        style="width: 350px"
        label-width="69px"
        @keyup.enter.native="submitForm('infoForm')"
      >
        <div class="form-title">我的信息</div>
        <el-form-item prop="nickname" label="昵称" :error="errorMsg.nickname">
          <el-input v-model="infoForm.nickname" placeholder="昵称"></el-input>
        </el-form-item>

        <el-form-item
          prop="oldPassword"
          label="原密码"
          :error="errorMsg.oldPassword"
        >
          <el-input
            type="password"
            v-model="infoForm.oldPassword"
            placeholder="原密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="newPassword"
          label="新密码"
          :error="errorMsg.newPassword"
        >
          <el-input
            type="password"
            v-model="infoForm.newPassword"
            placeholder="新密码（长度8-16）"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱" :error="errorMsg.email">
          <el-input
            type="email"
            v-model="infoForm.email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机" :error="errorMsg.mobile">
          <el-input v-model="infoForm.mobile" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio-group v-model="infoForm.gender">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="flex button-line"
          style="justify-content: flex-end"
        >
          <el-button
            type="primary"
            @click="submitForm('infoForm')"
            class="button-submit"
            :loading="isSubmitLoading"
            style="font-size: 15px; width: 280px"
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
        userId: null,
        nickname: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        mobile: '',
        gender: '性别',
      },
      errorMsg: {
        nickname: '',
        email: '',
        mobile: '',
        gender: '',
        oldPassword: '',
        newPassword: '',
      },
      isSubmitLoading: false,
      rules: {
        nickname: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: '昵称不能为空',
          },
        ],
        email: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: '邮箱不能为空',
          },
        ],
        // mobile: [
        //   {
        //     required: true,
        //     trigger: ['blur', 'change'],
        //     message: '手机号不能为空',
        //   },
        // ],
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {
    vuexInfo: {
      get() {
        return this.$store.state.user
      },
      set(user) {
        this.$store.commit('initUser', user)
      },
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    submitForm(formName) {
      //提交时先将后台传过来的错误信息置空
      this.clearErrMsg()

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateInfo()
        } else {
        }
      })
    },
    setVuexInfo() {
      let vuexUser = this.$store.state.user
      let curInfoForm = this.infoForm
      curInfoForm.userId = vuexUser.userId
      curInfoForm.nickname = vuexUser.nickname
      curInfoForm.email = vuexUser.email
      curInfoForm.mobile = vuexUser.mobile
      curInfoForm.gender = vuexUser.gender
      curInfoForm.oldPassword = ''
      curInfoForm.newPassword = ''
      console.error(curInfoForm)
    },
    async updateInfo() {
      this.isSubmitLoading = true
      console.log('updateInfo :>> ')
      let data = {}
      try {
        data = await this.$http.post(
          'auth/update',
          this.$http.adornData(this.infoForm, false)
        )
      } catch (error) {
        this.showErrMsg('更新失败，无法连接服务器')
        this.isSubmitLoading = false
      }
      data = data.data
      console.error('data', data)
      let type = data.code === 0 ? 'success' : 'error'

      if (type === 'success') {
        this.showMsg(data.msg, type)
        this.$store.commit('initUser', data.data)
        this.setVuexInfo()
        this.$router.replace('/info/' + this.infoForm.nickname)
      } else {
        this.errorMsg = data.errors
        // if (data.code === 10001) {
        //   this.showErrMsg(data.msg)
        // }
      }
      //请求完成，关闭加载动画
      this.isSubmitLoading = false
    },
    clearErrMsg() {
      let errMsg = this.errorMsg
      Object.keys(errMsg).forEach((key) => {
        errMsg[key] = ''
      })
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log('this.$route :>> ', this.$route.params.name)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {
    this.setVuexInfo()
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {
    // this.clearErrMsg()
    this.$refs['infoForm'].resetFields()
  },
}
</script>
<style scoped>
</style>