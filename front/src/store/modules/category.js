import {fetch} from '../../api'

export default {
    state: {
        categoryList: []
    },
    getters: {
        categoryList(state) {
            return state.categoryList
        }
    },
    mutations: {
        ['SET_CATEGORY_LIST'](state, categoryList) {
            state.categoryList = categoryList
        }
    },
    actions: {
        ['FETCH_CATEGORY_LIST']({ commit }) {
            return fetch('category').then(data => {
                commit('SET_CATEGORY_LIST', data.result)
            })
        }
    }
}