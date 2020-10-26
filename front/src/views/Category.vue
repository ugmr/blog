<template>
  <article class="category">
    <ul class="category-list">
      <li
        v-for="category in categoryList"
        :key="category._id"
        class="list-item"
      >
        <router-link
          :to="'/category/' + category.name"
          @click.native="changeTitle(category.name)"
          >{{ category.name }}</router-link
        >
      </li>
    </ul>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["categoryList"]),
  },
  methods: {
    changeTitle(title) {
      title = "分类：" + title;
      this.$store.commit("SET_TITLE", title);
    },
  },
  asyncData({ store }) {
    return store.dispatch("FETCH_ARCHIVE_LIST");
  },
};
</script>

<style lang="less" scoped>
.category-header {
  margin-bottom: 20px;
  color: #16a085;
  font-weight: 700;
}
.category-list {
  margin-top: 20px;
  padding-left: 30px;
  overflow: hidden;
  list-style: outside;
  .list-item {
    text-align: left;
    &::marker {
      color: #666;
    }
    a {
      font-size: 18px;
      color: #2479cc;
      &:active {
        color: #2479cc;
      }
    }
  }
}
</style>