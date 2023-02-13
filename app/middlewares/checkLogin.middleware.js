const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.cookies.refreshToken) {
        const token = req.cookies.refreshToken
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (
                decoded.type !== process.env.JWT_REFRESH ||
                decoded.aud !== process.env.JWT_AUDIENCE ||
                decoded.iss !== process.env.JWT_ISSUER
            )
                req.email = decoded.sub
            req.name = decoded.name
            req.userId = decoded.userId
            return next()
        } catch (err) {
            return next()
        }
    }
    return next()
}
