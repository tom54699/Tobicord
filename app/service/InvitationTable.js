const sequelize = require("../config/database.config")
const Collection = require("../models/Collection.model")
const Member = require("../models/Member.model")
const Organization = require("../models/Organization.model")
const Invitation = require("../models/Invitation.model")

const CreateInvitationData = async (organizationId, inviterId, inviteeEmail) => {
    try {
        const status = "invited"
        const response = await Invitation.create({
            inviterId: inviterId,
            inviteeEmail: inviteeEmail,
            organizationId: organizationId,
            status: status,
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}
const checkIsInvite = async (organizationId, inviterId, inviteeEmail) => {
    const response = await Invitation.findOne({
        where: { inviterId: inviterId, inviteeEmail: inviteeEmail, organizationId: organizationId },
    })
    return response
}
const GetUserInvitationData = async (role, inviterId, inviteeEmail) => {
    try {
        /* 邀請 */
        const inviteResponse = await Invitation.findAll({
            include: [
                {
                    model: Member,
                    as: "Invitee",
                    attributes: ["username"],
                },
                {
                    model: Member,
                    as: "Inviter",
                    attributes: ["username"],
                },
                {
                    model: Organization,
                    as: "Organization",
                    attributes: ["organizationName"],
                },
            ],
            where: {
                inviterId: inviterId,
            },
        })
        /* 受邀 */
        const inviteeResponse = await Invitation.findAll({
            include: [
                {
                    model: Member,
                    as: "Inviter",
                    attributes: ["username"],
                },
                {
                    model: Member,
                    as: "Invitee",
                    attributes: ["username"],
                },
                {
                    model: Organization,
                    as: "Organization",
                    attributes: ["organizationName"],
                },
            ],
            where: {
                inviteeEmail: inviteeEmail,
            },
        })
        let combinedResponse = {}
        let inviteResponseData = []
        let inviteeResponseData = []
        for (let i of inviteResponse) {
            inviteResponseData.push(i.dataValues)
        }
        for (let i of inviteeResponse) {
            inviteeResponseData.push(i.dataValues)
        }
        combinedResponse.inviteResponse = inviteResponseData
        combinedResponse.inviteeResponse = inviteeResponseData
        return combinedResponse
    } catch (err) {
        console.error(err)
        return err
    }
}

const UpdateCollectionData = async (collectionId, newCollectionName) => {
    try {
        const collection = await Collection.findByPk(collectionId)
        const response = await collection.update({
            collectionName: newCollectionName,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteCollectionData = async (collectionId) => {
    try {
        const response = await Collection.destroy({
            where: {
                id: collectionId,
            },
        })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateInvitationData,
    checkIsInvite,
    GetUserInvitationData,
}
