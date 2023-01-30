const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Space = sequelize.define(
    "Space",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        spaceName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)
module.exports = Space
