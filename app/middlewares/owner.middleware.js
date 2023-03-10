const MemberOrganization = require("../models/associations")

module.exports = async (req, res, next) => {
    const userId = req.userId
    const organizationId = req.body.organizationId
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
        req.role = "owner"
        return next()
    }
    if (role.roleId !== "1") {
        return res.status(403).json({
            message: "Unauthorized Role",
        })
    }
    return next()
}
