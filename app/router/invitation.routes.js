const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const collectionController = require("../controller/collection.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const managerMiddleware = require("../middlewares/manager.middleware")
const visitorMiddleware = require("../middlewares/visitor.middleware")

router.get("/", authMiddleware)
router.post("/", authMiddleware)
router.put("/", authMiddleware)
router.delete("/", authMiddleware)
module.exports = router
