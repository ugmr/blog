<template>
  <div class="home">
    <section class="posts">
      <article class="post" v-for="post in postList" :key="post._id">
        <div class="post-header">
          <div class="post-meta">
            <a href="">Agumr</a>
            <em> · </em>
            {{ post.updatedAt | dateFormat }}
          </div>
          <router-link class="post-title" :to="'/post/' + post.pathName">
            {{ post.title }}
          </router-link>
        </div>
        <div class="post-desc">
          {{post.summary}}
        </div>
      </article>
    </section>
    <Pagination
      :currentPage="pageInfo.pageNum"
      :pageSize="pageInfo.pageSize"
      :total="total"
      @handlePageChange="handlePageChange"
    ></Pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(["postList", "total", 'pageInfo']),
  },
  filters: {
    dateFormat(date) {
      return date.slice(0,10)
    }
  },
  methods: {
    getPostList() {
      this.$store.dispatch("FETCH_POST_LIST");
    },
    handlePageChange(pageNum) {
      this.$store.commit('SET_PAGE_NUM', pageNum)
      this.getPostList();
    }
  },
  asyncData({store, route}) {
    return store.dispatch("FETCH_POST_LIST", route)
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-flow: column;
  .posts {
    flex: 1;
    .post {
      padding: 10px 15px;
      border-bottom: 1px dashed #d9d9d9;
      .post-header {
        text-align: left;
        display: block;
        margin-bottom: 10px;
        line-height: 32px;
        font-size: 18px;
        .post-meta {
          font-size: 12px;
          color: #999;
          a {
            color: #999;
          }
        }
        .post-title {
          color: #16a085;
          font-weight: 700;
        }
      }
      .post-desc {
        text-align: left;
        font-size: 14px;
      }
    }
  }
  .pagination {
    flex: 0;
  }
}
</style>