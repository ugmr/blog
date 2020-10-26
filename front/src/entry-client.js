import createApp from './app'

const {app, router, store} = createApp()

// 如果有 __INITIAL_STATE__ 替换store的状态
if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(()=>{
    router.beforeEach((to, from, next)=>{
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed ||  (diffed = (prevMatched[i] !== c))
        })

        if(!activated.length)  next()

        Promise.all(activated.map(c=>{
            if(c.asyncData) {
                return c.asyncData({
                    store,
                    route: to
                })
            }
        })).then(()=>{
            next()
        }).catch(next)
    })
    app.$mount('#app')
})