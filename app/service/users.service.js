class UsersService {
    loggedIn(req) {
        return {
            username: req.name,
            email: req.email,
        }
    }
}

module.exports = new UsersService()
