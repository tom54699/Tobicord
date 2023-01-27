const express = require("express")
const router = express.Router()

const windowController = require("../controller/window.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, windowController.getWindow)
router.post("/", authMiddleware, windowController.setWindow)
router.put("/", authMiddleware, windowController.updateWindow)
router.delete("/", authMiddleware, windowController.deleteWindow)
module.exports = router
