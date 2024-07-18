const jwt = require("jsonwebtoken");
const bc = require('bcryptjs');
const userModel = require("../models/userModel");
const getUserDetailfromToken = require("../helpers/getUserDetailfromToken");

const updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";



    const user = await getUserDetailfromToken(token);

    if (!user || !user._id) {
      return res.status(400).json({
        message: "Invalid user",
        error: true
      });
    }

    const {
      name,
      email,
      password,
      designation,
      department
    } = req.body;

    const updateFields = { name, email, designation, department };

    if (password) {
      const salt = await bc.genSalt(10);
      updateFields.password = await bc.hash(password, salt);
    }

    const updateUser = await userModel.updateOne({ _id: user._id }, updateFields);

    const userDetailUpdated = await userModel.findById(user._id).select('-password');

    return res.status(200).json({
      message: "Updated details successfully!",
      data: userDetailUpdated,
      success: true
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true
    });
  }
};

module.exports = updateUserDetails;
