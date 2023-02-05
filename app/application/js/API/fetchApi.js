import { authAxios } from "./axios-interceptors.js"

class AuthApi {
    async register(registerEmail, registerPassword, registerUsername) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            const content = {
                email: registerEmail,
                password: registerPassword,
                username: registerUsername,
            }
            const response = await axios.post("/auth/register", content, headers)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async login(loginEmail, loginPassword) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            const content = {
                email: loginEmail,
                password: loginPassword,
            }
            const response = await axios.put("/auth/login", content, headers)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async logout() {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        const config = {
            headers: headers,
        }
        const response = await axios.delete("/auth/logout", config)
        return response
    }
    async checkAuth() {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const response = await axios.get("/users", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
}

class WindowApi {
    async getWindow() {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        }
        const config = {
            headers: headers,
        }
        const response = await axios.get("/window", config)
        return response
    }
}

class OrganizationApi {
    async uploadOrganizationData(organizationName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                organizationName: organizationName,
            }
            const response = await axios.post("/organization", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async getUserOrganizationData() {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const response = await axios.get("/organization", config)
            const organizationData = response.data.organizationData
            return organizationData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateOrganizationData(organizationId, newOrganizationName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                organizationId: organizationId,
                newOrganizationName: newOrganizationName,
            }
            const response = await axios.put("/organization", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteOrganizationData(organizationId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                data: {
                    organizationId: organizationId,
                },
            }
            const response = await axios.delete("/organization", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
}

class SpaceApi {
    async uploadSpaceData(organizationId, spaceName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                organizationId: organizationId,
                spaceName: spaceName,
            }
            const response = await axios.post("/space", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async getUserSpaceData(organizationId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                params: {
                    organizationId: organizationId,
                },
            }
            const response = await axios.get("/space", config)
            const spaceData = response.data.spaceData
            return spaceData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateSpaceData(spaceId, spaceName, newSpaceName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                spaceId: spaceId,
                spaceName: spaceName,
                newSpaceName: newSpaceName,
            }
            const response = await axios.put("/space", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteSpaceData(spaceId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                data: {
                    spaceId: spaceId,
                },
            }
            const response = await axios.delete("/space", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
}
class CollectionApi {
    async uploadCollectionData(spaceId, collectionName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                spaceId: spaceId,
                collectionName: collectionName,
            }
            const response = await axios.post("/collection", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async getUserCollectionData(spaceId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                params: {
                    spaceId: spaceId,
                },
            }
            const response = await axios.get("/collection", config)
            const collectionData = response.data.collectionData
            return collectionData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateCollectionData(collectionId, newCollectionName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                collectionId: collectionId,
                newCollectionName: newCollectionName,
            }
            const response = await axios.put("/collection", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteCollectionData(collectionId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                data: {
                    collectionId: collectionId,
                },
            }
            const response = await axios.delete("/collection", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
}
class TabApi {
    async uploadTabData(collectionId, tabId, tabName, tabUrl, favIconUrl, tabDescription) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                collectionId: collectionId,
                tabId: tabId,
                tabName: tabName,
                tabUrl: tabUrl,
                favIconUrl: favIconUrl,
                tabDescription: tabDescription,
            }
            const response = await axios.post("/tab", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    } /*
    async getUserCollectionData(spaceId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                params: {
                    spaceId: spaceId,
                },
            }
            const response = await axios.get("/collection", config)
            const collectionData = response.data.collectionData
            return collectionData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateCollectionData(collectionId, newCollectionName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const content = {
                collectionId: collectionId,
                newCollectionName: newCollectionName,
            }
            const response = await axios.put("/collection", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteCollectionData(collectionId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                data: {
                    collectionId: collectionId,
                },
            }
            const response = await axios.delete("/collection", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }*/
}
const authApi = new AuthApi()
const windowApi = new WindowApi()
const organizationApi = new OrganizationApi()
const spaceApi = new SpaceApi()
const collectionApi = new CollectionApi()
const tabApi = new TabApi()

export { authApi, windowApi, organizationApi, spaceApi, collectionApi, tabApi }
