const Organization = require("../service/OrganizationTable")
const Space = require("../service/SpaceTable")
const { validationResult } = require("express-validator")
const Member = require("../models/Member.model")
const MemberTable = require("../service/MemberTable")
const Invitation = require("../service/InvitationTable")

class OrganizationController {
    async uploadOrganizationData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const organizationName = req.body.organizationName
            const organizationData = await Organization.AddOrganizationData(organizationName, req.userId)
            await Space.CreateSpaceData(organizationData.OrganizationId, req.userId, "Starred Collections")
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async getUserOrganizationData(req, res, next) {
        try {
            const organizationData = await Organization.GetUserOrganizationData(req.userId)
            return res.status(200).json({
                message: "ok",
                organizationData: organizationData,
            })
        } catch (err) {
            next(err)
        }
    }
    async getOrganizationMember(req, res, next) {
        try {
            const organizationId = req.query.organizationId
            const response = await MemberTable.GetMembersFromOrganization(organizationId)
            return res.status(200).json({
                message: "ok",
                organizationMemberData: response,
            })
        } catch (err) {
            next(err)
        }
    }
    async updateOrganizationData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const response = await Organization.UpdateOrganizationData(req.userId, req.body.organizationId, req.body.newOrganizationName)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteOrganizationData(req, res, next) {
        try {
            const response = await Organization.DeleteOrganizationData(req.body.organizationId, req.userId)
            if (response === "Cannot delete the last collection") {
                return res.status(403).json({
                    message: "Forbidden",
                })
            } else {
                return res.status(200).json({
                    message: "ok",
                })
            }
        } catch (err) {
            next(err)
        }
    }
    async changeMemberRole(req, res, next) {
        try {
            const memberId = req.body.memberId
            const organizationId = req.body.organizationId
            const roleId = req.body.roleId
            const response = await MemberTable.ChangeMemberRole(organizationId, memberId, roleId)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            console.log(err)
            return err
        }
    }
    async deleteOrganizationMember(req, res, next) {
        try {
            const memberId = req.body.memberId
            const inviteeEmail = req.body.inviteeEmail
            const organizationId = req.body.organizationId
            const response = await MemberTable.DeleteOrganizationMember(organizationId, memberId)
            const result = await Invitation.DeleteInvitationDataWithoutInviter(organizationId, inviteeEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            console.log(err)
            return err
        }
    }
    async leaveOrganizationMember(req, res, next) {
        try {
            const memberId = req.userId
            const inviteeEmail = req.email
            const organizationId = req.body.organizationId
            const response = await MemberTable.CheckMemberRole(organizationId, memberId)
            if (response.dataValues.roleId === 1) {
                return res.status(403).json({
                    message: "Owner can't leave organization.",
                })
            }
            await MemberTable.DeleteOrganizationMember(organizationId, memberId)
            await Invitation.DeleteInvitationDataWithoutInviter(organizationId, inviteeEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

module.exports = new OrganizationController()
