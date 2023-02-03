const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const spaceController = require("../controller/space.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, spaceController.getUserSpaceData)
router.post("/", authMiddleware, check("spaceName").trim().isLength({ min: 1 }), spaceController.uploadSpaceData)
router.put("/", authMiddleware, check("newSpaceName").trim().isLength({ min: 1 }), spaceController.updateSpaceData)
router.delete("/", authMiddleware, spaceController.deleteSpaceData)
module.exports = router
