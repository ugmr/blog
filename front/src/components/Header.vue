<template>
  <header class="header">
    <div class="container">
      <button type="button" title="菜单" class="to-menu" @click="ctlNav">
        <i
          class="iconfont"
          :class="showNav ? 'icon-cc-close ' : 'icon-cc-menu'"
        >
        </i>
      </button>
      <a class="page-title">{{ title | titleFormat }}</a>
      <button type="button" title="搜索" class="to-search" @click="ctlSearch">
        <i class="icon-search iconfont"></i>
      </button>
    </div>
    <div class="search" :class="showSearch ? 'show' : ''">
      <input type="text" placeholder="关键字搜索" v-model="input" />
      <button title="搜索" @click="search">
        <i class="icon-search iconfont"></i>
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showSearch: false,
      input: "",
    };
  },
  computed: {
    ...mapGetters(["siteInfo", "title", 'showNav']),
  },
  filters: {
    titleFormat(title) {
      if (title.length > 12) {
        title = title.slice(0, 12) + "...";
      }
      return title;
    },
  },
  methods: {
    ctlNav() {
      this.$store.commit('SET_SHOW_NAV', !this.showNav)
    },
    ctlSearch() {
      this.showSearch = !this.showSearch;
    },
    search() {
      let title = "搜索结果：" + this.input;
      this.$store.commit("SET_TITLE", title);
      this.$router.push({
        name: "search",
        params: {
          query: this.input,
        },
      });
      this.input = ''
    },
  },
};
</script>

<style lang="less" scoped>
button {
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
}

.header {
  flex: 0 0 50px;
  width: 58%;
  height: 50px;
  line-height: 50px;
  border-bottom: 3px solid #ddd;
  position: fixed;
  top: 0;
  padding: 0 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .page-title {
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
    display: inline-block;
    border-bottom: 2px solid #555;
    &:hover {
      background: #eee;
      color: #555;
      border: none;
    }
  }
  .search {
    display: inline-block;
    width: 50%;
    input {
      margin-left: 20%;
      width: 60%;
      padding: 5px;
      outline: medium none;
      padding-right: 30px;
      font-size: 14px;
    }
    button {
      position: relative;
      right: 30px;
      width: 30px;
      height: 30px;
    }
  }

  .container {
    display: inline-block;
    text-align: left;
    .iconfont {
      font-size: 25px;
    }
    .to-search,
    .to-menu {
      display: none;
    }
  }
}
@media screen and (max-width: 768px) {
  .header {
    width: 100%;
    .container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .to-menu,
      .to-search {
        display: inline-block;
      }
    }
    .search {
      visibility: hidden;
      position: absolute;
      top: 50px;
      left: 50%;
    }
    .show {
      visibility: visible;
      animation: slideDown 0.8s;
    }
  }
}
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translate(0, -50px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>