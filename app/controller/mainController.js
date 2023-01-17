class MainController {
    enterPage(req, res, next) {
        try {
            res.status(200).render("main")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new MainController()
