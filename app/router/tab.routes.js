const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const tabController = require("../controller/tab.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware)
router.post("/", authMiddleware, check("tabName").trim().isLength({ min: 1 }), tabController.uploadTabData)
router.put("/", authMiddleware, check("newTabName").trim().isLength({ min: 1 }))
router.delete("/", authMiddleware)
module.exports = router
