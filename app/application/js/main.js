const logoutButton = document.getElementsByClassName("user-popover-logout-button")
const preloadBackGround = document.getElementsByClassName("preload-back-ground")
window.addEventListener("load", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    preloadBackGround[0].classList.add("none")
    console.log("Loading")
})
window.addEventListener("DOMContentLoaded", () => {
    checkMainPageAuth()
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
// 畫面
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
    })
}
// 拖曳功能
