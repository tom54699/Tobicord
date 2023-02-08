const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Permission = sequelize.define(
    "Permission",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        permissionName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)
module.exports = Permission
