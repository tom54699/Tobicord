const sequelize = require("../config/database.config")
const Collection = require("../models/Collection.model")
const Tab = require("../models/Tab.model")

const CreateTabData = async (collectionId, newTabId, tabId, tabName, tabUrl, favIconUrl, tabDescription) => {
    try {
        const collection = await Collection.findByPk(collectionId)
        const response = await collection.createTab({
            id: newTabId,
            tabId: tabId,
            tabName: tabName,
            tabUrl: tabUrl,
            favIconUrl: favIconUrl,
            tabDescription: tabDescription,
        })
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}
const CreateTabsData = async (tabsData) => {
    try {
        const response = await Tab.bulkCreate(tabsData)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const GetUserTabData = async (collectionId) => {
    try {
        const collection = await Collection.findByPk(collectionId)
        const tabData = await collection.getTabs()
        return tabData
    } catch (err) {
        console.error(err)
        return err
    }
}
const SwitchTabCollection = async (collectionId, tabId) => {
    try {
        const response = await Tab.update({ CollectionId: collectionId }, { where: { id: tabId } })
        return response
    } catch (err) {
        console.log(err)
    }
}

const UpdateTabData = async (tabId, newTabName, newTabUrl, newTabDescription) => {
    try {
        const tab = await Tab.findByPk(tabId)
        const response = await tab.update({
            tabName: newTabName,
            tabUrl: newTabUrl,
            tabDescription: newTabDescription,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteTabData = async (tabId) => {
    try {
        const response = await Tab.destroy({
            where: {
                id: tabId,
            },
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateTabData,
    CreateTabsData,
    GetUserTabData,
    DeleteTabData,
    SwitchTabCollection,
    UpdateTabData,
}
