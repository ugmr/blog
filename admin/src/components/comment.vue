<template>
  <el-main class="comment">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 评论管理 </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="inner">
      <!-- 搜索框 和 按钮 -->
      <el-row class="header" >
        <!-- 搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            @clear="getCommentList"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCommentList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table class="table" :data="commentList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#">
          <template v-slot="scope">
            <span>{{scope.$index|TableIndexFormat(queryInfo.pageNum, queryInfo.pageSize)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          prop="content"
          width="200px"
        ></el-table-column>
        <el-table-column label="回复时间" prop="repliedAt" width="160px">
          <template v-slot="scope">{{
            scope.row.repliedAt | dateFormat
          }}</template>
        </el-table-column>
         <el-table-column
          label="博客路径"
          prop="pathName"
          width="200px"
        ></el-table-column>
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
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
            :total="commentTotal"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>

  </el-main>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex';
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
  computed:{
    ...mapGetters(['commentList', 'commentTotal'])
  },
  filters: {
dateFormat(date) {
      return moment(date).format('YYYY/MM/DD hh:mm:ss')
    },
  },
  methods: {
    async getCommentList() {
      const query = {
        params: {
          condition: this.queryInfo.query ? {name: {$regex: this.queryInfo.query}} : null,
          skip: (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
          limit: this.queryInfo.pageSize,
        },
      }
      const result = this.$store.dispatch('FETCH_COMMENT_LIST', query)
      if (!result) this.$message.error("获取标签列表失败");
    },
    handleCurrentChange(pageNum) {
      this.queryInfo.pageNum = pageNum;
      this.getCommentList();
    },
    async handleDelete(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该标签, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') return
      const result = await this.$store.dispatch('DELETE_COMMENT', id)
      if (!result) return this.$message.error('删除商品失败')
      this.$message.success('删除商品成功')
      this.getCommentList()
    },
  },
  mounted() {
    this.getCommentList();
  },
};
</script>

<style scoped>
</style>