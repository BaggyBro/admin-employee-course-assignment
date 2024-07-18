const jwt = require("jsonwebtoken");
const bc = require('bcryptjs');
const userModel = require("../models/userModel");

const getUserDetailfromToken = async (token) => {
    if (!token) {
      return {
        message: "Token does not exist",
        logout: true
      };
    }

    const decode = await jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decode.id).select('-password');
    return user;
}

module.exports = getUserDetailfromToken