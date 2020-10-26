<template>
  <article class="archive">
    <div
      class="archive-content"
      v-for="({ posts, _id, count }, index) in archiveList"
      :key="index"
    >
      <h3>{{ _id.year }}年{{ _id.month }}月({{ count }})</h3>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <router-link :to="'/post/' + post.pathName">{{
            post.title
          }}</router-link>
          &nbsp;
          <span class="date"
            >{{ _id.year }}-{{ _id.month }}-{{ post.day }}</span
          >
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["archiveList"]),
  },
  methods: {
    getArchiveList() {
      this.$store.dispatch("FETCH_ARCHIVE_LIST");
    },
  },
  asyncData({store}){
    return store.dispatch("FETCH_ARCHIVE_LIST");
  }
};
</script>

<style lang="less" scoped>
.archive-header {
  margin-bottom: 20px;
  color: #16a085;
  font-weight: 700;
}
.archive-content {
  text-align: left;
  font-size: 16px;
  line-height: 2em;
  h3 {
    margin-top: 20px;
    color: #666;
  }
  ul {
    margin: 15px 0 15px 25px;
    list-style: outside;
    li {
      &::marker {
        color: #666;
      }
      a {
        color: #2479cc;
      }
      .date {
        color: #999;
        font-size: 14px;
        font-style: italic;
      }
    }
  }
}
</style>
