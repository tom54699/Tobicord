class ServerError extends Error {
    constructor(code, message) {
        console.log(code, message)
        super(message)
        this.code = code
    }
}

module.exports = ServerError
