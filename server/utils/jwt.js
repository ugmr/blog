const jwt = require('jsonwebtoken')
const config = require('./../config')

let secret = config.jwt.secret
let expires = config.jwt.expires

function createToken(userinfo) {
    let token = 'Bearer ' + jwt.sign(userinfo, secret, {
        expiresIn: expires
    })
    return token
}

function verifyToken(token) {
    if(!token) return false
    try {
        const result = jwt.verify(token.substring('Bearer '.length), secret)
        return result
    } catch(error) {
        return false
    }
}

module.exports = {
    createToken,
    verifyToken,
    expires
}