const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userCourseDetailsbyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "Token is missing",
        error: true,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);

    const userCourses = await courseModel.find({ user: user.id });

    return res.json({userCourses});
  } catch (err) {
    console.error("Error fetch", err.message);
    res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};

module.exports = userCourseDetailsbyToken;
