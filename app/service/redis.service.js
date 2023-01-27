const redis = require("redis")

class RedisService {
    constructor() {
        this.client = redis.createClient(6379, "tobicord-jwt.lwgrql.ng.0001.usw2.cache.amazonaws.com")
    }
    async connect() {
        await this.client.connect()
    }
    async disconnect() {
        await this.client.quit()
    }

    async set({ key, value, timeType, time }) {
        try {
            await this.client.connect()
            await this.client.set(key, value, timeType, time)
            await this.client.quit()
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }

    async get(key) {
        try {
            await this.client.connect()
            const result = await this.client.get(key)
            await this.client.quit()
            return result
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }

    async setWindow(key, data) {
        try {
            await this.client.connect()
            const result = await this.client.set(key, JSON.stringify(data), redis.print)
            console.log(result)
            await this.client.quit()
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }
    async getWindow(key) {
        try {
            await this.client.connect()
            const result = await this.client.get(key)
            await this.client.quit()
            return result
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }
    async deleteWindow(key) {
        try {
            await this.client.connect()
            const result = await this.client.del(key)
            await this.client.quit()
            return result
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }
    async updateWindow(key, data) {
        try {
            await this.client.connect()
            const result = await this.client.set(key, JSON.stringify(data), redis.print)
            console.log(result)
            await this.client.quit()
        } catch (error) {
            console.log(error)
            await this.client.quit()
        }
    }
}

module.exports = new RedisService()
