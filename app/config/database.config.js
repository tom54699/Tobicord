const Sequelize = require("sequelize")

const sequelize = new Sequelize("tobicord", process.env["AWS_RDS_USER"], process.env["AWS_RDS_PASSWORD"], {
    host: process.env["AWS_RDS_ENDPOINT"],
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
})

module.exports = sequelize

// axios
