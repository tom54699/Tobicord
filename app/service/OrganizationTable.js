const sequelize = require("../config/database.config")
const Organization = require("../models/Organization.model")
const Member = require("../models/Member.model")

const AddOrganizationData = async (organizationName, email) => {
    const member = await Member.findOne({
        where: { email: email },
    })
    const organization = await Organization.create({ organizationName: organizationName })
    const response = await member.addOrganization(organization)
    return response
}

const GetUserOrganizationData = async (email) => {
    const member = await Member.findOne({
        where: { email: email },
    })
    const organization = await member.getOrganizations({ attributes: ["organizationName"] })
    return organization
}

module.exports = {
    AddOrganizationData,
    GetUserOrganizationData,
}
