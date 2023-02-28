const { Server } = require("socket.io")
const Invitation = require("../service/InvitationTable")
const MemberTable = require("../service/MemberTable")
const ChatTable = require("../service/ChatTable")

function Socket(server) {
    const io = new Server(server)
    let users = {}
    io.on("connection", (socket) => {
        socket.on("login", (data) => {
            users[socket.id] = { userName: data.userName, userEmail: data.userEmail, userId: data.userId }
            console.log(`${data.userName} 登入，socket id 為 ${socket.id}`)
        })
        socket.on("disconnect", () => {
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
    })
}

function notificationSocket(socket, io, users) {
    socket.on("sendInvitation", (data) => {
        const inviterSockedId = findSocketIdByEmail(users, data.inviterEmail)
        const inviteeSockedId = findSocketIdByEmail(users, data.inviteeEmail)
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
        const inviterSockedId = findSocketIdByUserId(users, data.inviterId)
        if (users[inviterSockedId]) {
            io.to(inviterSockedId).emit("receiveRefuseInvitation", {
                inviteeName: data.inviteeName,
                organizationId: data.organizationId,
                organizationName: data.organizationName,
            })
        }
    })
    socket.on("sendAcceptInvitation", async (data) => {
        const inviterSockedId = findSocketIdByUserId(users, data.inviterId)
        if (users[inviterSockedId]) {
            io.to(inviterSockedId).emit("receiveAcceptInvitation", {
                inviteeName: data.inviteeName,
                organizationId: data.organizationId,
                organizationName: data.organizationName,
                message: data.message,
            })
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
