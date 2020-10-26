module.exports = (isProd) => {
    return {
        preserveWhitespace: false,  //清除文本换行的情况的空格
        extractCSS: isProd ?  true : false, //把vue中的css提取到单独的文件 
        postcss: [
            require('autoprefixer')()
        ]
    }
}