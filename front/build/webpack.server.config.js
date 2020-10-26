const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
    entry: './src/entry-server.js',
    target: 'node',
    devtool: 'source-map',
    // bundle 使用commonjs
    output: {
       libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
        ]
    },
    plugins: [
        // 把构建输出转换为json
        new VueSSRServerPlugin()
    ]
})