<template>
  <el-main class="post">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="inner">
      <!-- 搜索框 和 按钮 -->
      <el-row class="header" type="flex" justify="space-between">
        <!-- 搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            @clear="getPostList"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getPostList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品按钮 -->
        <el-col :span="2">
          <el-button type="primary" round @click="goAddPage"
            >添加文章</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="postList"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column
          label="路径"
          prop="pathName"
          width="150px"
        ></el-table-column>
        <el-table-column label="是否公开" prop="isPublic" width="80px">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.isPublic"
              type="success"
              icon="el-icon-check"
              size="mini"
              circle
            ></el-button>
            <el-button
              v-else
              type="success"
              icon="el-icon-close"
              size="mini"
              circle
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="允许评论" prop="allowComment" width="80px">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.allowComment"
              type="success"
              icon="el-icon-check"
              size="mini"
              circle
            ></el-button>
            <el-button
              v-else
              type="success"
              icon="el-icon-close"
              size="mini"
              circle
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" width="160px">
          <template v-slot="scope">{{
            scope.row.createdAt | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateAt" width="160px">
          <template v-slot="scope">{{
            scope.row.updatedAt | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="goEditPage(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" class="pagination">
        <el-col :span="14">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="this.queryInfo.pageNum"
            :page-size="this.queryInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="postTotal"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    ...mapGetters(['postList', 'postTotal'])
  },
  filters: {
    dateFormat(date) {
      return moment(date).format('YYYY/MM/DD hh:mm:ss')
    },
  },
  methods: {
    // 获取文章列表
    async getPostList() {
      const data = this.$store.dispatch('FETCH_POST_LIST', this.queryInfo)
      if(!data) this.$message.error("获取文章列表失败");
    },
    // 跳转到添加文章页面
    goAddPage() {
      this.$router.push("/dashboard/post/add");
    },
    // 改变页数
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getPostList();
    },
    // 删除文章
    async handleDelete(postId) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该标签, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") return;
       const result = await this.$store.dispatch('DELETE_POST', postId)
      if (!result) return this.$message.error("删除文章失败");
      this.$message.success("删除文章成功");
      this.getPostList();
    },
    goEditPage(post) {
      this.$router.push({
        path: "/dashboard/post/add",
        query: {post},
      });
    },
  },
  created() {
    this.getPostList();
  },
};
</script>

<style lang="less" scoped>
</style>
