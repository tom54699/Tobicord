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
        console.log(response)
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
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}
/*
const SwitchTabCollection = async (collectionId, tabId) => {
    try {
        console.log(collectionId, tabId)
        const response = await Tab.update({ CollectionId: collectionId }, { where: { id: tabId } })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}

const UpdateTabData = async (tabId, newTabName, newTabUrl, newTabDescription) => {
    try {
        const tab = await Tab.findByPk(tabId)
        const response = await tab.update({
            tabName: newTabName,
            tabUrl: newTabUrl,
            tabDescription: newTabDescription,
        })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteTabData = async (tabId) => {
    try {
        const response = await Tab.destroy({
            where: {
                id: tabId,
            },
        })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}
*/
module.exports = {
    CreateChatData,
    GetUserChatData,
}
