const { validationResult } = require("express-validator")
const Collection = require("../service/CollectionTable")
class CollectionController {
    async uploadCollectionData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const spaceId = req.body.spaceId
            const collectionName = req.body.collectionName
            const response = await Collection.CreateCollectionData(spaceId, collectionName)
            return res.status(200).json({
                message: "ok",
                collectionId: response.dataValues.id,
            })
        } catch (err) {
            return err
        }
    }
    async getUserCollectionData(req, res, next) {
        try {
            let role
            const spaceId = req.query.spaceId
            if (req.role) {
                role = req.role
            }
            const collectionData = await Collection.GetUserCollectionData(spaceId)
            return res.status(200).json({
                message: "ok",
                collectionData: collectionData,
                role: role,
            })
        } catch (err) {
            return err
        }
    }
    async updateCollectionData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const response = await Collection.UpdateCollectionData(req.body.collectionId, req.body.newCollectionName)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async deleteCollectionData(req, res, next) {
        try {
            const response = await Collection.DeleteCollectionData(req.body.collectionId)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async uploadSharedUrl(req, res, next) {
        try {
            const collectionId = req.body.collectionId
            const url = req.body.sharedUrl

            const response = await Collection.UploadSharedUrl(collectionId, url)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async checkIsCreatedShareUrl(req, res, next) {
        try {
            const collectionId = req.query.collectionId
            const response = await Collection.CheckIsCreatedShareUrl(collectionId)
            if (response.dataValues.collectionSharedUrl === null) {
                return res.status(200).json({
                    message: "No DATA",
                })
            } else {
                return res.status(200).json({
                    message: "ok",
                    shareUrl: response.dataValues.collectionSharedUrl,
                })
            }
        } catch (err) {
            return err
        }
    }
    async deleteSharedUrl(req, res, next) {
        try {
            const response = await Collection.DeleteSharedUrl(req.body.collectionId)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async checkIsSharedUrl(req, res, next) {
        try {
            const collectionId = req.query.collectionId
            const currentUrl = req.query.currentUrl
            const response = await Collection.CheckIsSharedUrl(collectionId, currentUrl)
            console.log("*---------------------------------------")
            console.log(response)
            console.log(currentUrl)
            if (response.dataValues.collectionSharedUrl === null) {
                return res.status(200).json({
                    message: "No DATA",
                })
            } else {
                return next()
            }
        } catch (err) {
            return err
        }
    }
}

module.exports = new CollectionController()
