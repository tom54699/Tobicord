const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const chatController = require("../controller/chat.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, chatController.getUserChatData)
router.post("/", authMiddleware)
router.put("/", authMiddleware)
router.delete("/", authMiddleware)
module.exports = router
