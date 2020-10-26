<template>
  <el-main class="option-user">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>账号设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表单 -->
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="userFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="displayName">
          <el-input v-model="userForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按钮 -->
      <el-row type="flex" justify="end">
        <!-- 添加商品按钮 -->
        <el-col :span="2">
          <el-button type="primary" round @click="commit">提交</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      userForm: {
        _id: '',
        name: '',
        password: '',
        displayName: '',
        email: ''
      },
      userFormRules: {
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
        ]
      },
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const query = {
        params: {limit: 1}
      }
      const result = await this.$store.dispatch('FETCH_USER_INFO', query)
      if(!result) this.$message.error('获取账户信息失败')
      Object.assign(this.userForm, this.userInfo)
    },
    async commit() {
       this.$refs.userFormRef.validate(async valid=>{
         if(!valid) return
         const confirmResult = await this.$confirm(
        '确定提交吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') return
      const result = await this.$store.dispatch('UPDATE_USER_INFO', this.userForm)
      if (!result) return this.$message.error('修改用户信息失败')
      this.getUserInfo()
      this.$message.success('修改配置成功')
       })
    },
  }
};
</script>

<style>
</style>