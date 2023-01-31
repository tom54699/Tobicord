const MemberTable = require("../service/MemberTable")
const Organization = require("../service/OrganizationTable")
const { validationResult } = require("express-validator")

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
            await Organization.AddOrganizationData(organizationName, req.email)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async getUserOrganizationData(req, res, next) {
        try {
            const organizationData = await Organization.GetUserOrganizationData(req.email)
            return res.status(200).json({
                message: "ok",
                organizationData: organizationData,
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
            const response = await Organization.UpdateOrganizationData(
                req.email,
                req.body.organizationName,
                req.body.newOrganizationName
            )
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteOrganizationData(req, res, next) {
        try {
            const response = await Organization.DeleteOrganizationData(req.email, req.body.organizationName)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OrganizationController()
