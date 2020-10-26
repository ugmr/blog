<template>
  <el-main class="home">
    <div class="title">管理首页</div>
    <ul class="summary">
      <li class="summary-item">
        <el-card>
          <div class="summary-title big">新增博客</div>
          <router-link class="summary-path" to="/dashboard/post/add"
            >go this page</router-link
          >
        </el-card>
      </li>
      <li class="summary-item">
        <el-card>
          <div class="summary-title big">11</div>
          <div class="summary-title medium">文章总数</div>
          <router-link class="summary-path" to="/dashboard/post/add"
            >more info</router-link
          >
        </el-card>
      </li>
      <li class="summary-item">
        <el-card>
          <div class="summary-title big">11</div>
          <div class="summary-title medium">评论总数</div>
          <router-link class="summary-path" to="/dashboard/post/add"
            >more info</router-link
          >
        </el-card>
      </li>
      <li class="summary-item">
        <el-card>
          <div class="summary-title big">11</div>
          <div class="summary-title medium">分类总数</div>
          <router-link class="summary-path" to="/dashboard/post/add"
            >more info</router-link
          >
        </el-card>
      </li>
      <li class="summary-item">
        <el-card>
          <div class="summary-title big">11</div>
          <div class="summary-title medium">标签总数</div>
          <router-link class="summary-path" to="/dashboard/post/add"
            >more info</router-link
          >
        </el-card>
      </li>
    </ul>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      summaryStyle: [
        "#1497ae",
        "#239740",
        "#006ffb",
        "#ffba27",
        "#d83440",
        "#2e3338",
      ],
    };
  },
};
</script>

<style scoped lang="less">
.title {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  margin-top: 20px;
  font-size: 20px;
  border-bottom: 2px solid #999;
}
.summary {
  display: block;
  margin-top: 50px;
  padding: 0 20px;
  list-style: none;
  text-align: left;
  .summary-item {
    display: inline-block;
    width: 300px;
    margin-top: 30px;
    margin-left: 50px;
    .el-card {
      position: relative;
      height: 150px;
      .summary-title {
        color: #fff;
        font-weight: 900;
      }
      .big {
        font-size: 35px;
      }
      .medium {
        font-size: 20px;
      }
      .summary-path {
        text-align: center;
        text-decoration: none;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        line-height: 30px;
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        background-color: rgba(0, 0, 0, 0.2);
        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
    &:nth-child(1) .el-card {
      background-color: #1497ae;
    }
    &:nth-child(2) .el-card {
      background-color: #239740;
    }
    &:nth-child(3) .el-card {
      background-color: #006ffb;
    }
    &:nth-child(4) .el-card {
      background-color: #ffba27;
    }
    &:nth-child(5) .el-card {
      background-color: #d83440;
    }
  }
}
</style>