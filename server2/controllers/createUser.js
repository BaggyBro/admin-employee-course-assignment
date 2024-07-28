const User = require("../models/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      designation,
      department,
      employee,
      manager,
      admin,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPass,
      designation,
      department,
      employee,
      manager,
      admin
    });

    res.status(200).json({
      message: "User created!",
      data: user
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({
      message: "Error while creating user: " + error.message
    });
  }
};

module.exports = createUser;
