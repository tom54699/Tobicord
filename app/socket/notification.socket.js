const { Server } = require("socket.io")

function notificationSocket(server) {
    const io = new Server(server)

    io.on("connection", (socket) => {
        console.log("------------------------------------")
        console.log("a user connected", socket.id)
        socket.on("disconnect", () => {
            console.log("------------------------------------")
            console.log("user disconnected")
        })
        socket.on("notification", (data) => {
            console.log("------------------------------------")
            console.log(data)
        })
    })
}

module.exports = { notificationSocket }
