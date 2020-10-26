<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="main" :class="showNav ? 'right' : ''">
      <Header></Header>
      <router-view class="content" :key="routeKey"></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { mapGetters } from 'vuex';
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    Header,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['showNav']),
    routeKey() {
      return this.$route.path + Math.random()
    }
  },
  created(){
    this.$store.dispatch("FETCH_SITE_INFO");
  }
};
</script>

<style lang="less">
#app {
  font-family: "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.main {
  width: 58%;
  min-height: 100%;
  margin-left: 25%;
  transition: all 0.8s ease;
  background-color: #fff;
  display: flex;
  flex-flow: column;
}
.content {
  flex: 1;
  width: 100%;
  padding: 60px 30px 0 30px;
}
@media screen and (max-width: 768px) {
  .main {
    margin-left: 0;
    width: 100%;
  }
  .right {
    transform: translate(200px, 0);
  }
}
</style>
