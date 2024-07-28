const User = require("../models/User");
const bc = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if(!user){
        return res.status(404).json({
            message: "User does not exist!"
        })
    }

    const checkPass = await bc.compare(password, user.password)

    if(!checkPass){
        return res.status(400).json({
            message: "Incorrect password!"
        })
    }

    const tokenData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        employee: user.employee,
        manager: user.manager,
        admin: user.admin,
    }

    const token = jwt.sign(tokenData, process.env.JWT_KEY, {expiresIn: '1d'})

    const cookieOption = {
        httpOnly: true,
        secure: false
    }

    return res.cookie('token', token, cookieOption).status(200).json({
        message: "Login successfull",
        token: token
    })


  } catch (error) {
    return res.status(500).json({
        message: "Error while login: "+ error.message
    })
  }
};

module.exports = loginUser
