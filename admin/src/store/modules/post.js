import http from '../api'

export default {
    state: {
        postList: [],
        total: 0
    },
    getters:{
        ['postList'](state){
            return state.postList
        },
        ['postTotal'](state) {
            return state.total
        }
    },
    mutations: {
        ['SET_POST_LIST'](state, postList) {
            state.postList = postList
        },
        ['SET_POST_TOTAL'](state, total) {
            state.total = total
        }
    },
    actions: {
        ['FETCH_POST_LIST']({commit}, queryInfo) {
            return http.get("/post", {
                params: {
                  condition: queryInfo.query
                    ? { title: { $regex: queryInfo.query } }
                    : null,
                  skip: (queryInfo.pageNum - 1) * queryInfo.pageSize,
                  limit: queryInfo.pageSize,
                },
              }).then(({status, data})=>{     
                if (status !== 200) return
                let {result: postList, count: total} = data
                commit('SET_POST_LIST', postList)
                commit('SET_POST_TOTAL', total)
                return true
              })
        },
        ['DELETE_POST']({commit}, postId) {
            console.log(commit)
            return http.delete("/post/" + postId).then(({status})=>{
                return status === 200
            })
        },
        ['ADD_POST']({commit}, post) {
            console.log(commit)
            return http.post('/post', post).then(({status})=>{
                return status === 201
            })
        },
        ['UPDATE_POST']({commit}, post){
            console.log(commit, post)
            if(!post.id) return 
            return http.put('/post/' + post._id, post).then(({status})=>{
                console.log(status)
                return status === 200
            })
        }
   
    }
}