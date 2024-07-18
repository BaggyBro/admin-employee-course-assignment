const User = require('../models/userModel');

const getUserIdByName = async (name) => {
  try {
    const user = await User.findOne({ name }).select('_id');

    if (!user) {
      return { error: true, message: "User not found!" };
    }

    return user._id;
  } catch (err) {
    return { error: true, message: err.message || "Something went wrong" };
  }
};

module.exports = { getUserIdByName };
