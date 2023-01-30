const MemberTable = require("../service/MemberTable")
const Organization = require("../service/OrganizationTable")

class OrganizationController {
    async uploadOrganizationData(req, res, next) {
        try {
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
}

module.exports = new OrganizationController()
