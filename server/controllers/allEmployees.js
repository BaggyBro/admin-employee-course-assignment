const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const allEmployees = async(req,res)=>{
    try{
        const allEmployees = await userModel.find({admin:false})

        res.json({allEmployees})
    }catch(err){
        console.error("Error fetch", err.message)
        res.status(500).json({
            message: err.message || err,
            error:  true
        })
    }
}

module.exports = allEmployees