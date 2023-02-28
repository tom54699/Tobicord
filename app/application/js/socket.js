import { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild } from "./generatePage.js"
let socketId

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const socket = io()
        window.socket = socket
        socket.on("connect", () => {
            socketId = socket.id
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
        const audio = new Audio("../mp3/提示音效.wav")
        audio.play()
        leftSectionNavBottomNoticeButton[1].classList.add("notice-blink")
        setTimeout(() => {
            leftSectionNavBottomNoticeButton[1].classList.remove("notice-blink")
        }, 10000)
        const refuseMessage = `<div>${data.inviteeName} declined ${data.organizationName} organization invitation</div>`
        generateInvitationNotification(data.inviterId, data.inviteeName, data.organizationId, data.organizationName, refuseMessage)
        const notification = document.getElementById(`notice-invite-card-box-${data.inviterId}-${data.organizationId}`)
        setTimeout(() => {
            notification.remove()
        }, 4000)
    })
}

function receiveAcceptInvitation(socket) {
    const leftSectionNavBottomNoticeButton = document.getElementsByClassName("leftSection-nav-bottom-button")
    let message
    socket.on("receiveAcceptInvitation", (data) => {
        if (data.message === "⏳ Please wait for the administrator to review.") {
            message = `<div>${data.inviteeName} accept the invitation to ${data.organizationName} ,waiting for the approval.</div>`
        } else if (data.message === "🎉Congratulations, you have successfully joined the organization!🎉") {
            message = `<div>${data.inviteeName} has joined the ${data.organizationName} organization</div>`
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
