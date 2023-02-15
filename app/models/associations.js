const Sequelize = require("sequelize")
const sequelize = require("../config/database.config")
const Member = require("./Member.model")
const Organization = require("./Organization.model")
const Space = require("./Space.model")
const Collection = require("./Collection.model")
const Tab = require("./Tab.model")
const Role = require("./Role.model")
const Permission = require("./Permission.model")
const Invitation = require("./Invitation.model")

const MemberOrganization = sequelize.define(
    "Member_Organization",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        freezeTableName: true,
    }
)
MemberOrganization.belongsTo(Member, { foreignKey: "MemberId", targetKey: "id" })
Member.belongsToMany(Organization, { through: "Member_Organization", onDelete: "cascade" })
Organization.belongsToMany(Member, { through: "Member_Organization", onDelete: "cascade" })

Role.belongsToMany(Permission, { through: "Role_Permission", onDelete: "cascade" })
Permission.belongsToMany(Role, { through: "Role_Permission", onDelete: "cascade" })

MemberOrganization.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" })

Invitation.belongsTo(Member, { as: "Inviter", foreignKey: "inviterId", targetKey: "id" })
Invitation.belongsTo(Member, { as: "Invitee", foreignKey: "inviteeEmail", targetKey: "email" })

Invitation.belongsTo(Organization, { foreignKey: "organizationId", targetKey: "id" })

Organization.hasMany(Space, { onDelete: "cascade" })
Space.belongsTo(Organization)

Space.hasMany(Collection, { onDelete: "cascade" })
Collection.belongsTo(Space)

Collection.hasMany(Tab, { onDelete: "cascade" })
Tab.belongsTo(Collection)

module.exports = MemberOrganization
