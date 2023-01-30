const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const crypto = require("crypto")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const sequelize = require("./config/database.config")
const portNum = 3000

const app = express()
app.use(cors())
app.use(cookieParser("123456"))
//app.use(helmet())
app.engine("html", hbs.__express)
app.set("view engine", "html")
app.set("views", path.join(__dirname, "application", "views"))
app.use(express.static(path.join(__dirname, "application")))

app.use(
    bodyParser.json({
        limit: "50mb",
    })
)
app.use(
    bodyParser.urlencoded({
        extended: true, // 是否用額外套件解析字串
        limit: "50mb", //限制參數大小
        parameterLimit: "10000", //限制參數個數
    })
)

const associations = require("./models/associations")
/*
sequelize.sync({ force: true }).then(() => {
    console.log("Tables created")
})*/
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err)
    })

const authRoutes = require("./router/auth.routes")
const usersRoutes = require("./router/users.routes")
const mainRoutes = require("./router/main.routes")
const windowRoutes = require("./router/window.routes")
const organizationRoutes = require("./router/organization.routes")
const errorMiddleware = require("./middlewares/error.middleware")

app.get("/", (req, res) => {
    res.render("login")
})

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/main", mainRoutes)
app.use("/window", windowRoutes)
app.use("/organization", organizationRoutes)
app.use(errorMiddleware)

app.listen(portNum, () => {
    console.log(`Server is running at localhost:${portNum}`)
})
