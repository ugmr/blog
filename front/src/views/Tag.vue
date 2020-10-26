<template>
  <article class="tag">
    <ul class="tag-list">
      <li v-for="tag in tagList" :key="tag._id" class="list-item">
        <router-link
          :to="'/tag/' + tag.name"
          @click.native="changeTitle(tag.name)"
          >{{ tag.name }}</router-link
        >
      </li>
    </ul>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tagList"]),
  },
  methods: {
    changeTitle(title) {
      title = "标签：" + title;
      this.$store.commit("SET_TITLE", title);
    },
  },
  asyncData({store}){
    return store.dispatch("FETCH_TAG_LIST");
  }
};
</script>

<style lang="less" scoped>
.tag-list {
  margin-top: 20px;
  .list-item {
    margin-left: 10px;
    float: left;
    a {
      border: 1px solid rgba(36, 121, 204, 0.8);
      border-radius: 4px;
      color: rgba(36, 121, 204, 0.8);
      display: inline-block;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      margin: 0 15px 10px 0;
      padding: 0 15px;
      text-decoration: none;
      transition: color 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99),
        border 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    }
  }
}
</style>