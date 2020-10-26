const isProd = ['prod', 'production'].includes(process.env.NODE_ENV)

module.exports = {
    publicPath: isProd ? './': '/',
    outputDir: 'dist', //构建文件的目录
    assetsDir: './assets',
    lintOnSave: false,
    transpileDependencies: [],
    productionSourceMap: false,  //生产模式的sourcemap
    css: {
        extract: true,  //css提取到单独文件
        sourceMap: false,
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/proxyPrefix' : {
                target: 'http://localhost:3000',
                chageOrigin: true,
                pathOverwrite: {
                    '^/proxyPrefix': ''
                }
            }
        }
    }
}