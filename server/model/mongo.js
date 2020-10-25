const mongoose = require('mongoose')
const { db } = require('./../config')
const logger = require('./../utils/log4js')

mongoose.Promise = require('bluebird')

const mongoURL = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`

mongoose.connect(mongoURL,{ useNewUrlParser: true ,useUnifiedTopology: true })

let connection = mongoose.connection

connection.on('error', (error) => {
    logger.error('mongo connect error', error)
})
connection.once('open', () => {
    logger.info('mongo connect success')
})

let Schema = mongoose.Schema

let post = new Schema({
    title: String,
    pathName: { type: String, default: '' },
    summary: { type: String },
    content: { type: String },
    allowComment: { type: Boolean, default: true },
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()},
    isPublic: { type: Boolean, default: true },
    commentNum: Number,
    options: Object,
    category: String,
    tags: Array
})

let category = new Schema({
    name: String,
})

let tag = new Schema({
    name: String,
})

let option = new Schema({
    key: String,
    value: Schema.Types.Mixed,
})
let comment = new Schema({
    pathName: {type: String, default: ''},
    displayName: {type: String, default: ''},
    content: {type: String, default: ''},
    repliedAt: {type: Date, default: new Date()}
})

let user = new Schema({
    name: String,
    displayName: String,
    password: String,
    email: String
})

post = mongoose.model('post', post, 'post')
category = mongoose.model('category', category, 'category')
option = mongoose.model('option', option, 'option')
tag = mongoose.model('tag', tag, 'tag')
user = mongoose.model('user', user,'user')
comment = mongoose.model('comment', comment, 'comment')
module.exports = {
    post,
    category,
    option,
    tag,
    user,
    comment
}