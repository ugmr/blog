const logger = require('./../../utils/log4js')

module.exports = function (model) {
  return {

    findAll: async (ctx, next) => {
      let condition, select, count
      let query = ctx.request.query
      try {
        if (query.condition) {
          condition = JSON.parse(query.condition)
        }
        logger.debug(condition)
        let result = model.find(condition)
        if (query.select) {
          select = JSON.parse(query.select)
          result = result.select(select)
        }
        ['limit', 'skip', 'sort'].forEach(key => {
          if (query[key]) {
            let arg = query[key]
            if (key === 'limit' || key === 'skip') {
              arg = parseInt(arg)
            }
            if (key === 'sort' && typeof arg === 'string') {
              arg = JSON.parse(arg)
            }
            result[key](arg)
          }
        })
        result = await result.exec()
        count = await model.find(condition).count()
        return ctx.body = {
          result,
          count
        }
      } catch (error) {
        logger.error(error)
        return ctx.body = error
      }

    },
    findById: async function (ctx, next) {
      try {
        let select = {}
        let query = ctx.request.query
        let builder = model.findById(ctx.params.id)
        if (query.select) {
          select = JSON.parse(query.select)
          builder = builder.select(select)
        }
        const result = await builder.exec()

        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },
    deleteById: async function (ctx, next) {
      try {
        const result = await model.findByIdAndRemove(ctx.params.id).exec()
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },
    replaceById: async function (ctx, next) {
      try {
       
        await model.findByIdAndRemove(ctx.params.id).exec()
        const newDocument = ctx.request.body
        logger.debug(newDocument)
        newDocument._id = ctx.params.id
        const result = await model.create(newDocument)
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },
    updateById: async function (ctx, next) {
      try {
        console.log(ctx.request.body)
        const result = await model.findByIdAndUpdate(
          ctx.params.id,
          ctx.request.body,
          {
            new: true,
            useFindAndModify: true
          }
        ).exec()
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },
    create: async function (ctx, next) {
      try {
        const result = await model.create(ctx.request.body)
        ctx.status = 201
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },
  }
}