const jwt = require("jsonwebtoken")
class JwtService {
    async generate(email, name, userId) {
        const message = "ok"
        const access = jwt.sign(
            {
                name: name,
                type: process.env.JWT_ACCESS,
                userId: userId,
            },
            process.env.JWT_KEY,
            {
                subject: email,
                expiresIn: parseInt(process.env.JWT_ACCESS_TIME, 10),
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
            }
        )
        const refresh = jwt.sign(
            {
                name: name,
                type: process.env.JWT_REFRESH,
                userId: userId,
            },
            process.env.JWT_KEY,
            {
                subject: email,
                expiresIn: parseInt(process.env.JWT_REFRESH_TIME, 10),
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
            }
        )
        return { message, access, refresh }
    }
}

module.exports = new JwtService()
