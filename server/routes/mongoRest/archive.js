const router = require('koa-router')()
const { post } = require('../../model/mongo')

router.get('/api/archive', async (ctx) => {
    try {
        const result = await post.aggregate([
            {
                $match: {
                    isPublic: true
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },  
            {
                $group: {
                    _id: { year: {$year: "$createdAt"}, month: {$month: "$createdAt"}},
                    posts: {
                       $push: {
                            title: "$title",
                            pathName: "$pathName",
                            day: {$dayOfMonth: "$createdAt"}
                       }
                    },
                    count : { $sum : 1 }
                }
            }
         
        ]).exec()
    
        return ctx.body = result
    } catch (error) {
        return ctx.body = error
    }
})

module.exports = router