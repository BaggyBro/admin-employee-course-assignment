const courseModel = require("../models/courseModel")

const userCourseDetails = async(req,res) =>{
    try{
        const userCourseDetails = await courseModel.find()

        res.json({userCourseDetails})
    }catch(err){
        console.error("Error fetch", err.message)
        res.status(500).json({
            message: err.message || err,
            error:  true
        })
    }
}

module.exports = userCourseDetails