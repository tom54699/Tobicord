const sequelize = require("../config/database.config")
const Collection = require("../models/Collection.model")
const Member = require("../models/Member.model")
const Space = require("../models/Space.model")

const CreateCollectionData = async (spaceId, collectionName) => {
    try {
        const space = await Space.findByPk(spaceId)
        const response = await space.createCollection({
            collectionName: collectionName,
        })
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
        return response
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateCollectionData,
    GetUserCollectionData,
    UpdateCollectionData,
    DeleteCollectionData,
}
