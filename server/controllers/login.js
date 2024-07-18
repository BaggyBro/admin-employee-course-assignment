const userModel = require("../models/userModel")
const bc = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        
        if (!user) {
            return res.status(400).json({
                message: "User does not exist!",
                error: true
            })
        }

        const verifyPass = await bc.compare(password, user.password)

        if (!verifyPass) {
            return res.status(400).json({
                message: "Incorrect password!",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            admin: user.admin,
            name: user.name
        }

        const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: '1d' })

        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // secure flag set to true in production
        }

        return res.cookie('token', token, cookieOption).status(200).json({
            message: "Successful login!",
            success: true,
            data: user,
            token: token
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong: " + err.message,
            error: true
        })
    }
}

module.exports = login
