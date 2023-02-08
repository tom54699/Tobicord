const redis = require("redis")

class RedisService {
    constructor() {
        try {
            this.client = redis.createClient({
                url: "redis://localhost:6379",
                /*url: `redis://:${process.env["REDIS_PASSWORD"]}@redis:6379`,*/
            })
            this.asyncInit()
        } catch (error) {
            console.log(error)
        }
    }
    async asyncInit() {
        await this.client.connect()
    }

    async disconnect() {
        await this.client.quit()
    }

    async set({ key, value, timeType, time }) {
        try {
            await this.client.set(key, value, timeType, time)
        } catch (error) {
            console.log(error)
        }
    }

    async get(key) {
        try {
            const result = await this.client.get(key)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async setWindow(key, data) {
        try {
            const result = await this.client.set(key, JSON.stringify(data), redis.print)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    async getWindow(key) {
        try {
            const result = await this.client.get(key)
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async deleteWindow(key) {
        try {
            const result = await this.client.del(key)

            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateWindow(key, data) {
        try {
            const result = await this.client.set(key, JSON.stringify(data), redis.print)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new RedisService()
