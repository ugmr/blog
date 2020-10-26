<template>
  <el-main class="option-base">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item> 基本设置 </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表单 -->
      <el-form
        :model="baseOptionForm"
        :rules="baseOptionFormRules"
        ref="baseOptionFormRef"
        label-width="100px"
      >
        <el-form-item label="网站名称" prop="title">
          <el-input v-model="baseOptionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="logo地址" prop="logoUrl">
          <el-input v-model="baseOptionForm.logoUrl"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" prop="description">
          <el-input v-model="baseOptionForm.description"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="siteUrl">
          <el-input v-model="baseOptionForm.siteUrl"></el-input>
        </el-form-item>
        <el-form-item label="favicon地址" prop="faviconUrl">
          <el-input v-model="baseOptionForm.faviconUrl"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="baseOptionForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="github地址" prop="githubUrl">
          <el-input v-model="baseOptionForm.githubUrl"></el-input>
        </el-form-item>
        <el-form-item label="微博地址" prop="weiboUrl">
          <el-input v-model="baseOptionForm.weiboUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站备案号" prop="miitbeian">
          <el-input v-model="baseOptionForm.miitbeian"></el-input>
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
      baseOptionForm: {
        title: "",
        logoUrl: "",
        description: "",
        siteUrl: "",
        faviconUrl: "",
        keywords: "",
        githubUrl: "",
        weiboUrl: "",
        miitbeian: "",
      },
      baseOptionFormRules: {},
    };
  },
  computed: {
    ...mapGetters(['optionList'])
  },
  mounted() {
    this.getBaseOption()
  },
  methods: {
    async getBaseOption() {
      const result = await this.$store.dispatch('FETCH_OPTION_LIST')
      if(!result) return this.$message.error('获取设置信息失败')
      for(let {key, value} of this.optionList){
        this.baseOptionForm[key] = value
      }
    },
    async commit() {
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
      const patchData = this.pacth2JSON()
      const result = await this.$store.dispatch('UPDATE_OPTION_LIST', patchData)
      if(!result) return this.$message.error('修改配置失败')
      this.getBaseOption()
      this.$message.success('修改配置成功')
    },
    pacth2JSON() {
      let result = []
      for(let item of this.optionList) {
        let {key, value} = item
        if(!(key in this.baseOptionForm) || value === this.baseOptionForm[key]) continue
        item.value = this.baseOptionForm[key]
        result.push(item)
        console.log(result)
      }
      return result
    }
  },
};
</script>

<style>
</style>