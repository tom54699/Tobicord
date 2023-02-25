const { Server } = require("socket.io")
const Invitation = require("../service/InvitationTable")
const MemberTable = require("../service/MemberTable")
const ChatTable = require("../service/ChatTable")

function Socket(server) {
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
        notificationSocket(socket, io, users)
        chatSocket(socket, io, users)
    })
}

function chatSocket(socket, io, users) {
    // 加入聊天室
    socket.on("joinChatRoom", (data) => {
        socket.join(data.roomId)
        console.log(io.of("/").adapter.rooms)
        const room = io.of("/").adapter.rooms.get(data.roomId)
        if (room) {
            const users = Array.from(room)
            const userCount = users.length
            io.to(data.roomId).emit("chatRoomPeopleAccount", {
                roomId: data.roomId,
                peopleAccount: userCount,
                status: "joined",
                userName: data.userName,
                message: `${data.userName} joined room ${data.roomId}`,
            })
        }
    })

    // 離開聊天室
    socket.on("leaveChatRoom", (data) => {
        socket.leave(data.roomId)
        console.log(io.of("/").adapter.rooms)
        const room = io.of("/").adapter.rooms.get(data.roomId)
        if (room) {
            const users = Array.from(room)
            const userCount = users.length
            io.to(data.roomId).emit("chatRoomPeopleAccount", {
                roomId: data.roomId,
                peopleAccount: userCount,
                status: "leaved",
                userName: data.userName,
                message: `${data.userName} leaved room ${data.roomId}`,
            })
            if (userCount === 0) {
                io.of("/").adapter.rooms.delete(data.roomId)
                console.log(`room ${data.roomId} has been closed.`)
            }
        }
    })
    // 接收來自client端的訊息
    socket.on("chatMessage", async (data) => {
        console.log(`User ${data.userName} sent message in room ${data.roomId}: ${data.message}`)
        // 發送訊息到同一個聊天室內的其他client端
        io.to(data.roomId).emit("chatMessage", {
            userName: data.userName,
            message: data.message,
            avatarUrl: data.avatarUrl,
            userId: data.userId,
        })
        const response = await ChatTable.CreateChatData(data.organizationId, data.userId, data.message)
        console.log(response)
    })
}

function notificationSocket(socket, io, users) {
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

module.exports = { Socket }
