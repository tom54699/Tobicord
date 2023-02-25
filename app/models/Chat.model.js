const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../config/database.config")

const Chat = sequelize.define(
    "Chat",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)

module.exports = Chat
