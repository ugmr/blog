const router = require('koa-router')()
const getUploadToken = require('../utils/qiniuUpload')

router.prefix('/api')

router.post('/upload', async (ctx) => {
    let upToken = getUploadToken()
    return ctx.body = {
        upToken
    }
})

module.exports = router