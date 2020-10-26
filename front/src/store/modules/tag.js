import {fetch} from '../../api'

export default {
    state: {
        tagList: []
    },
    getters: {
        tagList(state) {
            return state.tagList
        }
    },
    mutations: {
        ['SET_TAG_LIST'](state, tagList) {
            state.tagList = tagList
        }
    },
    actions: {
        ['FETCH_TAG_LIST']({ commit }) {
            return fetch('tag').then(data => {
                commit('SET_TAG_LIST', data.result)
            })
        }
    }
}