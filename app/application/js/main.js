import { authApi, windowApi, organizationApi } from "./API/fetchApi.js"
import { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild } from "./generatePage.js"
const logoutButton = document.getElementsByClassName("user-popover-logout-button")
const preloadBackGround = document.getElementsByClassName("preload-back-ground")
let isCheck = false
let nowUserId
let nowUserName
let nowUserEmail

window.addEventListener("DOMContentLoaded", async () => {
    try {
        await checkMainPageAuth()
        if (isCheck) {
            preloadBackGround[0].classList.add("none")
            await rightSectionBuild.getUserWindow()
            await rightSectionBuild.reloadWindows()
            rightSectionBuild.manuallyAddTabCardButton()
            rightSectionBuild.getManuallyAddTabCardInput()
            rightSectionBuild.windowTabCreateNewCollection()
            mainPageBuild.dragManuallyTabCardsAddEvent()
            await leftSectionBuild.createCategoryButton()
            leftSectionBuild.beginnerGuidePopoverBoxButton()
            leftSectionBuild.leftSectionNavPlusButtonAddEvent()
            leftSectionBuild.closeAddCategoryPopover()
            leftSectionBuild.getAddCategoryPopoverInputValue()
            leftSectionBuild.createCategoryButtonAddEvent()
            leftSectionBuild.organizationEditNameButtonAddEvent()
            leftSectionBuild.openOrganizationEditPopoverButtonAddEvent()
            leftSectionBuild.closeOrganizationEditPopoverButtonAddEvent()
            leftSectionBuild.getOrganizationNameEditInputValue()
            leftSectionBuild.saveOrganizationNameEditButtonAddEvent()
            await leftSectionBuild.switchToDifferentOrganization()
            middleSectionBuild.chatRoomPeopleAccount()
            leftSectionBuild.organizationDeleteButtonAddEvent()
            leftSectionBuild.closeOrganizationDeleteBox()
            leftSectionBuild.organizationDeleteDoubleCheckInput()
            leftSectionBuild.organizationDeleteDoubleCheckButton()
            leftSectionBuild.closeOrganizationSuccessDeletePopoverBox()
            leftSectionBuild.spaceCreatePopoverBoxButtonAddEvent()
            leftSectionBuild.closeSpaceCreatePopoverBox()
            leftSectionBuild.getCreateSpacePopoverInputValue()
            leftSectionBuild.createSpaceButtonAddEvent()
            leftSectionBuild.openInviteMemberPopoverButtonAddEvent()
            leftSectionBuild.closeInviteMemberPopoverButtonAddEvent()
            leftSectionBuild.getInviteMemberPopoverInputValue()
            await leftSectionBuild.inviteMemberPopoverAddMemberButton()
            const defaultOrganizationButton = document.getElementsByClassName("leftSection-nav-top-category-button")[0]
            await defaultOrganizationButton.click()
            await defaultOrganizationButton.focus()
            middleSectionBuild.openChatRoom()
            const response = await leftSectionBuild.getInviteMessage()
            if (response === "No Data") {
                const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
                const noticeCardBox = document.createElement("div")
                noticeCardBox.innerHTML = `<div>No Notification</div>`
                noticeCardBoxContainer[0].appendChild(noticeCardBox)
            }
            leftSectionBuild.notificationButton()
            leftSectionBuild.approvalListButton()
            leftSectionBuild.openInviteNoticeBox()
            leftSectionBuild.openMemberBox()
            leftSectionBuild.uploadMemberHeadShot()
            await leftSectionBuild.getMemberHeadShot()
            leftSectionBuild.openSpaceEditPopoverBox()
            leftSectionBuild.closeSpaceEditPopoverBox()
            leftSectionBuild.spaceEditNameInputValue()
            leftSectionBuild.spaceEditNameButtonAddEvent()
            leftSectionBuild.spaceEditNameSaveButton()
            leftSectionBuild.spaceDeleteButtonAddEvent()
            leftSectionBuild.closeSpaceDeleteBox()
            leftSectionBuild.spaceDeleteDoubleCheckInput()
            leftSectionBuild.spaceDeleteDoubleCheckButton()
            leftSectionBuild.closeSpaceSuccessDeletePopoverBox()
            leftSectionBuild.switchBetweenMemberPreferences()
            leftSectionBuild.addMembersButton()
            leftSectionBuild.backManageOrganizationMemberPermissions()
            leftSectionBuild.manageOrganizationMemberPermissionsCheckBox()
            await leftSectionBuild.hasNotification()
            await leftSectionBuild.leaveOrganizationButton()
            middleSectionBuild.createFirstCollectionBoxButtonAddEvent()
            middleSectionBuild.openCloseDeleteCollectionCardPopover()
            await middleSectionBuild.deleCollectionCardsButton()
            middleSectionBuild.getTabCardEditBoxInput()
            await middleSectionBuild.tabCardEditBoxPopoverDeleteButton()
            middleSectionBuild.closeExportCollectionButtonAddEvent()
            middleSectionBuild.exportCollectionButtonAddEvent()
            middleSectionBuild.invalidAuthRolePopoverBox()
            middleSectionBuild.chatRoomInput()
            middleSectionBuild.sendChatMessage()
            middleSectionBuild.generateChatMessage()
            middleSectionBuild.chatRoomPeopleJoinLeave()
            middleSectionBuild.autoScrollPosition()
            mainPageBuild.dragChatRoomAddEvent()
            middleSectionBuild.openExportCollectionsButtonAddEvent()
            middleSectionBuild.closeShareCollectionButton()
        }
        mainPageBuild.rightSectionFold()
        mainPageBuild.leftSectionFold()
    } catch (error) {
        console.log(error)
    }
})

async function checkMainPageAuth() {
    try {
        const response = await authApi.checkAuth()
        const result = await response.data
        if (response.status === 200) {
            isCheck = true
            nowUserId = result.userId
            nowUserName = result.userName
            nowUserEmail = result.userEmail
            const socket = window.socket
            socket.emit("login", result)
            let isSaveClicked = false
            let isAddClicked = false
            const driver = new Driver({
                className: "step-popover-class",
                prevBtnText: "PREV",
                nextBtnText: "NEXT",
                doneBtnText: "DONE",
                closeBtnText: "CLOSE",
                allowClose: false,
                animate: true,
                opacity: 0.5,
                onHighlightStarted: (Element) => {
                    if (Element.node.id == "middleSection-nav-add-button-container") {
                        const addButton = document.getElementsByClassName("beginner-guide-popover-box-close-button")[0]
                        addButton.click()
                    }
                    if (Element.node.id == "tab-card-manually-add-popover-box") {
                        const closeButton = document.getElementsByClassName("tab-card-manually-add-popover-box-cancel-button")[0]
                        const addButton = document.getElementsByClassName("tab-card-manually-add-popover-box-save-button")[0]
                        const clickHandler = () => {
                            if (!isAddClicked) {
                                isAddClicked = false
                                driver.moveNext()
                            }
                            addButton.removeEventListener("click", clickHandler)
                        }
                        const clickHandler1 = () => {
                            if (!isAddClicked) {
                                isAddClicked = false
                                driver.moveNext()
                            }
                            closeButton.removeEventListener("click", clickHandler1)
                        }
                        addButton.addEventListener("click", clickHandler)
                        closeButton.addEventListener("click", clickHandler1)
                    }
                    if (Element.node.id == "middleSection-container-collection-cards-box") {
                        const addButton = document.getElementsByClassName("middleSection-container-add-collection-box-save-button")[0]
                        const clickHandler = () => {
                            if (!isSaveClicked) {
                                isSaveClicked = false
                                driver.moveNext()
                            }
                            addButton.removeEventListener("click", clickHandler)
                        }
                        addButton.addEventListener("click", clickHandler)
                    }
                },
                onNext: (Element) => {
                    driver.preventMove() //??????????????????????????????
                    setTimeout(() => {
                        driver.moveNext()
                    }, 500)
                    if (Element.node.id == "middleSection-nav-add-button-container") {
                        const addButton = document.getElementsByClassName("middleSection-nav-add-button")[0]
                        addButton.click()
                    }
                    if (Element.node.id == "reload-svg-container") {
                        const reloadButton = document.getElementById("reload-svg-container")
                        reloadButton.click()
                    }
                    if (Element.node.id == "rightSection-spaces-manually-add-tab-card") {
                        const addButton = document.getElementsByClassName("rightSection-spaces-window-tabs-container-top-add-svg")[0]
                        addButton.click()
                    }
                    if (Element.node.id == "tab-card-manually-add-popover-box") {
                        const addButton = document.getElementsByClassName("tab-card-manually-add-popover-box-save-button")[0]
                        isAddClicked = true
                        addButton.click()
                    }

                    if (Element.node.id == "middleSection-container-collection-cards-box") {
                        const addButton = document.getElementsByClassName("middleSection-container-add-collection-box-save-button")[0]
                        isSaveClicked = true
                        addButton.click()
                    }
                },
                onPrevious: (Element) => {
                    driver.preventMove() //??????????????????????????????

                    //??????????????????0.1??????????????????????????????
                    setTimeout(() => {
                        driver.movePrevious()
                    }, 500)
                    if (Element.node.id == "rightSection-spaces") {
                        const addButton = document.getElementsByClassName("rightSection-spaces-window-tabs-container-top-add-svg")[0]
                        isAddClicked = false
                        addButton.click()
                    }
                },
            })
            driver.defineSteps([
                {
                    element: "#leftSection-nav-bottom-button",
                    popover: {
                        title: "????????????",
                        description: `???????????????????????????????????????????????????????????????????????????????????????`,
                        position: "right",
                    },
                },
                {
                    element: "#middleSection-nav-add-button-container",
                    popover: {
                        title: "??????Collection(1)",
                        description: `?????????ADD COLLECTION`,
                        position: "bottom",
                    },
                },
                {
                    element: "#middleSection-container-collection-cards-box",
                    popover: {
                        title: "??????Collection(2)",
                        description: "??????Collection??????????????????Save",
                        position: "left",
                    },
                },
                {
                    element: "#rightSection",
                    popover: {
                        title: "?????????????????????????????????(1)",
                        description: `????????????????????????????????????????????????`,
                        position: "left",
                    },
                },
                {
                    element: "#reload-svg-container",
                    popover: {
                        title: "????????????????????????(1)",
                        description: `???????????????Tobicord??????????????????????????????ON???<br/>?????????????????????????????????????????????`,
                        position: "left",
                    },
                },
                {
                    element: "#rightSection-spaces-window-container",
                    popover: {
                        title: "????????????????????????(2)",
                        description: `???????????????????????????????????????????????????????????????window?????????????????????????????????????????????????????????`,
                        position: "left",
                    },
                },
                {
                    element: "#rightSection-spaces-manually-add-tab-card",
                    popover: {
                        title: "????????????????????????(1)",
                        description: `??????????????????????????????????????????????????????</br>??????+??????????????????????????????????????????`,
                        position: "left",
                    },
                },
                {
                    element: "#tab-card-manually-add-popover-box",
                    popover: {
                        title: "????????????????????????(2)",
                        description: `???????????????????????????save?????????????????????`,
                        position: "bottom",
                    },
                },
                {
                    element: "#rightSection-spaces",
                    popover: {
                        title: "???????????????????????????(1)",
                        description: `?????????????????????????????????????????????????????????????????????????????????????????????Collection?????????<img class="d-block w-100" src="https://pub-61a84bb50f35476fb1e838152ab72616.r2.dev/Tobicord%E6%8B%96%E6%9B%B3%E5%B0%8F%E5%8D%A1.gif"/>`,
                        position: "left",
                    },
                },
                {
                    element: "#leftSection-nav-bottom-button",
                    popover: {
                        title: "????????????",
                        description: `??????????????????????????????????????????`,
                        position: "right",
                    },
                },
            ])
            if (result.firstLogin) {
                await driver.start()
                await authApi.firstLoginDone()
            }
            const HOURS_TO_EXPIRE = 3
            const KEY_LAST_POPUP_TIMESTAMP = "last-popup-timestamp"
            function shouldShowPopup() {
                const lastPopupTimestamp = localStorage.getItem(KEY_LAST_POPUP_TIMESTAMP)
                if (!lastPopupTimestamp) {
                    return true
                }
                const hoursSinceLastPopup = (Date.now() - lastPopupTimestamp) / (1000 * 60 * 60)
                return hoursSinceLastPopup >= HOURS_TO_EXPIRE
            }
            if (result.userEmail === "test@gmail.com") {
                if (shouldShowPopup()) {
                    await driver.start()
                }
                localStorage.setItem(KEY_LAST_POPUP_TIMESTAMP, Date.now())
            }
            const userPopoverAccountEmail = document.getElementsByClassName("user-popover-account-email")
            userPopoverAccountEmail[0].textContent = `${result.userName} (${result.userEmail})`
        } else {
            location.href = "/auth"
        }
    } catch (error) {
        isCheck = false
        console.log(error)
        location.href = "/auth"
    }
}

logoutButton[0].addEventListener("click", async () => {
    try {
        const response = await authApi.logout()
        const result = await response.data
        if (result.message === "ok") {
            localStorage.removeItem("accessToken")
            location.href = "/auth"
        }
    } catch (error) {
        console.log(error)
        location.href = "/auth"
    }
})

/* Expand ??????*/
const middleSectionNavExpandButton = document.getElementsByClassName("middleSection-nav-expand-button")
const middleSectionNavCollapseButton = document.getElementsByClassName("middleSection-nav-collapse-button")
const middleSectionContainerCollectionCardContainerCardsSpace = document.getElementsByClassName(
    "middleSection-container-collection-card-container-cards-space"
)
middleSectionNavExpandButton[0].addEventListener("click", () => {
    for (let i of Array.from(middleSectionContainerCollectionCardContainerCardsSpace)) {
        i.classList.add("show")
    }
})

middleSectionNavCollapseButton[0].addEventListener("click", () => {
    for (let i of Array.from(middleSectionContainerCollectionCardContainerCardsSpace)) {
        i.classList.remove("show")
    }
})

function checkExtension() {
    const hasShownPrompt = localStorage.getItem("extensionCheck")
    if (!hasShownPrompt) {
        const installUrl = "https://chrome.google.com/webstore/detail/tobicord/elclbdojjgnbooalpmbpjiadbeoigdca?hl=zh-TW" // ??????????????????????????????URL
        const r = confirm("????????????????????????????????????????????????????????????????????????")
        if (r) {
            window.open(installUrl, "_blank")
        }

        localStorage.setItem("extensionCheck", "true")
    }
}

checkExtension()

export { nowUserEmail, nowUserName, nowUserId }
