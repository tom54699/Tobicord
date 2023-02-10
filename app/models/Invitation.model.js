const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")

const Invitation = sequelize.define(
    "Invitation",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        inviterId: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        inviteeEmail: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        organizationId: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)

module.exports = Invitation
