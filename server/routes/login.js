const jwt = require('./../utils/jwt')
const {user: model} = require('./../model/mongo')
const redis = require('./../model/redis')
const logger = require('../utils/log4js')
const router = require('koa-router')()

router.prefix('/api')

router.post('/login', async (ctx, next) => {
    let { user } = ctx.request.body
    if(!user || !user.name || !user.password) {
        return ctx.body = {
            message: '参数错误',
            code: -1,
            data: {}
        }
    } else {
        try {   
            const users = await model.find({"name": user.name}).exec()
            
            let payload = {
                name: users[0].name,
                loginTime: Date.now()
            }
            let {displayName, password} = users[0]
            if(password === user.password) {
                const token = jwt.createToken(payload)
                
                redis.set('token', token, 'EX', jwt.expires, ()=> {})

                return ctx.body = {
                    message: '登陆成功',
                    code: 1,
                    data: {
                        token,
                        displayName
                    }
                }
            } else {
                return ctx.body = {
                    message: '密码错误',
                    code: -1,
                    data: {}
                }
            }
        } catch (error) {
            logger.error(error)
            return ctx.body = {
                message: '用户名错误',
                code: -1,
                data: {}
            }
        }
    }
})

module.exports = router
