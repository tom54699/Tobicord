const { validationResult } = require("express-validator")
const Chat = require("../service/ChatTable")

class ChatController {
    async getUserChatData(req, res, next) {
        try {
            const organizationId = req.query.organizationId
            const chatData = await Chat.GetUserChatData(organizationId)
            return res.status(200).json({
                message: "ok",
                chatData: chatData,
            })
        } catch (err) {
            next(err)
        }
    } /*
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
    }*/
}

module.exports = new ChatController()
