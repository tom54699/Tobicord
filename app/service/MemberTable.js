const sequelize = require("../config/database.config")
const Members = require("../models/Members.model")

const AddMembersBasicData = async (username, email, password) => {
    const response = await Members.create({ username: username, email: email, password: password })
    return response
}

const CheckEmailRepeat = async (email) => {
    const response = await Members.findOne({ where: { email: email } })
    return response
}

const CheckLoginData = async (email, password) => {
    const response = await Members.findOne({
        attributes: ["email", "password"],
        where: { email: email },
    })
    return response
}

module.exports = {
    AddMembersBasicData,
    CheckEmailRepeat,
    CheckLoginData,
}
