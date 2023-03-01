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
    }
}

module.exports = new ChatController()
