const usersService = require("../service/users.service.js")
const MemberTable = require("../service/MemberTable")
class UsersController {
    async loggedIn(req, res, next) {
        try {
            const response = usersService.loggedIn(req)
            const userId = response.userId
            const userName = response.username
            const userEmail = response.email
            const result = await MemberTable.CheckFirstLogin(userEmail)
            const firstLogin = result.dataValues.firstLogin
            return res.status(200).json({
                userId: userId,
                userName: userName,
                userEmail: userEmail,
                firstLogin: firstLogin,
            })
        } catch (err) {
            next(err)
        }
    }
    async firstLoginDone(req, res, next) {
        try {
            const userEmail = req.email
            const result = await MemberTable.EditFirstLogin(userEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UsersController()
