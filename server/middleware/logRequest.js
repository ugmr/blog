const logger = require('./../utils/log4js')

module.exports = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
}