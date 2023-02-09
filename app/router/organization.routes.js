const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const organizationController = require("../controller/organization.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const ownerMiddleware = require("../middlewares/owner.middleware")

router.get("/", authMiddleware, organizationController.getUserOrganizationData)
router.post(
    "/",
    authMiddleware,
    check("organizationName").trim().isLength({ min: 1 }).withMessage("Organization name must be greater than 1 character"),
    organizationController.uploadOrganizationData
)
router.put(
    "/",
    authMiddleware,
    ownerMiddleware,
    check("newOrganizationName").trim().isLength({ min: 1 }),
    organizationController.updateOrganizationData
)
router.delete("/", authMiddleware, ownerMiddleware, organizationController.deleteOrganizationData)
module.exports = router
