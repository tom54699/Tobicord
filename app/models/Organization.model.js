const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Organization = sequelize.define(
    "Organization",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        organizationName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)
module.exports = Organization
