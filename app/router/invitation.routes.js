const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const invitationController = require("../controller/invitation.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const memberMiddleware = require("../middlewares/member.middleware")
const visitorMiddleware = require("../middlewares/visitor.middleware")

router.get("/", authMiddleware, invitationController.getUserInvitationData)
router.post(
    "/",
    authMiddleware,
    memberMiddleware,
    check("inviteeEmail").trim().isLength({ min: 1 }),
    invitationController.uploadInvitationData
)
router.put("/accept", authMiddleware, invitationController.acceptInvitation)
router.put("/refuse", authMiddleware, invitationController.refuseInvitation)
router.get("/approval", authMiddleware, invitationController.getUserApprovalData)
router.put("/approval/accept", authMiddleware, invitationController.acceptApproval)
router.put("/approval/refuse", authMiddleware, invitationController.refuseApproval)
router.delete("/", authMiddleware, invitationController.deleteRefuseApproval)
module.exports = router
