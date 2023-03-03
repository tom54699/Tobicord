const localUrl = "http://localhost:3000"
const serverUrl = "https://moonightowl.com"

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    })
})

chrome.runtime.onStartup.addListener(function () {
    chrome.action.setBadgeText({
        text: "OFF",
    })
})

let isClick = false
let isLogin = false
let email
let userWindowData = {}
let windowsData = []
let tabsData = []
// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    const response = await checkMainPageAuth()
    if (response.message === "ok") {
        isLogin = true
        email = response.email
    } else {
        isLogin = false
    }
    if (!isClick && isLogin) {
        isClick = true
        nextState = "ON"
    } else {
        isClick = false
        nextState = "OFF"
    }
    await chrome.action.setBadgeText({
        text: nextState,
    })
    if (nextState === "ON") {
        await getAllWindows()
        await chrome.tabs.onRemoved.addListener(getDeleteTabs)
        await chrome.tabs.onUpdated.addListener(getChangeTabs)
        await chrome.windows.onRemoved.addListener(getDeleteWindows)
        //await getNewTabs()
        //await getNewWindows()
    } else if (nextState === "OFF") {
        await chrome.windows.onRemoved.removeListener(getDeleteWindows)
        await chrome.tabs.onRemoved.removeListener(getDeleteTabs)
        await chrome.tabs.onUpdated.removeListener(getChangeTabs)
    }
})

const getDeleteWindows = async function (windowId) {
    console.log("delete windows")
    await getAllWindows()
}

async function checkMainPageAuth() {
    try {
        console.log("檢查MAIN權限")
        /* 拿access token */
        const { accessToken, tabs } = await getAccessToken()
        console.log(tabs)
        const response = await fetchUserApi(accessToken)
        result = await response.json()
        console.log(result)
        if (response.status == 200) {
            return { message: "ok", email: result.userEmail }
        }
        if (result.error == "Access Token expired" || result.error == "Invalid jwt token") {
            const { message, accessToken } = await refresh()
            if (message === "ok") {
                await chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: setToken,
                    args: [accessToken],
                })
                const response = await fetchUserApi(accessToken)
                result = await response.json()
                console.log(result)
                if (response.status == 200) {
                    return { message: "ok", email: result.userEmail }
                }
            } else {
                return { message: "no" }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

/* 共用流程 Function */
async function uploadWindowDataToRedis(userWindowData) {
    const { accessToken, tabs } = await getAccessToken()
    const response = await setWindowToRedis(accessToken, userWindowData)
    result = await response.json()
    if (response.status == 200) {
        return { message: "ok" }
    }
    console.log(result.error)
    if (result.error == "Access Token expired" || result.error == "Invalid jwt token") {
        const { message, accessToken } = await refresh()
        console.log(accessToken)
        await chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: setToken,
            args: [accessToken],
        })
        const response = await setWindowToRedis(accessToken, userWindowData)
        if (response.status == 200) {
            return { message: "ok" }
        }
    }
}

async function remindLogin() {
    const tabs = await chrome.tabs.query({ url: `${serverUrl}/*` })
    if (tabs.length > 0) {
        const tab = await chrome.tabs.update(tabs[0].id, { active: true, url: `${serverUrl}/auth` })
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: alertLogin,
        })
    } else {
        await chrome.tabs.create({ active: true, url: `${serverUrl}/auth` })
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: alertLogin,
        })
    }
}

async function getAccessToken() {
    const tabs = await chrome.tabs.query({
        url: `${serverUrl}/*`,
    })
    if (tabs[0]) {
        const res = await chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getToken,
        })
        const accessToken = res[0].result
        return { accessToken: accessToken, tabs: tabs }
    } else {
        console.log("開啟")
        await chrome.tabs.create({
            url: `${serverUrl}/main`,
            active: true,
        })
        return await getAccessToken()
    }
}
/* 用到POST API 更新資料用 */
async function getAllWindows() {
    try {
        const windows = await chrome.windows.getAll({ populate: true })
        for (let i of windows) {
            console.log("印出windows", i)
            for (let j of i.tabs) {
                let tabData = {
                    windowId: j.windowId,
                    tabId: j.id,
                    tabName: j.title,
                    tabUrl: j.url,
                    favIconUrl: j.favIconUrl,
                }
                tabsData.push(tabData)
            }
            let windowData = {
                windowId: i.id,
                windowTabs: tabsData,
            }
            windowsData.push(windowData)
            windowData = []
            tabsData = []
        }
        userWindowData.userEmail = email
        userWindowData.data = windowsData
        uploadWindowDataToRedis(userWindowData)
        windowsData = []
        userWindowData = {}
    } catch (error) {
        console.log(error)
    }
}

const getChangeTabs = async function (tabId, changeInfo, newTab) {
    try {
        if (changeInfo.status === "complete") {
            /*
                console.log(newTab)
                userWindowData.data = userWindowData.data.map((window) => {
                    window.windowTabs = window.windowTabs.map((tab) => {
                        if (tab.tabId === newTab.id) {
                            tab.tabName = newTab.title
                            tab.tabUrl = newTab.url
                            tab.favIconUrl = newTab.favIconUrl
                        }
                        return tab
                    })
                    return window
                })
                uploadWindowDataToRedis(userWindowData)*/
            console.log("change")
            if (isLogin) {
                await getAllWindows()
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const getDeleteTabs = async function (tabId, removeInfo) {
    try {
        console.log(tabId, removeInfo)
        /*
            console.log("刪除的url:", tabId, removeInfo)
            userWindowData.data.forEach((window) => {
                window.windowTabs = window.windowTabs.filter((tab) => tab.tabId !== tabId)
            })
            uploadWindowDataToRedis(userWindowData)*/
        if (!removeInfo.isWindowClosing) {
            await getAllWindows()
        }
    } catch (error) {
        console.log(error)
    }
}
/* executeScript */
const alertLogin = () => {
    alert("請登入，才能繼續使用擴充套件!")
}
const getToken = () => {
    const accessToken = localStorage.getItem("accessToken")
    return accessToken
}
const setToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken)
}

/*  Fetch Api */
async function setWindowToRedis(accessToken, data) {
    try {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers,
        }
        console.log(data)
        const response = await fetch(`${serverUrl}/window`, config)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function fetchUserApi(accessToken) {
    try {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        const config = {
            method: "GET",
            headers: headers,
        }
        const response = await fetch(`${serverUrl}/users`, config)
        return response
    } catch (error) {
        console.log(error)
    }
}
async function refresh() {
    try {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        const config = {
            method: "POST",
            headers: headers,
        }
        const response = await fetch(`${serverUrl}/auth/refresh`, config)
        const result = await response.json()
        console.log(result)
        if (result.message == "ok") {
            return { message: "ok", accessToken: result.accessToken }
        } else {
            isLogin = false
            await remindLogin()
            return { message: "no", accessToken: null }
        }
    } catch (error) {
        console.log(error)
    }
}

/* 封印 */
async function getNewWindows() {
    await chrome.windows.onCreated.addListener(async function (window) {
        const windows = await chrome.windows.getAll({ populate: true })
        let tabs = []
        for (let i = 0; i < windows.length; i++) {
            let windowTabs = windows[i].tabs
            for (let j = 0; j < windowTabs.length; j++) {
                tabs.push(windowTabs[j].url)
            }
        }
        console.log("印出windows", windows)
    })
}

async function getNewTabs() {
    try {
        await chrome.tabs.onCreated.addListener(async function (tab) {
            /*
            const createdTab = await chrome.tabs.get(tab.id)
            console.log("新增的url:", createdTab)
            let tabData = {
                windowId: createdTab.windowId,
                tabId: createdTab.id,
                tabName: createdTab.title,
                tabUrl: createdTab.url,
                favIconUrl: createdTab.favIconUrl,
            }
            await userWindowData.data.map((window) => {
                if (window.windowId === createdTab.windowId) {
                    window.windowTabs.push(tabData)
                } else {
                    let windowData = {
                        windowId: createdTab.windowId,
                        windowTabs: tabData,
                    }
                    userWindowData.data.push(windowData)
                }
            })
            console.log(userWindowData)
            uploadWindowDataToRedis(userWindowData)*/
            await getAllWindows()
        })
    } catch (error) {
        console.log(error)
    }
}
