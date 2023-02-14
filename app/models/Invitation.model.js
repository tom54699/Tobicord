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
        status: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        notification: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        freezeTableName: true,
    }
)

module.exports = Invitation
