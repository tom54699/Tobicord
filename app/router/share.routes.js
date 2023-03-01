const express = require("express")
const router = express.Router()

const collectionController = require("../controller/collection.controller")
const tabController = require("../controller/tab.controller")

router.get("/p/:id", (req, res) => {
    res.render("share")
})
router.get("/", collectionController.checkIsSharedUrl, tabController.getUserTabData)
router.get("/check", collectionController.checkIsCreatedShareUrl)
router.post("/", collectionController.uploadSharedUrl)
router.put("/", collectionController.deleteSharedUrl)
router.delete("/")

module.exports = router
