class UsersService {
    loggedIn(req) {
        return {
            name: req.name,
            email: req.email,
        }
    }
}

module.exports = new UsersService()
