<template>
 <div class="login" >
    <el-form ref="form" :model="form" :rules="Loginformrules" status-icon label-width="80px">
         <h2>用户登录</h2>

  <el-form-item label="用户名"  prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  <!-- 按钮 -->
  <el-form-item>
    <el-button type="primary" @click="login()">登录</el-button>
    <el-button type="danger" @click="resetForm()">重置</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      Loginformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        // 密码校验
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          // this.$refs.form.setAttribute('status-icon', false)
          return false
        }
        // 发送请求
        const res = await this.$http.post('http://localhost:8888/api/private/v1/login', this.form)
        const { data, meta } = res.data
        if (meta.status === 200) {
          // 存储token
          localStorage.setItem('token', data.token)
          this.$message.success(meta.msg)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }

}
</script>

<style lang="less" scoped>
.login{
  height: 100%;
  background: url('../../assets/天使.png') no-repeat;
  background-size: cover;
  overflow: hidden;
  .el-form {
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
  padding: 40px 30px 20px 10px;
  margin-top: 200px;
  margin-left: 65%;
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  .el-button:first-child{
    margin-left: 40px;
  }
  .el-button:last-child{
      margin-left: 60px;
  }
}
}

</style>
