const path = require('path')
const { server, jwt } = require('./config')
const logger = require('./utils/log4js')
// 中间件
const cors = require('koa2-cors')
const initUser = require('./middleware/initUser')
const initOption = require('./middleware/initOption')
const koaBody = require('koa-body')
const logRequest = require('./middleware/logRequest')
const restc = require('restc')
const jwtKoa = require('koa-jwt')
// koa
const Koa = require('koa')
const app = new Koa()
// 路由
const login = require('./routes/login');
const logout = require('./routes/logout')
const rest = require('./routes/mongoRest')
const archive = require('./routes/mongoRest/archive')
const qiniu = require('./routes/qiniu')
try {
  initUser()
  initOption()
  
  app.use(cors())
  app.use(logRequest)
  app.use(koaBody())
  app.use(restc.koa2())
  // 验证插件
  app.use(jwtKoa({ secret: jwt.secret }).unless({
    path: [/^\/admin\/login/, /^\/api/]
  }))
  // 路由
  app.use(login.routes())
  app.use(logout.routes())
  app.use(rest.routes())
  app.use(archive.routes())
  app.use(qiniu.routes())
  
  app.listen(server.port, () => {
    logger.info(`server start at port ${server.port}`)
  })
} catch (error) {
  logger.error(error)
}

