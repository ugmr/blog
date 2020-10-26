import { fetch, axios } from '../../api'

export default {
    state: {
        commentList: []
    },
    getters: {
        commentList(state) {
            return state.commentList
        }
    },
    mutations: {
        ['SET_COMMENT_LIST'](state, commentList) {
            state.commentList = commentList
        }
    },
    actions: {
        ['FETCH_COMMENT_LIST']({ commit }, pathName) {
            return fetch('comment', {
                condition: { pathName: pathName },
                sort: {
                    repliedAt: -1
                }
            }).then(data => {
                commit('SET_COMMENT_LIST', data.result)
            })
        },
        ['ADD_COMMENT']({ commit }, comment) {
            console.log(commit);
            return axios.post('/comment', comment).then(({ status }) => {
                return status === 201
            })
        }
    }
}