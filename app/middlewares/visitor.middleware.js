const MemberOrganization = require("../models/associations")
const Space = require("../models/Space.model")

module.exports = async (req, res, next) => {
    let organizationId
    const userId = req.userId
    if (req.body.organizationId) {
        organizationId = req.body.organizationId
    } else {
        organizationId = req.query.organizationId
    }
    const role = await MemberOrganization.findOne({
        where: {
            MemberId: userId,
            OrganizationId: organizationId,
        },
    })
    if (role === null) {
        return res.status(403).json({
            message: "Unauthorized Role",
        })
    }
    if (role.roleId == "1") {
        req.organizationId = organizationId
        req.role = "owner"
        return next()
    }
    if (role.roleId == "2") {
        req.organizationId = organizationId
        req.role = "manager"
        return next()
    }
    if (role.roleId == "3") {
        req.organizationId = organizationId
        req.role = "member"
        return next()
    }
    if (role.roleId == "4") {
        req.organizationId = organizationId
        req.role = "visitor"
        return next()
    }
    if (role.roleId !== "1" && role.roleId !== "2" && role.roleId !== "3" && role.roleId !== "4") {
        return res.status(403).json({
            message: "Unauthorized Role",
        })
    }

    return next()
}
