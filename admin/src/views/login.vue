<template>
  <div class="login">
    <div class="container">
      <el-form
        class="login_form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="header">
          <h2>博客后台管理系统</h2>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            placeholder="用户名"
            prefix-icon="iconfont icon-ic_username"
            v-model="loginForm.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="iconfont icon-ic_password"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="commit" class="btns">
          <el-button type="primary" round @click="login">登陆</el-button>
          <el-button round @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
      },
      loginFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "用户名长度应为 6 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度应为 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      const data = await this.$store.dispatch('LOGIN', this.loginForm)
      if(!data) return this.$message.error('用户名或密码错误')
      this.$message.success('欢迎使用博客内容管理系统 , ' + data + '  !')
      this.$router.push('/dashboard')
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}
.container {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.login_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
