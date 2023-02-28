const { validationResult } = require("express-validator")
const Invitation = require("../service/InvitationTable")
const MemberTable = require("../service/MemberTable")

class InvitationController {
    async uploadInvitationData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const organizationId = req.body.organizationId
            const inviteeEmail = req.body.inviteeEmail
            /* check email */
            const checkLoginResponse = await MemberTable.CheckLoginData(inviteeEmail)
            if (checkLoginResponse === null) {
                return res.status(422).json({
                    message: "invalid email",
                })
            }
            const inviteeId = checkLoginResponse.id
            const response = await MemberTable.CheckIsJoined(organizationId, inviteeId)
            if (response) {
                return res.status(422).json({
                    message: "Invitee is already in the organization.",
                })
            }
            const result = await Invitation.checkIsInvite(organizationId, req.userId, inviteeEmail)
            if (result) {
                if (result.status === "refused" || result.status === "approve-refused") {
                    const response = await Invitation.UpdateInvitationData(organizationId, req.userId, inviteeEmail, "invited", "true")
                    return res.status(200).json({
                        message: "ok",
                    })
                } else {
                    return res.status(422).json({
                        message: "duplicate invitation",
                    })
                }
            }
            await Invitation.CreateInvitationData(organizationId, req.userId, inviteeEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async getUserInvitationData(req, res, next) {
        try {
            const invitationData = await Invitation.GetUserInvitationData(req.userId, req.email)
            return res.status(200).json({
                message: "ok",
                invitationData: invitationData,
                role: req.role,
                userId: req.userId,
                userEmail: req.email,
            })
        } catch (err) {
            return err
        }
    }
    async getUserApprovalData(req, res, next) {
        try {
            const organization = await MemberTable.HasPermissionOrganization(req.userId)
            let organizationsId = []
            for (let i of organization) {
                organizationsId.push(i.OrganizationId)
            }
            const approvalData = await Invitation.GetUserApprovalData(organizationsId)
            return res.status(200).json({
                message: "ok",
                approvalData: approvalData,
                role: req.role,
                userId: req.userId,
                userEmail: req.email,
            })
        } catch (err) {
            return err
        }
    }

    async acceptInvitation(req, res, next) {
        try {
            const inviterId = req.body.inviterId
            const organizationId = req.body.organizationId
            const inviteeEmail = req.email
            const inviterRole = await MemberTable.CheckMemberRole(organizationId, inviterId)
            if (inviterRole.roleId === 1 || inviterRole.roleId === 2) {
                const response = await Invitation.UpdateInvitationData(organizationId, inviterId, inviteeEmail, "joined", "false")
                const result = await MemberTable.AddMemberToOrganization(organizationId, req.userId)
                return res.status(200).json({
                    message: "🎉Congratulations, you have successfully joined the organization!🎉",
                })
            } else {
                const response = await Invitation.UpdateInvitationData(organizationId, inviterId, inviteeEmail, "pending-approval", "true")
                return res.status(200).json({
                    message: "⏳ Please wait for the administrator to review.",
                })
            }
        } catch (err) {
            return err
        }
    }
    async refuseInvitation(req, res, next) {
        try {
            const inviterId = req.body.inviterId
            const organizationId = req.body.organizationId
            const inviteeEmail = req.email
            const response = await Invitation.UpdateInvitationData(organizationId, inviterId, inviteeEmail, "refused", "true")
            return res.status(200).json({
                message: "Declined invitation successfully.",
            })
        } catch (err) {
            return err
        }
    }
    async acceptApproval(req, res, next) {
        try {
            const inviterId = req.body.inviterId
            const organizationId = req.body.organizationId
            const inviteeEmail = req.body.inviteeEmail
            const inviteeId = req.body.inviteeId
            const response = await Invitation.UpdateInvitationData(organizationId, inviterId, inviteeEmail, "joined", "false")
            if (response.length > 0) {
                const result = await MemberTable.AddMemberToOrganization(organizationId, inviteeId)
                return res.status(200).json({
                    message: "Approval completed.",
                })
            }
        } catch (err) {
            return err
        }
    }
    async refuseApproval(req, res, next) {
        try {
            const inviterId = req.body.inviterId
            const organizationId = req.body.organizationId
            const inviteeEmail = req.body.inviteeEmail
            const response = await Invitation.UpdateInvitationData(organizationId, inviterId, inviteeEmail, "approve-refused", "true")
            return res.status(200).json({
                message: "Approval completed.",
            })
        } catch (err) {
            return err
        }
    }
    async deleteRefuseApproval(req, res, next) {
        try {
            const inviterId = req.body.inviterId
            const organizationId = req.body.organizationId
            const inviteeEmail = req.body.inviteeEmail
            const response = await Invitation.DeleteInvitationData(organizationId, inviterId, inviteeEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
}

module.exports = new InvitationController()
