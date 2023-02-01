const { validationResult } = require("express-validator")
const Space = require("../service/SpaceTable")

class SpaceController {
    async uploadSpaceData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            const organizationId = req.body.organizationId
            const spaceName = req.body.spaceName
            await Space.CreateSpaceData(organizationId, req.userId, spaceName)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            return err
        }
    }
    async getUserSpaceData(req, res, next) {
        try {
            const organizationId = req.query.organizationId
            const spaceData = await Space.GetUserSpaceData(organizationId, req.userId)
            return res.status(200).json({
                message: "ok",
                spaceData: spaceData,
            })
        } catch (err) {
            next(err)
        }
    }
    async updateOrganizationData(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: "invalid format",
                    errorMessages: errors.array(),
                })
            }
            /*const response = await Organization.UpdateOrganizationData(
                req.email,
                req.body.organizationName,
                req.body.newOrganizationName
            )*/
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteOrganizationData(req, res, next) {
        try {
            //const response = await Organization.DeleteOrganizationData(req.email, req.body.organizationName)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SpaceController()
