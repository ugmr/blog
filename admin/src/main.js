import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
// 引入element-ui
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './assets/css/global.css'
// 引入iconfont
import './assets/iconfont/iconfont.css'

sync(store, router)

Vue.config.productionTip = false

Vue.filter('TableIndexFormat', function(oldIndex, pageNum, pageSize) {
  return oldIndex + 1 + (pageNum-1) * pageSize
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
