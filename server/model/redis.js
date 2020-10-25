const redis = require('redis')
const {redis: config} = require('./../config')
const bluebird = require('bluebird')
const logger = require('./../utils/log4js')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const auth = config.password ? {password: config.password} : {}
let client = redis.createClient(Object.assign({}, auth, {
    host: config.host,
    port: config.port
}))

client.on('error', (error)=> {
    logger.error('Redis connect Error', error)
})

client.once('connect', ()=> {
    logger.info('Redis connect success')
})

module.exports = client



