import { windowApi, organizationApi, spaceApi, collectionApi, tabApi, invitationApi, authApi } from "./API/fetchApi.js"
import {
    windowFrame,
    windowCardsFrame,
    manuallyCardsFrame,
    firstCollectionCardFrame,
    initCollectionCardFrame,
    tabCardFrame,
    tabCardTransferFrame,
    htmlExportForm,
    OrganizationMemberSideCardForm,
    OrganizationOwnerSideCardForm,
    OrganizationManagerSideCardForm,
} from "./component.js"
import { nowUserName, nowUserEmail } from "./main.js"
class RightSectionBuild {
    constructor() {
        this.isWindowTabsCheck = {}
        this.windowData = {}
        this.nowCreateTabTitle
        this.nowCreateTabUrl
        this.nowCreateTabDescription
        this.manuallyTabCards = {}
    }
    async getUserWindow() {
        try {
            let windowNum = 0
            let tabNum = 0
            this.windowData = {}
            this.isWindowTabsCheck = {}
            console.log("拿使用者tab資料")
            const response = await windowApi.getWindow()
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
                mainPageBuild.dragTabCardsAddEvent(i.windowId)
            }
            this.deleteWindowTabCardPopoverButton()
            this.openSelectedWindowTab()
        } catch (error) {
            console.log(error)
        }
    }
    generateUserWindowFrame(windowNum, windowId) {
        const userWindowContainer = document.getElementsByClassName("rightSection-spaces-window-container")
        const userWindows = document.createElement("div")
        userWindows.classList.add("rightSection-spaces-window-tabs-container")
        userWindows.setAttribute("id", `windowTabContainer-${windowId}`)
        const windowFrameHtml = windowFrame(windowId, windowNum)
        userWindows.innerHTML = windowFrameHtml
        userWindowContainer[0].appendChild(userWindows)
    }
    generateUserWindowCards(windowNum, favIconUrl, tabName, tabUrl, tabId) {
        const userWindowCardsContainer = document.getElementsByClassName("rightSection-spaces-window-tabs-cards-container")
        const userWindowCards = document.createElement("div")
        userWindowCards.classList.add("rightSection-spaces-window-tabs-card-frame")
        userWindowCards.setAttribute("id", `userWindowCards-${tabId}`)
        const windowCardsFrameHtml = windowCardsFrame(tabId, tabName, tabUrl, favIconUrl)
        userWindowCards.innerHTML = windowCardsFrameHtml
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
            windowTabContainer.remove()
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
                checkBox.classList.replace("rightSection-spaces-window-tabs-check-box", "rightSection-spaces-window-tabs-check-box-click")
                middleTabPopoverContainer[0].style.transform = "translate(-50%, 0px)"
                this.countCheckAmount()
            } else {
                isWindowTabsCheck = true
                this.isWindowTabsCheck[tabId] = false
                checkBox.classList.replace("rightSection-spaces-window-tabs-check-box-click", "rightSection-spaces-window-tabs-check-box")
                windowTabsCheckBoxContainer.classList.remove("rightSection-spaces-window-tabs-check-box-container-click")
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
            checkBox.classList.replace("rightSection-spaces-window-tabs-check-box-click", "rightSection-spaces-window-tabs-check-box")
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
            userWindowCards.remove()
        })
    }
    deleteWindowTabCardPopoverButton() {
        const middleSectionTabPopoverDeleteButton = document.getElementsByClassName("middleSection-tab-popover-delete-button")
        middleSectionTabPopoverDeleteButton[0].addEventListener("click", () => {
            console.log(this.isWindowTabsCheck)
            let isisWindowTabsCheckTrue = []
            Object.keys(this.isWindowTabsCheck).forEach((key) => {
                if (this.isWindowTabsCheck[key] === true) {
                    isisWindowTabsCheckTrue.push(key)
                }
            })
            for (let i of isisWindowTabsCheckTrue) {
                const userWindowCards = document.getElementById(`userWindowCards-${i}`)
                this.removeTabCheckId(i)
                this.countCheckAmount()
                userWindowCards.remove()
            }
            isisWindowTabsCheckTrue = []
        })
    }
    openSelectedWindowTab() {
        const middleSectionTabPopoverOpenButton = document.getElementsByClassName("middleSection-tab-popover-open-button")
        middleSectionTabPopoverOpenButton[0].addEventListener("click", () => {
            let isisWindowTabsCheckTrue = []
            Object.keys(this.isWindowTabsCheck).forEach((key) => {
                if (this.isWindowTabsCheck[key] === true) {
                    isisWindowTabsCheckTrue.push(key)
                }
            })
            for (let i of isisWindowTabsCheckTrue) {
                for (let j of Object.values(this.windowData)) {
                    if (j[i]) {
                        console.log(j[i].tabUrl)
                        let hnd = window.open(`${j[i].tabUrl}`, "_blank")
                        if (!hnd) {
                            let div = document.createElement("div")
                            div.style = "position:absolute;top:3px;right:3px;opacity:1;background-color:purple;color:white;padding:6px;"
                            div.innerText = "開啟新視窗時遭快顯封鎖"
                            document.body.appendChild(div)
                        }
                    }
                }
            }
            isisWindowTabsCheckTrue = []
        })
    }
    /* 打勾後popover的視窗*/
    countCheckAmount() {
        const checkSelectedAmount = document.getElementsByClassName("middleSection-tab-popover-title")
        const selectedAmount = Object.values(this.isWindowTabsCheck).filter((val) => val === true).length
        checkSelectedAmount[0].textContent = `(${selectedAmount} tabs selected)`
    }
    /* 手動增加卡片 */
    getManuallyAddTabCardInput() {
        const tabCardManuallyAddPopoverBoxTitleInput = document.getElementsByClassName("tab-card-manually-add-popover-box-title-input")
        const tabCardManuallyAddPopoverBoxUrlInput = document.getElementsByClassName("tab-card-manually-add-popover-box-url-input")
        const tabCardManuallyAddPopoverBoxDescriptionInput = document.getElementsByClassName(
            "tab-card-manually-add-popover-box-description-input"
        )
        tabCardManuallyAddPopoverBoxTitleInput[0].addEventListener("input", (e) => {
            this.nowCreateTabTitle = e.target.value
        })
        tabCardManuallyAddPopoverBoxUrlInput[0].addEventListener("input", (e) => {
            this.nowCreateTabUrl = e.target.value
        })
        tabCardManuallyAddPopoverBoxDescriptionInput[0].addEventListener("input", (e) => {
            this.nowCreateTabDescription = e.target.value
        })
    }
    manuallyAddTabCardButton() {
        const tabCardManuallyAddPopoverBoxTitleInput = document.getElementsByClassName("tab-card-manually-add-popover-box-title-input")
        const tabCardManuallyAddPopoverBoxUrlInput = document.getElementsByClassName("tab-card-manually-add-popover-box-url-input")
        const tabCardManuallyAddPopoverBoxDescriptionInput = document.getElementsByClassName(
            "tab-card-manually-add-popover-box-description-input"
        )
        const rightSectionSpacesWindowTabsContainerTopAddSvg = document.getElementsByClassName(
            "rightSection-spaces-window-tabs-container-top-add-svg"
        )
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        const tabCardManuallyAddPopoverBox = document.getElementsByClassName("tab-card-manually-add-popover-box")
        const tabCardManuallyAddPopoverBoxCancelButton = document.getElementsByClassName("tab-card-manually-add-popover-box-cancel-button")
        const tabCardManuallyAddPopoverBoxSaveButton = document.getElementsByClassName("tab-card-manually-add-popover-box-save-button")
        rightSectionSpacesWindowTabsContainerTopAddSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            tabCardManuallyAddPopoverBox[0].style.transform = "translate(-50%, -55%)"
        })
        tabCardManuallyAddPopoverBoxCancelButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            tabCardManuallyAddPopoverBox[0].style.transform = "translate(-50%,-220%)"
            mask[0].style.display = "none"
            tabCardManuallyAddPopoverBoxTitleInput[0].value = ""
            tabCardManuallyAddPopoverBoxUrlInput[0].value = ""
            tabCardManuallyAddPopoverBoxDescriptionInput[0].value = ""
        })
        tabCardManuallyAddPopoverBoxSaveButton[0].addEventListener("click", () => {
            const tabId = Math.random().toString(36).substr(2, 5)
            const favIconUrl = "../images/dot.png"
            this.manuallyTabCards[tabId] = {
                tabTitle: this.nowCreateTabTitle,
                tabUrl: this.nowCreateTabUrl,
                favIconUrl: favIconUrl,
                tabDescription: this.nowCreateTabDescription,
            }
            this.generateManuallyTabCards(this.nowCreateTabTitle, this.nowCreateTabUrl, tabId, favIconUrl)
            this.deleteManuallyTabCardButton(tabId)
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            tabCardManuallyAddPopoverBox[0].style.transform = "translate(-50%,-220%)"
            mask[0].style.display = "none"
            tabCardManuallyAddPopoverBoxTitleInput[0].value = ""
            tabCardManuallyAddPopoverBoxUrlInput[0].value = ""
            tabCardManuallyAddPopoverBoxDescriptionInput[0].value = ""
        })
    }
    generateManuallyTabCards(tabName, tabUrl, tabId, favIconUrl) {
        const manuallyTabCardsContainer = document.getElementsByClassName("rightSection-spaces-window-tabs-cards-container-manually-add")
        const manuallyTabCards = document.createElement("div")
        manuallyTabCards.classList.add("rightSection-spaces-window-tabs-card-frame")
        manuallyTabCards.setAttribute("id", `userWindowCards-${tabId}`)
        const windowCardsFrameHtml = manuallyCardsFrame(tabId, tabName, tabUrl, favIconUrl)
        manuallyTabCards.innerHTML = windowCardsFrameHtml
        manuallyTabCardsContainer[0].appendChild(manuallyTabCards)
    }
    deleteManuallyTabCardButton(tabId) {
        const windowTabsCardCloseButton = document.getElementById(`windowTabsCardCloseButton-${tabId}`)
        const userWindowCards = document.getElementById(`userWindowCards-${tabId}`)
        windowTabsCardCloseButton.addEventListener("click", () => {
            userWindowCards.remove()
        })
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
    /* 拖移 */
    dragManuallyTabCardsAddEvent() {
        const manuallyTabCardsContainer = document.getElementsByClassName("rightSection-spaces-window-tabs-cards-container-manually-add")
        new Sortable(manuallyTabCardsContainer[0], {
            group: {
                name: "shared",
                put: false, // 不允许拖拽进这个列表
            },
            animation: 150,
            onEnd(evt) {
                console.log("onEnd: 列表单元拖放结束后的回调函数！")
            },
        })
    }
    dragCollectionCardAddEvent() {
        const middleSectionContainerCollectionCardsBox = document.getElementsByClassName("middleSection-container-collection-cards-box")
        new Sortable(middleSectionContainerCollectionCardsBox[0], {
            group: {
                name: "collectionCard",
                put: false, // 不允许拖拽进这个列表
                pull: false,
            },
            animation: 150,
        })
    }
    dragTabCardsAddEvent(windowId) {
        const rightSectionSpacesWindowTabsCardsContainer = document.getElementById(`window_${windowId}`)
        new Sortable(rightSectionSpacesWindowTabsCardsContainer, {
            group: {
                name: "shared",
                put: false, // 不允许拖拽进这个列表
            },
            animation: 150,
            onEnd(evt) {
                console.log("onEnd: 列表单元拖放结束后的回调函数！")
            },
        })
    }
    dragCollectionAddEvent(collectionId, putAllow) {
        const middleSectionContainerRemindAddCollectionBox = document.getElementById(
            `middleSection-container-remind-add-collection-box-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavArrowSvgButton = document.getElementById(
            `middleSection-container-collection-card-container-nav-arrow-svg-button-${collectionId}`
        )
        const collectionSortable = new Sortable(middleSectionContainerRemindAddCollectionBox, {
            group: {
                name: "shared",
                put: Boolean(putAllow), // 不允许拖拽进这个列表
            },
            animation: 150,
            sort: true,
            async onAdd(evt) {
                const order = collectionSortable.toArray()
                console.log("onAdd: 其他列表单元添加到本列表容器的回调函数", evt.oldIndex, evt.newIndex, order)
                middleSectionContainerRemindAddCollectionBox.classList.replace(
                    "middleSection-container-remind-add-collection-box-created",
                    "middleSection-container-collection-card-container-cards-space"
                )
                middleSectionContainerRemindAddCollectionBox.classList.add("collapse")
                middleSectionContainerRemindAddCollectionBox.classList.add("show")
                middleSectionContainerCollectionCardContainerNavArrowSvgButton.classList.remove("none")
                const fromBlock = evt.from.id.slice(0, 6)
                const windowId = evt.from.id.slice(7)
                const collectionId = evt.to.id.slice(50)

                if (fromBlock === "window" || fromBlock === "manual") {
                    let tabId
                    let newTabId
                    let tabData
                    let tabName
                    let favIconUrl
                    let tabUrl
                    let tabDescription
                    if (fromBlock === "window") {
                        tabId = evt.item.id.slice(16)
                        newTabId = tabId + Math.random().toString(36).substr(2, 5)
                        tabData = rightSectionBuild.windowData[`${windowId}`][`${tabId}`]
                        tabName = tabData.tabName
                        favIconUrl = tabData.favIconUrl
                        tabUrl = tabData.tabUrl
                        tabDescription = tabName
                    } else if (fromBlock === "manual") {
                        tabId = evt.item.id.slice(16)
                        newTabId = tabId + Math.random().toString(36).substr(2, 5)
                        tabData = rightSectionBuild.manuallyTabCards[tabId]
                        console.log(tabData)
                        tabName = tabData.tabTitle
                        favIconUrl = tabData.favIconUrl
                        tabUrl = tabData.tabUrl
                        tabDescription = tabData.tabDescription
                    }
                    /*const tabDataJson = {
                        id: newTabId,
                        tabId:tabId,
                        tabName:tabName,
                        tabUrl:tabUrl,
                        favIconUrl:favIconUrl,
                        tabDescription:tabName
                    }
                    middleSectionBuild.tabsData[collectionId].push(tabDataJson)*/
                    middleSectionBuild.collectionCardArrowControl(collectionId)
                    mainPageBuild.transferTabCardsFormat(tabId, newTabId, tabName, tabUrl, favIconUrl, tabDescription)
                    await middleSectionBuild.uploadTabCardsData(collectionId, newTabId, tabId, tabName, tabUrl, favIconUrl, tabName)
                    await middleSectionBuild.tabCardDeleteButton(newTabId)
                    middleSectionBuild.tabCardEditButton(collectionId, newTabId)
                    middleSectionBuild.tabCardCheckBoxPopover(newTabId)
                    await middleSectionBuild.tabCardEditBoxPopoverDeleteButton()
                } else {
                    const tabId = evt.item.id.slice(48)
                    const tabData = middleSectionBuild.tabsData[evt.from.id.slice(50)]
                    for (let i of tabData) {
                        if (i.id == tabId) {
                            const oldTabId = i.tabId
                            const tabName = i.tabName
                            const favIconUrl = i.favIconUrl
                            const tabUrl = i.tabUrl
                            await middleSectionBuild.switchTabCardsCollection(collectionId, tabId)
                            /*
                            const tabDataJson = {
                                id: tabId,
                                tabId:oldTabId,
                                tabName:tabName,
                                tabUrl:tabUrl,
                                favIconUrl:favIconUrl,
                                tabDescription:tabName
                            }
                            middleSectionBuild.tabsData[collectionId].push(tabDataJson)*/
                            break
                        }
                    }
                }
            },
            async onEnd(evt) {
                const order = collectionSortable.toArray()
                console.log("onEnd: 列表单元拖放结束后的回调函数！", evt, evt.oldIndex, evt.newIndex, order)
                if (evt.to.id.slice(50) != collectionId) {
                    const tabId = evt.item.id.slice(48)
                    console.log(tabId)
                    //await tabApi.deleteTabData(tabId)
                    //await middleSectionBuild.tabCardDeleteButton(collectionId, tabId)
                }
            },
        })
    }
    transferTabCardsFormat(tabId, newTabId, tabName, tabUrl, favIconUrl, tabDescription) {
        const userWindowCards = document.getElementById(`userWindowCards-${tabId}`)
        userWindowCards.classList.replace("rightSection-spaces-window-tabs-card-frame", "middleSection-container-collection-tab-card-box")
        userWindowCards.setAttribute("id", `middleSection-container-collection-tab-card-box-${newTabId}`)
        const tabCardTransferFrameHtml = tabCardTransferFrame(newTabId, tabName, tabUrl, favIconUrl, tabDescription)
        userWindowCards.innerHTML = tabCardTransferFrameHtml
    }
}

class LeftSectionBuild {
    constructor() {
        this.createOrganizationName
        this.organizationData
        this.nowOrganizationName
        this.nowOrganizationId
        this.newOrganizationName
        this.createSpaceName
        this.spaceData
        this.newSpaceName
        this.nowSpaceName
        this.nowSpaceId
        this.inviteMemberEmail
        this.invitationData
        this.approvalData
        this.organizationMemberData
        this.selectedRole
    }
    /* UserCenter */

    /* AddCategoryPopover */
    leftSectionNavPlusButtonAddEvent() {
        const leftSectionNavPlusButton = document.getElementsByClassName("add-svg")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const middleSectionAddCategoryPopoverBox = document.getElementsByClassName("middleSection-add-category-popover-box")
        leftSectionNavPlusButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            middleSectionAddCategoryPopoverBox[0].style.transform = "translate(-50%)"
            mask[0].style.display = "block"
        })
    }
    closeAddCategoryPopover() {
        const addCategoryPopoverFormNameInputAlert = document.getElementsByClassName(
            "middleSection-add-category-popover-box-form-name-input-alert"
        )
        const addCategoryPopoverBoxCloseSvg = document.getElementsByClassName("middleSection-add-category-popover-box-close-svg-container")
        const addCategoryPopoverBoxCloseButton = document.getElementsByClassName(
            "middleSection-add-category-popover-box-form-cancel-button"
        )
        const addCategoryPopoverFormNameInput = document.getElementsByClassName("middleSection-add-category-popover-box-form-name-input")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const middleSectionAddCategoryPopoverBox = document.getElementsByClassName("middleSection-add-category-popover-box")
        addCategoryPopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            middleSectionAddCategoryPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            addCategoryPopoverFormNameInputAlert[0].style.display = "none"
            addCategoryPopoverFormNameInput[0].value = ""
        })
        addCategoryPopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            middleSectionAddCategoryPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            addCategoryPopoverFormNameInputAlert[0].style.display = "none"
            addCategoryPopoverFormNameInput[0].value = ""
        })
    }
    getAddCategoryPopoverInputValue() {
        const addCategoryPopoverFormNameInput = document.getElementsByClassName("middleSection-add-category-popover-box-form-name-input")
        const addCategoryPopoverFormInviteInput = document.getElementsByClassName(
            "middleSection-add-category-popover-box-form-invite-input"
        )
        addCategoryPopoverFormNameInput[0].addEventListener("input", (e) => {
            this.createOrganizationName = e.target.value
        })
    }
    createCategoryButtonAddEvent() {
        const addCategoryPopoverFormCreateButton = document.getElementsByClassName(
            "middleSection-add-category-popover-box-form-create-button"
        )
        const addCategoryPopoverFormNameInputAlert = document.getElementsByClassName(
            "middleSection-add-category-popover-box-form-name-input-alert"
        )
        const addCategoryPopoverFormNameInput = document.getElementsByClassName("middleSection-add-category-popover-box-form-name-input")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const middleSectionAddCategoryPopoverBox = document.getElementsByClassName("middleSection-add-category-popover-box")
        addCategoryPopoverFormCreateButton[0].addEventListener("click", async () => {
            const inputValue = this.createOrganizationName
            if (!inputValue || !inputValue.trim()) {
                addCategoryPopoverFormNameInputAlert[0].style.display = "block"
            } else {
                const response = await organizationApi.uploadOrganizationData(this.createOrganizationName)
                if (response.data.message === "ok") {
                    this.initCategoryButton()
                    middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
                    middleSectionAddCategoryPopoverBox[0].style.transform = "translate(-50%,-150%)"
                    mask[0].style.display = "none"
                    addCategoryPopoverFormNameInputAlert[0].style.display = "none"
                    await this.createCategoryButton()
                    this.switchToDifferentOrganization()
                    addCategoryPopoverFormNameInput[0].value = ""
                    /*location.href = "/main"*/
                } else {
                    addCategoryPopoverFormNameInputAlert[0].style.display = "block"
                    addCategoryPopoverFormNameInput[0].value = ""
                }
            }
        })
    }
    initCategoryButton() {
        const parentNode = document.getElementsByClassName("leftSection-nav-top")
        const childNodes = parentNode[0].children
        const number = childNodes.length
        for (let i = number - 1; i >= 0; i--) {
            parentNode[0].removeChild(childNodes[i])
        }
    }
    async createCategoryButton() {
        this.organizationData = await organizationApi.getUserOrganizationData()
        console.log(this.organizationData)
        if (this.organizationData.length > 0) {
            for (let i of this.organizationData) {
                this.generateCategoryButton(i.organizationName)
            }
        }
    }
    generateCategoryButton(categoryName) {
        const leftSectionNavTop = document.getElementsByClassName("leftSection-nav-top")
        const leftSectionNavTopCategoryContainer = document.createElement("div")
        let showCategoryName = categoryName.slice(0, 2)
        leftSectionNavTopCategoryContainer.classList.add("leftSection-nav-top-category-container")
        leftSectionNavTopCategoryContainer.innerHTML = ` <button class="leftSection-nav-top-category-button" tabindex="-1">
        <div class="leftSection-nav-top-category">
            <div class="leftSection-nav-top-category-title">${showCategoryName}</div>
        </div>
        </button>`
        leftSectionNavTop[0].appendChild(leftSectionNavTopCategoryContainer)
    }
    /* OrganizationSwitch */
    async switchToDifferentOrganization() {
        const organizationSettingPopoverRightBoxTitle = document.getElementsByClassName("organization-setting-popover-right-box-title")
        const organizationMemberPopoverRightBoxTitle = document.getElementsByClassName("organization-member-popover-right-box-title")
        const organizationSettingNameInput = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-input")
        const leftSectionNavTopCategory = document.getElementsByClassName("leftSection-nav-top-category")
        const organizationDeleteName = document.getElementsByClassName("organization-delete-name")
        const leftSectionSpacesTopTitle = document.getElementsByClassName("leftSection-spaces-top-title")
        const leftSectionNavTopCategoryButton = document.getElementsByClassName("leftSection-nav-top-category-button")
        let num = Array.from(leftSectionNavTopCategoryButton).length
        for (let i = 0; i < num; i++) {
            leftSectionNavTopCategoryButton[i].addEventListener("click", async () => {
                for (let j = 0; j < num; j++) {
                    if (j !== i) {
                        leftSectionNavTopCategoryButton[j].classList.remove("leftSection-nav-top-category-button-click")
                        leftSectionNavTopCategory[j].style.boxShadow = "rgb(30 30 38 / 30%) 0px 0px 0px 1000px inset"
                    }
                }
                leftSectionNavTopCategoryButton[i].classList.add("leftSection-nav-top-category-button-click")
                leftSectionNavTopCategory[i].style.boxShadow = "none"
                this.nowOrganizationName = this.organizationData[i].organizationName
                this.nowOrganizationId = this.organizationData[i].Member_Organization.OrganizationId
                leftSectionSpacesTopTitle[0].textContent = this.organizationData[i].organizationName
                organizationSettingPopoverRightBoxTitle[0].textContent = `${this.organizationData[i].organizationName} Preferences`
                organizationMemberPopoverRightBoxTitle[0].textContent = `${this.organizationData[i].organizationName} Members`
                organizationSettingNameInput[0].value = this.organizationData[i].organizationName
                organizationDeleteName[0].textContent = `"${this.organizationData[i].organizationName}"`
                organizationDeleteName[1].textContent = `"${this.organizationData[i].organizationName}"`
                await this.createSpaceCards()
                await this.switchToDifferentSpace()
                const defaultSpaceButton = document.getElementsByClassName("leftSection-spaces-container-main-card")[0]
                defaultSpaceButton.click()
            })
        }
    }
    async initSpaceCards() {
        const parentNode = document.getElementsByClassName("leftSection-spaces-container-main-card-container")
        const childNodes = parentNode[0].children
        const number = childNodes.length
        for (let i = number - 1; i >= 0; i--) {
            parentNode[0].removeChild(childNodes[i])
        }
    }
    /* Organization Edit Delete Popover */
    openOrganizationEditPopoverButtonAddEvent() {
        const openOrganizationEditPopoverButton = document.getElementsByClassName("leftSection-spaces-top-subtitle-gear-container")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const organizationSettingPopoverBox = document.getElementsByClassName("organization-setting-popover-box")
        const mask = document.getElementsByClassName("mask")
        const organizationSettingPopoverRightBox = document.getElementsByClassName("organization-setting-popover-right-box")
        const organizationMemberPopoverRightBox = document.getElementsByClassName("organization-member-popover-right-box")
        const organizationMemberEditPermissionPopoverRightBox = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box"
        )
        const organizationSettingPopoverMemberButton = document.getElementsByClassName("organization-setting-popover-member-button")
        const organizationSettingPopoverPreferenceButton = document.getElementsByClassName("organization-setting-popover-preference-button")
        openOrganizationEditPopoverButton[0].addEventListener("click", async () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            organizationSettingPopoverBox[0].style.transform = "translate(-50%)"
            organizationSettingPopoverRightBox[0].classList.remove("none")
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
            organizationMemberPopoverRightBox[0].classList.add("none")
            organizationSettingPopoverPreferenceButton[0].style.color = "rgb(214, 73, 107)"
            organizationSettingPopoverPreferenceButton[0].style.borderBottom = "1px solid rgb(214, 73, 107)"
            organizationSettingPopoverMemberButton[0].style.color = "rgb(197, 197, 211)"
            organizationSettingPopoverMemberButton[0].style.borderBottom = "none"
            this.initMemberCards()
            await this.getOrganizationMemberLists(this.nowOrganizationId)
        })
    }
    closeOrganizationEditPopoverButtonAddEvent() {
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const organizationSettingPopoverBox = document.getElementsByClassName("organization-setting-popover-box")
        const mask = document.getElementsByClassName("mask")
        const organizationSettingPopoverCloseSvg = document.getElementsByClassName("organization-setting-popover-box-close-svg")
        const organizationSettingPopoverCloseButton = document.getElementsByClassName("organization-setting-popover-right-box-close-button")
        const organizationSettingEditNameAlert = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-alert")
        const organizationSettingNameInput = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-input")
        const organizationMemberPopoverRightBoxCloseButton = document.getElementsByClassName(
            "organization-member-popover-right-box-close-button"
        )
        const organizationMemberPopoverRightBox = document.getElementsByClassName("organization-member-popover-right-box")
        const organizationMemberEditPermissionPopoverRightBox = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box"
        )
        organizationSettingPopoverCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            organizationSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            organizationSettingEditNameAlert[0].style.display = "none"
            organizationSettingNameInput[0].value = this.nowOrganizationName
            this.newOrganizationName = ""
        })
        organizationSettingPopoverCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            organizationSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            organizationSettingEditNameAlert[0].style.display = "none"
            organizationSettingNameInput[0].value = this.nowOrganizationName
            this.newOrganizationName = ""
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
            organizationMemberPopoverRightBox[0].classList.add("none")
        })
        organizationMemberPopoverRightBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            organizationSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            organizationSettingEditNameAlert[0].style.display = "none"
            organizationSettingNameInput[0].value = this.nowOrganizationName
            this.newOrganizationName = ""
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
            organizationMemberPopoverRightBox[0].classList.add("none")
        })
    }
    getOrganizationNameEditInputValue() {
        const organizationSettingNameInput = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-input")
        organizationSettingNameInput[0].addEventListener("input", (e) => {
            this.newOrganizationName = e.target.value
        })
    }
    saveOrganizationNameEditButtonAddEvent() {
        const organizationSaveEditNameButton = document.getElementsByClassName("organization-setting-popover-right-box-save-button")
        const organizationSettingEditNameAlert = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-alert")
        organizationSaveEditNameButton[0].addEventListener("click", async () => {
            const inputValue = this.newOrganizationName
            if (!inputValue || !inputValue.trim()) {
                organizationSettingEditNameAlert[0].style.display = "block"
                organizationSettingEditNameAlert[0].textContent = "Organization name must be greater than 1 character"
            } else {
                const response = await organizationApi.updateOrganizationData(this.nowOrganizationId, inputValue)
                if (response.data.message === "ok") {
                    location.href = "/main"
                } else if (response.data.message === "Unauthorized Role") {
                    organizationSettingEditNameAlert[0].style.display = "block"
                    organizationSettingEditNameAlert[0].textContent = "Unauthorized Role"
                } else {
                    organizationSettingEditNameAlert[0].style.display = "block"
                    organizationSettingEditNameAlert[0].textContent = "Organization name must be greater than 1 character"
                }
            }
        })
    }
    organizationEditNameButtonAddEvent() {
        const organizationSettingEditNameAlert = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-alert")
        const organizationEditNameButton = document.getElementsByClassName("organization-setting-popover-right-box-edit-button")
        const organizationSaveNameButtons = document.getElementsByClassName("organization-setting-popover-right-box-save-button-box")
        const organizationSaveCancelButton = document.getElementsByClassName("organization-setting-popover-right-box-save-cancel-button")
        const organizationSettingNameForm = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-form")
        const organizationSettingNameInput = document.getElementsByClassName("organization-setting-popover-right-box-edit-name-input")
        organizationEditNameButton[0].addEventListener("click", () => {
            organizationSaveNameButtons[0].classList.remove("none")
            organizationEditNameButton[0].classList.add("none")
            organizationSettingNameForm[0].style.border = "1px solid rgb(197, 197, 211)"
            organizationSettingNameForm[0].style.padding = "8px"
            organizationSettingNameInput[0].removeAttribute("disabled")
            organizationSettingEditNameAlert[0].style.display = "none"
        })
        organizationSaveCancelButton[0].addEventListener("click", () => {
            organizationSaveNameButtons[0].classList.add("none")
            organizationEditNameButton[0].classList.remove("none")
            organizationSettingNameForm[0].style.border = "0"
            organizationSettingNameForm[0].style.padding = "0"
            organizationSettingNameInput[0].setAttribute("disabled", "disabled")
            organizationSettingEditNameAlert[0].style.display = "none"
        })
    }
    organizationDeleteButtonAddEvent() {
        const organizationSettingDeleteButton = document.getElementsByClassName("organization-setting-popover-right-box-Delete-button")
        const organizationDeletePopoverBox = document.getElementsByClassName("organization-delete-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const organizationSettingPopoverBox = document.getElementsByClassName("organization-setting-popover-box")
        organizationSettingDeleteButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            organizationDeletePopoverBox[0].style.transform = "translate(-50%)"
            organizationSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
        })
    }
    closeOrganizationDeleteBox() {
        const organizationDeletePopoverBoxCloseSvg = document.getElementsByClassName("organization-delete-popover-box-close-svg")
        const organizationDeleteNameDoubleCheckInput = document.getElementsByClassName("organization-delete-name-double-check-input")
        const organizationDeletePopoverBoxCloseButton = document.getElementsByClassName("organization-delete-popover-box-cancel-button")
        const organizationDeletePopoverBox = document.getElementsByClassName("organization-delete-popover-box")
        const mask = document.getElementsByClassName("mask")
        const organizationDeleteNameDoubleCheckAlert = document.getElementsByClassName("organization-delete-name-double-check-alert")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        organizationDeletePopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            organizationDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            organizationDeleteNameDoubleCheckAlert[0].style.display = "none"
            organizationDeleteNameDoubleCheckInput[0].value = ""
        })
        organizationDeletePopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            organizationDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            organizationDeleteNameDoubleCheckAlert[0].style.display = "none"
            organizationDeleteNameDoubleCheckInput[0].value = ""
        })
    }
    organizationDeleteDoubleCheckInput() {
        const organizationDeleteNameDoubleCheckInput = document.getElementsByClassName("organization-delete-name-double-check-input")
        const organizationDeleteConfirmButton = document.getElementById("organization-delete-confirm-button")
        const organizationDeleteConfirmText = document.getElementsByClassName("organization-delete-confirm-text")
        organizationDeleteNameDoubleCheckInput[0].addEventListener("input", (e) => {
            if (this.nowOrganizationName === e.target.value) {
                organizationDeleteConfirmButton.removeAttribute("disabled")
                organizationDeleteConfirmButton.classList.replace(
                    "organization-delete-confirm-button",
                    "organization-delete-confirm-button-check"
                )
                organizationDeleteConfirmText[0].style.color = "rgb(255, 255, 255)"
            } else {
                organizationDeleteConfirmButton.setAttribute("disabled", "disabled")
                organizationDeleteConfirmButton.classList.replace(
                    "organization-delete-confirm-button-check",
                    "organization-delete-confirm-button"
                )
                organizationDeleteConfirmText[0].style.color = "rgb(197, 197, 211)"
            }
        })
    }
    organizationDeleteDoubleCheckButton() {
        const organizationDeleteConfirmButton = document.getElementById("organization-delete-confirm-button")
        const organizationDeletePopoverBox = document.getElementsByClassName("organization-delete-popover-box")
        const organizationSuccessDeletePopoverBox = document.getElementsByClassName("organization-success-delete-popover-box")
        const organizationSuccessDeleteText = document.getElementsByClassName("organization-success-delete-text")
        const organizationDeleteNameDoubleCheckAlert = document.getElementsByClassName("organization-delete-name-double-check-alert")
        organizationDeleteConfirmButton.addEventListener("click", async () => {
            const response = await organizationApi.deleteOrganizationData(this.nowOrganizationId)
            if (response.data.message === "ok") {
                organizationDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
                organizationSuccessDeletePopoverBox[0].style.transform = "translate(-50%)"
                organizationSuccessDeleteText[0].textContent = `"${this.nowOrganizationName}"Deleted`
                organizationDeleteNameDoubleCheckAlert[0].style.display = "none"
            } else {
                organizationDeleteNameDoubleCheckAlert[0].style.display = "block"
            }
        })
    }
    closeOrganizationSuccessDeletePopoverBox() {
        const organizationSuccessDeleteBoxCloseSvg = document.getElementsByClassName(
            "organization-success-delete-popover-box-close-svg-container"
        )
        const organizationSuccessDeleteBoxCloseButton = document.getElementsByClassName(
            "organization-success-delete-popover-box-close-button"
        )
        organizationSuccessDeleteBoxCloseSvg[0].addEventListener("click", () => {
            location.href = "/main"
        })
        organizationSuccessDeleteBoxCloseButton[0].addEventListener("click", () => {
            location.href = "/main"
        })
    }
    /* SpaceCreate */
    spaceCreatePopoverBoxButtonAddEvent() {
        const spacesAddButton = document.getElementsByClassName("leftSection-spaces-container-top-add-svg")
        const spaceCreatePopoverBox = document.getElementsByClassName("space-create-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        spacesAddButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            spaceCreatePopoverBox[0].style.transform = "translate(-50%)"
        })
    }
    closeSpaceCreatePopoverBox() {
        const spaceCreatePopoverBox = document.getElementsByClassName("space-create-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const spaceCreateNameInputAlert = document.getElementsByClassName("space-create-name-input-alert")
        const mask = document.getElementsByClassName("mask")
        const spaceCreatePopoverBoxCloseSvg = document.getElementsByClassName("space-create-popover-box-close-svg-container")
        const spaceCreatePopoverBoxCloseButton = document.getElementsByClassName("space-create-popover-box-form-cancel-button")
        const spaceCreateNameInput = document.getElementsByClassName("space-create-name-input")
        spaceCreatePopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceCreatePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceCreateNameInputAlert[0].style.display = "none"
            spaceCreateNameInput[0].value = ""
            this.createSpaceName = ""
        })
        spaceCreatePopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceCreatePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceCreateNameInputAlert[0].style.display = "none"
            spaceCreateNameInput[0].value = ""
            this.createSpaceName = ""
        })
    }
    getCreateSpacePopoverInputValue() {
        const spaceCreateNameInput = document.getElementsByClassName("space-create-name-input")
        spaceCreateNameInput[0].addEventListener("input", (e) => {
            this.createSpaceName = e.target.value
        })
    }
    createSpaceButtonAddEvent() {
        const spaceCreatePopoverBoxCreateButton = document.getElementsByClassName("space-create-popover-box-form-create-button")
        const spaceCreateNameInputAlert = document.getElementsByClassName("space-create-name-input-alert")
        const spaceCreatePopoverBox = document.getElementsByClassName("space-create-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        const spaceCreateNameInput = document.getElementsByClassName("space-create-name-input")
        spaceCreatePopoverBoxCreateButton[0].addEventListener("click", async () => {
            const inputValue = this.createSpaceName
            if (!inputValue || !inputValue.trim()) {
                spaceCreateNameInputAlert[0].style.display = "block"
                spaceCreateNameInputAlert[0].textContent = "Space name must be greater than 1 character"
            } else {
                const response = await spaceApi.uploadSpaceData(this.nowOrganizationId, this.createSpaceName)
                console.log(response)
                if (response.data.message === "ok") {
                    middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
                    spaceCreatePopoverBox[0].style.transform = "translate(-50%,-150%)"
                    mask[0].style.display = "none"
                    spaceCreateNameInputAlert[0].style.display = "none"
                    spaceCreateNameInput[0].value = ""
                    await this.createSpaceCards()
                    await this.switchToDifferentSpace()
                    //location.href = "/main"
                } else if (response.data.message === "Unauthorized Role") {
                    spaceCreateNameInputAlert[0].style.display = "block"
                    spaceCreateNameInputAlert[0].textContent = "Unauthorized Role"
                } else {
                    spaceCreateNameInputAlert[0].style.display = "block"
                    spaceCreateNameInputAlert[0].textContent = "Space name must be greater than 1 character"
                }
            }
        })
    }
    async createSpaceCards() {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        this.spaceData = await spaceApi.getUserSpaceData(this.nowOrganizationId)
        if (this.spaceData === "Unauthorized Role") {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            noPermissionPopoverBox[0].style.transform = "translate(-50%)"
        } else if (this.spaceData.length > 0) {
            await this.initSpaceCards()
            this.generateInitSpaceCards(this.spaceData[0].spaceName)
            for (let i = 1; i < this.spaceData.length; i++) {
                this.generateSpaceCards(this.spaceData[i].spaceName)
            }
        }
    }
    generateInitSpaceCards(spaceName) {
        const leftSectionSpacesContainerMainCardContainer = document.getElementsByClassName(
            "leftSection-spaces-container-main-card-container"
        )
        const leftSectionSpacesContainerMainCard = document.createElement("div")
        leftSectionSpacesContainerMainCard.classList.add("leftSection-spaces-container-main-card")
        leftSectionSpacesContainerMainCard.setAttribute("tabindex", "-1")
        leftSectionSpacesContainerMainCard.innerHTML = `
            <button class="leftSection-spaces-container-main-card-button">
                <div
                    class="leftSection-spaces-container-main-card-star-svg svg-focus space-svg-color"
                ></div>
            </button>
            <div class="leftSection-spaces-container-main-card-title">${spaceName}</div>`
        leftSectionSpacesContainerMainCardContainer[0].appendChild(leftSectionSpacesContainerMainCard)
    }
    generateSpaceCards(spaceName) {
        const leftSectionSpacesContainerMainCardContainer = document.getElementsByClassName(
            "leftSection-spaces-container-main-card-container"
        )
        const leftSectionSpacesContainerMainCard = document.createElement("div")
        leftSectionSpacesContainerMainCard.classList.add("leftSection-spaces-container-main-card")
        leftSectionSpacesContainerMainCard.setAttribute("tabindex", "-1")
        leftSectionSpacesContainerMainCard.innerHTML = `<button class="leftSection-spaces-container-main-card-button">
            <div
                class="leftSection-spaces-container-main-card-folder-svg svg-focus space-svg-color"
            ></div>
            </button>
            <div class="leftSection-spaces-container-main-card-title">${spaceName}</div>`

        leftSectionSpacesContainerMainCardContainer[0].appendChild(leftSectionSpacesContainerMainCard)
    }

    /* SpaceSwitch */
    async switchToDifferentSpace() {
        const middleSectionTopSpaceTitle = document.getElementsByClassName("middleSection-top-title")
        const spaceSettingNameInput = document.getElementsByClassName("space-setting-popover-container-edit-name-input")
        const spaceSettingName = document.getElementsByClassName("space-setting-name")
        const leftSectionSpacesContainerMainCard = document.getElementsByClassName("leftSection-spaces-container-main-card")
        const spaceSvgColor = document.getElementsByClassName("space-svg-color")
        const leftSectionSpacesContainerCardTitle = document.getElementsByClassName("leftSection-spaces-container-main-card-title")
        const spaceDeleteName = document.getElementsByClassName("space-delete-name")
        let num = Array.from(leftSectionSpacesContainerMainCard).length
        for (let i = 0; i < num; i++) {
            leftSectionSpacesContainerMainCard[i].addEventListener("click", async () => {
                middleSectionBuild.isCreatedEdit = false
                middleSectionBuild.isCreatedFirst = false
                for (let j = 0; j < num; j++) {
                    if (j !== i) {
                        leftSectionSpacesContainerCardTitle[j].style.color = "rgb(197, 197, 211)"
                        spaceSvgColor[j].style.backgroundColor = "rgb(197, 197, 211)"
                    }
                }
                leftSectionSpacesContainerCardTitle[i].style.color = "rgb(214, 73, 107)"
                spaceSvgColor[i].style.backgroundColor = "rgb(214, 73, 107)"
                this.nowSpaceId = this.spaceData[i].id
                this.nowSpaceName = this.spaceData[i].spaceName
                spaceDeleteName[0].textContent = `"${this.spaceData[i].spaceName}"`
                spaceDeleteName[1].textContent = `"${this.spaceData[i].spaceName}"`
                middleSectionTopSpaceTitle[0].textContent = this.spaceData[i].spaceName
                spaceSettingNameInput[0].value = this.spaceData[i].spaceName
                spaceSettingName[0].textContent = ` ${this.spaceData[i].spaceName}`
                await middleSectionBuild.getCollectionDataToCreateCollections()
            })
        }
    }
    /* Space Edit Delete Popover */
    openSpaceEditPopoverBox() {
        const openSpaceEditPopoverBoxButton = document.getElementsByClassName("middleSection-top-config-button")
        const spaceSettingPopoverBox = document.getElementsByClassName("space-setting-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        openSpaceEditPopoverBoxButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            spaceSettingPopoverBox[0].style.transform = "translate(-50%)"
        })
    }
    closeSpaceEditPopoverBox() {
        const spaceSettingPopoverBoxCloseSvg = document.getElementsByClassName("space-setting-popover-box-close-svg-container")
        const spaceSettingPopoverBoxCloseButton = document.getElementsByClassName("space-setting-popover-box-close-button")
        const spaceSettingPopoverBox = document.getElementsByClassName("space-setting-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const spaceSettingEditNameAlert = document.getElementsByClassName("space-setting-popover-container-edit-name-alert")
        const spaceSettingNameInput = document.getElementsByClassName("space-setting-popover-container-edit-name-input")
        const mask = document.getElementsByClassName("mask")
        spaceSettingPopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceSettingEditNameAlert[0].style.display = "none"
            spaceSettingNameInput[0].value = this.nowSpaceName
            this.newSpaceName = ""
        })
        spaceSettingPopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceSettingEditNameAlert[0].style.display = "none"
            spaceSettingNameInput[0].value = this.nowSpaceName
            this.newSpaceName = ""
        })
    }
    spaceEditNameInputValue() {
        const spaceSettingNameInput = document.getElementsByClassName("space-setting-popover-container-edit-name-input")
        spaceSettingNameInput[0].addEventListener("input", (e) => {
            this.newSpaceName = e.target.value
        })
    }
    spaceEditNameSaveButton() {
        const spaceSaveEditNameButton = document.getElementsByClassName("space-setting-popover-container-save-button")
        const spaceSettingEditNameAlert = document.getElementsByClassName("space-setting-popover-container-edit-name-alert")
        spaceSaveEditNameButton[0].addEventListener("click", async () => {
            const inputValue = this.newSpaceName
            if (!inputValue || !inputValue.trim()) {
                spaceSettingEditNameAlert[0].style.display = "block"
                spaceSettingEditNameAlert[0].textContent = "Organization name must be greater than 1 character"
            } else {
                const response = await spaceApi.updateSpaceData(
                    leftSectionBuild.nowOrganizationId,
                    this.nowSpaceId,
                    this.nowSpaceName,
                    inputValue
                )
                if (response.data.message === "ok") {
                    location.href = "/main"
                } else if (response.data.message === "Unauthorized Role") {
                    spaceSettingEditNameAlert[0].style.display = "block"
                    spaceSettingEditNameAlert[0].textContent = "Unauthorized Role"
                } else {
                    spaceSettingEditNameAlert[0].style.display = "block"
                    spaceSettingEditNameAlert[0].textContent = "Organization name must be greater than 1 character"
                }
            }
        })
    }
    spaceEditNameButtonAddEvent() {
        const spaceSettingEditNameAlert = document.getElementsByClassName("space-setting-popover-container-edit-name-alert")
        const spaceEditNameButton = document.getElementsByClassName("space-setting-popover-container-edit-button")
        const spaceSaveNameButtons = document.getElementsByClassName("space-setting-popover-container-save-button-box")
        const spaceSaveCancelButton = document.getElementsByClassName("space-setting-popover-container-save-cancel-button")
        const spaceSettingNameForm = document.getElementsByClassName("space-setting-popover-container-edit-name-form")
        const spaceSettingNameInput = document.getElementsByClassName("space-setting-popover-container-edit-name-input")
        spaceEditNameButton[0].addEventListener("click", () => {
            spaceSaveNameButtons[0].classList.remove("none")
            spaceEditNameButton[0].classList.add("none")
            spaceSettingNameForm[0].style.border = "1px solid rgb(197, 197, 211)"
            spaceSettingNameForm[0].style.padding = "8px"
            spaceSettingNameInput[0].removeAttribute("disabled")
            spaceSettingEditNameAlert[0].style.display = "none"
        })
        spaceSaveCancelButton[0].addEventListener("click", () => {
            spaceSaveNameButtons[0].classList.add("none")
            spaceEditNameButton[0].classList.remove("none")
            spaceSettingNameForm[0].style.border = "0"
            spaceSettingNameForm[0].style.padding = "0"
            spaceSettingNameInput[0].setAttribute("disabled", "disabled")
            spaceSettingEditNameAlert[0].style.display = "none"
        })
    }
    spaceDeleteButtonAddEvent() {
        const spaceSettingPopoverBoxDeleteButton = document.getElementsByClassName("space-setting-popover-box-delete-button")
        const spaceDeletePopoverBox = document.getElementsByClassName("space-delete-popover-box")
        const spaceSettingPopoverBox = document.getElementsByClassName("space-setting-popover-box")
        spaceSettingPopoverBoxDeleteButton[0].addEventListener("click", () => {
            spaceSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            spaceDeletePopoverBox[0].style.transform = "translate(-50%)"
        })
    }
    closeSpaceDeleteBox() {
        const spaceDeletePopoverBoxCloseSvg = document.getElementsByClassName("space-delete-popover-box-close-svg")
        const spaceDeletePopoverBoxCloseButton = document.getElementsByClassName("space-delete-popover-box-cancel-button")
        const spaceDeletePopoverBox = document.getElementsByClassName("space-delete-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const spaceDeleteNameDoubleCheckInputAlert = document.getElementsByClassName("space-delete-name-double-check-input-alert")
        spaceDeletePopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceDeleteNameDoubleCheckInputAlert[0].style.display = "none"
        })
        spaceDeletePopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            spaceDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            spaceDeleteNameDoubleCheckInputAlert[0].style.display = "none"
        })
    }
    spaceDeleteDoubleCheckInput() {
        const spaceDeleteNameDoubleCheckInput = document.getElementsByClassName("space-delete-name-double-check-input")
        const spaceDeleteConfirmButton = document.getElementById("space-delete-confirm-button")
        const spaceDeleteConfirmText = document.getElementsByClassName("space-delete-confirm-text")
        spaceDeleteNameDoubleCheckInput[0].addEventListener("input", (e) => {
            if (this.nowSpaceName === e.target.value) {
                spaceDeleteConfirmButton.removeAttribute("disabled")
                spaceDeleteConfirmButton.classList.replace("space-delete-confirm-button", "space-delete-confirm-button-check")
                spaceDeleteConfirmText[0].style.color = "rgb(255, 255, 255)"
            } else {
                spaceDeleteConfirmButton.setAttribute("disabled", "disabled")
                spaceDeleteConfirmButton.classList.replace("space-delete-confirm-button-check", "space-delete-confirm-button")
                spaceDeleteConfirmText[0].style.color = "rgb(197, 197, 211)"
            }
        })
    }
    spaceDeleteDoubleCheckButton() {
        const spaceDeleteConfirmButton = document.getElementById("space-delete-confirm-button")
        const spaceDeletePopoverBox = document.getElementsByClassName("space-delete-popover-box")
        const spaceSuccessDeletePopoverBox = document.getElementsByClassName("space-success-delete-popover-box")
        const spaceSuccessDeleteText = document.getElementsByClassName("space-success-delete-text")
        const spaceDeleteNameDoubleCheckInputAlert = document.getElementsByClassName("space-delete-name-double-check-input-alert")
        spaceDeleteConfirmButton.addEventListener("click", async () => {
            const response = await spaceApi.deleteSpaceData(leftSectionBuild.nowOrganizationId, this.nowSpaceId)
            if (response.data.message === "ok") {
                spaceDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
                spaceSuccessDeletePopoverBox[0].style.transform = "translate(-50%)"
                spaceSuccessDeleteText[0].textContent = `"${this.nowSpaceName}"Deleted`
            } else {
                spaceDeleteNameDoubleCheckInputAlert[0].style.display = "block"
            }
        })
    }
    closeSpaceSuccessDeletePopoverBox() {
        const spaceSuccessDeleteBoxCloseSvg = document.getElementsByClassName("space-success-delete-popover-box-close-svg-container")
        const spaceSuccessDeleteBoxCloseButton = document.getElementsByClassName("space-success-delete-popover-box-close-button")
        spaceSuccessDeleteBoxCloseSvg[0].addEventListener("click", () => {
            location.href = "/main"
        })
        spaceSuccessDeleteBoxCloseButton[0].addEventListener("click", () => {
            location.href = "/main"
        })
    }
    /*invite */
    openInviteMemberPopoverButtonAddEvent() {
        const leftSectionSpacesTopSubtitleAddFriendContainer = document.getElementsByClassName(
            "leftSection-spaces-top-subtitle-addFriend-container"
        )
        const inviteMemberPopoverBoxFormTitle = document.getElementsByClassName("invite-member-popover-box-form-title")
        const inviteMemberPopoverBox = document.getElementsByClassName("invite-member-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        leftSectionSpacesTopSubtitleAddFriendContainer[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            inviteMemberPopoverBox[0].style.transform = "translate(-50%)"
            inviteMemberPopoverBoxFormTitle[0].textContent = `Add members to ${this.nowOrganizationName}`
        })
    }
    closeInviteMemberPopoverButtonAddEvent() {
        const inviteMemberPopoverBox = document.getElementsByClassName("invite-member-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const inviteMemberPopoverBoxCloseSvg = document.getElementsByClassName("invite-member-popover-box-close-svg-container")
        const inviteMemberPopoverBoxCloseButton = document.getElementsByClassName("invite-member-popover-box-form-cancel-button")
        const inviteMemberPopoverBoxFormInviteInputAlert = document.getElementsByClassName(
            "invite-member-popover-box-form-invite-input-alert"
        )
        const inviteMemberPopoverBoxFormInviteInput = document.getElementsByClassName("invite-member-popover-box-form-invite-input")
        inviteMemberPopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            inviteMemberPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            inviteMemberPopoverBoxFormInviteInput[0].value = ""
            inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "none"
        })
        inviteMemberPopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            inviteMemberPopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
            inviteMemberPopoverBoxFormInviteInput[0].value = ""
            inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "none"
        })
    }
    getInviteMemberPopoverInputValue() {
        const inviteMemberPopoverBoxFormInviteInput = document.getElementsByClassName("invite-member-popover-box-form-invite-input")
        inviteMemberPopoverBoxFormInviteInput[0].addEventListener("input", (e) => {
            this.inviteMemberEmail = e.target.value
        })
    }
    async inviteMemberPopoverAddMemberButton() {
        const inviteMemberPopoverBoxFormInviteInput = document.getElementsByClassName("invite-member-popover-box-form-invite-input")
        const inviteMemberPopoverBox = document.getElementsByClassName("invite-member-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const inviteMemberPopoverBoxFormInviteInputAlert = document.getElementsByClassName(
            "invite-member-popover-box-form-invite-input-alert"
        )
        const inviteMemberPopoverBoxFormAddButton = document.getElementsByClassName("invite-member-popover-box-form-add-button")
        inviteMemberPopoverBoxFormAddButton[0].addEventListener("click", async () => {
            const response = await invitationApi.uploadInvitationData(leftSectionBuild.nowOrganizationId, this.inviteMemberEmail)
            console.log(response)
            if (response.data.message === "ok") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
                inviteMemberPopoverBox[0].style.transform = "translate(-50%,-150%)"
                mask[0].style.display = "none"
                inviteMemberPopoverBoxFormInviteInput[0].value = ""
                inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "none"
            } else if (response.data.message === "invalid email") {
                inviteMemberPopoverBoxFormInviteInputAlert[0].textContent = "Invalid Email, Please try again!"
                inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "block"
            } else if (response.data.message === "invalid format") {
                inviteMemberPopoverBoxFormInviteInputAlert[0].textContent = "Invalid Format"
                inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "block"
            } else if (response.data.message === "duplicate invitation") {
                inviteMemberPopoverBoxFormInviteInputAlert[0].textContent = "Duplicate Invitation"
                inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "block"
            } else if (response.data.message === "Invitee is already in the organization.") {
                inviteMemberPopoverBoxFormInviteInputAlert[0].textContent = "Invitee is already in the organization."
                inviteMemberPopoverBoxFormInviteInputAlert[0].style.display = "block"
            }
        })
    }
    notificationButton() {
        const noticePopoverNoticeButton = document.getElementsByClassName("notice-popover-notice-button")
        const noticePopoverApproveButton = document.getElementsByClassName("notice-popover-approve-button")
        noticePopoverNoticeButton[0].addEventListener("click", async () => {
            noticePopoverNoticeButton[0].style.color = "rgb(214, 73, 107)"
            noticePopoverNoticeButton[0].style.borderBottom = "1px solid rgb(214, 73, 107)"
            noticePopoverApproveButton[0].style.color = "rgb(183, 183, 206)"
            noticePopoverApproveButton[0].style.borderBottom = "none"
            this.initNotification()
            const response = await this.getInviteMessage()
            if (response === "No Data") {
                const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
                const noticeCardBox = document.createElement("div")
                noticeCardBox.innerHTML = `<div>No Notification</div>`
                noticeCardBoxContainer[0].appendChild(noticeCardBox)
            }
        })
    }
    initNotification() {
        const parentNode = document.getElementsByClassName("notice-card-box-container")
        const childNodes = parentNode[0].children
        const number = childNodes.length
        for (let i = number - 1; i >= 0; i--) {
            parentNode[0].removeChild(childNodes[i])
        }
    }
    approvalListButton() {
        const noticePopoverApproveButton = document.getElementsByClassName("notice-popover-approve-button")
        const noticePopoverNoticeButton = document.getElementsByClassName("notice-popover-notice-button")
        noticePopoverApproveButton[0].addEventListener("click", async () => {
            noticePopoverApproveButton[0].style.color = "rgb(214, 73, 107)"
            noticePopoverApproveButton[0].style.borderBottom = "1px solid rgb(214, 73, 107)"
            noticePopoverNoticeButton[0].style.color = "rgb(183, 183, 206)"
            noticePopoverNoticeButton[0].style.borderBottom = "none"
            this.initNotification()
            const response = await this.getApprovalMessage()
            if (response === "No Data") {
                const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
                const noticeCardBox = document.createElement("div")
                noticeCardBox.innerHTML = `<div>No Notification</div>`
                noticeCardBoxContainer[0].appendChild(noticeCardBox)
            }
        })
    }
    async getApprovalMessage() {
        const response = await invitationApi.getUserApprovalData(this.nowOrganizationId)
        console.log("審核", response)
        if (response.data.message === "ok") {
            this.approvalData = response.data.approvalData
            if (this.approvalData.length < 1) {
                return "No Data"
            }
            for (let i of this.approvalData) {
                this.generateApprovalMessageCardWithButton(
                    i.Invitee.id,
                    i.Invitee.username,
                    i.organizationId,
                    i.Organization.organizationName
                )
                this.approvalButtonAddEvent(i.inviterId, i.Invitee.id, i.organizationId, i.inviteeEmail)
            }
        }
    }
    async getInviteMessage() {
        try {
            const response = await invitationApi.getUserInvitationData(this.nowOrganizationId)
            console.log("邀請", response)
            if (response.data.message === "ok") {
                this.invitationData = response.data.invitationData
                const userEmail = response.data.userEmail
                if (this.invitationData.inviteeResponse.length < 1) {
                    return "No Data"
                }
                for (let i of this.invitationData.inviteResponse) {
                }
                for (let i of this.invitationData.inviteeResponse) {
                    if (i.inviteeEmail === userEmail) {
                        if (i.status === "invited") {
                            this.generateInviteMessageCardWithButton(
                                i.inviterId,
                                i.Inviter.username,
                                i.organizationId,
                                i.Organization.organizationName
                            )
                            this.inviteButtonAddEvent(i.inviterId, i.organizationId)
                        }
                        if (i.status === "approve-refused") {
                            this.generateApprovalRefusedMessage(i.inviterId, i.organizationId, i.Organization.organizationName)
                            this.approvalRefuseMessageCloseButton(i.inviterId, i.organizationId, i.inviteeEmail)
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    generateApprovalRefusedMessage(inviterId, organizationId, organizationName) {
        const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
        const noticeCardBox = document.createElement("div")
        noticeCardBox.classList.add("notice-card-box")
        noticeCardBox.setAttribute("id", `notice-approval-refused-card-box-${inviterId}-${organizationId}`)
        noticeCardBox.innerHTML = `<div>申請${organizationName}群組，遭管理員否決。</div>
        <div>
            <div id="notice-approval-refused-cancel-svg-${inviterId}-${organizationId}" class="notice-approval-refused-cancel-svg"></div>
        </div>`
        noticeCardBoxContainer[0].appendChild(noticeCardBox)
    }
    generateApprovalMessageCardWithButton(inviteeId, inviteeName, organizationId, organizationName) {
        const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
        const noticeCardBox = document.createElement("div")
        noticeCardBox.classList.add("notice-card-box")
        noticeCardBox.setAttribute("id", `notice-approval-card-box-${inviteeId}-${organizationId}`)
        noticeCardBox.innerHTML = `<div>${inviteeName}申請加入${organizationName}群組</div>
        <div>
            <button id="notice-popover-container-approval-refuse-button-${inviteeId}-${organizationId}" class="notice-popover-container-refuse-button">拒絕</button>
            <button id="notice-popover-container-approval-accept-button-${inviteeId}-${organizationId}" class="notice-popover-container-accept-button">接受</button>
        </div>`
        noticeCardBoxContainer[0].appendChild(noticeCardBox)
    }
    generateInviteMessageCardWithButton(inviterId, inviterName, organizationId, organizationName) {
        const noticeCardBoxContainer = document.getElementsByClassName("notice-card-box-container")
        const noticeCardBox = document.createElement("div")
        noticeCardBox.classList.add("notice-card-box")
        noticeCardBox.setAttribute("id", `notice-invite-card-box-${inviterId}-${organizationId}`)
        noticeCardBox.innerHTML = `<div>${inviterName}寄送了${organizationName}群組邀請</div>
        <div>
            <button id="notice-popover-container-invite-refuse-button-${inviterId}-${organizationId}" class="notice-popover-container-refuse-button">拒絕</button>
            <button id="notice-popover-container-invite-accept-button-${inviterId}-${organizationId}" class="notice-popover-container-accept-button">接受</button>
        </div>`
        noticeCardBoxContainer[0].appendChild(noticeCardBox)
    }
    openInviteNoticeBox() {
        let isClicked = false
        const leftSectionNavBottomNoticeContainer = document.getElementsByClassName("leftSection-nav-bottom-notice-container")
        const noticePopoverContainer = document.getElementsByClassName("notice-popover-container")
        document.addEventListener("click", (event) => {
            if (!noticePopoverContainer[0].contains(event.target) && !leftSectionNavBottomNoticeContainer[0].contains(event.target)) {
                noticePopoverContainer[0].classList.remove("show-display")
                isClicked = false
            }
        })
        leftSectionNavBottomNoticeContainer[0].addEventListener("click", (e) => {
            if (!isClicked) {
                noticePopoverContainer[0].classList.add("show-display")
                isClicked = true
            } else {
                noticePopoverContainer[0].classList.remove("show-display")
                leftSectionNavBottomNoticeContainer[0].blur()
                isClicked = false
            }
        })
    }
    inviteButtonAddEvent(inviterId, organizationId) {
        const noticePopoverContainerAcceptButton = document.getElementById(
            `notice-popover-container-invite-accept-button-${inviterId}-${organizationId}`
        )
        const noticePopoverContainerRefuseButton = document.getElementById(
            `notice-popover-container-invite-refuse-button-${inviterId}-${organizationId}`
        )
        const noticeCardBox = document.getElementById(`notice-invite-card-box-${inviterId}-${organizationId}`)
        noticePopoverContainerAcceptButton.addEventListener("click", async () => {
            const response = await invitationApi.acceptInvitation(organizationId, inviterId)
            if (response.status === 200) {
                noticeCardBox.innerHTML = `<div>${response.data.message}</div>`
            }
        })
        noticePopoverContainerRefuseButton.addEventListener("click", async () => {
            const response = await invitationApi.refuseInvitation(organizationId, inviterId)
            console.log(response)
            if (response.status === 200) {
                noticeCardBox.innerHTML = `<div>${response.data.message}</div>`
            }
        })
    }
    approvalRefuseMessageCloseButton(inviterId, organizationId, inviteeEmail) {
        const noticeApprovalRefusedCancelSvg = document.getElementById(`notice-approval-refused-cancel-svg-${inviterId}-${organizationId}`)
        const noticeApprovalRefusedCardBox = document.getElementById(`notice-approval-refused-card-box-${inviterId}-${organizationId}`)
        noticeApprovalRefusedCancelSvg.addEventListener("click", async () => {
            const response = await invitationApi.closeRefuseApproval(organizationId, inviterId, inviteeEmail)
            console.log(response)
            if (response.status === 200) {
                noticeApprovalRefusedCardBox.remove()
            }
        })
    }
    approvalButtonAddEvent(inviterId, inviteeId, organizationId, inviteeEmail) {
        const noticeCardBox = document.getElementById(`notice-approval-card-box-${inviteeId}-${organizationId}`)
        const noticePopoverContainerApprovalAcceptButton = document.getElementById(
            `notice-popover-container-approval-accept-button-${inviteeId}-${organizationId}`
        )
        const noticePopoverContainerApprovalRefuseButton = document.getElementById(
            `notice-popover-container-approval-refuse-button-${inviteeId}-${organizationId}`
        )
        noticePopoverContainerApprovalAcceptButton.addEventListener("click", async () => {
            const response = await invitationApi.acceptApproval(organizationId, inviterId, inviteeEmail, inviteeId)
            console.log(response)
            if (response.status === 200) {
                noticeCardBox.innerHTML = `<div>${response.data.message}</div>`
            }
        })
        noticePopoverContainerApprovalRefuseButton.addEventListener("click", async () => {
            const response = await invitationApi.refuseApproval(organizationId, inviterId, inviteeEmail, inviteeId)
            console.log(response)
            if (response.status === 200) {
                noticeCardBox.innerHTML = `<div>${response.data.message}</div>`
            }
        })
    }
    /* 群組會員管理 */
    switchBetweenMemberPreferences() {
        const organizationSettingPopoverPreferenceButton = document.getElementsByClassName("organization-setting-popover-preference-button")
        const organizationSettingPopoverMemberButton = document.getElementsByClassName("organization-setting-popover-member-button")
        const organizationSettingPopoverRightBox = document.getElementsByClassName("organization-setting-popover-right-box")
        const organizationMemberPopoverRightBox = document.getElementsByClassName("organization-member-popover-right-box")
        const organizationMemberEditPermissionPopoverRightBox = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box"
        )
        organizationSettingPopoverPreferenceButton[0].addEventListener("click", () => {
            organizationMemberPopoverRightBox[0].classList.add("none")
            organizationSettingPopoverRightBox[0].classList.remove("none")
            organizationSettingPopoverPreferenceButton[0].style.color = "rgb(214, 73, 107)"
            organizationSettingPopoverPreferenceButton[0].style.borderBottom = "1px solid rgb(214, 73, 107)"
            organizationSettingPopoverMemberButton[0].style.color = "rgb(197, 197, 211)"
            organizationSettingPopoverMemberButton[0].style.borderBottom = "none"
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
        })
        organizationSettingPopoverMemberButton[0].addEventListener("click", () => {
            organizationSettingPopoverRightBox[0].classList.add("none")
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
            organizationMemberPopoverRightBox[0].classList.remove("none")
            organizationSettingPopoverMemberButton[0].style.color = "rgb(214, 73, 107)"
            organizationSettingPopoverMemberButton[0].style.borderBottom = "1px solid rgb(214, 73, 107)"
            organizationSettingPopoverPreferenceButton[0].style.color = "rgb(197, 197, 211)"
            organizationSettingPopoverPreferenceButton[0].style.borderBottom = "none"
        })
    }
    addMembersButton() {
        const organizationSettingPopoverBox = document.getElementsByClassName("organization-setting-popover-box")
        const organizationMemberPopoverRightBoxAddFriendSvgContainer = document.getElementsByClassName(
            "organization-member-popover-right-box-add-friend-svg-container"
        )
        const inviteMemberPopoverBox = document.getElementsByClassName("invite-member-popover-box")
        organizationMemberPopoverRightBoxAddFriendSvgContainer[0].addEventListener("click", () => {
            organizationSettingPopoverBox[0].style.transform = "translate(-50%,-150%)"
            inviteMemberPopoverBox[0].style.transform = "translate(-50%)"
        })
    }
    async getOrganizationMemberLists(organizationId) {
        const organizationMemberPopoverRightBoxMemberCardContainer = document.getElementsByClassName(
            "organization-member-popover-right-box-member-card-container"
        )
        const organizationMemberPopoverRightBoxOwnerName = document.getElementById("organization-member-popover-right-box-owner-name")
        const organizationMemberPopoverRightBoxOwnerEmail = document.getElementById("organization-member-popover-right-box-owner-email")
        const organizationMemberPopoverRightBoxMemberCount = document.getElementsByClassName(
            "organization-member-popover-right-box-member-count"
        )
        const response = await organizationApi.getOrganizationMember(organizationId)
        let roleName
        let ownerName
        let ownerId
        let managerName
        let managerId
        console.log(response)
        console.log(nowUserName, nowUserEmail)
        if (response.status === 200) {
            this.organizationMemberData = response.data.organizationMemberData
            organizationMemberPopoverRightBoxMemberCount[0].textContent = `ORGANIZATION MEMBERS (${this.organizationMemberData.length})`
            for (let i of this.organizationMemberData) {
                if (i.roleId === 1) {
                    roleName = "Owner"
                    ownerName = i.Member.username
                    ownerId = i.MemberId
                } else if (i.roleId === 2) {
                    roleName = "Manager"
                    managerName = i.Member.username
                    managerId = i.MemberId
                } else if (i.roleId === 3) {
                    roleName = "Member"
                } else if (i.roleId === 4) {
                    roleName = "Visitor"
                }
                OrganizationManagerSideCardForm
                if (nowUserName === ownerName) {
                    console.log("房主")
                    this.generateOrganizationSideCards("owner", i.MemberId, i.Member.username, i.Member.email, roleName)
                    if (!(ownerId === i.MemberId)) {
                        this.openManageOrganizationMemberLists(i.MemberId)
                        this.manageOrganizationMemberPermissionsButtons(
                            i.MemberId,
                            nowUserName,
                            nowUserEmail,
                            this.nowOrganizationName,
                            i.roleId
                        )
                        this.removeOrganizationMemberButton(i.MemberId, i.Member.email)
                    }
                } else if (nowUserName === managerName) {
                    console.log("管理者")
                    if (roleName === "Owner") {
                        this.generateOrganizationSideCards("owner", i.MemberId, i.Member.username, i.Member.email, roleName)
                    } else {
                        this.generateOrganizationSideCards("manager", i.MemberId, i.Member.username, i.Member.email, roleName)
                        this.openManageOrganizationMemberLists(i.MemberId)
                        this.manageOrganizationMemberPermissionsButtons(
                            i.MemberId,
                            nowUserName,
                            nowUserEmail,
                            this.nowOrganizationName,
                            i.roleId
                        )
                        this.removeOrganizationMemberButton(i.MemberId, i.Member.email)
                    }
                } else {
                    this.generateOrganizationSideCards("member", i.MemberId, i.Member.username, i.Member.email, roleName)
                }
            }
        }
    }
    generateOrganizationSideCards(status, memberId, memberName, memberEmail, roleName) {
        const organizationMemberPopoverRightBoxMemberCardContainer = document.getElementsByClassName(
            "organization-member-popover-right-box-member-card-container"
        )
        let memberCardHtml
        const memberCard = document.createElement("div")
        memberCard.classList.add("organization-member-popover-right-box-member-card")
        memberCard.setAttribute("id", `organization-member-popover-right-box-member-card-${memberId}`)
        if (status === "owner") {
            memberCardHtml = OrganizationOwnerSideCardForm(memberId, memberName, memberEmail, roleName)
        } else if (status === "manager") {
            memberCardHtml = OrganizationManagerSideCardForm(memberId, memberName, memberEmail, roleName)
        } else {
            memberCardHtml = OrganizationMemberSideCardForm(memberId, memberName, memberEmail, roleName)
        }
        memberCard.innerHTML = memberCardHtml
        organizationMemberPopoverRightBoxMemberCardContainer[0].appendChild(memberCard)
    }
    initMemberCards() {
        const parentNode = document.getElementsByClassName("organization-member-popover-right-box-member-card-container")
        const childNodes = parentNode[0].children
        const number = childNodes.length
        for (let i = number - 1; i >= 0; i--) {
            parentNode[0].removeChild(childNodes[i])
        }
    }
    openManageOrganizationMemberLists(memberId) {
        const organizationMemberPopoverRightBoxMemberEditButton = document.getElementById(
            `organization-member-popover-right-box-member-edit-button-${memberId}`
        )
        const organizationMemberPopoverRightBoxMemberEditPopover = document.getElementById(
            `organization-member-popover-right-box-member-edit-popover-${memberId}`
        )
        let isClicked = false
        document.addEventListener("click", (event) => {
            if (
                !organizationMemberPopoverRightBoxMemberEditButton.contains(event.target) &&
                !organizationMemberPopoverRightBoxMemberEditPopover.contains(event.target)
            ) {
                organizationMemberPopoverRightBoxMemberEditPopover.classList.remove("show-display")
                isClicked = false
            }
        })
        organizationMemberPopoverRightBoxMemberEditButton.addEventListener("click", async () => {
            if (!isClicked) {
                organizationMemberPopoverRightBoxMemberEditPopover.classList.add("show-display")
                isClicked = true
                await this.manageOrganizationMemberPermissionsSaveButton(memberId)
            } else {
                organizationMemberPopoverRightBoxMemberEditButton.blur()
                organizationMemberPopoverRightBoxMemberEditPopover.classList.remove("show-display")
                isClicked = false
            }
        })
    }
    manageOrganizationMemberPermissionsButtons(memberId, nowUserName, nowUserEmail, organizationName, roleId) {
        const organizationMemberPopoverRightBoxMemberEditPermission = document.getElementById(
            `organization-member-popover-right-box-member-edit-permission-${memberId}`
        )
        const organizationMemberPopoverRightBox = document.getElementsByClassName(`organization-member-popover-right-box`)
        const organizationMemberEditPermissionPopoverRightBox = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box"
        )
        const organizationMemberEditPermissionMemberName = document.getElementsByClassName(
            "organization-member-edit-permission-member-name"
        )
        const organizationMemberEditPermissionOrganizationName = document.getElementsByClassName(
            "organization-member-edit-permission-organization-name"
        )
        const permissionManager = document.getElementById("permission-manager")
        const permissionMember = document.getElementById("permission-member")
        const permissionVisitor = document.getElementById("permission-visitor")
        const organizationMemberEditPermissionPopoverRightBoxAlertMessage = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box-alert-message"
        )
        organizationMemberPopoverRightBoxMemberEditPermission.addEventListener("click", () => {
            permissionManager.classList.remove("permission-checkbox-check")
            permissionMember.classList.remove("permission-checkbox-check")
            permissionVisitor.classList.remove("permission-checkbox-check")
            organizationMemberPopoverRightBox[0].classList.add("none")
            organizationMemberEditPermissionPopoverRightBoxAlertMessage[0].style.display = "none"
            organizationMemberEditPermissionPopoverRightBox[0].classList.remove("none")
            organizationMemberEditPermissionMemberName[0].textContent = ` ${nowUserName}(${nowUserEmail})`
            organizationMemberEditPermissionOrganizationName[0].textContent = `${organizationName}`
            if (roleId === 2) {
                permissionManager.classList.add("permission-checkbox-check")
                this.selectedRole = "2"
            } else if (roleId === 3) {
                permissionMember.classList.add("permission-checkbox-check")
                this.selectedRole = "3"
            } else if (roleId === 4) {
                permissionVisitor.classList.add("permission-checkbox-check")
                this.selectedRole = "4"
            }
        })
    }
    manageOrganizationMemberPermissionsCheckBox() {
        const permissionManager = document.getElementById("permission-manager")
        const permissionMember = document.getElementById("permission-member")
        const permissionVisitor = document.getElementById("permission-visitor")
        permissionManager.addEventListener("click", () => {
            permissionManager.classList.add("permission-checkbox-check")
            permissionMember.classList.remove("permission-checkbox-check")
            permissionVisitor.classList.remove("permission-checkbox-check")
            this.selectedRole = "2"
        })
        permissionMember.addEventListener("click", () => {
            permissionMember.classList.add("permission-checkbox-check")
            permissionManager.classList.remove("permission-checkbox-check")
            permissionVisitor.classList.remove("permission-checkbox-check")
            this.selectedRole = "3"
        })
        permissionVisitor.addEventListener("click", () => {
            permissionVisitor.classList.add("permission-checkbox-check")
            permissionManager.classList.remove("permission-checkbox-check")
            permissionMember.classList.remove("permission-checkbox-check")
            this.selectedRole = "4"
        })
    }
    backManageOrganizationMemberPermissions() {
        const organizationMemberPopoverRightBox = document.getElementsByClassName(`organization-member-popover-right-box`)
        const organizationMemberEditPermissionPopoverRightBox = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box"
        )
        const organizationMemberEditPermissionPopoverRightBoxBackButton = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box-back-button"
        )
        organizationMemberEditPermissionPopoverRightBoxBackButton[0].addEventListener("click", async () => {
            organizationMemberEditPermissionPopoverRightBox[0].classList.add("none")
            organizationMemberPopoverRightBox[0].classList.remove("none")
            this.initMemberCards()
            await this.getOrganizationMemberLists(this.nowOrganizationId)
        })
    }
    async manageOrganizationMemberPermissionsSaveButton(memberId) {
        const organizationMemberEditPermissionPopoverRightBoxSaveButton = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box-save-button"
        )
        const organizationMemberEditPermissionPopoverRightBoxAlertMessage = document.getElementsByClassName(
            "organization-member-edit-permission-popover-right-box-alert-message"
        )
        let savePermissionChange = async () => {
            const response = await organizationApi.changeMemberRole(this.nowOrganizationId, memberId, this.selectedRole)
            if (response.status === 200) {
                organizationMemberEditPermissionPopoverRightBoxAlertMessage[0].style.display = "block"
                organizationMemberEditPermissionPopoverRightBoxAlertMessage[0].textContent = "Success"
            } else {
                organizationMemberEditPermissionPopoverRightBoxAlertMessage[0].style.display = "block"
                organizationMemberEditPermissionPopoverRightBoxAlertMessage[0].textContent = "Failed, server error!"
            }
            organizationMemberEditPermissionPopoverRightBoxSaveButton[0].removeEventListener("click", savePermissionChange)
        }
        organizationMemberEditPermissionPopoverRightBoxSaveButton[0].addEventListener("click", savePermissionChange)
    }
    removeOrganizationMemberButton(memberId, inviteeEmail) {
        const organizationMemberPopoverRightBoxMemberEditRemove = document.getElementById(
            `organization-member-popover-right-box-member-edit-remove-${memberId}`
        )
        organizationMemberPopoverRightBoxMemberEditRemove.addEventListener("click", async () => {
            const response = await organizationApi.deleteOrganizationMember(this.nowOrganizationId, memberId, inviteeEmail)
            if (response.status === 200) {
                this.initMemberCards()
                await this.getOrganizationMemberLists(this.nowOrganizationId)
            }
        })
    }
    /*教學*/
    beginnerGuidePopoverBoxButton() {
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        const leftSectionNavBottomButton = document.getElementsByClassName("leftSection-nav-bottom-button")
        const beginnerGuidePopoverBox = document.getElementsByClassName("beginner-guide-popover-box")
        const beginnerGuidePopoverBoxCloseButton = document.getElementsByClassName("beginner-guide-popover-box-close-button")
        leftSectionNavBottomButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            beginnerGuidePopoverBox[0].style.transform = "translate(-50%, -7%)"
        })
        beginnerGuidePopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            mask[0].style.display = "none"
            beginnerGuidePopoverBox[0].style.transform = "translate(-50%, -150%)"
        })
    }
    switchGuidePages() {
        const beginnerGuideExtensionText = document.getElementsByClassName("beginner-guide-extension-text")
        const carouselControlNext = document.getElementsByClassName("carousel-control-next")
        const carouselControlPrev = document.getElementsByClassName("carousel-control-prev")
    }
}
class MiddleSectionBuild {
    constructor() {
        this.collectionData
        this.nowCollectionName
        this.nowCollectionId
        this.isCollectionsCheck = {}
        this.isCreatedEdit = false
        this.isCreatedFirst = false
        this.tabsData = {}
        this.exportCollectionData
        this.nowTabId
        this.nowTabName
        this.nowTabUrl
        this.nowTabDescription
        this.newTabName
        this.newTabUrl
        this.newTabDescription
        this.isTabsCheck = {}
    }
    /* switch Collection */
    async initCollectionCard() {
        const parentNode = document.getElementsByClassName("middleSection-container-collection-cards-box")
        const childNodes = parentNode[0].children
        const number = childNodes.length
        for (let i = number - 1; i >= 0; i--) {
            parentNode[0].removeChild(childNodes[i])
        }
    }
    async getCollectionDataToCreateCollections() {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const middleSectionContainerWithoutCollectionBox = document.getElementsByClassName("middleSection-container-without-collection-box")
        const middleSectionContainerCollectionBox = document.getElementsByClassName("middleSection-container-collection-box")
        this.collectionData = await collectionApi.getUserCollectionData(leftSectionBuild.nowOrganizationId, leftSectionBuild.nowSpaceId)
        console.log(this.collectionData)
        if (this.collectionData === "Unauthorized Role") {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            return
        }
        await this.initCollectionCard()
        mainPageBuild.dragCollectionCardAddEvent()
        const num = this.collectionData.length
        if (this.collectionData.length > 0) {
            for (let i = 0; i < num; i++) {
                middleSectionContainerCollectionBox[0].classList.remove("none")
                middleSectionContainerWithoutCollectionBox[0].classList.add("none")
                this.generateInitCollectionCard(this.collectionData[i].collectionName, this.collectionData[i].id)
                this.editCollectionNameButtonAddEvent(i, this.collectionData[i].id)
                this.closeCollectionBoxButtonAddEvent(this.collectionData[i].id)
                this.maintainFocusStatusForMoreButton(this.collectionData[i].id)
                await this.updateCollectionNameSaveButtonAddEvent(this.collectionData[i].id)
                this.openDeleteCollectionCardBoxButtonAddEvent(this.collectionData[i].id)
                await this.deleteCollectionCardButtonAddEvent(i, this.collectionData[i].id)
                this.collectionCardCheckBoxPopover(this.collectionData[i].id)
                if (this.collectionData[0].role == "visitor") {
                    mainPageBuild.dragCollectionAddEvent(this.collectionData[i].id, false)
                } else {
                    mainPageBuild.dragCollectionAddEvent(this.collectionData[i].id, true)
                }
                this.collectionCardArrowControl(this.collectionData[i].id)
                this.openExportCollectionButtonAddEvent(this.collectionData[i].id)
                /* tab cards*/
                this.getTabCardsData(this.collectionData[i].id)
            }
        } else {
            middleSectionContainerCollectionBox[0].classList.add("none")
            middleSectionContainerWithoutCollectionBox[0].classList.remove("none")
        }
    }
    maintainFocusStatusForMoreButton(collectionId) {
        const middleSectionCardContainerNavMoreButton = document.getElementById(
            `middleSection-card-container-nav-more-button-focus-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavButtonsBox = document.getElementById(
            `middleSection-container-collection-card-container-nav-buttons-box-${collectionId}`
        )
        let isClicked = false
        middleSectionCardContainerNavMoreButton.addEventListener("focus", () => {
            middleSectionContainerCollectionCardContainerNavButtonsBox.classList.add("show-opacity")
        })

        middleSectionCardContainerNavMoreButton.addEventListener("blur", () => {
            middleSectionContainerCollectionCardContainerNavButtonsBox.classList.remove("show-opacity")
            isClicked = false
        })
        middleSectionCardContainerNavMoreButton.addEventListener("click", () => {
            if (!isClicked) {
                middleSectionCardContainerNavMoreButton.focus()
                isClicked = true
            } else {
                middleSectionCardContainerNavMoreButton.blur()
                isClicked = false
            }
        })
    }
    generateInitCollectionCard(collectionName, collectionId) {
        const middleSectionContainerCollectionCardsBox = document.getElementsByClassName("middleSection-container-collection-cards-box")
        const middleSectionContainerCollectionCardBox = document.createElement("div")
        middleSectionContainerCollectionCardBox.classList.add("middleSection-container-collection-card-box")
        middleSectionContainerCollectionCardBox.setAttribute("id", `middleSection-container-collection-card-box-${collectionId}`)
        const initCollectionCardFrameHtml = initCollectionCardFrame(collectionId, collectionName)
        middleSectionContainerCollectionCardBox.innerHTML = initCollectionCardFrameHtml
        middleSectionContainerCollectionCardsBox[0].append(middleSectionContainerCollectionCardBox)
    }
    generateFirstCollectionCard() {
        const middleSectionContainerCollectionCardsBox = document.getElementsByClassName("middleSection-container-collection-cards-box")
        const middleSectionContainerCollectionCardBox = document.createElement("div")
        middleSectionContainerCollectionCardBox.classList.add("middleSection-container-collection-card-box")
        const firstCollectionCardFrameHtml = firstCollectionCardFrame("first")
        middleSectionContainerCollectionCardBox.innerHTML = firstCollectionCardFrameHtml
        middleSectionContainerCollectionCardsBox[0].insertBefore(
            middleSectionContainerCollectionCardBox,
            middleSectionContainerCollectionCardsBox[0].firstChild
        )
    }
    generateEditCollectionCard() {
        const middleSectionContainerCollectionCardsBox = document.getElementsByClassName("middleSection-container-collection-cards-box")
        const middleSectionContainerCollectionCardBox = document.createElement("div")
        middleSectionContainerCollectionCardBox.classList.add("middleSection-container-collection-card-box")
        middleSectionContainerCollectionCardBox.setAttribute("id", "middleSection-container-collection-card-box-edit")
        const firstCollectionCardFrameHtml = firstCollectionCardFrame("edit")
        middleSectionContainerCollectionCardBox.innerHTML = firstCollectionCardFrameHtml
        middleSectionContainerCollectionCardsBox[0].insertBefore(
            middleSectionContainerCollectionCardBox,
            middleSectionContainerCollectionCardsBox[0].firstChild
        )
    }
    createFirstCollectionBoxButtonAddEvent() {
        const middleSectionContainerAddFirstCollectionButton = document.getElementsByClassName(
            "middleSection-container-add-first-collection-button"
        )
        const middleSectionContainerWithoutCollectionBox = document.getElementsByClassName("middleSection-container-without-collection-box")
        const middleSectionContainerCollectionBox = document.getElementsByClassName("middleSection-container-collection-box")
        const middleSectionContainerCollectionCardBoxCheckBox = document.getElementsByClassName(
            "middleSection-container-collection-card-box-check-box"
        )
        const middleSectionContainerCollectionCardsBox = document.getElementsByClassName("middleSection-container-collection-cards-box")
        const middleSectionNavAddButton = document.getElementsByClassName("middleSection-nav-add-button")
        middleSectionContainerAddFirstCollectionButton[0].addEventListener("click", () => {
            middleSectionContainerCollectionBox[0].classList.remove("none")
            middleSectionContainerWithoutCollectionBox[0].classList.add("none")
            this.generateFirstCollectionCard()
            middleSectionContainerCollectionCardBoxCheckBox[0].style.visibility = "hidden"
            this.closeFirstCollectionBoxButtonAddEvent()
            this.createCollectionSaveButtonAddEvent(0)
            this.isCreatedFirst = true
        })
        middleSectionNavAddButton[0].addEventListener("click", () => {
            const num = middleSectionContainerCollectionCardsBox[0].children.length
            console.log(this.isCreatedFirst, this.isCreatedEdit)
            if (num === 0) {
                this.generateFirstCollectionCard()
                this.closeFirstCollectionBoxButtonAddEvent()
                this.isCreatedFirst = true
            } else {
                if (!this.isCreatedEdit && !this.isCreatedFirst) {
                    this.generateEditCollectionCard()
                    this.closeCreateCollectionBoxButtonAddEvent()
                    this.isCreatedEdit = true
                }
            }
            middleSectionContainerCollectionBox[0].classList.remove("none")
            middleSectionContainerWithoutCollectionBox[0].classList.add("none")
            middleSectionContainerCollectionCardBoxCheckBox[0].style.visibility = "hidden"
            this.createCollectionSaveButtonAddEvent(0)
        })
    }
    closeFirstCollectionBoxButtonAddEvent() {
        const middleSectionContainerAddCollectionBoxSaveCancelButton = document.getElementById(
            "middleSection-container-add-collection-box-save-cancel-button-first"
        )
        const middleSectionContainerWithoutCollectionBox = document.getElementsByClassName("middleSection-container-without-collection-box")
        const middleSectionContainerCollectionBox = document.getElementsByClassName("middleSection-container-collection-box")
        const addCollectionNameInput = document.getElementById("middleSection-container-add-Name-input-first")
        middleSectionContainerAddCollectionBoxSaveCancelButton.addEventListener("click", () => {
            middleSectionContainerCollectionBox[0].classList.add("none")
            middleSectionContainerWithoutCollectionBox[0].classList.remove("none")
            addCollectionNameInput.value = ""
            this.initCollectionCard()
            this.isCreatedFirst = false
        })
    }
    closeCreateCollectionBoxButtonAddEvent() {
        const middleSectionContainerAddCollectionBoxSaveCancelButton = document.getElementById(
            "middleSection-container-add-collection-box-save-cancel-button-edit"
        )
        const middleSectionContainerCollectionCardBox = document.getElementById("middleSection-container-collection-card-box-edit")
        const addCollectionNameInput = document.getElementById("middleSection-container-add-Name-input-edit")
        middleSectionContainerAddCollectionBoxSaveCancelButton.addEventListener("click", () => {
            middleSectionContainerCollectionCardBox.remove()
            addCollectionNameInput.value = ""
            this.isCreatedEdit = false
        })
    }
    closeCollectionBoxButtonAddEvent(collectionId) {
        const middleSectionContainerAddCollectionBoxSaveCancelButton = document.getElementById(
            `middleSection-container-add-collection-box-save-cancel-button-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavTitle = document.getElementById(
            `middleSection-container-collection-card-container-nav-title-${collectionId}`
        )
        const middleSectionContainerAddCollectionContainer = document.getElementById(
            `middleSection-container-add-collection-container-${collectionId}`
        )
        const middleSectionContainerCollectionCardBoxCheckBox = document.getElementById(
            `middleSection-container-collection-card-box-check-box-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavButtonsBox = document.getElementById(
            `middleSection-container-collection-card-container-nav-buttons-box-${collectionId}`
        )
        const addCollectionNameInput = document.getElementById(`middleSection-container-add-Name-input-${collectionId}`)
        middleSectionContainerAddCollectionBoxSaveCancelButton.addEventListener("click", () => {
            middleSectionContainerCollectionCardContainerNavTitle.classList.remove("none")
            middleSectionContainerCollectionCardContainerNavButtonsBox.classList.remove("none")
            middleSectionContainerCollectionCardBoxCheckBox.style.visibility = "visible"
            middleSectionContainerAddCollectionContainer.classList.add("none")
            addCollectionNameInput.value = ""
        })
    }
    createCollectionSaveButtonAddEvent(i) {
        const addCollectionBoxSaveButton = document.getElementsByClassName("middleSection-container-add-collection-box-save-button")
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        let createCollectionName
        const addCollectionNameInput = document.getElementsByClassName("middleSection-container-add-Name-input")
        addCollectionNameInput[i].addEventListener("input", (e) => {
            createCollectionName = e.target.value
        })
        addCollectionBoxSaveButton[i].addEventListener("click", async () => {
            const inputValue = createCollectionName
            if (!inputValue || !inputValue.trim()) {
                createCollectionName = "Untitled collection"
            }
            const response = await collectionApi.uploadCollectionData(
                leftSectionBuild.nowOrganizationId,
                leftSectionBuild.nowSpaceId,
                createCollectionName
            )
            console.log(response)
            if (response.data.message === "ok") {
                await this.getCollectionDataToCreateCollections()
                this.isCreatedEdit = false
                this.isCreatedFirst = false
                //location.href = "/main"
            } else if (response.data.message === "Unauthorized Role") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
                console.log(response)
            } else {
            }
        })
    }
    invalidAuthRolePopoverBox() {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const noPermissionPopoverBoxCloseSvg = document.getElementsByClassName("no-permission-popover-box-close-svg-container")
        const noPermissionPopoverBoxCloseButton = document.getElementsByClassName("no-permission-popover-box-close-button")
        noPermissionPopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            mask[0].style.display = "none"
            noPermissionPopoverBox[0].style.transform = "translate(-50%,-200%)"
        })
        noPermissionPopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            mask[0].style.display = "none"
            noPermissionPopoverBox[0].style.transform = "translate(-50%,-200%)"
        })
    }
    async updateCollectionNameSaveButtonAddEvent(collectionId) {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const addCollectionBoxSaveButton = document.getElementById(`middleSection-container-add-collection-box-save-button-${collectionId}`)
        let newCollectionName
        const addCollectionNameInput = document.getElementById(`middleSection-container-add-Name-input-${collectionId}`)
        addCollectionNameInput.addEventListener("input", (e) => {
            newCollectionName = e.target.value
        })
        addCollectionBoxSaveButton.addEventListener("click", async () => {
            const inputValue = newCollectionName
            if (!inputValue || !inputValue.trim()) {
                newCollectionName = this.nowCollectionName
            } else {
                const response = await collectionApi.updateCollectionData(
                    leftSectionBuild.nowOrganizationId,
                    this.nowCollectionId,
                    newCollectionName
                )
                if (response.data.message === "ok") {
                    location.href = "/main"
                } else if (response.data.message === "Unauthorized Role") {
                    middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                    mask[0].style.display = "block"
                    noPermissionPopoverBox[0].style.transform = "translate(-50%)"
                } else {
                    console.log(response)
                }
            }
        })
    }
    editCollectionNameButtonAddEvent(i, collectionId) {
        const cardContainerNavMoreListEditTitleButton = document.getElementById(
            `card-container-nav-more-list-edit-title-button-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavTitle = document.getElementById(
            `middleSection-container-collection-card-container-nav-title-${collectionId}`
        )
        const middleSectionContainerAddCollectionContainer = document.getElementById(
            `middleSection-container-add-collection-container-${collectionId}`
        )
        const middleSectionContainerCollectionCardBoxCheckBox = document.getElementById(
            `middleSection-container-collection-card-box-check-box-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavButtonsBox = document.getElementById(
            `middleSection-container-collection-card-container-nav-buttons-box-${collectionId}`
        )
        cardContainerNavMoreListEditTitleButton.addEventListener("click", () => {
            this.nowCollectionName = this.collectionData[i].collectionName
            this.nowCollectionId = this.collectionData[i].id
            middleSectionContainerCollectionCardContainerNavTitle.classList.add("none")
            middleSectionContainerCollectionCardContainerNavButtonsBox.classList.add("none")
            middleSectionContainerCollectionCardBoxCheckBox.style.visibility = "hidden"
            middleSectionContainerAddCollectionContainer.classList.remove("none")
        })
    }
    async openExportCollectionButtonAddEvent(collectionId) {
        const cardContainerNavMoreListExportButton = document.getElementById(`card-container-nav-more-list-export-button-${collectionId}`)
        const collectionExportPopoverBox = document.getElementsByClassName("collection-export-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        let collectionName
        cardContainerNavMoreListExportButton.addEventListener("click", async () => {
            collectionExportPopoverBox[0].style.transform = "translate(-50%)"
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            const tabData = await tabApi.getUserTabData(leftSectionBuild.nowOrganizationId, collectionId)
            for (let i of this.collectionData) {
                if (i.id === collectionId) {
                    collectionName = i.collectionName
                }
            }
            for (let i of tabData) {
                delete i.id
                delete i.tabId
                delete i.createdAt
                delete i.updatedAt
                delete i.CollectionId
            }
            const collectionData = {
                Collection: collectionName,
                Cards: tabData,
            }
            this.exportCollectionData = collectionData
        })
    }
    exportCollectionButtonAddEvent() {
        const collectionExportPopoverBoxJsonButton = document.getElementsByClassName("collection-export-popover-box-json-button")
        const collectionExportPopoverBoxHtmlButton = document.getElementsByClassName("collection-export-popover-box-html-button")
        const collectionExportPopoverBoxTxtButton = document.getElementsByClassName("collection-export-popover-box-txt-button")
        collectionExportPopoverBoxJsonButton[0].addEventListener("click", () => {
            const collectionData = JSON.stringify(this.exportCollectionData)
            const collectionDataBlob = new Blob([collectionData], { type: "application/json" })
            const url = window.URL.createObjectURL(collectionDataBlob)
            const downloadLink = document.createElement("a")
            downloadLink.href = url
            downloadLink.download = `Tobicord-${this.exportCollectionData.Collection}.json`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        })
        collectionExportPopoverBoxHtmlButton[0].addEventListener("click", () => {
            let htmlContent = ""
            console.log(this.exportCollectionData)
            for (let i of this.exportCollectionData.Cards) {
                htmlContent = htmlContent + htmlExportForm(i.tabUrl, i.tabName)
            }
            const dataStr = `<html><head><title>Bookmarks</title></head><body><h1>Bookmarks</h1><h3>${this.exportCollectionData.Collection}</h3><div>${htmlContent}</div></body></html>`
            const dataBlob = new Blob([dataStr], { type: "text/html" })
            const url = window.URL.createObjectURL(dataBlob)
            const downloadLink = document.createElement("a")
            downloadLink.href = url
            downloadLink.download = `Tobicord-${this.exportCollectionData.Collection}.html`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        })
        collectionExportPopoverBoxTxtButton[0].addEventListener("click", () => {
            const urlList = this.exportCollectionData.Cards.map((item) => item.tabUrl)
            const collectionData = urlList.join("\n")
            const collectionDataBlob = new Blob([collectionData], { type: "application/txt" })
            const url = window.URL.createObjectURL(collectionDataBlob)
            const downloadLink = document.createElement("a")
            downloadLink.href = url
            downloadLink.download = `Tobicord-${this.exportCollectionData.Collection}.txt`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        })
    }
    closeExportCollectionButtonAddEvent() {
        const collectionExportPopoverBoxCloseSvgContainer = document.getElementsByClassName(
            "collection-export-popover-box-close-svg-container"
        )
        const collectionExportPopoverBoxCancelButton = document.getElementsByClassName("collection-export-popover-box-cancel-button")
        const collectionExportPopoverBox = document.getElementsByClassName("collection-export-popover-box")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        collectionExportPopoverBoxCloseSvgContainer[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            collectionExportPopoverBox[0].style.transform = "translate(-50%,-200%)"
            mask[0].style.display = "none"
        })
        collectionExportPopoverBoxCancelButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            collectionExportPopoverBox[0].style.transform = "translate(-50%,-200%)"
            mask[0].style.display = "none"
        })
    }
    openDeleteCollectionCardBoxButtonAddEvent(collectionId) {
        const cardContainerNavMoreListDeleteButton = document.getElementById(`card-container-nav-more-list-delete-button-${collectionId}`)
        const middleSectionContainerCollectionCardsDeleteBox = document.getElementById(
            `middleSection-container-collection-cards-delete-box-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavTitle = document.getElementById(
            `middleSection-container-collection-card-container-nav-title-${collectionId}`
        )
        const middleSectionContainerCollectionCardsCancelButtons = document.getElementById(
            `middleSection-container-collection-cards-cancel-buttons-${collectionId}`
        )
        const middleSectionCardContainerNavMoreList = document.getElementById(`middleSection-card-container-nav-more-list-${collectionId}`)
        cardContainerNavMoreListDeleteButton.addEventListener("click", () => {
            middleSectionContainerCollectionCardsDeleteBox.classList.remove("none")
            middleSectionContainerCollectionCardContainerNavTitle.classList.add("none")
            middleSectionCardContainerNavMoreList.classList.add("none")
        })
        middleSectionContainerCollectionCardsCancelButtons.addEventListener("click", () => {
            middleSectionContainerCollectionCardContainerNavTitle.classList.remove("none")
            middleSectionContainerCollectionCardsDeleteBox.classList.add("none")
            middleSectionCardContainerNavMoreList.classList.remove("none")
        })
    }
    async deleteCollectionCardButtonAddEvent(i, collectionId) {
        const middleSectionContainerCollectionCardsDeleteButtons = document.getElementById(
            `middleSection-container-collection-cards-delete-buttons-${collectionId}`
        )
        const middleSectionContainerCollectionCardBox = document.getElementById(
            `middleSection-container-collection-card-box-${collectionId}`
        )
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        middleSectionContainerCollectionCardsDeleteButtons.addEventListener("click", async () => {
            this.nowCollectionName = this.collectionData[i].collectionName
            this.nowCollectionId = this.collectionData[i].id
            const response = await collectionApi.deleteCollectionData(leftSectionBuild.nowOrganizationId, this.nowCollectionId)
            if (response.data.message === "ok") {
                middleSectionContainerCollectionCardBox.remove()
                //location.href = "/main"
            } else if (response.data.message === "Unauthorized Role") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            } else {
                console.log(response)
            }
        })
    }
    async deleCollectionCardsButton() {
        const collectionDeletePopoverBoxDeleteButton = document.getElementsByClassName("collection-delete-popover-box-delete-button")
        const middleSectionCollectionMenuPopoverContainer = document.getElementsByClassName(
            "middleSection-collection-menu-popover-container"
        )
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        const collectionDeletePopoverBox = document.getElementsByClassName("collection-delete-popover-box")
        let deleteId = []
        collectionDeletePopoverBoxDeleteButton[0].addEventListener("click", async () => {
            for (let id in this.isCollectionsCheck) {
                if (this.isCollectionsCheck[id] === true) {
                    deleteId.push(id)
                }
            }
            const response = await collectionApi.deleteCollectionData(leftSectionBuild.nowOrganizationId, deleteId)
            if (response.data.message === "ok") {
                location.href = "/main"
            } else if (response.data.message === "Unauthorized Role") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            } else {
                console.log(response)
            }
        })
    }
    collectionCardCheckBoxPopover(collectionId) {
        const middleSectionContainerCollectionCardBoxCheckBox = document.getElementById(
            `middleSection-container-collection-card-box-check-box-${collectionId}`
        )
        const middleSectionCollectionMenuPopoverContainer = document.getElementsByClassName(
            "middleSection-collection-menu-popover-container"
        )
        const collectionCheckBox = document.getElementById(`collection-check-box-${collectionId}`)
        let isChecked = false
        middleSectionContainerCollectionCardBoxCheckBox.addEventListener("click", () => {
            if (!isChecked) {
                this.isCollectionsCheck[collectionId] = true
                middleSectionContainerCollectionCardBoxCheckBox.classList.add("show-opacity")
                collectionCheckBox.classList.replace("collection-card-box-check-box", "collection-card-box-check-box-checked")
                middleSectionCollectionMenuPopoverContainer[0].style.transform = "translate(-50%, 0px)"
                isChecked = true
                this.countCollectionCheckAmount()
            } else {
                this.isCollectionsCheck[collectionId] = false
                middleSectionContainerCollectionCardBoxCheckBox.classList.remove("show-opacity")
                collectionCheckBox.classList.replace("collection-card-box-check-box-checked", "collection-card-box-check-box")
                isChecked = false
                this.countCollectionCheckAmount()
            }
            let isCollectionsAllCheck = Object.values(this.isCollectionsCheck).every((check) => check === false)
            if (isCollectionsAllCheck) {
                middleSectionCollectionMenuPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            }
            const middleSectionCollectionMenuPopoverCloseButton = document.getElementsByClassName(
                "middleSection-collection-menu-popover-close-button"
            )
            middleSectionCollectionMenuPopoverCloseButton[0].addEventListener("click", () => {
                this.isCollectionsCheck[collectionId] = false
                isChecked = false
                collectionCheckBox.classList.replace("collection-card-box-check-box-checked", "collection-card-box-check-box")
                middleSectionCollectionMenuPopoverContainer[0].style.transform = "translate(-50%, 300px)"
                middleSectionContainerCollectionCardBoxCheckBox.classList.remove("show-opacity")
            })
        })
    }
    countCollectionCheckAmount() {
        const checkSelectedAmount = document.getElementsByClassName("middleSection-collection-menu-popover-container-title")
        const selectedAmount = Object.values(this.isCollectionsCheck).filter((val) => val === true).length
        checkSelectedAmount[0].textContent = `(${selectedAmount} tabs selected)`
    }
    openCloseDeleteCollectionCardPopover() {
        const middleSectionCollectionMenuPopoverDeleteButton = document.getElementsByClassName(
            "middleSection-collection-menu-popover-delete-button"
        )
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const collectionDeletePopoverBoxCloseSvg = document.getElementsByClassName("collection-delete-popover-box-close-svg")
        const collectionDeletePopoverBoxCloseButton = document.getElementsByClassName("collection-delete-popover-box-cancel-button")
        const mask = document.getElementsByClassName("mask")
        const collectionDeletePopoverBox = document.getElementsByClassName("collection-delete-popover-box")
        middleSectionCollectionMenuPopoverDeleteButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            collectionDeletePopoverBox[0].style.transform = "translate(-50%)"
        })
        collectionDeletePopoverBoxCloseSvg[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            collectionDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
        })
        collectionDeletePopoverBoxCloseButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            collectionDeletePopoverBox[0].style.transform = "translate(-50%,-150%)"
            mask[0].style.display = "none"
        })
    }
    /* tab cards crud */
    async uploadTabCardsData(collectionId, newTabId, tabId, tabName, tabUrl, favIconUrl, tabDescription) {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const response = await tabApi.uploadTabData(
            leftSectionBuild.nowOrganizationId,
            collectionId,
            newTabId,
            tabId,
            tabName,
            tabUrl,
            favIconUrl,
            tabDescription
        )
        if (response.data.message === "ok") {
            return "ok"
            //location.href = "/main"
        } else if (response.data.message === "Unauthorized Role") {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            return "no"
        } else {
            console.log(response)
            return "no"
        }
    }
    async switchTabCardsCollection(collectionId, tabId) {
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const response = await tabApi.switchTabCollection(leftSectionBuild.nowOrganizationId, collectionId, tabId)
        if (response.data.message === "ok") {
            console.log(response)
            //location.href = "/main"
        } else if (response.data.message === "Unauthorized Role") {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            noPermissionPopoverBox[0].style.transform = "translate(-50%)"
        } else {
            console.log(response)
        }
    }
    async getTabCardsData(collectionId) {
        const tabData = await tabApi.getUserTabData(leftSectionBuild.nowOrganizationId, collectionId)
        this.tabsData[`${collectionId}`] = tabData
        if (tabData.length > 0) {
            for (let i of tabData) {
                const tabId = i.id
                const tabName = i.tabName
                const tabUrl = i.tabUrl
                const favIconUrl = i.favIconUrl
                const tabDescription = i.tabDescription
                this.generateTabCards(collectionId, tabId, tabName, tabUrl, favIconUrl, tabDescription)
                await this.tabCardDeleteButton(tabId)
                this.tabCardEditButton(collectionId, tabId)
                this.tabCardCheckBoxPopover(tabId)
            }
        }
    }
    collectionCardArrowControl(collectionId) {
        const middleSectionContainerCollectionCardContainerNavArrowSvgButton = document.getElementById(
            `middleSection-container-collection-card-container-nav-arrow-svg-button-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavArrowDownSvg = document.getElementById(
            `middleSection-container-collection-card-container-nav-arrow-down-svg-${collectionId}`
        )
        const middleSectionContainerCollectionCardContainerNavArrowUpSvg = document.getElementById(
            `middleSection-container-collection-card-container-nav-arrow-up-svg-${collectionId}`
        )
        let isClicked = false
        middleSectionContainerCollectionCardContainerNavArrowSvgButton.addEventListener("click", () => {
            if (!isClicked) {
                middleSectionContainerCollectionCardContainerNavArrowDownSvg.classList.remove("none")
                middleSectionContainerCollectionCardContainerNavArrowUpSvg.classList.add("none")
                isClicked = true
            } else {
                middleSectionContainerCollectionCardContainerNavArrowDownSvg.classList.add("none")
                middleSectionContainerCollectionCardContainerNavArrowUpSvg.classList.remove("none")
                isClicked = false
            }
        })
    }
    generateTabCards(collectionId, tabId, tabName, tabUrl, favIconUrl, tabDescription) {
        const middleSectionContainerCollectionCardContainerNavArrowSvgButton = document.getElementById(
            `middleSection-container-collection-card-container-nav-arrow-svg-button-${collectionId}`
        )
        const middleSectionContainerRemindAddCollectionBox = document.getElementById(
            `middleSection-container-remind-add-collection-box-${collectionId}`
        )
        middleSectionContainerCollectionCardContainerNavArrowSvgButton.classList.remove("none")
        middleSectionContainerRemindAddCollectionBox.classList.replace(
            "middleSection-container-remind-add-collection-box-created",
            "middleSection-container-collection-card-container-cards-space"
        )
        middleSectionContainerRemindAddCollectionBox.classList.add("collapse")
        middleSectionContainerRemindAddCollectionBox.classList.add("show")
        const tabCard = document.createElement("div")
        tabCard.classList.add("middleSection-container-collection-tab-card-box")
        tabCard.setAttribute("id", `middleSection-container-collection-tab-card-box-${tabId}`)
        const tabCardFrameHtml = tabCardFrame(tabId, tabName, tabUrl, favIconUrl, tabDescription)
        tabCard.innerHTML = tabCardFrameHtml
        middleSectionContainerRemindAddCollectionBox.appendChild(tabCard)
    }
    async tabCardDeleteButton(tabId) {
        const middleSectionContainerCollectionTabCardDeleteButton = document.getElementById(
            `middleSection-container-collection-tab-card-delete-button-${tabId}`
        )
        const middleSectionContainerCollectionTabCardBox = document.getElementById(
            `middleSection-container-collection-tab-card-box-${tabId}`
        )
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        middleSectionContainerCollectionTabCardDeleteButton.addEventListener("click", async () => {
            const response = await tabApi.deleteTabData(leftSectionBuild.nowOrganizationId, tabId)
            if (response.data.message === "ok") {
                middleSectionContainerCollectionTabCardBox.remove()
                //location.href = "/main"
            } else if (response.data.message === "Unauthorized Role") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            } else {
                console.log(response)
            }
        })
    }
    tabCardEditButton(collectionId, tabId) {
        const middleSectionContainerCollectionTabCardEditButton = document.getElementById(
            `middleSection-container-collection-tab-card-edit-button-${tabId}`
        )
        const tabCardEditPopoverBoxTitleInput = document.getElementsByClassName("tab-card-edit-popover-box-title-input")
        const tabCardEditPopoverBoxUrlInput = document.getElementsByClassName("tab-card-edit-popover-box-url-input")
        const tabCardEditPopoverBoxDescriptionInput = document.getElementsByClassName("tab-card-edit-popover-box-description-input")
        const tabCardEditPopoverBoxCancelButton = document.getElementsByClassName("tab-card-edit-popover-box-cancel-button")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const mask = document.getElementsByClassName("mask")
        const tabCardEditPopoverBox = document.getElementsByClassName("tab-card-edit-popover-box")
        middleSectionContainerCollectionTabCardEditButton.addEventListener("click", async () => {
            /*
            this.nowTabId = tabId
            for(let i of this.tabsData[`${collectionId}`]){
                if (i.id == tabId) {
                    this.nowTabName = i.tabName
                    this.nowTabUrl = i.tabUrl
                    this.nowTabDescription = i.tabDescription
                }
            }*/
            const tabData = await tabApi.getUserTabData(leftSectionBuild.nowOrganizationId, collectionId)
            this.tabsData[`${collectionId}`] = tabData
            for (let i of this.tabsData[collectionId]) {
                if (i.id == tabId) {
                    this.nowTabName = i.tabName
                    this.nowTabUrl = i.tabUrl
                    this.nowTabDescription = i.tabDescription
                }
            }
            this.nowTabId = tabId
            tabCardEditPopoverBoxTitleInput[0].value = this.nowTabName
            tabCardEditPopoverBoxUrlInput[0].value = this.nowTabUrl
            tabCardEditPopoverBoxDescriptionInput[0].value = this.nowTabDescription
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
            mask[0].style.display = "block"
            tabCardEditPopoverBox[0].style.transform = "translate(-50%,-55%)"
            await this.tabCardEditBoxDeleteButton()
            await this.tabCardEditBoxSaveButton()
        })
        tabCardEditPopoverBoxCancelButton[0].addEventListener("click", () => {
            middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
            tabCardEditPopoverBox[0].style.transform = "translate(-50%,-220%)"
            mask[0].style.display = "none"
            tabCardEditPopoverBoxTitleInput[0].value = this.nowTabName
            tabCardEditPopoverBoxUrlInput[0].value = this.nowTabUrl
            tabCardEditPopoverBoxDescriptionInput[0].value = this.nowTabDescription
        })
    }
    async tabCardEditBoxDeleteButton() {
        const tabId = this.nowTabId
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const tabCardEditPopoverBox = document.getElementsByClassName("tab-card-edit-popover-box")
        const middleSectionContainerCollectionTabCardBox = document.getElementById(
            `middleSection-container-collection-tab-card-box-${tabId}`
        )
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const tabCardEditPopoverBoxDeleteButton = document.getElementsByClassName("tab-card-edit-popover-box-delete-button")
        let deleteTabDataHandler = async () => {
            const response = await tabApi.deleteTabData(leftSectionBuild.nowOrganizationId, tabId)
            if (response.data.message === "ok") {
                middleSectionContainerCollectionTabCardBox.remove()
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
                tabCardEditPopoverBox[0].style.transform = "translate(-50%,-220%)"
                mask[0].style.display = "none"
            } else if (response.data.message === "Unauthorized Role") {
                tabCardEditPopoverBox[0].style.transform = "translate(-50%,-220%)"
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            } else {
                console.log(response)
            }
            tabCardEditPopoverBoxDeleteButton[0].removeEventListener("click", deleteTabDataHandler)
        }
        tabCardEditPopoverBoxDeleteButton[0].addEventListener("click", deleteTabDataHandler)
    }
    getTabCardEditBoxInput() {
        const tabCardEditPopoverBoxTitleInput = document.getElementsByClassName("tab-card-edit-popover-box-title-input")
        const tabCardEditPopoverBoxUrlInput = document.getElementsByClassName("tab-card-edit-popover-box-url-input")
        const tabCardEditPopoverBoxDescriptionInput = document.getElementsByClassName("tab-card-edit-popover-box-description-input")
        tabCardEditPopoverBoxTitleInput[0].addEventListener("input", (e) => {
            this.newTabName = e.target.value
        })
        tabCardEditPopoverBoxUrlInput[0].addEventListener("input", (e) => {
            this.newTabUrl = e.target.value
        })
        tabCardEditPopoverBoxDescriptionInput[0].addEventListener("input", (e) => {
            this.newTabDescription = e.target.value
        })
    }
    async tabCardEditBoxSaveButton() {
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        const tabCardEditPopoverBox = document.getElementsByClassName("tab-card-edit-popover-box")
        const tabCardEditPopoverBoxSaveButton = document.getElementsByClassName("tab-card-edit-popover-box-save-button")
        const middleSectionContainerCollectionTabCardText = document.getElementById(
            `middleSection-container-collection-tab-card-text-${this.nowTabId}`
        )
        const middleSectionContainerCollectionTabCardDescription = document.getElementById(
            `middleSection-container-collection-tab-card-description-text-${this.nowTabId}`
        )
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        let saveTabDataHandler = async () => {
            if (this.newTabName === undefined) {
                this.newTabName = this.nowTabName
            }
            if (this.newTabUrl === undefined) {
                this.newTabUrl = this.nowTabUrl
            }
            if (this.newTabDescription === undefined) {
                this.newTabDescription = this.nowTabDescription
            }
            const response = await tabApi.updateTabData(
                leftSectionBuild.nowOrganizationId,
                this.nowTabId,
                this.newTabName,
                this.newTabUrl,
                this.newTabDescription
            )
            if (response.data.message === "ok") {
                middleSectionContainerCollectionTabCardText.textContent = this.newTabName
                middleSectionContainerCollectionTabCardText.href = this.newTabUrl
                middleSectionContainerCollectionTabCardDescription.textContent = this.newTabDescription
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "-1000"
                tabCardEditPopoverBox[0].style.transform = "translate(-50%,-220%)"
                mask[0].style.display = "none"
            } else if (response.data.message === "Unauthorized Role") {
                tabCardEditPopoverBox[0].style.transform = "translate(-50%,-220%)"
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            }
            tabCardEditPopoverBoxSaveButton[0].removeEventListener("click", saveTabDataHandler)
        }
        tabCardEditPopoverBoxSaveButton[0].addEventListener("click", saveTabDataHandler)
    }
    tabCardCheckBoxPopover(tabId) {
        const middleSectionTabCardBoxCheckBox = document.getElementById(`middleSection-tab-card-box-check-box-${tabId}`)
        const middleSectionTabCardPopoverContainer = document.getElementsByClassName("middleSection-tab-card-menu-popover-container")
        const tabCardCheckBox = document.getElementById(`tab-card-check-box-${tabId}`)
        const middleSectionContainerCollectionTabCardImage = document.getElementById(
            `middleSection-container-collection-tab-card-image-${tabId}`
        )
        let isChecked = false
        middleSectionTabCardBoxCheckBox.addEventListener("click", () => {
            if (!isChecked) {
                this.isTabsCheck[tabId] = true
                middleSectionTabCardBoxCheckBox.classList.add("show-opacity")
                tabCardCheckBox.classList.replace("collection-card-box-check-box", "collection-card-box-check-box-checked")
                middleSectionTabCardPopoverContainer[0].style.transform = "translate(-50%, 0px)"
                middleSectionContainerCollectionTabCardImage.classList.remove("tab-card-image-show-opacity")
                isChecked = true
                this.countTabCardCheckAmount()
            } else {
                this.isTabsCheck[tabId] = false
                middleSectionContainerCollectionTabCardImage.classList.add("tab-card-image-show-opacity")
                middleSectionTabCardBoxCheckBox.classList.remove("show-opacity")
                tabCardCheckBox.classList.replace("collection-card-box-check-box-checked", "collection-card-box-check-box")
                isChecked = false
                this.countTabCardCheckAmount()
            }
            let isTabsAllCheck = Object.values(this.isTabsCheck).every((check) => check === false)
            if (isTabsAllCheck) {
                middleSectionTabCardPopoverContainer[0].style.transform = "translate(-50%, 300px)"
            }

            const middleSectionTabCardMenuPopoverCloseButton = document.getElementsByClassName(
                "middleSection-tab-card-popover-close-button"
            )
            middleSectionTabCardMenuPopoverCloseButton[0].addEventListener("click", () => {
                this.isTabsCheck[tabId] = false
                isChecked = false
                tabCardCheckBox.classList.replace("collection-card-box-check-box-checked", "collection-card-box-check-box")
                middleSectionTabCardPopoverContainer[0].style.transform = "translate(-50%, 300px)"
                middleSectionContainerCollectionTabCardImage.classList.add("tab-card-image-show-opacity")
                middleSectionTabCardBoxCheckBox.classList.remove("show-opacity")
            })
        })
    }
    countTabCardCheckAmount() {
        const checkSelectedAmount = document.getElementsByClassName("middleSection-tab-card-popover-title")
        const selectedAmount = Object.values(this.isTabsCheck).filter((val) => val === true).length
        checkSelectedAmount[0].textContent = `(${selectedAmount} tabs selected)`
    }
    async tabCardEditBoxPopoverDeleteButton() {
        const middleSectionTabCardPopoverContainer = document.getElementsByClassName("middleSection-tab-card-menu-popover-container")
        const middleSectionTabPopoverDeleteButton = document.getElementsByClassName("middleSection-tab-card-popover-delete-button")
        const noPermissionPopoverBox = document.getElementsByClassName("no-permission-popover-box")
        const mask = document.getElementsByClassName("mask")
        const middleSectionAddCategoryPopoverContainer = document.getElementsByClassName("middleSection-popover-container")
        let deleteId = []
        middleSectionTabPopoverDeleteButton[0].addEventListener("click", async () => {
            for (let id in this.isTabsCheck) {
                if (this.isTabsCheck[id] === true) {
                    deleteId.push(id)
                }
            }
            const response = await tabApi.deleteTabData(leftSectionBuild.nowOrganizationId, deleteId)
            if (response.data.message === "ok") {
                middleSectionTabCardPopoverContainer[0].style.transform = "translate(-50%, 300px)"
                for (let i of deleteId) {
                    const middleSectionContainerCollectionTabCardBox = document.getElementById(
                        `middleSection-container-collection-tab-card-box-${i}`
                    )
                    middleSectionContainerCollectionTabCardBox.remove()
                }
            } else if (response.data.message === "Unauthorized Role") {
                middleSectionAddCategoryPopoverContainer[0].style.zIndex = "9999"
                mask[0].style.display = "block"
                noPermissionPopoverBox[0].style.transform = "translate(-50%)"
            } else {
                console.log(response)
            }
        })
    }
}
const rightSectionBuild = new RightSectionBuild()
const mainPageBuild = new MainPageBuild()
const leftSectionBuild = new LeftSectionBuild()
const middleSectionBuild = new MiddleSectionBuild()
export { rightSectionBuild, mainPageBuild, leftSectionBuild, middleSectionBuild }
