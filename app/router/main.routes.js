const express = require("express")
const router = express.Router()

const mainController = require("../controller/mainController")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", mainController.enterPage)

module.exports = router
