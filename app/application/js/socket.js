import { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild } from "./generatePage.js"
let socketId

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const socket = io()
        window.socket = socket
        socket.on("connect", () => {
            socketId = socket.id
            console.log(socketId)
            receiveInvitation(socket)
            receiveRefuseInvitation(socket)
            receiveAcceptInvitation(socket)
        })
    } catch (error) {
        console.log(error)
    }
})

function receiveInvitation(socket) {
    const leftSectionNavBottomNoticeButton = document.getElementsByClassName("leftSection-nav-bottom-button")
    socket.on("invitation", (data) => {
        console.log("------------------------------------")
        console.log(data)
        leftSectionBuild.generateInviteMessageCardWithButton(data.inviterId, data.inviterName, data.organizationId, data.organizationName)
        leftSectionBuild.inviteButtonAddEvent(data.inviterId, data.organizationId, data.organizationName)
        const audio = new Audio("../mp3/提示音效.wav")
        audio.play()
        leftSectionNavBottomNoticeButton[1].classList.add("notice-blink")
        setTimeout(() => {
            leftSectionNavBottomNoticeButton[1].classList.remove("notice-blink")
        }, 10000)
    })
}

function receiveRefuseInvitation(socket) {
    const leftSectionNavBottomNoticeButton = document.getElementsByClassName("leftSection-nav-bottom-button")
    socket.on("receiveRefuseInvitation", (data) => {
        console.log("------------------------------------")
        console.log(data)
        const audio = new Audio("../mp3/提示音效.wav")
        audio.play()
        leftSectionNavBottomNoticeButton[1].classList.add("notice-blink")
        setTimeout(() => {
            leftSectionNavBottomNoticeButton[1].classList.remove("notice-blink")
        }, 10000)
        const refuseMessage = `<div>${data.inviteeName}已拒絕了${data.organizationName}群組邀請</div>`
        generateInvitationNotification(data.inviterId, data.inviteeName, data.organizationId, data.organizationName, refuseMessage)
    })
}

function receiveAcceptInvitation(socket) {
    const leftSectionNavBottomNoticeButton = document.getElementsByClassName("leftSection-nav-bottom-button")
    let message
    socket.on("receiveAcceptInvitation", (data) => {
        console.log("------------------------------------")
        console.log(data)
        if (data.message === "⏳ 請稍後管者者審核，通過後會自動加入。") {
            message = `<div>${data.inviteeName}已接受${data.organizationName}群組邀請，等候管理員同意。</div>`
        } else if (data.message === "🎉恭喜你，加入群組成功!🎉") {
            message = `<div>${data.inviteeName}已加入${data.organizationName}群組</div>`
        }
        const audio = new Audio("../mp3/提示音效.wav")
        audio.play()
        leftSectionNavBottomNoticeButton[1].classList.add("notice-blink")
        setTimeout(() => {
            leftSectionNavBottomNoticeButton[1].classList.remove("notice-blink")
        }, 10000)
        generateInvitationNotification(data.inviterId, data.inviteeName, data.organizationId, data.organizationName, message)
    })
}

function generateInvitationNotification(inviterId, inviteeName, organizationId, organizationName, message) {
    const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
    const noticeCardBox = document.createElement("div")
    noticeCardBox.classList.add("notice-card-box")
    noticeCardBox.setAttribute("id", `notice-invite-card-box-${inviterId}-${organizationId}`)
    noticeCardBox.innerHTML = message
    noticeCardBoxContainer[0].appendChild(noticeCardBox)
}
