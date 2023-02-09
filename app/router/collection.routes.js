const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const collectionController = require("../controller/collection.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const memberMiddleware = require("../middlewares/member.middleware")

router.get("/", authMiddleware, collectionController.getUserCollectionData)
router.post(
    "/",
    authMiddleware,
    memberMiddleware,
    check("collectionName").trim().isLength({ min: 1 }),
    collectionController.uploadCollectionData
)
router.put(
    "/",
    authMiddleware,
    memberMiddleware,
    check("newCollectionName").trim().isLength({ min: 1 }),
    collectionController.updateCollectionData
)
router.delete("/", authMiddleware, memberMiddleware, collectionController.deleteCollectionData)
module.exports = router
