<!-- 注册 -->
<template>
  <el-row type="flex" justify="center" align="middle" class="com-container">
    <el-card class="cardstyle">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="my-form"
        label-position="right"
      >
        <div class="form-title">登录</div>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="账号/邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="button-submit"
            :loading="isSubmitLoading"
            >登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')" class="button-reset"
            >重置</el-button
          > -->
          <el-button @click="$router.replace('/regist')" class="button-submit"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <el-row type="flex" justify="start" align="middle">
              <el-col :span="12">
                <el-row type="flex" justify="start" align="middle">
                  <el-image
                    style="width: 20px; height: 20px"
                    :src="qq"
                    fit="fill"
                  ></el-image
                  ><span style="font-size: 14px; margin-left: 5px"
                    >使用qq登录</span
                  >
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end" align="middle">
                  <el-image
                    style="width: 20px; height: 20px"
                    :src="weibo"
                    fit="fill"
                  ></el-image
                  ><span style="font-size: 14px; margin-left: 5px"
                    >使用微博登录</span
                  >
                </el-row>
              </el-col>
            </el-row> -->
    </el-card>
  </el-row>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value)) {
        callback(
          new Error('密码至少分别包含一个大、小写字母和数字，总长度8-16')
        )
      } else {
        callback()
      }
    }

    var checkAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    return {
      isSubmitLoading: false,
      qq: require('@/assets/img/qq.png'),
      weibo: require('@/assets/img/weibo.png'),
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, validator: checkAccount, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginRequest()

          // this.isSubmitLoading = false
          // const { data } = await this.$http.post(
          //   'auth/login',
          //   this.$http.adornData(this.ruleForm, false)
          // )
          // this.$message({
          //   showClose: true,
          //   message: data.msg,
          //   type: data.code === 0 ? 'success' : 'error',
          // })
          // if (type === 'success') {
          //   this.$store.commit('initUser', data.data)
          //   this.$router.push('/screen')
          //   return true
          // }
        } else {
          // this.isSubmitLoading = false
          // return false
        }
      })
    },
    async loginRequest() {
      //按钮显示加载中动画
      this.isSubmitLoading = true
      console.log('loginrequest :>> ')
      try {
        const { data } = await this.$http.post(
          'auth/login',
          this.$http.adornData(this.ruleForm, false)
        )
      } catch (error) {
        this.showErrMsg('登录失败，无法连接服务器')
        this.isSubmitLoading = false
      }

      let type = data.code === 0 ? 'success' : 'error'

      this.showMsg(data.msg, type)

      if (type === 'success') {
        this.$store.commit('initUser', data.data)
        this.$router.push('/screen')
      }
      //请求完成，关闭加载动画
      this.isSubmitLoading = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  created() {
    // this.$http({
    //   url: 'auth/current',
    //   method: 'get',
    //   params: this.$http.adornParams({}),
    // }).then(({ data }) => {
    //   if (data.code === 0) {
    //     this.$message({
    //       showClose: true,
    //       message: data.msg,
    //     })
    //     this.$router.push('/screen')
    //   }
    // })
  },
  //离开当前路由时调用
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //   console.log('to,from,next :>> ', to, from, next)
  //   next()
  // },
}
</script>
<style scoped>
/* .button-submit { */
/* font-weight: bold; */
/* } */
</style>

