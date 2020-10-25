const path = require('path')

// log4js 配置
const log4jsConfig = {
    appenders: {
        'STDOUT': {
            type: 'stdout'
        },
        'FILE_ALL': {
            type: 'file',
            filename: path.resolve(__dirname, './../log/blog.log'),
            maxLogSize: 10485760,
            backups: 10
        }
    },
    categories: {
        default: {
            appenders: ['STDOUT', 'FILE_ALL'],
            level: 'debug'
        }
    }
}

module.exports = log4jsConfig