const sequelize = require("../config/database.config")
const Collection = require("../models/Collection.model")
const Member = require("../models/Member.model")
const Organization = require("../models/Organization.model")
const Invitation = require("../models/Invitation.model")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

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
const GetUserInvitationData = async (inviterId, inviteeEmail) => {
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
                notification: {
                    [Op.ne]: "false",
                },
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
                notification: {
                    [Op.ne]: "false",
                },
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

const GetUserApprovalData = async (organizationsId) => {
    try {
        const approvalResponse = await Invitation.findAll({
            include: [
                {
                    model: Member,
                    as: "Invitee",
                    attributes: ["username", "id"],
                },
                {
                    model: Organization,
                    as: "Organization",
                    attributes: ["organizationName"],
                },
            ],
            attributes: ["inviterId", "inviteeEmail", "organizationId"],
            where: { organizationId: { [Op.in]: organizationsId }, status: "pending-approval" },
        })
        console.log
        return approvalResponse
    } catch (err) {
        console.error(err)
        return err
    }
}

const UpdateInvitationData = async (organizationId, inviterId, inviteeEmail, status, notification = "true") => {
    try {
        const response = await Invitation.update(
            {
                status: status,
                notification: notification,
            },
            { where: { organizationId: organizationId, inviterId: inviterId, inviteeEmail: inviteeEmail } }
        )
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteInvitationData = async (organizationId, inviterId, inviteeEmail) => {
    try {
        const response = await Invitation.destroy({
            where: {
                organizationId: organizationId,
                inviterId: inviterId,
                inviteeEmail: inviteeEmail,
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
    UpdateInvitationData,
    DeleteInvitationData,
    GetUserApprovalData,
}
