import { shareApi } from "./API/fetchApi.js"
import { shareTabCardFrame } from "./component.js"

window.addEventListener("load", async () => {
    await fetchShareCollectionData()
})
/* 抓檔案 */

async function fetchShareCollectionData() {
    const notification = document.getElementsByClassName("notification")
    const currentUrl = window.location.href
    const collectionId = currentUrl.match(/\/p\/(\d+)!/)[1]
    console.log(collectionId)
    const response = await shareApi.getShareCollectionData(collectionId)
    if (response.data.tabData.length > 0) {
        notification[0].classList.add("none")
        for (let i of response.data.tabData) {
            generateSharedTabCard(i.id, i.tabName, i.tabUrl, i.favIconUrl, i.tabDescription)
        }
    }
}

function generateSharedTabCard(tabId, tabName, tabUrl, favIconUrl, tabDescription) {
    const tabCardsContainer = document.getElementsByClassName("tab-cards-container")
    const tabCardBox = document.createElement("div")
    tabCardBox.classList.add("middleSection-container-collection-tab-card-box")
    const shareTabCardHtml = shareTabCardFrame(tabId, tabName, tabUrl, favIconUrl, tabDescription)
    tabCardBox.innerHTML = shareTabCardHtml
    tabCardsContainer[0].appendChild(tabCardBox)
}
