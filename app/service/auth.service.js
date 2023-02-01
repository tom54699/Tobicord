const jwtService = require("./jwt.service.js")
const redisService = require("./redis.service")
const MemberTable = require("../service/MemberTable")
const bcrypt = require("bcrypt")
//const cookieParser = require('cookie-parser')

class AuthService {
    async login({ email, password }) {
        const response = await MemberTable.CheckLoginData(email)
        const userId = response.dataValues.id
        if (response === null) {
            return { message: "Invalid credentials" }
        }
        const hash = response.password
        if (bcrypt.compareSync(password, hash)) {
            const username = await MemberTable.GetMemberNameByEmail(email)
            return jwtService.generate(email, username, userId)
        } else {
            return { message: "Invalid credentials" }
        }
    }
    async logout() {
        try {
            await redisService.set({
                key: token,
                value: "1",
                timeType: "EX",
                time: parseInt(process.env.JWT_REFRESH_TIME, 10),
            })
            return { message: "ok" }
        } catch (err) {
            console.log(err)
        }
    }
    async refresh({ email, name, userId, token }) {
        try {
            await redisService.set({
                key: token,
                value: "1",
                timeType: "EX",
                time: parseInt(process.env.JWT_REFRESH_TIME, 10),
            })
            return await jwtService.generate(email, name, userId)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new AuthService()
