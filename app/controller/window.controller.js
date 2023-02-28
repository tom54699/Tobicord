const RedisService = require("../service/redis.service.js")

class WindowController {
    async setWindow(req, res, next) {
        try {
            const key = req.body.userEmail
            const data = req.body
            await RedisService.setWindow(key, data)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteWindow(req, res, next) {
        try {
            const key = req.body.userEmail
            const result = await RedisService.deleteWindow(key)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
    async getWindow(req, res, next) {
        try {
            const key = req.email
            const result = await RedisService.getWindow(key)
            if (result === null) {
                return res.status(404).json({
                    message: "No Data",
                })
            } else {
                const windowData = JSON.parse(result)
                windowData.message = "ok"
                return res.status(200).send(windowData)
            }
        } catch (err) {
            return err
        }
    }
    async updateWindow(req, res, next) {
        try {
            const key = req.body.userEmail
            const data = req.body
            await RedisService.updateWindow(key, data)
            return res.status(200).json({
                message: "ok",
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new WindowController()
