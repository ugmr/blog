const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')

module.exports = merge(baseConfig, {
    entry: './src/entry-client.js',
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
        ]
    },
    plugins: [
        new ExtractCssChunksPlugin({
          filename:  'css/[name].[contenthash:8].css',
          chunkFilename:'css/[name].[contenthash:8].chunk.css'
        }),
        new VueSSRClientPlugin()
    ]
})