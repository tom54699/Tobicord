const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const tabController = require("../controller/tab.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, tabController.getUserTabData)
router.post("/", authMiddleware, check("tabName").trim().isLength({ min: 1 }), tabController.uploadTabData)
router.put("/", authMiddleware, check("newTabName").trim().isLength({ min: 1 }))
router.put("/collection", authMiddleware, tabController.switchTabCollection)
router.delete("/", authMiddleware, tabController.deleteTabData)
module.exports = router
