const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")

const Members = sequelize.define("Members", {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },
    verifyCode: {
        type: Sequelize.STRING,
    },
    friendId: {
        type: Sequelize.INTEGER,
    },
})

module.exports = Members
