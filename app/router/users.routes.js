const express = require("express")
const router = express.Router()

const usersController = require("../controller/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({
    dest: "uploads/",
})

router.get("/", authMiddleware, usersController.loggedIn)
router.get("/avatar", authMiddleware, usersController.getMemberHeadShot)
router.put("/", authMiddleware, usersController.firstLoginDone)
router.put("/avatar", authMiddleware, upload.single("image"), usersController.uploadMemberHeadShot)
module.exports = router
