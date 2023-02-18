const authService = require("../service/auth.service.js")
const MemberTable = require("../service/MemberTable")
const Space = require("../service/SpaceTable")
const Organization = require("../service/OrganizationTable")
const { validationResult } = require("express-validator")
const RedisService = require("../service/redis.service.js")
const bcrypt = require("bcrypt")

class AuthController {
    async login(req, res, next) {
        try {
            const response = await authService.login(req.body)
            if (response.message !== "ok") {
                return res.status(422).json({
                    message: "Invalid credentials",
                    errorMessages: [{ msg: "- invalid email or password" }],
                })
            } else {
                res.cookie("refreshToken", `${response.refresh}`, { httpOnly: true })
                return res.status(200).json({
                    message: "ok",
                    accessToken: response.access,
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(422).json({
                message: "Invalid credentials",
                errorMessages: [{ msg: "- invalid email or password" }],
            })
        }
    }
    async logout(req, res, next) {
        try {
            const response = await authService.logout()
            res.clearCookie("refreshToken")
            return res.status(200).json({ message: "ok" })
        } catch (err) {
            return err
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { access, refresh } = await authService.refresh({
                email: req.email,
                name: req.name,
                userId: req.userId,
                token: req.cookies.refreshToken,
            })
            await res.cookie("refreshToken", `${refresh}`, { httpOnly: true })
            return res.status(200).json({
                message: "ok",
                accessToken: access,
            })
        } catch (err) {
            return err
        }
    }
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const response = await MemberTable.CheckEmailRepeat(email)
            if (response === null) {
                const hash = bcrypt.hashSync(password, process.env["SALTROUNDS"])
                const memberData = await MemberTable.AddMembersBasicData(username, email, hash)
                const userId = memberData.dataValues.id
                const organizationData = await Organization.AddOrganizationData("My Favorite", userId)
                console.log(organizationData)
                const organizationId = organizationData.OrganizationId
                await Space.CreateSpaceData(organizationId, userId, "Starred Collections")
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
            return err
        }
    }
    async renderPage(req, res) {
        res.render("login")
    }
    async checkIsLogin(req, res, next) {
        try {
            const userId = req.userId
            if (userId) {
                return res.json({
                    message: "Is Login",
                })
            } else {
                return next()
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new AuthController()
