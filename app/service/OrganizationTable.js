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

const UpdateOrganizationData = async (email, organizationName, newOrganizationName) => {
    try {
        const member = await Member.findOne({
            where: { email: email },
        })
        const organization = await member.getOrganizations({
            where: {
                organizationName: organizationName,
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
const DeleteOrganizationData = async (email, organizationName) => {
    try {
        const member = await Member.findOne({
            where: { email: email },
        })
        const response = await Organization.destroy({
            where: {
                organizationName: organizationName,
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
