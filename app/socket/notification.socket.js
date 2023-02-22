const { Server } = require("socket.io")
const Invitation = require("../service/InvitationTable")
const MemberTable = require("../service/MemberTable")

function notificationSocket(server) {
    const io = new Server(server)
    let users = {}
    io.on("connection", (socket) => {
        console.log("------------------------------------")
        console.log("a user connected", socket.id)
        socket.on("login", (data) => {
            console.log("------------------------------------")
            users[socket.id] = { userName: data.userName, userEmail: data.userEmail, userId: data.userId }
            console.log(users)
            console.log(`${data.userName} 登入，socket id 為 ${socket.id}`)
        })
        socket.on("disconnect", () => {
            console.log("------------------------------------")
            delete users[socket.id]
            console.log("user disconnected", socket.id)
        })
        socket.on("sendInvitation", (data) => {
            console.log("------------------------------------")
            const inviterSockedId = findSocketIdByEmail(users, data.inviterEmail)
            const inviteeSockedId = findSocketIdByEmail(users, data.inviteeEmail)
            console.log(inviteeSockedId)
            if (inviterSockedId && inviteeSockedId) {
                message = `${data.inviterName}傳送邀請給${users[inviteeSockedId].userName}`
                io.to(inviteeSockedId).emit("invitation", {
                    inviterId: data.inviterId,
                    inviterName: data.inviterName,
                    organizationId: data.organizationId,
                    organizationName: data.organizationName,
                })
            } else {
                console.log("------------------------------------", "其中一方找不到")
                socket.emit("invitation_error", {
                    message: `找不到 email 為 ${data.inviteeEmail} 的使用者`,
                })
            }
        })
        socket.on("sendRefuseInvitation", (data) => {
            console.log("------------------------------------")
            const inviterSockedId = findSocketIdByUserId(users, data.inviterId)
            if (users[inviterSockedId]) {
                io.to(inviterSockedId).emit("receiveRefuseInvitation", {
                    inviteeName: data.inviteeName,
                    organizationId: data.organizationId,
                    organizationName: data.organizationName,
                })
                console.log("user refuseInvitation", data)
            }
        })
        socket.on("sendAcceptInvitation", async (data) => {
            console.log("------------------------------------")
            const inviterSockedId = findSocketIdByUserId(users, data.inviterId)
            if (users[inviterSockedId]) {
                console.log(data.message)
                io.to(inviterSockedId).emit("receiveAcceptInvitation", {
                    inviteeName: data.inviteeName,
                    organizationId: data.organizationId,
                    organizationName: data.organizationName,
                    message: data.message,
                })
                console.log("user acceptInvitation", data)
            }
        })
    })
}

function findSocketIdByEmail(users, email) {
    for (const socketId in users) {
        if (users[socketId].userEmail === email) {
            return socketId
        }
    }
    return null
}
function findSocketIdByUserId(users, id) {
    for (const socketId in users) {
        if (users[socketId].userId === id) {
            return socketId
        }
    }
    return null
}

module.exports = { notificationSocket }
