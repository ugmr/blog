<template>
  <footer class="footer">
    © 2020 - {{siteInfo.title}} -
    <a target="_blank" :href="siteInfo.githubUrl">项目源码</a>
    <br />
    Powered by
    <a target="_blank" href="https://github.com/vuejs/vue">Vue2</a>
    &nbsp;&amp;&nbsp;
    <a target="_blank" href="https://github.com/koajs/koa">Koa2</a>
  </footer>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['siteInfo'])
  }  
};
</script>

<style lang="less" scoped>
.footer {
  flex: 0 0 60px;
  width: 100%;
  height: 60px;
  text-align: center;
  border-top: 1px solid #ddd;
  padding: 15px;
  font-size: 12px;
  color: #999999;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  a {
    color: #2479cc;
  }
}
</style>