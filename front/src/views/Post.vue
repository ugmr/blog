<template>
  <article class="post">
    <div class="post-header">
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="post-meta">
        <div class="info">
          <p class="author">Agumr</p>
          <p class="update-time">{{ post.updatedAt | dateFormat }}</p>
          <p>
            <span>评论：0</span> <em> · </em> <span>阅读：4859</span>
            <em> · </em> <span>喜欢：2</span>
          </p>
        </div>
        <div class="tag">
          文章标签：
          <a
            v-for="(tag, index) in post.tags"
            :key="index"
            :href="'/home/' + tag"
          >
            {{ tag }}
          </a>
        </div>
      </div>
    </div>
    <div class="post-content" v-html="content"></div>
    <div class="post-comment">
      <Comment v-for="(comment, index) in commentList" :key="index" :comment="comment"></Comment>
      <form class="comment-input" @submit.prevent="commitComment">
        <div class="form-item name">
          <label for="displayName">昵称</label>
          <input type="text" id="displayName" v-model="displayNameInput"/>
        </div>
        <div class="form-item comment">
          <label for="content">内容</label>
          <textarea
            id="content"
            rows="10"
            v-model="commentInput"
          ></textarea>
        </div>
        <div class="form-item commit">
          <button type="submit">评论</button>
        </div>
      </form>
    </div>
    <div class="post-footer" v-show="!isSingle">
      <router-link
        class="footer-pre"
        :to="'/post/' + prev.pathName"
        v-show="hasPrev"
        >{{ prev.title }}</router-link
      >
      <router-link
        class="footer-after"
        :to="'/post/' + next.pathName"
        v-show="hasNext"
        >{{ next.title }}</router-link
      >
    </div>
  </article>
</template>

<script>
import Comment from "@/components/Comment";
import showdown from "showdown";
const Converter = new showdown.Converter();
import { mapGetters } from "vuex";
import { isEmptyObject } from "@/utils";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      displayNameInput: '',
      commentInput: ''
    };
  },
  filters: {
    dateFormat(date) {
      date += "";
      return date.slice(0, 10) + " " + date.slice(11, 19);
    },
  },
  computed: {
    ...mapGetters(["post", "prev", "next", "commentList"]),
    content() {
      let html = Converter.makeHtml(this.post.content);
      return html;
    },
    isSingle() {
      return isEmptyObject(this.prev) && isEmptyObject(this.next);
    },
    hasPrev() {
      return !isEmptyObject(this.prev);
    },
    hasNext() {
      return !isEmptyObject(this.next);
    },
  },
  methods: {
    resetForm(){
      this.displayNameInput = ''
      this.commentInput = ''
    },
    async commitComment() {
      if (!this.commentInput) return 
      if(!this.displayNameInput) return 
      const result = await this.$store.dispatch("ADD_COMMENT", {
        pathName: this.post.pathName,
        displayName: this.displayNameInput,
        content: this.commentInput,
        repliedAt: new Date(),
      })
      if(!result) return 
      this.resetForm()
      this.getCommentList()
    },
    getCommentList(){
      this.$store.dispatch("FETCH_COMMENT_LIST", this.post.pathName)
    }
  },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch("FETCH_POST", route.params.pathName),
      store.dispatch("FETCH_COMMENT_LIST", route.params.pathName),
    ]);
  },
};
</script>

<style lang="less" scoped>
.post {
  display: flex;
  flex-flow: column;
  .post-header {
    flex: 0;
    margin-bottom: 10px;
    .post-title {
      margin: 20px 0;
      color: #16a085;
      font-weight: 700;
    }
    .post-meta {
      text-align: left;
      background: #f7f7fc;
      border-radius: 5px;
      padding: 15px 0 15px 25px;
      line-height: 2em;
      color: #999;
      p {
        display: inline-block;
        margin-right: 20px;
      }
      .author {
        color: #5893c2;
        cursor: pointer;
      }
      .update-time {
        font-size: 14px;
      }
      .tag a {
        margin-right: 8px;
        padding: 3px 6px;
        font-size: 12px;
        background-color: #fff;
        color: #5094d5;
        border: 1px solid #eaeaef;
        height: 23px;
        line-height: 17px;
        border-radius: 4px;
        display: inline-block;
      }
    }
  }
  .post-content {
    flex: 1;
    text-align: left;
    line-height: 3em;
    margin-bottom: 10px;
  }
  .post-comment {
    border-top: 1px solid #999;
    .comment-input {
      width: 70%;
      padding: 20px 0;
      font-size: 18px;

      .form-item {
        text-align: left;
        width: 100%;
        margin-bottom: 20px;
      }
      .name input {
        margin-left: 10px;
        height: 20px;
        line-height: 20px;
        width: 60%;
      }
      .comment textarea {
        vertical-align: top;
        margin-left: 10px;
        width: 80%;
        resize: none;
      }
      .commit button {
        width: 80px;
        height: 30px;
      }
    }
  }
  .post-footer {
    flex: 0;
    width: 100%;
    border-top: 1px solid #999;
    padding: 10px 0;
    min-height: 25px;
    line-height: 25px;
    overflow: hidden;
    a {
      color: #2479cc;
    }
    .footer-pre {
      float: left;
      &:before {
        content: "<<<  ";
      }
    }
    .footer-after {
      float: right;
      &:after {
        content: "  >>>";
      }
    }
    .hidden {
      visibility: hidden;
    }
  }
}
</style>