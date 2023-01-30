const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Member = require("./Member.model")
const Organization = require("./Organization.model")
const Space = require("./Space.model")
const Collection = require("./Collection.model")
const Tab = require("./Tab.model")

Member.belongsToMany(Organization, { through: "Member_Organization" })
Organization.belongsToMany(Member, { through: "Member_Organization" })

Organization.hasMany(Space)
Space.belongsTo(Organization)

Space.hasMany(Collection)
Collection.belongsTo(Space)

Collection.hasMany(Tab)
Tab.belongsTo(Collection)
