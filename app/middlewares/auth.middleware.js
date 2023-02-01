const jwt = require("jsonwebtoken")
const ServerError = require("../errors/server.error")

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const [bearerToken, token] = req.headers.authorization.split(" ")
        if (bearerToken === "Bearer") {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY, {
                    expiresIn: parseInt(process.env.JWT_ACCESS_TIME, 10),
                })
                if (
                    decoded.type !== process.env.JWT_ACCESS ||
                    decoded.aud !== process.env.JWT_AUDIENCE ||
                    decoded.iss !== process.env.JWT_ISSUER
                ) {
                    next(new ServerError(401, "Invalid token type"))
                }
                req.email = decoded.sub
                req.name = decoded.name
                req.userId = decoded.userId
                return next()
            } catch (err) {
                console.log(err)
                if (err == "TokenExpiredError: jwt expired") {
                    return next(new ServerError(401, "Access Token expired"))
                }
                return next(new ServerError(401, "Invalid jwt token"))
            }
        }
        return next(new ServerError(401, "Invalid bearer token"))
    }
    return next(new ServerError(401, "Authorization header is not present"))
}
