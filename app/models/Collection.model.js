const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")

const Collection = sequelize.define(
    "Collection",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        collectionName: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)

module.exports = Collection
