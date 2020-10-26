import http from '../api'

export default {
    state: {
        commentList: [],
        total: 0
    },
    getters: {
        ['commentList'](state){
            return state.commentList
        },
        ['commentTotal'](state){
            return state.total
        }
    },
    mutations: {
        ['SET_COMMENT_LIST'](state, commentList){
            state.commentList = commentList
        },
        ['SET_COMMENT_TOTAL'](state, commentTotal){
            state.total = commentTotal
        }
    },
    actions: {
        ['FETCH_COMMENT_LIST']({commit}, query) {
            return http.get("/comment", query).then(({status, data})=>{
                if(status !== 200) return 
                commit('SET_COMMENT_LIST', data.result)
                commit('SET_COMMENT_TOTAL', data.count)
                return true
            })
        },
        ['DELETE_COMMENT']({commit}, id){
            console.log(commit)
            return http.delete("/comment/"+ id).then(({status})=>{
                return status === 200
            })
        }
    }
}