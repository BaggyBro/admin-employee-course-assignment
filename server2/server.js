const express = require('express')
const sequelize = require('./config/connectDB')
const router = require('./routes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("", router)


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on " + PORT)
        })
    })
    .catch(err => {
        console.log("Error creating DB and tables!" + err)
    })