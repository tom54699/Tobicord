const express = require("express")
const router = express.Router()

const organizationController = require("../controller/organization.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, organizationController.getUserOrganizationData)
router.post("/", authMiddleware, organizationController.uploadOrganizationData)
router.put("/", authMiddleware)
router.delete("/", authMiddleware)
module.exports = router
