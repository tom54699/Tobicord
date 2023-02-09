const MemberOrganization = require("../models/associations")
const Space = require("../models/Space.model")

module.exports = async (req, res, next) => {
    const userId = req.userId
    let organizationId
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
        return res.json({
            message: "Unauthorized Role",
        })
    }
    if (role.roleId !== "1" && role.roleId !== "2") {
        return res.json({
            message: "Unauthorized Role",
        })
    }

    return next()
}
