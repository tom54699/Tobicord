const sequelize = require("../config/database.config")
const Member = require("../models/Member.model")
const MemberOrganization = require("../models/associations")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const AddMembersBasicData = async (username, email, password) => {
    const response = await Member.create({ username: username, email: email, password: password })
    return response
}

const CheckEmailRepeat = async (email) => {
    const response = await Member.findOne({ where: { email: email } })
    return response
}

const CheckLoginData = async (email) => {
    const response = await Member.findOne({
        attributes: ["id", "email", "password"],
        where: { email: email },
    })
    return response
}

const CheckIsJoined = async (organizationId, inviteeId) => {
    const response = await MemberOrganization.findOne({
        attributes: ["roleId"],
        where: { OrganizationId: organizationId, MemberId: inviteeId },
    })
    return response
}

const GetMemberNameByEmail = async (email) => {
    const response = await Member.findOne({
        attributes: ["username"],
        where: { email: email },
    })
    const username = response.dataValues.username
    return username
}
const CheckMemberRole = async (organizationId, memberId) => {
    try {
        const role = await MemberOrganization.findOne({
            attributes: ["roleId"],
            where: { MemberId: memberId, OrganizationId: organizationId },
        })
        return role
    } catch (err) {
        console.log(err)
    }
}

const AddMemberToOrganization = async (organizationId, memberId) => {
    try {
        const response = await MemberOrganization.create({
            MemberId: memberId,
            OrganizationId: organizationId,
            roleId: "3",
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

const HasPermissionOrganization = async (memberId) => {
    try {
        const response = await MemberOrganization.findAll({
            attributes: ["OrganizationId"],
            where: { MemberId: memberId, [Op.or]: [{ roleId: "1" }, { roleId: "2" }] },
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    AddMembersBasicData,
    CheckEmailRepeat,
    CheckLoginData,
    GetMemberNameByEmail,
    CheckMemberRole,
    AddMemberToOrganization,
    HasPermissionOrganization,
    CheckIsJoined,
}
