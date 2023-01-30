const authService = require("../service/auth.service.js")
const MemberTable = require("../service/MemberTable")
const { validationResult } = require("express-validator")
const RedisService = require("../service/redis.service.js")
const bcrypt = require("bcrypt")

class AuthController {
    async login(req, res, next) {
        try {
            const response = await authService.login(req.body)
            if (response.message !== "ok") {
                return (
                    res.json({
                        message: "Invalid credentials",
                        errorMessages: [{ msg: "- invalid email or password" }],
                    }),
                    422
                )
            } else res.cookie("refreshToken", `${response.refresh}`, { httpOnly: true })
            return res.status(200).json({
                message: "ok",
                accessToken: response.access,
            })
        } catch (err) {
            next(err)
        }
    }
    async logout(req, res, next) {
        try {
            const response = await authService.logout()
            res.clearCookie("refreshToken")
            RedisService.disconnect()
            return res.status(200).json({ message: "ok" })
        } catch (err) {
            next(err)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { access, refresh } = await authService.refresh({
                email: req.email,
                name: req.name,
                token: req.cookies.refreshToken,
            })
            await res.cookie("refreshToken", `${refresh}`, { httpOnly: true })
            return res.status(200).json({
                message: "ok",
                accessToken: access,
            })
        } catch (err) {
            next(err)
        }
    }
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return (
                    res.json({
                        message: "invalid format",
                        errorMessages: errors.array(),
                    }),
                    422
                )
            }
            const response = await MemberTable.CheckEmailRepeat(email)
            if (response === null) {
                const hash = bcrypt.hashSync(password, process.env["SALTROUNDS"])
                await MemberTable.AddMembersBasicData(username, email, hash)
                res.json({ message: "ok" })
            } else {
                return (
                    res.json({
                        message: "invalid format",
                        errorMessages: [{ param: "email", msg: "- this email address is already registered" }],
                    }),
                    422
                )
            }
        } catch (err) {
            console.log("Something Wrong:", err)
            next(err)
        }
    }
}

module.exports = new AuthController()
