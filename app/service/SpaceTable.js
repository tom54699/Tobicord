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

const UpdateSpaceData = async (spaceId, newSpaceName) => {
    try {
        const space = await Space.findByPk(spaceId)
        console.log("space", space)

        const response = await space.update({
            spaceName: newSpaceName,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteSpaceData = async (spaceId) => {
    try {
        const response = await Space.destroy({
            where: {
                id: spaceId,
            },
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateSpaceData,
    GetUserSpaceData,
    UpdateSpaceData,
    DeleteSpaceData,
}
