window.addEventListener("load", () => {
    checkMainPageAuth()
})
// 檢查權限
async function checkMainPageAuth() {
    try {
        console.log("檢查MAIN權限")
        const accessToken = localStorage.getItem("accessToken")
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        const config = {
            headers: headers,
        }
        const response = await axios.get("/users", config)
        const result = await response.data
        console.log(result)
    } catch (error) {
        console.log(error)
        location.href = "/auth"
    }
}
