const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const tabController = require("../controller/tab.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const visitorMiddleware = require("../middlewares/visitor.middleware")
const memberMiddleware = require("../middlewares/member.middleware")

router.get("/", authMiddleware, visitorMiddleware, tabController.getUserTabData)
router.post("/", authMiddleware, memberMiddleware, check("tabName").trim().isLength({ min: 1 }), tabController.uploadTabData)
router.put("/", authMiddleware, memberMiddleware, check("newTabName").trim().isLength({ min: 1 }), tabController.updateTabData)
router.put("/collection", authMiddleware, memberMiddleware, tabController.switchTabCollection)
router.delete("/", authMiddleware, memberMiddleware, tabController.deleteTabData)
module.exports = router
