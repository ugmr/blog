const logger = require("../utils/log4js")
const models = require("../model/mongo")
const { user } = require('../config')

module.exports = async function () {
    logger.info('starting initial user info')
    
    const count = await models.user.find().countDocuments().exec()
    if (count !== 0) return logger.info('user info is created')

    if (user.password === 'admin') {
        logger.error('you must change the default password at ./config/index.js')
        logger.error('koa2 refused to start because of weak password')
        return process.exit(1)
    }

    const result = await models.user.create({
        name: user.name,
        password: user.password,
        displayName: user.displayName,
        email: ''
    })

    logger.info(`account '${result.name}' is created`)
}