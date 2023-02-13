const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const authController = require("../controller/auth.controller")
const checkLoginMiddleware = require("../middlewares/checkLogin.middleware")
const refreshMiddleware = require("../middlewares/refresh.middleware")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authController.renderPage)
router.get("/login/check", checkLoginMiddleware, authController.checkIsLogin, authController.renderPage)
router.put("/login", authController.login)
router.post("/refresh", refreshMiddleware, authController.refreshToken)
router.post(
    "/register",
    check("email").trim().isEmail().withMessage("- invalid email format"),
    check("password").trim().isLength({ min: 6 }).withMessage("- must be at least 6 characters"),
    authController.register
)
router.delete("/logout", authMiddleware, authController.logout)
module.exports = router
