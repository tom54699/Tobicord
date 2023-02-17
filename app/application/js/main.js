import { authApi, windowApi, organizationApi } from "./API/fetchApi.js"
import { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild } from "./generatePage.js"
const logoutButton = document.getElementsByClassName("user-popover-logout-button")
const preloadBackGround = document.getElementsByClassName("preload-back-ground")
let isCheck = false
let nowUserName
let nowUserEmail
window.addEventListener("load", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    //preloadBackGround[0].classList.add("none")
})
window.addEventListener("DOMContentLoaded", async () => {
    await checkMainPageAuth()
    if (isCheck) {
        preloadBackGround[0].classList.add("none")
        /* Right-Section Cards */
        await rightSectionBuild.getUserWindow()
        await rightSectionBuild.reloadWindows()
        rightSectionBuild.manuallyAddTabCardButton()
        rightSectionBuild.getManuallyAddTabCardInput()
        mainPageBuild.dragManuallyTabCardsAddEvent()
        await leftSectionBuild.createCategoryButton()
        /* Left Section Cards */
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
        middleSectionBuild.createFirstCollectionBoxButtonAddEvent()
        middleSectionBuild.openCloseDeleteCollectionCardPopover()
        await middleSectionBuild.deleCollectionCardsButton()
        middleSectionBuild.getTabCardEditBoxInput()
        await middleSectionBuild.tabCardEditBoxPopoverDeleteButton()
        middleSectionBuild.closeExportCollectionButtonAddEvent()
        middleSectionBuild.exportCollectionButtonAddEvent()
        middleSectionBuild.invalidAuthRolePopoverBox()
    }
    mainPageBuild.rightSectionFold()
    mainPageBuild.leftSectionFold()
})
// 檢查權限
async function checkMainPageAuth() {
    try {
        console.log("檢查MAIN權限")
        const response = await authApi.checkAuth()
        const result = await response.data
        console.log(result)
        if (response.status === 200) {
            isCheck = true
            nowUserName = result.username
            nowUserEmail = result.email
            const userPopoverAccountEmail = document.getElementsByClassName("user-popover-account-email")
            userPopoverAccountEmail[0].textContent = `${result.username} (${result.email})`
        } else {
            location.href = "/auth"
        }
    } catch (error) {
        isCheck = false
        console.log(error)
        location.href = "/auth"
    }
}

// logout
logoutButton[0].addEventListener("click", async () => {
    try {
        const response = await authApi.logout()
        const result = await response.data
        console.log(result)
        if (result.message === "ok") {
            localStorage.removeItem("accessToken")
            location.href = "/auth"
        }
    } catch (error) {
        console.log(error)
        location.href = "/auth"
    }
})

/* 畫面 */
let isTagFilter = false
const tagFilterButton = document.getElementsByClassName("middleSection-nav-button")
tagFilterButton[0].addEventListener("click", () => {
    if (isTagFilter) {
        isTagFilter = false
        tagFilterButton[0].blur()
    } else {
        isTagFilter = true
    }
})

/* Expand 按鈕*/
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

export { nowUserEmail, nowUserName }
