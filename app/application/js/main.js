const logoutButton = document.getElementsByClassName("user-popover-logout-button")
const preloadBackGround = document.getElementsByClassName("preload-back-ground")
window.addEventListener("load", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    preloadBackGround[0].classList.add("none")
    console.log("Loading")
})
window.addEventListener("DOMContentLoaded", () => {
    checkMainPageAuth()
    windowTabContainerAddEvent()
})
// 檢查權限
async function checkMainPageAuth() {
    try {
        console.log("檢查MAIN權限")
        const accessToken = localStorage.getItem("accessToken")
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        const config = {
            headers: headers,
        }
        const response = await axios.get("/users", config)
        const result = await response.data
        console.log(result)
    } catch (error) {
        console.log(error)
        location.href = "/auth"
    }
}

// logout
logoutButton[0].addEventListener("click", async () => {
    try {
        const accessToken = localStorage.getItem("accessToken")
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        const config = {
            headers: headers,
        }
        const response = await axios.delete("/auth/logout", config)
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
let isWindowFold = false
const windowFoldButton = document.getElementsByClassName("rightSection-spaces-window-fold-button")
windowFoldButton[0].addEventListener("click", () => {
    if (isWindowFold) {
        isWindowFold = false
        windowFoldButton[0].blur()
    } else {
        isWindowFold = true
    }
})
let isWindowTabsCheck = false
const checkBox = document.getElementsByClassName("check-box")
const windowTabsCheckBoxContainer = document.getElementsByClassName(
    "rightSection-spaces-window-tabs-check-box-container"
)
const middleTabPopoverContainer = document.getElementsByClassName("middleSection-tab-popover-container")
windowTabsCheckBoxContainer[0].addEventListener("click", () => {
    if (isWindowTabsCheck) {
        isWindowTabsCheck = false
        windowTabsCheckBoxContainer[0].classList.add("rightSection-spaces-window-tabs-check-box-container-click")
        checkBox[0].classList.replace(
            "rightSection-spaces-window-tabs-check-box",
            "rightSection-spaces-window-tabs-check-box-click"
        )
        middleTabPopoverContainer[0].style.transform = "translate(-50%, 0px)"
    } else {
        isWindowTabsCheck = true
        checkBox[0].classList.replace(
            "rightSection-spaces-window-tabs-check-box-click",
            "rightSection-spaces-window-tabs-check-box"
        )
        middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
        windowTabsCheckBoxContainer[0].classList.remove("rightSection-spaces-window-tabs-check-box-container-click")
    }
})
const middleTabPopoverCloseButton = document.getElementsByClassName("middleSection-tab-popover-close-button")
middleTabPopoverCloseButton[0].addEventListener("click", () => {
    checkBox[0].classList.replace(
        "rightSection-spaces-window-tabs-check-box-click",
        "rightSection-spaces-window-tabs-check-box"
    )
    middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
    windowTabsCheckBoxContainer[0].classList.remove("rightSection-spaces-window-tabs-check-box-container-click")
})
const windowTabsCloseButton = document.getElementsByClassName("rightSection-spaces-window-tabs-close-button")
const windowTabsCloseContainer = document.getElementsByClassName(
    "rightSection-spaces-window-tabs-container-close-container"
)
const windowTabsReturnContainerButton = document.getElementsByClassName(
    "rightSection-spaces-window-tabs-container-return-button"
)
const windowTabsCloseContainerButton = document.getElementsByClassName(
    "rightSection-spaces-window-tabs-container-close-button"
)
const windowTabContainer = document.getElementsByClassName("rightSection-spaces-window-tabs-container")
function windowTabContainerAddEvent() {
    for (let i in Array.from(windowTabContainer)) {
        windowTabsCloseButton[i].addEventListener("click", () => {
            console.log(windowTabContainer)
            console.log(windowTabsCloseContainer[i])
            windowTabsCloseContainer[i].style.display = "flex"
        })
        windowTabsReturnContainerButton[i].addEventListener("click", () => {
            windowTabsCloseContainer[i].style.display = "none"
        })
        windowTabsCloseContainerButton[i].addEventListener("click", () => {
            windowTabContainer[i].parentNode.removeChild(windowTabContainer[i])
            windowTabContainerAddEvent()
        })
    }
}
/* 左右大區塊縮放 */
let isRightSectionFoldButton = false
let isLeftSectionFoldButton = false
let rightSectionWidth
let leftSectionWidth
function checkRightSectionWidth() {
    if (isRightSectionFoldButton) {
        rightSectionWidth = "20px"
    } else {
        rightSectionWidth = "min-content"
    }
}
function checkLeftSectionWidth() {
    if (isLeftSectionFoldButton) {
        leftSectionWidth = "20px"
    } else {
        leftSectionWidth = "min-content"
    }
}

const rightSectionFoldButton = document.getElementsByClassName("rightSection-fold-button")
const rightSectionContainer = document.getElementsByClassName("rightSection-container")
const rightSection = document.getElementsByClassName("rightSection")
const sectionBox = document.getElementsByClassName("sectionBox")
rightSectionFoldButton[0].addEventListener("click", () => {
    if (!isRightSectionFoldButton) {
        isRightSectionFoldButton = true
        checkLeftSectionWidth()
        checkRightSectionWidth()
        rightSectionFoldButton[0].style.left = "-20px"
        rightSectionFoldButton[0].style.borderRadius = "99px"
        rightSectionFoldButton[0].style.boxShadow = "rgb(112 112 140 / 15%) -2px 0px 2px"
        rightSectionFoldButton[0].style.transform = "rotate(0deg)"
        rightSectionContainer[0].style.opacity = "0.001"
        rightSection[0].style.borderLeft = "none"
        rightSection[0].style.boxShadow = "rgb(112 112 140 / 25%) 0px 2px 15px"
        sectionBox[0].style.gridTemplateColumns = `${leftSectionWidth} minmax(0px, 1fr) ${rightSectionWidth}`
    } else {
        isRightSectionFoldButton = false
        checkLeftSectionWidth()
        checkRightSectionWidth()
        rightSectionFoldButton[0].style.left = "5px"
        rightSectionFoldButton[0].style.borderRadius = "none"
        rightSectionFoldButton[0].style.boxShadow = "none"
        rightSectionFoldButton[0].style.transform = "rotate(180deg)"
        rightSectionContainer[0].style.opacity = "1"
        rightSection[0].style.borderLeft = "1px solid rgb(73, 73, 92)"
        rightSection[0].style.boxShadow = "none"
        sectionBox[0].style.gridTemplateColumns = `${leftSectionWidth} minmax(0px, 1fr) ${rightSectionWidth}`
    }
})
const leftSectionFoldButton = document.getElementsByClassName("leftSection-fold-button-container")
const leftSection = document.getElementsByClassName("leftSection")
const leftSectionSpaces = document.getElementsByClassName("leftSection-spaces")
const leftSectionSpacesContainer = document.getElementsByClassName("leftSection-spaces-container")
const leftSectionSpacesSearch = document.getElementsByClassName("leftSection-spaces-search")
leftSectionFoldButton[0].addEventListener("click", () => {
    if (!isLeftSectionFoldButton) {
        isLeftSectionFoldButton = true
        checkLeftSectionWidth()
        checkRightSectionWidth()
        leftSectionFoldButton[0].style.right = "-20px"
        leftSectionFoldButton[0].style.borderRadius = "99px"
        leftSectionFoldButton[0].style.boxShadow = "rgb(112 112 140 / 15%) -2px 0px 2px"
        leftSectionFoldButton[0].style.transform = "rotate(180deg)"
        leftSectionSpaces[0].style.boxShadow = "rgb(112 112 140 / 25%) 0px 2px 15px"
        leftSection[0].style.transform = "translateX(-260px)"
        leftSectionSpacesContainer[0].style.opacity = "0"
        leftSectionSpacesSearch[0].style.opacity = "0"
        sectionBox[0].style.gridTemplateColumns = `${leftSectionWidth} minmax(0px, 1fr) ${rightSectionWidth}`
    } else {
        isLeftSectionFoldButton = false
        checkLeftSectionWidth()
        checkRightSectionWidth()
        leftSectionFoldButton[0].style.right = "5px"
        leftSectionFoldButton[0].style.borderRadius = "none"
        leftSectionFoldButton[0].style.boxShadow = "none"
        leftSectionFoldButton[0].style.transform = "none"
        leftSectionSpaces[0].style.boxShadow = "none"
        leftSection[0].style.transform = "none"
        leftSectionSpacesContainer[0].style.opacity = "1"
        leftSectionSpacesSearch[0].style.opacity = "1"
        sectionBox[0].style.gridTemplateColumns = `${leftSectionWidth} minmax(0px, 1fr) ${rightSectionWidth}`
    }
})
/* 拖曳功能 */
