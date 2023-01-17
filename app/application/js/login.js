const loginCard = document.getElementById("loginCard")
const signupCard = document.getElementById("signupCard")
const loginButton = document.getElementById("loginButton")
const signUpSwitchButton = document.getElementById("signUpSwitchButton")
const loginSwitchButton = document.getElementById("loginSwitchButton")
const registerEmailInput = document.getElementById("registerEmailInput")
const registerPasswordInput = document.getElementById("registerPasswordInput")
const registerUsernameInput = document.getElementById("registerUsernameInput")
const loginPasswordInput = document.getElementById("loginPasswordInput")
const loginEmailInput = document.getElementById("loginEmailInput")
const registerButton = document.getElementById("registerButton")
const errorMessage = document.getElementsByClassName("errorMessage")
const errorMessageTile = document.getElementsByClassName("errorMessageTile ")
let registerEmail
let registerPassword
let registerUsername
let loginEmail
let loginPassword

signUpSwitchButton.addEventListener("click", () => {
    loginCard.classList.add("none")
    signupCard.classList.remove("none")
})

loginSwitchButton.addEventListener("click", () => {
    signupCard.classList.add("none")
    loginCard.classList.remove("none")
})

registerButton.addEventListener("click", async () => {
    try {
        registerEmail = registerEmailInput.value
        registerPassword = registerPasswordInput.value
        registerUsername = registerUsernameInput.value
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
        const result = await response.data
        let num
        if (result.message === "ok") {
            location.href = "/auth"
        } else {
            for (let i of result.errorMessages) {
                if (i.param === "email") {
                    num = 2
                } else {
                    num = 3
                }
                registerInvalidFormatMessageClean()
                registerInvalidFormatMessage(i.msg, num)
            }
        }
    } catch (error) {
        console.log(error)
    }
})

// register wrong message
function registerInvalidFormatMessage(message, num) {
    errorMessage[num].textContent = message
    errorMessage[num].style.color = "#e78285"
    errorMessage[num].style.fontStyle = "italic"
    errorMessageTile[num].style.color = "#e78285"
}

function registerInvalidFormatMessageClean() {
    errorMessage[2].textContent = ""
    errorMessageTile[2].style.color = "white"
    errorMessage[3].textContent = ""
    errorMessageTile[3].style.color = "white"
}

loginButton.addEventListener("click", async () => {
    try {
        loginInvalidFormatMessageClean()
        loginEmail = loginEmailInput.value
        loginPassword = loginPasswordInput.value
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        const content = {
            email: loginEmail,
            password: loginPassword,
        }
        const response = await axios.put("/auth/login", content, headers)
        const result = await response.data
        if (result.message === "ok") {
            localStorage.setItem("accessToken", result.accessToken)
            location.href = "/main"
        } else {
            loginInvalidFormatMessage(result.errorMessages[0].msg)
        }
    } catch (error) {
        console.log(error)
    }
})

function loginInvalidFormatMessage(message) {
    errorMessage[0].textContent = message
    errorMessage[0].style.color = "#e78285"
    errorMessage[0].style.fontStyle = "italic"
    errorMessageTile[0].style.color = "#e78285"
    errorMessage[1].textContent = message
    errorMessage[1].style.color = "#e78285"
    errorMessage[1].style.fontStyle = "italic"
    errorMessageTile[1].style.color = "#e78285"
}

function loginInvalidFormatMessageClean() {
    errorMessage[0].textContent = ""
    errorMessageTile[0].style.color = "white"
    errorMessage[1].textContent = ""
    errorMessageTile[1].style.color = "white"
}

VANTA.NET({
    el: "#gradient-custom",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xcc460a,
    backgroundColor: 0x202225,
})
