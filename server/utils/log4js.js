const log4js = require('log4js')
const config = require('./../config')

log4js.configure(config.log4js)

const logger = log4js.getLogger(config.db.database)

module.exports = logger