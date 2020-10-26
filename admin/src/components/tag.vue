<template>
  <el-main class="tag">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 标签管理 </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="inner">
      <!-- 搜索框 和 按钮 -->
      <el-row class="header" type="flex" justify="space-between">
        <!-- 搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            @clear="getTagList"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTagList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加标签按钮 -->
        <el-col :span="2">
          <el-button type="primary" round @click="showAddTagDialog"
            >添加标签</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table class="table" :data="tagList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#">
          <template v-slot="scope">
            <span>{{scope.$index|TableIndexFormat(queryInfo.pageNum, queryInfo.pageSize)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          prop="name"
          width="200px"
        ></el-table-column>
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index)"
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
            :total="tagTotal"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加标签"
      :visible.sync="addTagDialogVisible"
      @close="addTagDialogClosed"
      width="50%"
    >
      <el-form
        :model="addTagForm"
        :rules="addTagFormRules"
        ref="addTagFormRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="addTagForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 编辑分类对话框 -->
    <el-dialog
      title="编辑标签"
      :visible.sync="editTagDialogVisible"
      @close="editTagDialogClosed"
      width="50%"
    >
      <el-form
        :model="editTagForm"
        :rules="editTagFormRules"
        ref="editTagFormRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="editTagForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTag">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
     
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
     
      addTagDialogVisible: false,
      addTagForm: {
        name: "",
      },
      addTagFormRules: {
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            max: 10,
            message: "用户名长度应为 10 个字符以内",
            trigger: "blur",
          },
        ],
      },
      editTagDialogVisible: false,
      editTagForm: {
        name: "",
        _id: '',
      },
      editTagFormRules: {
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            max: 10,
            message: "用户名长度应为 10 个字符以内",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed:{
    ...mapGetters(['tagList', 'tagTotal'])
  },
  methods: {
    async getTagList() {
      const query = {
        params: {
          condition: this.queryInfo.query ? {name: {$regex: this.queryInfo.query}} : null,
          skip: (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
          limit: this.queryInfo.pageSize,
        },
      }
      const result = this.$store.dispatch('FETCH_TAG_LIST', query)
      if (!result) this.$message.error("获取标签列表失败");
    },
    handleCurrentChange(pageNum) {
      this.queryInfo.pageNum = pageNum;
      this.getTagList();
    },
    addTagDialogClosed() {
      this.$refs.addTagFormRef.resetFields();
      this.addTagForm.name = "";
    },
    addTag() {
      this.$refs.addTagFormRef.validate(async (valid) => {
        if (!valid) return;
        const result = await this.$store.dispatch('ADD_TAG', this.addTagForm)
        if (!result) return this.$message.error("添加标签失败");
        this.$message.success("添加标签成功");
        this.getTagList();
        this.addTagDialogVisible = false;
      });
    },
    showAddTagDialog() {
      this.addTagDialogVisible = true;
    },
    handleEdit(index) {
      let {_id, name} = this.tagList[index]
      this.editTagForm._id = _id
      this.editTagForm.name = name
      this.showEditTagDialog()
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
      const result = await this.$store.dispatch('DELETE_TAG', id)
      if (!result) return this.$message.error('删除商品失败')
      this.$message.success('删除商品成功')
      this.getTagList()
    },
    editTagDialogClosed() {
      this.$refs.editTagFormRef.resetFields();
      this.editTagForm.name = "";
    },
    editTag() {
      this.$refs.editTagFormRef.validate(async (valid) => {
        if (!valid) return;
        const result = await this.$store.dispatch('UPDATE_TAG', this.editTagForm)
        if (!result) return this.$message.error("修改标签失败");
        this.$message.success("修改标签成功");
        this.getTagList();
        this.editTagDialogVisible = false;
      });
    },
    showEditTagDialog() {
      this.editTagDialogVisible = true;
    },
  },
  mounted() {
    this.getTagList();
  },
};
</script>

<style scoped>
</style>