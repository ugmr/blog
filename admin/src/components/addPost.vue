<template>
  <el-main class="post-add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/dashboard/post' }">
        文章管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-form
        :model="postForm"
        :rules="postFormRules"
        ref="postFormRef"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title" class="el-8">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="pathName" class="el-8">
          <el-input v-model="postForm.pathName"></el-input>
        </el-form-item>
        <el-form-item label="评论" prop="allowComment" class="el-1">
          <el-switch
            v-model="postForm.allowComment"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="公开" prop="isPublic" class="el-1">
          <el-switch
            v-model="postForm.isPublic"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select
            v-model="postForm.category"
            placeholder="选择分类"
            size="small"
          >
            <el-option
              v-for="category in categoryList"
              :key="category._id"
              :label="category.name"
              :value="category.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-tag
            :key="tag"
            v-for="tag in postForm.tags"
            closable
            :disable-transitions="false"
            @close="handleTagClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-select
            v-model="tagInput"
            placeholder="添加标签"
            size="small"
            @change="addTag"
          >
            <el-option
              v-for="tag in tagList"
              :key="tag._id"
              :label="tag.name"
              :value="tag.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概要" prop="summary">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="postForm.summary"
            maxlength="400"
            show-word-limit
            :rows="4"
            resize="none"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor
            ref="md"
            style="height: 800px"
            :ishljs="true"
            v-model="mdValue"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
          ></mavon-editor>
        </el-form-item>
      </el-form>
      <div class="commit-btn">
        <el-button type="primary" @click="commitPost">提 交</el-button>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import {bucketHost} from '../config'
import { mapGetters } from "vuex";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import * as qiniu from "qiniu-js";
import moment from "moment";
export default {
  components: {
    mavonEditor,
  },
  mounted() {
    this.getTagList();
    this.getCategoryList();
    try {
      let post = this.$store.state.route.query.post;
      console.log(post)
      Object.assign(this.postForm, post);
      this.mdValue = post.content
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      postForm: {
        title: "",
        pathName: "",
        content: "",
        summary: "",
        allowComment: true,
        isPublic: true,
        category: "",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      postFormRules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        pathName: [
          { required: true, message: "路径不能为空", trigger: "blur" },
        ],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
      },
      mdValue: "",
      imgList: {},
      tagInput: "",
    };
  },
  computed: {
    ...mapGetters(["tagList", "categoryList", "qiniuToken"]),
  },
  methods: {
    async getTagList() {
      const result = await this.$store.dispatch("FETCH_TAG_LIST");
      if (!result) this.$message.error("获取标签列表失败");
    },
    async getCategoryList() {
      const result = await this.$store.dispatch("FETCH_CATEGORY_LIST");
      if (!result) this.$message.error("获取标签列表失败");
    },
    handleTagClose(tag) {
      this.postForm.tags.splice(this.postForm.tags.indexOf(tag), 1);
    },
    addTag() {
      if (this.postForm.tags.indexOf(this.tagInput) > -1) {
        this.tagInput = "";
        return this.$message.error("不要重复添加标签");
      }
      this.postForm.tags.push(this.tagInput);
      this.tagInput = "";
    },
    // 添加图片
    imgAdd(pos, file) {
      this.imgList[pos] = file;
    },
    // 删除图片
    imgDel(pos) {
      delete this.imgList[pos];
    },
    // 上传图片
    uploadImg() {
      if (!this.qiniuToken) {
        const result = this.$store.dispatch("FETCH_QINIU_TOKEN");
        if (!result) this.$message.error("上传图片失败");
      }
      Object.keys(this.imgList).forEach((pos) => {
        let file = this.imgList[pos];
        const compressOptions = {
          quality: 0.92,
          noCompressIfLarger: true,
        };
        const config = {
          useCdnDomain: false,
          region: qiniu.region.z2,
        };
        const putExtra = {};
        let curr = moment().format("YYYYMMDD").toString();
        let prefix = moment(file.lastModified).format("HHmmss").toString();
        let suffix = file.name;
        let key = encodeURI(`${curr}/${prefix}_${suffix}`);

        let that = this
        qiniu.compressImage(file, compressOptions).then((data) => {
          const observable = qiniu.upload(
            data.dist,
            key,
            this.qiniuToken,
            putExtra,
            config
          );
          const observer = {
            error(err) {
              return err.message
            },
            complete() {
              const url = `${bucketHost}/${key}`
              that.$refs.md.$img2Url(pos, url)
            },
          };

          observable.subscribe(observer); // 上传开始
        }).catch(err=>console.log(err))
      });
    },
    // 提交文章
    commitPost() {
      const loading = this.$loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      this.postForm.content = this.mdValue
      this.$refs.postFormRef.validate(async (valid) => {
        if (!valid) return;

        const result = this.uploadImg()
        if(result) console.log(result)

        this.postForm.updatedAt = new Date();
        if (!this.postForm._id) {
          this.postForm.createdAt = new Date();
          const result = await this.$store.dispatch('ADD_POST', this.postForm)
          if (!result) return this.$message.error("添加文章失败");
          this.$message.success("添加文章成功");
          this.$router.push("/dashboard/post");
        } else {
          const result = await this.$store.dispatch('UPDATE_POST', this.postForm)
          if (!result) return this.$message.error("修改文章失败");
          this.$message.success("修改文章成功");
          this.$router.push("/dashboard/post");
        }
      });
      loading.close()
    },
    rollBack() { 
    }
  },
};
</script>

<style scoped lang="less">
.v-note-wrapper {
  margin-top: 20px;
  height: 500px;
}
.commit-btn {
  margin-top: 50px;
}
.el-tag,
.el-select {
  float: left;
  height: 32px;
  line-height: 30px;
  margin-left: 10px;
  margin-top: 5px;
  vertical-align: middle;
}
.el-select {
  width: 100px;
}
</style>