const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const spaceController = require("../controller/space.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const managerMiddleware = require("../middlewares/manager.middleware")
const visitorMiddleware = require("../middlewares/visitor.middleware")

router.get("/", authMiddleware, visitorMiddleware, spaceController.getUserSpaceData)
router.post("/", authMiddleware, managerMiddleware, check("spaceName").trim().isLength({ min: 1 }), spaceController.uploadSpaceData)
router.put("/", authMiddleware, managerMiddleware, check("newSpaceName").trim().isLength({ min: 1 }), spaceController.updateSpaceData)
router.delete("/", authMiddleware, managerMiddleware, spaceController.deleteSpaceData)
module.exports = router
