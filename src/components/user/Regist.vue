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
      >
        <div class="form-title">注册</div>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            ref="username_input"
            placeholder="账号（长度5-16）"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="密码（长度8-16）"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="确认密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="ruleForm.email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item class="flex">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="
              width: 300px !important;
              font-size: 15px !important;
              font-weight: bold;
            "
            >注册</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
        <el-form-item>
          <router-link
            to="/login"
            style="color: white; position: absolute; right: 0"
            >已有账号？直接登录</router-link
          >
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log("value:", value);
      //校验密码，必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-16之间
      let result = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value)
      // console.log("result:" + result);
      if (!result) {
        callback(new Error('密码至少分别包含一个大、小写字母和数字'))
      } else {
        //校验再次输入的密码是否与该密码一致
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        if (this.ruleForm.password !== '') {
          callback(new Error('两次输入密码不一致!'))
        }
      } else {
        callback()
      }
    }
    var checkAccount = (rule, value, callback) => {
      if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
        callback(new Error('账号以字母开头，可包含字母数字下划线'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
      },
      rules: {
        username: [
          {
            required: true,
            validator: checkAccount,
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ['blur', 'change'],
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: ['blur', 'change'],
          },
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //如果校验无误
        if (valid) {
          this.$http({
            url: 'auth/regist',
            method: 'post',
            data: this.$http.adornData(this.ruleForm, false),
          }).then(({ data }) => {
            let type = ''
            if (data.code === 0) {
              type = 'success'
            } else {
              type = 'error'
            }
            this.$message({
              showClose: true,
              message: data.msg,
              type: type,
            })
            if (type === 'success') {
              this.$router.push('/login')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    forceUpdate() {
      this.$forceUpdate()
    },
  },
  mounted() {
    this.$refs['username_input'].focus()
  },
  deactivated() {
    this.$refs['ruleForm'].resetFields()
  },
}
</script>
<style scoped>
.cardstyle {
  /* width: 400px; */
  /* margin-left: calc(calc(100-vw-400px) / 2); */
  border-radius: 10px;
  border-color: rgba(200, 200, 200, 1);
  background-color: rgba(200, 200, 200, 1);
  /* height: 400px; */
}
</style>