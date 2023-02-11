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
            console.log(req.userId)
            /* check email */
            const response = await MemberTable.CheckLoginData(inviteeEmail)
            if (response === null) {
                return res.status(422).json({
                    message: "invalid email",
                })
            }
            const result = await Invitation.checkIsInvite(organizationId, req.userId, inviteeEmail)
            if (result) {
                return res.status(422).json({
                    message: "duplicate invitation",
                })
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
            console.log(req.role, req.userId, req.email)
            const invitationData = await Invitation.GetUserInvitationData(req.role, req.userId, req.email)
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
    } /*
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
    }*/
}

module.exports = new InvitationController()
