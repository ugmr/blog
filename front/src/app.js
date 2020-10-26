import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import { sync } from 'vuex-router-sync'
import fetchData from './mixin/fetchData'

Vue.mixin(fetchData)

import './assets/css/global.css'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

export default function createApp(context) {
  let router = createRouter()
  let store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })

  return {app, router, store}
}

