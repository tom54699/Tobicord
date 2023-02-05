const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Tab = sequelize.define(
    "Tab",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        tabName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        tabUrl: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        favIconUrl: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        tabDescription: {
            type: Sequelize.STRING(1000),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)

module.exports = Tab
