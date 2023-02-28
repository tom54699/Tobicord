const usersService = require("../service/users.service.js")
const MemberTable = require("../service/MemberTable")
const { v4: uuidv4 } = require("uuid")
const S3 = require("aws-sdk/clients/s3.js")
const fs = require("fs")

class UsersController {
    async loggedIn(req, res, next) {
        try {
            const response = usersService.loggedIn(req)
            const userId = response.userId
            const userName = response.username
            const userEmail = response.email
            const result = await MemberTable.CheckFirstLogin(userEmail)
            const firstLogin = result.dataValues.firstLogin
            return res.status(200).json({
                userId: userId,
                userName: userName,
                userEmail: userEmail,
                firstLogin: firstLogin,
            })
        } catch (err) {
            next(err)
        }
    }
    async firstLoginDone(req, res, next) {
        try {
            const userEmail = req.email
            const result = await MemberTable.EditFirstLogin(userEmail)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async uploadMemberHeadShot(req, res, next) {
        try {
            const userId = req.userId
            const imageType = req.body.imageType
            const imageBuffer = fs.readFileSync(req.file.path)
            const UserUUID = uuidv4()
            const s3 = new S3({
                endpoint: `https://${process.env["R2_ACCOUNT_ID"]}.r2.cloudflarestorage.com`,
                accessKeyId: `${process.env["R2_ACCESS_KEY_ID"]}`,
                secretAccessKey: `${process.env["R2_ACCESS_KEY_SECRET"]}`,
                signatureVersion: "v4",
            })
            const uploadResult = await s3
                .upload({
                    Bucket: "tobicord",
                    Key: `user/${userId}.${imageType}`,
                    Body: imageBuffer,
                })
                .promise()
            const objectParams = {
                Bucket: "tobicord",
                Key: `user/${userId}.${imageType}`,
            }

            // 检查 ETag 是否匹配
            const headResult = await s3.headObject(objectParams).promise()
            if (headResult.ETag !== uploadResult.ETag) {
                fs.unlinkSync(req.file.path)
                return res.status(408).json({
                    message: "upload failed",
                })
            } else {
                const avatarUrl = `https://pub-61a84bb50f35476fb1e838152ab72616.r2.dev/user/${userId}.${imageType}`
                const response = await MemberTable.UploadMemberHeadShot(userId, avatarUrl)
                fs.unlinkSync(req.file.path)
                return res.status(200).json({
                    message: "ok",
                })
            }
        } catch (err) {
            next(err)
        }
    }
    async getMemberHeadShot(req, res, next) {
        try {
            const userId = req.userId
            const response = await MemberTable.GetMemberHeadShot(userId)
            if (response.dataValues.avatarUrl === null) {
                return res.status(404).json({
                    message: "Not Found",
                })
            } else {
                return res.status(200).json({
                    message: "ok",
                    avatarUrl: response.dataValues.avatarUrl,
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UsersController()
