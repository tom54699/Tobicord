const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const invitationController = require("../controller/invitation.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const managerMiddleware = require("../middlewares/manager.middleware")
const visitorMiddleware = require("../middlewares/visitor.middleware")

router.get("/", authMiddleware, visitorMiddleware, invitationController.getUserInvitationData)
router.post(
    "/",
    authMiddleware,
    managerMiddleware,
    managerMiddleware,
    check("inviteeEmail").trim().isLength({ min: 1 }),
    invitationController.uploadInvitationData
)
router.put("/", authMiddleware)
router.delete("/", authMiddleware)
module.exports = router
