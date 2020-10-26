<template>
  <!-- 后台管理页面 -->
  <el-container class="admin">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <div class="aside-title">
        <!-- <img src="./../assets/logo.png" alt width="40px" height="40px" /> -->
        <h1>博客内容管理系统</h1>
      </div>
      <!-- 侧边栏菜单区域 -->
      <el-menu
        class="aside-menu"
        :default-active="this.$route.path"
        router
        background-color="#373d41"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item-group>
          <span slot="title">Dashboard</span>
          <el-menu-item index="/dashboard/welcome">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/post/add">
            <i class="el-icon-menu"></i>
            <span slot="title">发布博客</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="title">管理模块</span>
          <el-menu-item index="/dashboard/post">
            <i class="el-icon-menu"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/comment">
            <i class="el-icon-menu"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/category">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/tag">
            <i class="el-icon-menu"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="title">系统管理 </span>
          <el-menu-item index="/dashboard/option/base">
            <i class="el-icon-menu"></i>
            <span slot="title">基本设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/option/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户设置</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header class="header" height="40px">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎 {{displayName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goUserPage">用户信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 内容主体 -->
      <router-view class="main"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["displayName"]),
  },
  methods: {
    async logout() {
      const data = this.$store.dispatch("LOGOUT");
      if (data) {
        this.$message.success("登出成功");
        this.$router.push("/login");
      }
    },
    goUserPage() {
      this.$router.push("/dashboard/option/user");
    },
    handleCommand(command) {
      this[command]();
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.header {
  background-color: rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  .el-dropdown {
    cursor: pointer;
  }
}
.el-aside {
  background-color: #373d41;
  .aside-title {
    padding: 10px 0;
    text-align: center;
    color: #fff;
    border-bottom: 1px solid #8c9297;
  }
  .aside-menu {
    margin-top: 10px;
    text-align: left;
    border-right: none;
    .el-menu-item-group /deep/ el-menu-item-group__title {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>