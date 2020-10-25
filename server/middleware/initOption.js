const logger = require("../utils/log4js")
const models = require("../model/mongo")
const {options} = require('../config')

module.exports = async function () {
    logger.info('starting initial options')

    for (const option of options) {
        let key = option.key
        let count = await models.option.find({ key }).countDocuments().exec()
        if (count === 0) {
            await models.option.create(option)
            log.info(`Option ${key} created`)
        }
    }
    logger.info('initial options complete')
}