import http from '../api'

export default {
    state: {
        tagList: [],
        total: 0
    },
    getters: {
        ['tagList'](state){
            return state.tagList
        },
        ['tagTotal'](state){
            return state.total
        }
    },
    mutations: {
        ['SET_TAG_LIST'](state, tagList){
            state.tagList = tagList
        },
        ['SET_TAG_TOTAL'](state, tagTotal){
            state.total = tagTotal
        }
    },
    actions: {
        ['FETCH_TAG_LIST']({commit}, query) {
            return http.get("/tag", query).then(({status, data})=>{
                if(status !== 200) return 
                commit('SET_TAG_LIST', data.result)
                commit('SET_TAG_TOTAL', data.count)
                return true
            })
        },
        ['ADD_TAG']({commit}, tag){
            console.log(commit)
            return http.post("/tag", tag).then(({status})=>{
                return status === 201
            })
        },
        ['UPDATE_TAG']({commit}, tag){
            console.log(commit);
            return http.put('/tag/' + tag._id, tag).then(({status})=>{
                return status === 200
            })
        },
        ['DELETE_TAG']({commit}, id){
            console.log(commit)
            return http.delete("/tag/"+ id).then(({status})=>{
                return status === 200
            })
        }
    }
}