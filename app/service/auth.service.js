const jwtService = require("./jwt.service.js")
const redisService = require("./redis.service")
const MemberTable = require("../service/MemberTable")
const bcrypt = require("bcrypt")

class AuthService {
    async login({ email, password }) {
        const response = await MemberTable.CheckLoginData(email, password)
        if (response === null) {
            return { message: "Invalid credentials" }
        }
        const hash = response.password
        if (bcrypt.compareSync(password, hash)) {
            return jwtService.generate(email, "Tom")
        } else {
            return { message: "Invalid credentials" }
        }
    }
    async refresh({ email, name, token }) {
        try {
            await redisService.set({
                key: token,
                value: "1",
                timeType: "EX",
                time: parseInt(process.env.JWT_REFRESH_TIME, 10),
            })
            return jwtService.generate(email, name)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new AuthService()
