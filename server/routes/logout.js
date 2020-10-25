const jwt = require('./../utils/jwt')
const redis = require('./../model/redis')
const router = require('koa-router')()

router.prefix('/api')

router.post('/logout',async (ctx, next) => {
    const headers = ctx.request.headers
    let token
    try {
       token = headers['authorization']
    } catch (error) {
        return ctx.body = {
            message: error.message,
            code: -1,
            data: {}
        }
    }
    if(!token) {
        return ctx.body = {
            message: '未找到token',
            code: -1,
            data: {}
        }
    }
    if(jwt.verifyToken(token)) {
        await redis.del(token)
        return ctx.body = {
            message: '登出成功',
            code: 1,
            data: {}
        }
    } else {
        return ctx.body = {
            message: 'token验证失败',
            code: -1,
            data: {}
        }
    }
    
})

module.exports = router