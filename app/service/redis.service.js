const redis = require("redis")

class RedisService {
    constructor() {
        this.client = redis.createClient(6379, "tobicord-jwt.lwgrql.ng.0001.usw2.cache.amazonaws.com")
    }

    async set({ key, value, timeType, time }) {
        await this.client.connect()
        await this.client.set(key, value, timeType, time)
        await this.client.disconnect()
    }

    async get(key) {
        await this.client.connect()
        const result = await this.client.get(key)
        await this.client.disconnect()
        return result
    }
}

module.exports = new RedisService()
