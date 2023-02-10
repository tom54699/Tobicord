const MemberOrganization = require("../models/associations")
const Space = require("../models/Space.model")

module.exports = async (req, res, next) => {
    const userId = req.userId
    if (req.body.organizationId) {
        organizationId = req.body.organizationId
    } else {
        organizationId = req.query.organizationId
    }
    console.log("---------------------", organizationId)
    const role = await MemberOrganization.findOne({
        where: {
            MemberId: userId,
            OrganizationId: organizationId,
        },
    })
    if (role === null) {
        return res.json({
            message: "Unauthorized Role",
        })
    }
    if (role.roleId == "4") {
        req.role = "visitor"
        return next()
    }
    if (role.roleId !== "1" && role.roleId !== "2" && role.roleId !== "3" && role.roleId !== "4") {
        return res.json({
            message: "Unauthorized Role",
        })
    }

    return next()
}
