import { authAxios } from "./axios-interceptors.js"

class AuthApi {
    async register(registerEmail, registerPassword, registerUsername) {
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
    }
    async login(loginEmail, loginPassword) {
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

const authApi = new AuthApi()
const windowApi = new WindowApi()

export { authApi, windowApi }
