const { validationResult } = require("express-validator")
const Tab = require("../service/TabTable")

class TabController {
    async uploadTabData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const collectionId = req.body.collectionId
            const newTabId = req.body.newTabId
            const tabId = req.body.tabId
            const tabName = req.body.tabName
            const tabUrl = req.body.tabUrl
            const favIconUrl = req.body.favIconUrl
            const tabDescription = req.body.tabDescription
            await Tab.CreateTabData(collectionId, newTabId, tabId, tabName, tabUrl, favIconUrl, tabDescription)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async uploadTabCardsData(req, res, next) {
        try {
            const tabsData = req.body.tabsData
            await Tab.CreateTabsData(tabsData)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async getUserTabData(req, res, next) {
        try {
            const collectionId = req.query.collectionId
            const tabData = await Tab.GetUserTabData(collectionId)
            return res.status(200).json({
                message: "ok",
                tabData: tabData,
            })
        } catch (err) {
            next(err)
        }
    }
    async switchTabCollection(req, res, next) {
        try {
            const response = await Tab.SwitchTabCollection(req.body.collectionId, req.body.tabId)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async updateTabData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const response = await Tab.UpdateTabData(req.body.tabId, req.body.newTabName, req.body.newTabUrl, req.body.newTabDescription)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteTabData(req, res, next) {
        try {
            const response = await Tab.DeleteTabData(req.body.tabId)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new TabController()
