const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Role = sequelize.define(
    "Role",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roleName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)
module.exports = Role
