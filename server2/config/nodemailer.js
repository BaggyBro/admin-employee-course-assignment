const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host:'spit.ac.in',
    secure: true,
    auth: {
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

console.log(process.env.EMAIL_USER)

module.exports = transporter