const express = require("express")
const router = express.Router()

const usersController = require("../controller/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, usersController.loggedIn)
router.get("/avatar", authMiddleware, usersController.getMemberHeadShot)
router.put("/", authMiddleware, usersController.firstLoginDone)
router.put("/avatar", authMiddleware, usersController.uploadMemberHeadShot)
module.exports = router
