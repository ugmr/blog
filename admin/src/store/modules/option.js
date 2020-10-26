import http from '../api'

export default {
    state: {
        optionList: {},
        userInfo: {}
    },
    getters: {
        ['optionList'](state) {
            return state.optionList
        },
        ['userInfo'](state){
            return state.userInfo
        }
    },
    mutations: {
        ['SET_OPTION_LIST'](state, optionList) {
            state.optionList = optionList
        },
        ['SET_USER_INFO'](state, userInfo){
            state.userInfo = userInfo
        }
    },
    actions: {
        ['FETCH_OPTION_LIST']({ commit }) {
            return http.get('/option').then(({ status, data }) => {
                if (status !== 200) return
                commit('SET_OPTION_LIST', data.result)
                return true
            })
        },
        ['UPDATE_OPTION_LIST']({ commit }, optionList) {
            return new Promise((resolve,reject) => {
                console.log(commit);
                for (const item of optionList) {
                    http.put('/option/' + item._id, {
                        "key": item.key,
                        "value": item.value
                    }).then(result=>{
                        if (result.status !== 200) resolve(false)
                    }).catch(reject)
                }
                resolve(true)
            })
        },
        ['FETCH_USER_INFO']({commit}, query){
            return http.get('/user', query).then(({status, data})=>{
                if(status!==200) return
                commit('SET_USER_INFO', data.result[0])
                return true
            })
        },
        ['UPDATE_USER_INFO']({commit}, userInfo){
            console.log(commit);
            return http.put('/user/'+ userInfo._id, userInfo).then(({status})=>{
                console.log(status)
                return status===200
            })
        }
    }
}