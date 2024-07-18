const userModel = require("../models/userModel")
const bc = require('bcryptjs')

const register = async(req,res) =>{
    try{
        const {name, email, password, designation, department, admin} = req.body

        const checkEmail = await userModel.findOne({email})

        if(checkEmail){
            return res.status(400).json({
                message: "User already exists!",
                error: true
            })
        }

        const salt = await bc.genSalt(10)
        const hashedPass = await bc.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashedPass,
            designation,
            department,
            admin
        }

        const user = new userModel(payload)
        const userSave = await user.save()

        return res.status(200).json({
            message: "User created successfully!",
            data : userSave,
            success: true
        })

    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

module.exports = register