<template>
  <nav class="navbar" :class="showNav ? 'show' : 'hide'">
    <div class="profile">
      <a class="avator" href="/"
        ><img
          src="http://pic.rmb.bdstatic.com/210cad8a20ff50582941bc48583dc388.jpeg"
          alt="logo"
          width="140px"
          height="140px"
      /></a>
      <h3 class="title">{{ siteInfo.title }}</h3>
    </div>
    <ul class="btns">
      <li>
        <router-link to="/" title="首页" @click.native="changeTitle('首页')"
          ><i class="iconfont icon-home"></i><span>首页</span></router-link
        >
      </li>
      <li>
        <router-link to="/archive" title="归档" @click.native="changeTitle('归档')"
          ><i class="iconfont icon-cc-archive"></i
          ><span>归档</span></router-link
        >
      </li>
      <li>
        <router-link to="/category" title="分类" @click.native="changeTitle('分类')"
          ><i class="iconfont icon-cc-menu"></i><span>分类</span></router-link
        >
      </li>
      <li>
        <router-link to="/tag" title="标签" @click.native="changeTitle('标签')"
          ><i class="iconfont icon-cc-tag-more"></i
          ><span>标签</span></router-link
        >
      </li>
      <li>
        <router-link to="/about" title="关于" @click.native="changeTitle('关于')"
          ><i class="iconfont icon-cc-user"></i><span>关于</span></router-link
        >
      </li>
    </ul>
    <ul class="btns contact-btns" >
      <li>
        <router-link :to="siteInfo.githubUrl" title="github"
          ><i class="iconfont icon-github"></i
        ></router-link>
      </li>
      <li>
        <router-link to="/" title="twitter"
          ><i class="iconfont icon-twitter"></i
        ></router-link>
      </li>
      <li>
        <router-link to="/" title="rss"
          ><i class="iconfont icon-rss"></i
        ></router-link>
      </li>
      <li>
        <router-link to="/" title="facebook"
          ><i class="iconfont icon-facebook"></i
        ></router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["siteInfo", 'showNav']),
  },
  methods: {
    changeTitle(title) {
      if(window.innerWidth <= 768) {
        this.showNav = false
        this.$store.commit('SET_SHOW_NAV', this.showNav)
      }
      this.$store.commit('SET_TITLE', title)
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #666;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
  transition: all 0.8s ease;
  .profile {
    padding-top: 40px;
    padding-bottom: 20px;

    .avator {
      width: 140px;
      height: 140px;
    }

    .title {
      color: #fff;
      margin-top: 20px;
    }
  }

  .btns {
    margin-bottom: 20px;

    li {
      height: 45px;
      line-height: 45px;

      a {
        i {
          margin-right: 10px;
        }

        font-size: 16px;
        color: #fff;
      }
    }
  }

  .contact-btns {
    li {
      display: inline-block;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}
.show {
  left: 0;
}
.hide {
  left: -200px;
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .navbar {
    width: 75px;
    height: 100%;
    .profile {
      .avator,
      .avator img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
      }

      .title {
        display: none;
      }
    }

    .btns {
      margin: 0;

      li a i {
        display: block;
        font-size: 20px;
        margin: 0 auto;
      }

      li a span {
        display: none;
      }
    }

    .contact-btns {
      li {
        display: block;

        a i {
          display: block;
          font-size: 20px;
          margin: 0 auto;
        }
      }
    }
  }
}

</style>
