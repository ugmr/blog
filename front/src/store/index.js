import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../api'
import { json2Object } from '@/utils' 

Vue.use(Vuex)

import post from './modules/post'
import tag from './modules/tag'
import category from './modules/category'
import archive from './modules/archive'
import comment from './modules/comment'
export default function createStore() {
  return new Vuex.Store({
    state: {
      siteInfo: {
        githubUrl: '',
        title: '',
        logoUrl: '',
        description: '',
        keywords: '',
        faviconUrl: '',
        miitbeian: ''
      },
      title: '首页',
      showNav: true
    },
    getters: {
      siteInfo(state) {
        return state.siteInfo
      },
      title(state) {
        return state.title
      },
      showNav(state) {
        return state.showNav
      }
    },
    mutations: {
      ['SET_SITE_INFO'](state, siteInfo) {
        Vue.set(state, 'siteInfo', siteInfo)
      },
      ['SET_TITLE'](state, title) {
        state.title = title
      },
      ['SET_SHOW_NAV'](state, showNav) {
        state.showNav = showNav
      }
    },
    actions: {
      ['FETCH_SITE_INFO']({ commit }) {
        return fetch('option', {
          select: {
            _id: 0,
            key: 1,
            value: 1
          }
        }).then(data => {
          let siteInfo = json2Object(data.result)
          commit('SET_SITE_INFO', siteInfo)
        })
      }
    },
    modules: {
      post,
      tag,
      category,
      archive,
      comment
    }
  })
}