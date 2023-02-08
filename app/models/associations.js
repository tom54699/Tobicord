const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Member = require("./Member.model")
const Organization = require("./Organization.model")
const Space = require("./Space.model")
const Collection = require("./Collection.model")
const Tab = require("./Tab.model")
const Role = require("./Role.model")
const Permission = require("./Permission.model")

const MemberOrganization = sequelize.define(
    "Member_Organization",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roleId: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
)

Member.belongsToMany(Organization, { through: "Member_Organization", onDelete: "cascade" })
Organization.belongsToMany(Member, { through: "Member_Organization", onDelete: "cascade" })

Role.belongsToMany(Permission, { through: "Role_Permission", onDelete: "cascade" })
Permission.belongsToMany(Role, { through: "Role_Permission", onDelete: "cascade" })

Organization.hasMany(Space, { onDelete: "cascade" })
Space.belongsTo(Organization)

Space.hasMany(Collection, { onDelete: "cascade" })
Collection.belongsTo(Space)

Collection.hasMany(Tab, { onDelete: "cascade" })
Tab.belongsTo(Collection)
