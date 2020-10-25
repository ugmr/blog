const qiniu = require('qiniu')
const {qiniu: config} = require('../config')

// 鉴权对象
const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)

const putPolicy = new qiniu.rs.PutPolicy(config.options)

module.exports = function getUploadToken() {
    let uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
}