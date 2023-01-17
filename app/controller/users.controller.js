const usersService = require("../service/users.service.js")

class UsersController {
    loggedIn(req, res, next) {
        try {
            return res.status(200).send(usersService.loggedIn(req))
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UsersController()
