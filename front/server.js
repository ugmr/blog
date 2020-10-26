const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')
const server = new Koa()
const htmlTemplate = require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')

const renderer = createBundleRenderer(
    require('./dist/vue-ssr-server-bundle.json'),
    {
        runInNewContext: false,
        template: htmlTemplate,
        clientManifest: require('./dist/vue-ssr-client-manifest.json')
    }
)

server.use(static(__dirname, 'dist'))

server.use(async (ctx, next) => {
    let context = {
        url: ctx.request.url,
    }
    // 拒绝资源请求
    if (/\.\w+$/.test(context.url)) {
        return await next()
    }

    return new Promise((resolve, reject) => {
        renderer.renderToString(context, function (err, html) {
            if (err) {
                return reject(err)
            }
            ctx.status = 200
            ctx.type = 'text/html;charset=urt-8'
            ctx.body = html
            resolve(html)
        })
    })
})

server.on('error', function (err) {
    console.log(err)
})

let port = 3001

server.listen(port, () => {
    console.log(`server start at port ${port}`)
})