import { authApi, windowApi } from "./API/fetchApi.js"
class RightSectionBuild {
    constructor() {
        this.isWindowTabsCheck = {}
        this.windowData = {}
    }
    async getUserWindow() {
        try {
            let windowNum = 0
            let tabNum = 0
            this.windowData = {}
            this.isWindowTabsCheck = {}
            console.log("拿使用者tab資料")
            const response = await windowApi.getWindow()
            console.log(response)
            for (let i of response.data.data) {
                this.windowData[i.windowId] = {}
                this.generateUserWindowFrame(windowNum, i.windowId)
                this.rightSectionFoldButtonBlur(windowNum)
                for (let j of i.windowTabs) {
                    if (j.favIconUrl === undefined) {
                        j.favIconUrl = ""
                    }
                    if (!j.favIconUrl.startsWith("https")) {
                        j.favIconUrl = ""
                    }
                    this.windowData[i.windowId][j.tabId] = {
                        tabName: j.tabName,
                        favIconUrl: j.favIconUrl,
                        tabUrl: j.tabUrl,
                    }
                    this.generateUserWindowCards(windowNum, j.favIconUrl, j.tabName, j.tabUrl, j.tabId)
                    this.rightSectionSpacesWindowTabsCheckBoxContainer(j.tabId)
                    this.deleteWindowTabCardButton(j.tabId)
                    tabNum++
                }
                console.log(this.windowData)
                windowNum++
                this.removeWindowCheckId(i.windowId)
                this.windowTabContainerAddEvent(i.windowId)
            }
        } catch (error) {
            console.log(error)
        }
    }
    generateUserWindowFrame(windowNum, windowId) {
        const userWindowContainer = document.getElementsByClassName("rightSection-spaces-window-container")
        const userWindows = document.createElement("div")
        userWindows.classList.add("rightSection-spaces-window-tabs-container")
        userWindows.setAttribute("id", `windowTabContainer-${windowId}`)
        userWindows.innerHTML = `                                
        <div class="rightSection-spaces-window-tabs-box">
            <div class="rightSection-spaces-window-tabs-container-close-container" id="windowTabsCloseContainer-${windowId}">
                <span class="rightSection-spaces-window-tabs-container-close-title"
                    >Are you sure you want to close this window?</span
                >
                <div
                    class="rightSection-spaces-window-tabs-container-close-button-container"
                >
                    <button class="rightSection-spaces-window-tabs-container-return-button"  id="windowTabsReturnContainerButton-${windowId}">
                        <span class="rightSection-spaces-window-tabs-container-return-text"
                            >Cancel</span
                        >
                    </button>
                    <button class="rightSection-spaces-window-tabs-container-close-button" id="windowTabsCloseContainerButton-${windowId}">
                        <span class="rightSection-spaces-window-tabs-container-close-text"
                            >Yes, Close</span
                        >
                    </button>
                </div>
            </div>
            <div class="rightSection-spaces-window-tabs-line">
                <div class="rightSection-spaces-window-tabs-left-block">
                    <span class="rightSection-spaces-window-title">Window ${windowNum + 1}</span>
                    <button
                        class="rightSection-spaces-window-fold-button"
                        tabindex="3"
                        data-bs-toggle="collapse"
                        data-bs-target="#window_${windowId}"
                        aria-expanded="false"
                        aria-controls="window_${windowId}"
                    >
                        <div class="arrow-right-svg"></div>
                        <div class="rightSection-spaces-window-arrow-down-svg"></div>
                    </button>
                </div>
                <div class="rightSection-spaces-window-tabs-right-block">
                    <div>
                        <span class="rightSection-spaces-window-tabs-download-container">
                            <button class="rightSection-spaces-window-tabs-download-button">
                                <div
                                    class="rightSection-spaces-window-tabs-download-svg"
                                ></div>
                                <div
                                    class="rightSection-spaces-window-tabs-download-tool-tips"
                                >
                                    Save Session
                                </div>
                            </button>
                        </span>
                    </div>
                    <span class="rightSection-spaces-window-tabs-close-container">
                        <button class="rightSection-spaces-window-tabs-close-button" id="windowTabsCloseButton-${windowId}">
                            <div class="rightSection-spaces-window-tabs-close-svg"></div>
                            <div class="rightSection-spaces-window-tabs-close-tool-tips">
                                Close
                            </div>
                        </button>
                    </span>
                </div>
            </div>
            <div
                class="rightSection-spaces-window-tabs-cards-container collapse"
                id= "window_${windowId}"
            >
                <div class="rightSection-spaces-window-no-tab-container none">
                    <div class="rightSection-spaces-window-no-tab">No tabs</div>
                </div>
            </div>
        </div>`
        userWindowContainer[0].appendChild(userWindows)
    }
    generateUserWindowCards(windowNum, favIconUrl, tabName, tabUrl, tabId) {
        const userWindowCardsContainer = document.getElementsByClassName(
            "rightSection-spaces-window-tabs-cards-container"
        )
        const userWindowCards = document.createElement("div")
        userWindowCards.classList.add("rightSection-spaces-window-tabs-card-frame")
        userWindowCards.setAttribute("id", `userWindowCards-${tabId}`)
        userWindowCards.innerHTML = `
        <div class="rightSection-spaces-window-tabs-card">
            <div class="rightSection-spaces-window-tabs-url-image-container">
                <img
                    class="rightSection-spaces-window-tabs-url-image"
                    src="${favIconUrl}"
                />
                <div
                    class="rightSection-spaces-window-tabs-check-box-container"
                    tabindex="5"
                    id="check-box-container-${tabId}"
                >
                    <span
                        class="rightSection-spaces-window-tabs-check-box check-box " id="check-box-${tabId}"
                    ></span>
                </div>
            </div>
            <a href=${tabUrl} target="_blank" class="rightSection-spaces-window-tabs-card-title"
                >${tabName}</a
            >
            <button
                class="rightSection-spaces-window-tabs-card-close-button" id="windowTabsCardCloseButton-${tabId}"
            ></button>
        </div>`
        userWindowCardsContainer[windowNum].appendChild(userWindowCards)
    }
    rightSectionFoldButtonBlur(windowNum) {
        let isWindowFold = false
        const windowFoldButton = document.getElementsByClassName("rightSection-spaces-window-fold-button")
        windowFoldButton[windowNum].addEventListener("click", () => {
            if (isWindowFold) {
                isWindowFold = false
                windowFoldButton[windowNum].blur()
            } else {
                isWindowFold = true
            }
        })
    }
    windowTabContainerAddEvent(windowId) {
        const windowTabsCloseButton = document.getElementById(`windowTabsCloseButton-${windowId}`)
        const windowTabsCloseContainer = document.getElementById(`windowTabsCloseContainer-${windowId}`)
        const windowTabsReturnContainerButton = document.getElementById(`windowTabsReturnContainerButton-${windowId}`)
        const windowTabsCloseContainerButton = document.getElementById(`windowTabsCloseContainerButton-${windowId}`)
        const windowTabContainer = document.getElementById(`windowTabContainer-${windowId}`)
        const middleTabPopoverContainer = document.getElementsByClassName("middleSection-tab-popover-container")
        windowTabsCloseButton.addEventListener("click", () => {
            windowTabsCloseContainer.style.display = "flex"
        })
        windowTabsReturnContainerButton.addEventListener("click", () => {
            windowTabsCloseContainer.style.display = "none"
        })
        windowTabsCloseContainerButton.addEventListener("click", () => {
            this.removeWindowCheckId(windowId)
            this.countCheckAmount()
            let isWindowTabsAllCheck = Object.values(this.isWindowTabsCheck).every((check) => check === false)
            if (isWindowTabsAllCheck) {
                middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            }
            windowTabContainer.parentNode.removeChild(windowTabContainer)
        })
    }
    rightSectionSpacesWindowTabsCheckBoxContainer(tabId) {
        let isWindowTabsCheck = true
        this.isWindowTabsCheck[tabId] = false
        const checkBox = document.getElementById(`check-box-${tabId}`)
        const windowTabsCheckBoxContainer = document.getElementById(`check-box-container-${tabId}`)
        const middleTabPopoverContainer = document.getElementsByClassName("middleSection-tab-popover-container")
        windowTabsCheckBoxContainer.addEventListener("click", () => {
            if (isWindowTabsCheck) {
                isWindowTabsCheck = false
                this.isWindowTabsCheck[tabId] = true
                windowTabsCheckBoxContainer.classList.add("rightSection-spaces-window-tabs-check-box-container-click")
                checkBox.classList.replace(
                    "rightSection-spaces-window-tabs-check-box",
                    "rightSection-spaces-window-tabs-check-box-click"
                )
                middleTabPopoverContainer[0].style.transform = "translate(-50%, 0px)"
                this.countCheckAmount()
            } else {
                isWindowTabsCheck = true
                this.isWindowTabsCheck[tabId] = false
                checkBox.classList.replace(
                    "rightSection-spaces-window-tabs-check-box-click",
                    "rightSection-spaces-window-tabs-check-box"
                )
                windowTabsCheckBoxContainer.classList.remove(
                    "rightSection-spaces-window-tabs-check-box-container-click"
                )
                this.countCheckAmount()
            }
            let isWindowTabsAllCheck = Object.values(this.isWindowTabsCheck).every((check) => check === false)
            if (isWindowTabsAllCheck) {
                middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            }
        })
        const middleTabPopoverCloseButton = document.getElementsByClassName("middleSection-tab-popover-close-button")
        middleTabPopoverCloseButton[0].addEventListener("click", () => {
            this.isWindowTabsCheck[tabId] = false
            isWindowTabsCheck = true
            checkBox.classList.replace(
                "rightSection-spaces-window-tabs-check-box-click",
                "rightSection-spaces-window-tabs-check-box"
            )
            middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            windowTabsCheckBoxContainer.classList.remove("rightSection-spaces-window-tabs-check-box-container-click")
        })
    }
    removeWindowCheckId(windowId) {
        const readyToRemoveId = Object.keys(this.windowData[windowId])
        Object.keys(this.isWindowTabsCheck).forEach((key) => {
            for (let i of readyToRemoveId) {
                if (key === i) {
                    this.isWindowTabsCheck[key] = false
                }
            }
        })
    }
    removeTabCheckId(tabId) {
        Object.keys(this.isWindowTabsCheck).forEach((key) => {
            if (key == tabId) {
                this.isWindowTabsCheck[key] = false
            }
        })
    }
    async reloadWindows() {
        const reloadWindowsButton = document.getElementsByClassName("reload-svg-container")
        const userWindowContainer = document.getElementsByClassName("rightSection-spaces-window-container")
        const middleTabPopoverContainer = document.getElementsByClassName("middleSection-tab-popover-container")
        reloadWindowsButton[0].addEventListener("click", async () => {
            reloadWindowsButton[0].classList.add("rotating-element")
            console.log(this.windowData)
            middleTabPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            userWindowContainer[0].innerHTML = ""
            await this.getUserWindow()
            reloadWindowsButton[0].classList.remove("rotating-element")
        })
    }
    deleteWindowTabCardButton(tabId) {
        const windowTabsCardCloseButton = document.getElementById(`windowTabsCardCloseButton-${tabId}`)
        const userWindowCards = document.getElementById(`userWindowCards-${tabId}`)
        windowTabsCardCloseButton.addEventListener("click", () => {
            this.removeTabCheckId(tabId)
            this.countCheckAmount()
            userWindowCards.parentNode.removeChild(userWindowCards)
        })
    }
    /* 打勾後popover的視窗*/
    countCheckAmount() {
        const checkSelectedAmount = document.getElementsByClassName("middleSection-tab-popover-title")
        const selectedAmount = Object.values(this.isWindowTabsCheck).filter((val) => val === true).length
        checkSelectedAmount[0].textContent = `(${selectedAmount} tabs selected)`
    }
}

class MainPageBuild {
    constructor(rightSectionWidth, leftSectionWidth) {
        this.rightSectionWidth = rightSectionWidth
        this.leftSectionWidth = leftSectionWidth
        this.isRightSectionFoldButton = false
        this.isLeftSectionFoldButton = false
    }
    /* 左右大區塊縮放 */
    checkRightSectionWidth() {
        if (this.isRightSectionFoldButton) {
            this.rightSectionWidth = "20px"
        } else {
            this.rightSectionWidth = "min-content"
        }
    }
    checkLeftSectionWidth() {
        if (this.isLeftSectionFoldButton) {
            this.leftSectionWidth = "20px"
        } else {
            this.leftSectionWidth = "min-content"
        }
    }
    rightSectionFold() {
        const rightSectionFoldButton = document.getElementsByClassName("rightSection-fold-button")
        const rightSectionContainer = document.getElementsByClassName("rightSection-container")
        const rightSection = document.getElementsByClassName("rightSection")
        const sectionBox = document.getElementsByClassName("sectionBox")
        rightSectionFoldButton[0].addEventListener("click", () => {
            if (!this.isRightSectionFoldButton) {
                this.isRightSectionFoldButton = true
                this.checkLeftSectionWidth()
                this.checkRightSectionWidth()
                rightSectionFoldButton[0].style.left = "-20px"
                rightSectionFoldButton[0].style.borderRadius = "99px"
                rightSectionFoldButton[0].style.boxShadow = "rgb(112 112 140 / 15%) -2px 0px 2px"
                rightSectionFoldButton[0].style.transform = "rotate(0deg)"
                rightSectionContainer[0].style.opacity = "0.001"
                rightSection[0].style.borderLeft = "none"
                rightSection[0].style.boxShadow = "rgb(112 112 140 / 25%) 0px 2px 15px"
                sectionBox[0].style.gridTemplateColumns = `${this.leftSectionWidth} minmax(0px, 1fr) ${this.rightSectionWidth}`
            } else {
                this.isRightSectionFoldButton = false
                this.checkLeftSectionWidth()
                this.checkRightSectionWidth()
                rightSectionFoldButton[0].style.left = "5px"
                rightSectionFoldButton[0].style.borderRadius = "none"
                rightSectionFoldButton[0].style.boxShadow = "none"
                rightSectionFoldButton[0].style.transform = "rotate(180deg)"
                rightSectionContainer[0].style.opacity = "1"
                rightSection[0].style.borderLeft = "1px solid rgb(73, 73, 92)"
                rightSection[0].style.boxShadow = "none"
                sectionBox[0].style.gridTemplateColumns = `${this.leftSectionWidth} minmax(0px, 1fr) ${this.rightSectionWidth}`
            }
        })
    }
    leftSectionFold() {
        const leftSectionFoldButton = document.getElementsByClassName("leftSection-fold-button-container")
        const leftSection = document.getElementsByClassName("leftSection")
        const leftSectionSpaces = document.getElementsByClassName("leftSection-spaces")
        const leftSectionSpacesContainer = document.getElementsByClassName("leftSection-spaces-container")
        const leftSectionSpacesSearch = document.getElementsByClassName("leftSection-spaces-search")
        const sectionBox = document.getElementsByClassName("sectionBox")
        leftSectionFoldButton[0].addEventListener("click", () => {
            if (!this.isLeftSectionFoldButton) {
                this.isLeftSectionFoldButton = true
                this.checkLeftSectionWidth()
                this.checkRightSectionWidth()
                leftSectionFoldButton[0].style.right = "-20px"
                leftSectionFoldButton[0].style.borderRadius = "99px"
                leftSectionFoldButton[0].style.boxShadow = "rgb(112 112 140 / 15%) -2px 0px 2px"
                leftSectionFoldButton[0].style.transform = "rotate(180deg)"
                leftSectionSpaces[0].style.boxShadow = "rgb(112 112 140 / 25%) 0px 2px 15px"
                leftSection[0].style.transform = "translateX(-260px)"
                leftSectionSpacesContainer[0].style.opacity = "0"
                leftSectionSpacesSearch[0].style.opacity = "0"
                sectionBox[0].style.gridTemplateColumns = `${this.leftSectionWidth} minmax(0px, 1fr) ${this.rightSectionWidth}`
            } else {
                this.isLeftSectionFoldButton = false
                this.checkLeftSectionWidth()
                this.checkRightSectionWidth()
                leftSectionFoldButton[0].style.right = "5px"
                leftSectionFoldButton[0].style.borderRadius = "none"
                leftSectionFoldButton[0].style.boxShadow = "none"
                leftSectionFoldButton[0].style.transform = "none"
                leftSectionSpaces[0].style.boxShadow = "none"
                leftSection[0].style.transform = "none"
                leftSectionSpacesContainer[0].style.opacity = "1"
                leftSectionSpacesSearch[0].style.opacity = "1"
                sectionBox[0].style.gridTemplateColumns = `${this.leftSectionWidth} minmax(0px, 1fr) ${this.rightSectionWidth}`
            }
        })
    }
}

const rightSectionBuild = new RightSectionBuild()
const mainPageBuild = new MainPageBuild()
export { rightSectionBuild, mainPageBuild }
