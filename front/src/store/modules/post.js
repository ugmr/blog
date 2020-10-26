import {fetch} from '@/api'

export default {
    state: {
        postList: [],  //文章列表
        total: 0,      //文章总数
        post: {},      //具体某个文章
        prev: {},      //该文章的前一篇文章
        next: {},      //该文章的下一篇文章
        pageInfo: {    //列表参数参数
            pageNum: 1,
            pageSize: 10
        }
    },
    getters: {
        postList(state) {
            return state.postList
        },
        total(state) {
            return state.total
        },
        post(state) {
            return state.post
        },
        prev(state) {
            return state.prev
        },
        next(state) {
            return state.next
        },
        pageInfo(state) {
            return state.pageInfo
        }
    },
    mutations: {
        ['SET_POST_LIST'](state, data) {
            state.postList = data.result
            state.total = data.count
        },
        ['SET_POST'](state, post) {
            state.post = post
        },
        ['SET_PREV'](state, post) {
            state.prev = post
        },
        ['SET_NEXT'](state, post) {
            state.next = post
        },
        ['SET_PAGE_NUM'](state,pageNum) {
            state.queryInfo.pageNum = pageNum
        }
    },
    actions: {
        ['FETCH_POST_LIST']({commit, state}, route) {   
            let {pageSize, pageNum} = state.pageInfo
            
            let condition = { isPublic: true }
            
            if(route && route.params) {
                if (route.params.query) condition.title = { $regex: route.params.query }
                if (route.params.tag) condition.tags = { $elemMatch: { $eq: route.params.tag } }
                if (route.params.category) condition.categories = { $elemMatch: { $eq: route.params.category } }
            }
            

            return fetch('post', {
                condition,
                select: {
                    _id: 0,
                    title: 1,
                    summary: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    pathName: 1
                },
                limit: pageSize,
                skip: (pageNum - 1) * pageSize,
                sort: {
                    createdAt: -1
                }
            }).then(data => {
                commit('SET_POST_LIST', data)
            })

        },
        ['FETCH_POST']({commit}, pathName) {
            
            if(!pathName) return Promise.reject()

            return fetch('post', {
                condition: {
                    pathName: { $regex: pathName },
                    isPublic: true
                },
                limit: 1,
            }).then(data => {
                let post = data.result[0]
                if (!post) {
                    commit('SET_POST', {})
                    return Promise.reject()
                }
                commit('SET_POST', post)
                commit('SET_TITLE', post.title)
                let prev = fetch('post', {
                    condition: {
                        createdAt: { $gt: post.createdAt },
                        isPublic: true
                    },
                    select: {
                        title: 1,
                        pathName: 1,
                    },
                    sort: {
                        createdAt: 1
                    },
                    limit: 1
                })

                let next = fetch('post', {
                    condition: {
                        createdAt: { $lt: post.createdAt },
                        isPublic: true
                    },
                    select: {
                        title: 1,
                        pathName: 1
                    },
                    sort: {
                        createdAt: -1
                    },
                    limit: 1
                })

                return Promise.all([prev, next])
            }).then(data => {
                let prevPost = data[0].result[0]
                if (prevPost) {
                    commit('SET_PREV', prevPost)
                } else {
                    commit('SET_PREV', {})
                }

                let nextPost = data[1].result[0]
                if (nextPost) {
                    commit('SET_NEXT', nextPost)
                } else {
                    commit('SET_NEXT', {})
                }
            })
        }
    }
}