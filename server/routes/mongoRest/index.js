const router  = require('koa-router')()
const actionGenerator = require('./actions')
const models = require('./../../model/mongo')
const logger = require('../../utils/log4js')

const prefix = '/api'

for(const modelName of Object.keys(models)) {
    const actions = actionGenerator(models[modelName])

    const modelUrl = `${prefix}/${modelName}`
    const itemUrl = `${prefix}/${modelName}/:id`

    router.get(modelUrl, actions.findAll)
    router.get(itemUrl, actions.findById)
    router.post(modelUrl, actions.create)
    router.del(itemUrl, actions.deleteById)
    router.put(itemUrl, actions.replaceById)
    router.patch(itemUrl, actions.updateById)
}

module.exports = router