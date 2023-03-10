const sequelize = require("../config/database.config")
const Organization = require("../models/Organization.model")
const Member = require("../models/Member.model")
const MemberOrganization = require("../models/associations")

const AddOrganizationData = async (organizationName, userId) => {
    const member = await Member.findByPk(userId)
    const organization = await Organization.create({ organizationName: organizationName })
    const response = await member.addOrganization(organization, { through: { roleId: 1 } })
    const organizationData = response[0].dataValues
    return organizationData
}

const GetUserOrganizationData = async (userId) => {
    const member = await Member.findByPk(userId)
    const organization = await member.getOrganizations({ attributes: ["organizationName"] })
    return organization
}

const UpdateOrganizationData = async (userId, organizationId, newOrganizationName) => {
    try {
        const member = await Member.findByPk(userId)
        const organization = await member.getOrganizations({
            where: {
                id: organizationId,
            },
        })
        const response = await organization[0].update({
            organizationName: newOrganizationName,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteOrganizationData = async (organizationId, userId) => {
    try {
        const member = await MemberOrganization.findAll({
            attributes: ["OrganizationId"],
            where: { MemberId: userId, roleId: "1" },
        })
        if (member.length <= 1) {
            return "Cannot delete the last collection"
        }
        const response = await Organization.destroy({
            where: {
                id: organizationId,
            },
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    AddOrganizationData,
    GetUserOrganizationData,
    UpdateOrganizationData,
    DeleteOrganizationData,
}
