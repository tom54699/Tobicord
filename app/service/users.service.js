class UsersService {
    loggedIn(req) {
        return {
            userId: req.userId,
            username: req.name,
            email: req.email,
        }
    }
}

module.exports = new UsersService()
