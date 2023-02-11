const jwt = require("jsonwebtoken")
const ServerError = require("../errors/server.error.js")
const RedisService = require("../service/redis.service.js")

module.exports = async (req, res, next) => {
    if (req.cookies.refreshToken) {
        const token = req.cookies.refreshToken
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (
                decoded.type !== process.env.JWT_REFRESH ||
                decoded.aud !== process.env.JWT_AUDIENCE ||
                decoded.iss !== process.env.JWT_ISSUER
            ) {
                return next(new ServerError(401, "Invalid token type"))
            }
            const value = await RedisService.get(token)
            if (value) {
                return next(new ServerError(401, "Refresh token was already used"))
            }
            req.email = decoded.sub
            req.name = decoded.name
            req.userId = decoded.userId
            return next()
        } catch (err) {
            return next(new ServerError(401, "Invalid jwt token"))
        }
    }
    return next(new ServerError(401, "Refresh token is not present!"))
}
