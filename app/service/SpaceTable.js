const sequelize = require("../config/database.config")
const Organization = require("../models/Organization.model")
const Member = require("../models/Member.model")
const Space = require("../models/Space.model")

const CreateSpaceData = async (organizationId, userId, spaceName) => {
    try {
        const member = await Member.findByPk(userId)
        const organization = await member.getOrganizations({
            where: {
                id: organizationId,
            },
        })
        if (!organization) {
            throw new Error("Organization 不存在")
        }
        const response = await organization[0].createSpace({
            spaceName: spaceName,
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const GetUserSpaceData = async (organizationId, userId) => {
    try {
        const member = await Member.findByPk(userId)
        const organization = await member.getOrganizations({
            where: {
                id: organizationId,
            },
        })
        const spaceData = await organization[0].getSpaces()
        return spaceData
    } catch (err) {
        console.error(err)
        return err
    }
}
/*
const UpdateSpaceData = async (userId, organizationName, newOrganizationName) => {
    try {
        const member = await Member.findByPk(userId)
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
*/
module.exports = {
    CreateSpaceData,
    GetUserSpaceData,
}
