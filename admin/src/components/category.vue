<template>
  <el-main class="category">
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
            @clear="getCategoryList"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCategoryList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加标签按钮 -->
        <el-col :span="2">
          <el-button type="primary" round @click="showAddCategoryDialog"
            >添加标签</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="categoryList"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index" label="#">
          <template v-slot="scope">
            <span>{{
              scope.$index
                | TableIndexFormat(queryInfo.pageNum, queryInfo.pageSize)
            }}</span>
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
            :total="categoryTotal"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加标签"
      :visible.sync="addCategoryDialogVisible"
      @close="addCategoryDialogClosed"
      width="50%"
    >
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryFormRules"
        ref="addCategoryFormRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="addCategoryForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类对话框 -->
    <el-dialog
      title="编辑标签"
      :visible.sync="editCategoryDialogVisible"
      @close="editCategoryDialogClosed"
      width="50%"
    >
      <el-form
        :model="editCategoryForm"
        :rules="editCategoryFormRules"
        ref="editCategoryFormRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="editCategoryForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
      addCategoryDialogVisible: false,
      addCategoryForm: {
        name: "",
      },
      addCategoryFormRules: {
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            max: 10,
            message: "用户名长度应为 10 个字符以内",
            trigger: "blur",
          },
        ],
      },
      editCategoryDialogVisible: false,
      editCategoryForm: {
        name: "",
        _id: ""
      },
      editCategoryFormRules: {
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
  computed: {
    ...mapGetters(['categoryList', 'categoryTotal'])
  },
  methods: {
    async getCategoryList() {
      const query = {
          params: {
          condition: this.queryInfo.query ? {name: {$regex: this.queryInfo.query}} : null,
          skip: (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
          limit: this.queryInfo.pageSize,
        },
      }
      const result = await this.$store.dispatch("FETCH_CATEGORY_LIST", query);
      if (!result) this.$message.error("获取标签列表失败");
    },
    handleCurrentChange(pageNum) {
      this.queryInfo.pageNum = pageNum;
      this.getCategoryList();
    },
    addCategoryDialogClosed() {
      this.$refs.addCategoryFormRef.resetFields();
      this.addCategoryForm.name = "";
    },
    addCategory() {
      this.$refs.addCategoryFormRef.validate(async (valid) => {
        if (!valid) return;
        const result = await this.$store.dispatch('ADD_CATEGORY', this.addCategoryForm)
        if (!result) return this.$message.error("添加标签失败");
        this.$message.success("添加标签成功");
        this.getCategoryList();
        this.addCategoryDialogVisible = false;
      });
    },
    showAddCategoryDialog() {
      this.addCategoryDialogVisible = true;
    },
    handleEdit(index) {
      let {_id, name} = this.categoryList[index]
      this.editCategoryForm._id = _id
      this.editCategoryForm.name = name
      this.showEditCategoryDialog()
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
      const result = await this.$store.dispatch('DELETE_CATEGORY', id)
      if (!result) return this.$message.error('删除商品失败')
      this.$message.success('删除商品成功')
      this.getCategoryList()
    },
    editCategoryDialogClosed() {
      this.$refs.editCategoryFormRef.resetFields();
      this.editCategoryForm.name = "";
    },
    editCategory() {
      this.$refs.editCategoryFormRef.validate(async (valid) => {
        if (!valid) return;
        const result = await this.$store.dispatch('UPDATE_CATEGORY', this.editCategoryForm)
        if (!result) return this.$message.error("修改标签失败");
        this.$message.success("修改标签成功");
        this.getCategoryList();
        this.editCategoryDialogVisible = false;
      });
    },
    showEditCategoryDialog() {
      this.editCategoryDialogVisible = true;
    },
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>

<style scoped lang="less">
</style>