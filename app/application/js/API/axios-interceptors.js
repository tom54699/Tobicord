// 全局設定 axios Request 攔截器 (interceptor)
axios.interceptors.request.use(
    async function (config) {
        //const accessToken = localStorage.getItem("accessToken")
        //config.headers.Authorization = "123"
        //console.log(config.headers)
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 全局設定 axios Response 攔截器 (interceptor)
axios.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        if (error.response) {
            // server responded status code falls out of the range of 2xx
            switch (error.response.status) {
                case 400:
                    {
                        const { message } = error.response.data
                        console.log(message, "資料錯誤")
                    }

                    break

                case 401:
                    {
                        // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
                        // 如果是就略過此刷新 access token 作業，直接不處理(因為 catch 已經攔截處理更新失敗的情況了)
                        const refreshTokeUrl = `/auth/refresh`
                        if (error.config.url !== refreshTokeUrl) {
                            console.log("準備換發")
                            // 原始 request 資訊
                            const originalRequest = error.config
                            // 依據 refresh_token 刷新 access_token 並重發 request
                            const response = await axios.post(refreshTokeUrl) // refresh_toke is attached in cookie
                            // [更新 access_token 成功]

                            // 刷新 storage (其他呼叫 api 的地方都會從此處取得新 access_token)
                            const accessToken = response.data.accessToken
                            localStorage.setItem("accessToken", accessToken)
                            // 刷新原始 request 的 access_token
                            originalRequest.headers.Authorization = "Bearer " + response.data.accessToken
                            console.log("重發request")
                            // 重送 request (with new access_token)
                            return await axios(originalRequest).catch((err) => {
                                // [更新 access_token 失敗] ( e.g. refresh_token 過期無效)
                                console.log("error", err)
                                localStorage.removeItem("accessToken")
                                window.location.href = "/auth"
                                return Promise.reject(error)
                            })
                        }
                    }

                    break

                case 404:
                    console.log(error.response.status, "資料來源不存在")
                    break

                case 500:
                    console.log(error.response.status, "內部系統發生錯誤")
                    break

                default:
                    console.log(error.response.status, "系統維護中，造成您的不便，敬請見諒。")

                    break
            }
        } else {
            // Something happened in setting up the request that triggered an Error
            if (error.code === "ECONNABORTED" && error.message && error.message.indexOf("timeout") !== -1) {
                // request time out will be here
                alert("網路連線逾時，請點「確認」鍵後繼續使用。")
            } else {
                // shutdonw api server
                alert("網路連線不穩定，請稍候再試")
            }
        }

        return Promise.reject(error)
    }
)

const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
})
const updateToken = (accessToken) => {
    window.localStorage.setItem("accessToken", accessToken)
    authAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

// 全局設定 authAxios Request 攔截器 (interceptor)
authAxios.interceptors.request.use(
    async function (config) {
        //const accessToken = localStorage.getItem("accessToken")
        //config.headers.Authorization = "123"
        //console.log(config.headers)
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 全局設定 authAxios Response 攔截器 (interceptor)
authAxios.interceptors.response.use(
    function (response) {
        console.log(`Response received at: ${new Date()}`)
        return response
    },
    async function (error) {
        if (error.response) {
            // server responded status code falls out of the range of 2xx
            switch (error.response.status) {
                case 400:
                    {
                        const { message } = error.response.data
                        console.log(message, "資料錯誤")
                    }
                    break

                case 401:
                    {
                        // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
                        // 如果是就略過此刷新 access token 作業，直接不處理(因為 catch 已經攔截處理更新失敗的情況了)
                        const refreshTokeUrl = `/auth/refresh`
                        if (error.config.url !== refreshTokeUrl) {
                            console.log("準備換發")
                            // 原始 request 資訊
                            const originalRequest = error.config
                            // 依據 refresh_token 刷新 access_token 並重發 request
                            const response = await axios.post(refreshTokeUrl) // refresh_toke is attached in cookie
                            // [更新 access_token 成功]

                            // 刷新 storage (其他呼叫 api 的地方都會從此處取得新 access_token)
                            const accessToken = response.data.accessToken
                            updateToken(accessToken)
                            //localStorage.setItem("accessToken", accessToken)
                            // 刷新原始 request 的 access_token
                            //originalRequest.headers.Authorization = "Bearer " + response.data.accessToken
                            console.log("重發request")

                            // 重送 request (with new access_token)
                            return await axios(originalRequest).catch((err) => {
                                // [更新 access_token 失敗] ( e.g. refresh_token 過期無效)
                                localStorage.removeItem("accessToken")
                                window.location.href = "/auth"
                                return Promise.reject(error)
                            })
                        }
                    }

                    break

                case 404:
                    console.log(error.response.status, "資料來源不存在")
                    break

                case 500:
                    console.log(error.response.status, "內部系統發生錯誤")
                    break

                default:
                    console.log(error.response.status, "系統維護中，造成您的不便，敬請見諒。")

                    break
            }
        } else {
            // Something happened in setting up the request that triggered an Error
            if (error.code === "ECONNABORTED" && error.message && error.message.indexOf("timeout") !== -1) {
                // request time out will be here
                alert("網路連線逾時，請點「確認」鍵後繼續使用。")
            } else {
                // shutdonw api server
                alert("網路連線不穩定，請稍候再試")
            }
        }

        return Promise.reject(error)
    }
)

export { authAxios }
