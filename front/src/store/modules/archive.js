import {fetch} from '../../api'

export default {
    state: {
        archiveList: []
    },
    getters: {
        archiveList(state) {
            return state.archiveList
        }
    },
    mutations: {
        ['SET_ARCHIVE_LIST'](state, archiveList) {
            state.archiveList = archiveList
        }
    },
    actions: {
        ['FETCH_ARCHIVE_LIST']({commit}) {
            return fetch('archive').then(data => {
                if(data.length) {
                    commit('SET_ARCHIVE_LIST', data)
                }
                else {
                    commit('SET_ARCHIVE_LIST', [])
                }
            })
        }
    }
}