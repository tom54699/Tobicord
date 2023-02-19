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
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
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
    async checkIsLogin() {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            const config = {
                headers: headers,
            }
            const response = await axios.get("/auth/login/check", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async firstLoginDone() {
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            }
            const config = {
                headers: headers,
            }
            const response = await axios.put("/users", config)
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
    async getOrganizationMember(organizationId) {
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
            const response = await axios.get("/organization/members", config)
            return response
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
    async changeMemberRole(organizationId, memberId, roleId) {
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
                memberId: memberId,
                roleId: roleId,
            }
            const response = await axios.put("/organization/role", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteOrganizationMember(organizationId, memberId, inviteeEmail) {
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
                    memberId: memberId,
                    inviteeEmail: inviteeEmail,
                },
            }
            const response = await axios.delete("/organization/member", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteOrganizationMember(organizationId, memberId, inviteeEmail) {
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
                    memberId: memberId,
                    inviteeEmail: inviteeEmail,
                },
            }
            const response = await axios.delete("/organization/member", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async leaveOrganizationMember(organizationId) {
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
            const response = await axios.delete("/organization/leave", config)
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
            if (response.data.message === "Unauthorized Role") {
                return response.data.message
            }
            const spaceData = response.data.spaceData
            return spaceData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateSpaceData(organizationId, spaceId, spaceName, newSpaceName) {
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
    async deleteSpaceData(organizationId, spaceId) {
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
    async uploadCollectionData(organizationId, spaceId, collectionName) {
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
    async getUserCollectionData(organizationId, spaceId) {
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
                    spaceId: spaceId,
                },
            }
            const response = await axios.get("/collection", config)
            console.log(response)
            if (response.data.message === "Unauthorized Role") {
                return response.data.message
            } else if (response.data.role === "visitor") {
                const collectionData = response.data.collectionData
                collectionData[0].role = "visitor"
            }
            const collectionData = response.data.collectionData
            console.log(collectionData)
            return collectionData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateCollectionData(organizationId, collectionId, newCollectionName) {
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
    async deleteCollectionData(organizationId, collectionId) {
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
    async uploadTabData(organizationId, collectionId, newTabId, tabId, tabName, tabUrl, favIconUrl, tabDescription) {
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
                collectionId: collectionId,
                newTabId: newTabId,
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
    }
    async getUserTabData(organizationId, collectionId) {
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
                    collectionId: collectionId,
                },
            }
            const response = await axios.get("/tab", config)
            const tabData = response.data.tabData
            return tabData
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async switchTabCollection(organizationId, collectionId, tabId) {
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
                collectionId: collectionId,
                tabId: tabId,
            }
            const response = await axios.put("/tab/collection", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async updateTabData(organizationId, tabId, newTabName, newTabUrl, newTabDescription) {
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
                tabId: tabId,
                newTabName: newTabName,
                newTabUrl: newTabUrl,
                newTabDescription: newTabDescription,
            }
            const response = await axios.put("/tab", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async deleteTabData(organizationId, tabId) {
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
                    tabId: tabId,
                },
            }
            const response = await axios.delete("/tab", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
}
class InvitationApi {
    async uploadInvitationData(organizationId, inviteeEmail) {
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
                inviteeEmail: inviteeEmail,
            }
            const response = await axios.post("/invitation", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async getUserInvitationData(organizationId) {
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
            const response = await axios.get("/invitation", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async getUserApprovalData(organizationId) {
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
            const response = await axios.get("/invitation/approval", config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }

    async acceptInvitation(organizationId, inviterId) {
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
                inviterId: inviterId,
            }
            const response = await axios.put("/invitation/accept", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async refuseInvitation(organizationId, inviterId) {
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
                inviterId: inviterId,
            }
            const response = await axios.put("/invitation/refuse", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async acceptApproval(organizationId, inviterId, inviteeEmail, inviteeId) {
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
                inviterId: inviterId,
                inviteeEmail: inviteeEmail,
                inviteeId: inviteeId,
            }
            const response = await axios.put("/invitation/approval/accept", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async refuseApproval(organizationId, inviterId, inviteeEmail, inviteeId) {
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
                inviterId: inviterId,
                inviteeEmail: inviteeEmail,
                inviteeId: inviteeId,
            }
            const response = await axios.put("/invitation/approval/refuse", content, config)
            return response
        } catch (err) {
            console.log(err)
            return err.response
        }
    }
    async closeRefuseApproval(organizationId, inviterId, inviteeEmail) {
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
                    inviterId: inviterId,
                    inviteeEmail: inviteeEmail,
                },
            }
            const response = await axios.delete("/invitation", config)
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
const collectionApi = new CollectionApi()
const tabApi = new TabApi()
const invitationApi = new InvitationApi()

export { authApi, windowApi, organizationApi, spaceApi, collectionApi, tabApi, invitationApi }
