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
    async updateOrganizationData(organizationName, newOrganizationName) {
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
                newOrganizationName: newOrganizationName,
            }
            const response = await axios.put("/organization", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteOrganizationData(organizationName) {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
                data: {
                    organizationName: organizationName,
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
const authApi = new AuthApi()
const windowApi = new WindowApi()
const organizationApi = new OrganizationApi()
const spaceApi = new SpaceApi()

export { authApi, windowApi, organizationApi, spaceApi }
