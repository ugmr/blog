const env = process.env

module.exports = {
    server: {
        port: env.serverPort || 3000
    },
    user: {
        name: env.userName || 'admin',
        password: env.userPassword || 'admin',
        displayName: env.userDisplayName || 'admin'
    },
    jwt: {
        secret: env.tokenSecret || 'secret',
        expires: env.tokenExpires || 3600
    },
    // 七牛云配置
    qiniu: {
        accessKey: '',
        secretKey: '',
        options: {
            scope: '',  //bucket
            expires: 7200  //有效期2小时
        }
    },
    db: {
        host: env.mongoHost || '127.0.0.1',
        port: env.mongoPort || 27017,
        user: env.mongoUser || 'blogAdmin',
        password: env.mongoPassword || '109451',
        database: env.mongoDatabase || 'blog'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    },
    log4js: require('./log4js'),
    options: require('./options')
}