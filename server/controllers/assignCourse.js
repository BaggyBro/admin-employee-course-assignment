const jwt = require("jsonwebtoken");
const getUserDetailfromToken = require("../helpers/getUserDetailfromToken");
const { getUserIdByName } = require("../helpers/getUserIdbyName");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

const assignCourse = async (req, res) => {
  try {
    const {
      title,
      desc,
      link,
      competency,
      type,
      category,
      status,
      duration,
      dueDate,
      completeDate,
      userName,
      comments
    } = req.body;

   const token = req.headers.authorization?.split(' ')[1];
   if(!token){
    res.status(401).json({
      message: "Token is missing",
      error: true
    })
   }
   const decoded = jwt.verify(token,process.env.JWT_KEY);
   const admin = await userModel.findById(decoded.id)

    const checkForSameCourse = await courseModel.findOne({ link });

    if (checkForSameCourse) {
      return res.status(400).json({
        message: "Course already assigned!",
        error: true
      });
    }

    const userid = await getUserIdByName(userName)

    const actualDueDate = dueDate.substring(0,10)

    const payload = {
      title,
      desc,
      link,
      competency,
      type,
      category,
      status: "Not Started",
      duration,
      dueDate: actualDueDate,
      completeDate,
      user: userid,
      userName,
      assignedBy: admin._id,
      assignedByName: admin.name,
      comments
    };

    const course = new courseModel(payload);
    const courseSave = await course.save();

    return res.status(200).json({
      message: "Course added successfully!",
      data: courseSave,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true
    });
  }
};

module.exports = assignCourse;
