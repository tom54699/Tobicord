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
        if (error.response.status === 401) {
            // server responded status code falls out of the range of 2xx

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
                    console.log("重新呼叫失敗error", err)
                    //localStorage.removeItem("accessToken")
                    //window.location.href = "/auth"
                    return Promise.reject(err)
                })
            }
        }
        return Promise.reject(error)
    }
)
