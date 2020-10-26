import Vue from 'vue'
import Vuex from 'vuex'
import http from './api'
import { setToken, clearToken } from '@/utils/token'

import post from './modules/post'
import tag from './modules/tag'
import option from './modules/option'
import category from './modules/category'
import comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayName: '',
    qiniuToken: ''
  },
  getters: {
    ['displayName'](state){
      return state.displayName
    },
    ['qiniuToken'](state){
      return state.qiniuToken
    }
  },
  mutations: {
    ['SET_DISPLAY_NAME'](state, displayName){
      state.displayName = displayName
    },
    ['SET_QINIU_TOKEN'](state,qiniuToken){
      state.qiniuToken = qiniuToken
    }
  },
  actions: {
    async ['LOGIN']({commit}, user) {
      return http.post("/login", { user }).then(({data}) => {
        if(data.code !== 1) return
        let {token, displayName} = data.data
        setToken(token)
        commit('SET_DISPLAY_NAME', displayName)
        return displayName
      })
    },
    async ['LOGOUT']({commit}) {
      return http.post('/logout').then(({data}) => {
        if (data.code !== 1) return
        clearToken()
        commit('SET_DISPLAY_NAME', '')
        return data.message
      })
    },
    ['FETCH_QINIU_TOKEN']({commit}) { 
        return http.post('/upload').then(response=>{    
          if(response.status!==200) return
          commit('SET_QINIU_TOKEN', response.data.upToken)
          return true
        })
    }
  },
  modules: {
    post,
    tag,
    option,
    category,
    comment
  }
})
