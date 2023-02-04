import { authApi, windowApi, organizationApi } from "./API/fetchApi.js"
import { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild } from "./generatePage.js"
const logoutButton = document.getElementsByClassName("user-popover-logout-button")
const preloadBackGround = document.getElementsByClassName("preload-back-ground")
let isCheck = false

window.addEventListener("load", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    preloadBackGround[0].classList.add("none")
})
window.addEventListener("DOMContentLoaded", async () => {
    await checkMainPageAuth()
    if (isCheck) {
        /* Right-Section Cards */
        await rightSectionBuild.getUserWindow()
        await rightSectionBuild.reloadWindows()
        await leftSectionBuild.createCategoryButton()
        /* Left Section Cards */
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
        const defaultOrganizationButton = document.getElementsByClassName("leftSection-nav-top-category-button")[0]
        await defaultOrganizationButton.click()
        await defaultOrganizationButton.focus()
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
        middleSectionBuild.createFirstCollectionBoxButtonAddEvent()
        middleSectionBuild.openCloseDeleteCollectionCardPopover()
        await middleSectionBuild.deleCollectionCardsButton()
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

/* 拖曳功能 */

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
