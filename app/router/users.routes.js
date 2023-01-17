const express = require("express")
const router = express.Router()

const usersController = require("../controller/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, usersController.loggedIn)

module.exports = router
