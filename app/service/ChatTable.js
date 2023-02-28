const sequelize = require("../config/database.config")
const Organization = require("../models/Organization.model")
const Member = require("../models/Member.model")
const Chat = require("../models/Chat.model")

const CreateChatData = async (organizationId, userId, content) => {
    try {
        const response = await Chat.create({
            organizationId: organizationId,
            memberId: userId,
            content: content,
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const GetUserChatData = async (organizationId) => {
    try {
        const response = await Chat.findAll({
            include: [
                {
                    model: Member,
                    attributes: ["username", "avatarUrl", "id"],
                },
            ],
            attributes: ["content", "memberId", "createdAt"],
            where: { organizationId: organizationId },
            limit: 50,
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}
module.exports = {
    CreateChatData,
    GetUserChatData,
}
