const sequelize = require("../config/database.config")
const Collection = require("../models/Collection.model")
const Tab = require("../models/Tab.model")

const CreateTabData = async (collectionId, tabId, tabName, tabUrl, favIconUrl, tabDescription) => {
    try {
        const collection = await Collection.findByPk(collectionId)
        const response = await collection.createTab({
            id: tabId,
            tabName: tabName,
            tabUrl: tabUrl,
            favIconUrl: favIconUrl,
            tabDescription: tabDescription,
        })
        console.log(response)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const GetUserCollectionData = async (spaceId) => {
    try {
        const space = await Space.findByPk(spaceId)
        const collectionData = await space.getCollections()
        return collectionData
    } catch (err) {
        console.error(err)
        return err
    }
}

const UpdateCollectionData = async (collectionId, newCollectionName) => {
    try {
        const collection = await Collection.findByPk(collectionId)
        const response = await collection.update({
            collectionName: newCollectionName,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}
const DeleteCollectionData = async (collectionId) => {
    try {
        const response = await Collection.destroy({
            where: {
                id: collectionId,
            },
        })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateTabData,
}
