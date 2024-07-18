const express = require('express')
const connectDB = require('./config/connectDB')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes')

require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 1234

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Listening on "+ PORT)
    })
})

