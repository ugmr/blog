import http from '../api'

export default {
    state: {
        categoryList: [],
        total: 0
    },
    getters: {
        ['categoryList'](state){
            return state.categoryList
        },
        ['categoryTotal'](state){
            return state.total
        }
    },
    mutations: {
        ['SET_CATEGORY_LIST'](state, categoryList){
            state.categoryList = categoryList
        },
        ['SET_CATEGORY_TOTAL'](state, categoryTotal){
            state.total = categoryTotal
        }
    },
    actions: {
        ['FETCH_CATEGORY_LIST']({commit}, query) {
            return http.get("/category", query).then(({status, data})=>{
                if(status !== 200) return 
                commit('SET_CATEGORY_LIST', data.result)
                commit('SET_CATEGORY_TOTAL', data.count)
                return true
            })
        },
        ['ADD_CATEGORY']({commit}, category){
            console.log(commit)
            return http.post("/category", category).then(({status})=>{
                return status === 201
            })
        },
        ['UPDATE_CATEGORY']({commit}, category){
            console.log(commit);
            return http.put('/category/' + category._id, category).then(({status})=>{
                return status === 200
            })
        },
        ['DELETE_CATEGORY']({commit}, id){
            console.log(commit)
            return http.delete("/category/"+ id).then(({status})=>{
                return status === 200
            })
        }
    }
}