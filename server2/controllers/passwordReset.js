
const transporter = require("../config/nodemailer")
const User = require("../models/User")
const crypto = require('crypto')


const forgotPass =async(req,res) => {
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "User not found!"
        })
    }

    const token = crypto.randomBytes(20).toString('hex')
    user.resetPassToken = token
    await user.save()

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset",
        text: `Click the following link to reset your password: `
    }

    transporter.sendMail(mailOptions, (err) => {
        if(err){
            return res.status(500).json({
                message: "Failed to send email" + err
            })
        }

        res.status(200).json({
            message: "Password reset email sent!"
        })
    })


}

module.exports = forgotPass