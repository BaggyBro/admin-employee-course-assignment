const getUserDetailfromToken = require("../helpers/getUserDetailfromToken");
const { getUserIdByName } = require("../helpers/getUserIdbyName");
const userModel = require("../models/userModel");

const deleteUser = async (req, res) => {
  try {
    const { name } = req.body;

    const token = req.cookies.token || "";
    const admin = await getUserDetailfromToken(token);

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
      });
    }

    if (admin.admin === false) {
      return res.status(403).json({
        message: "Only Admins are allowed to do that!",
        error: true,
      });
    }

    const userid = await getUserIdByName(name);
    const user = await userModel.findById(userid).select("-password");

    if (user.admin === true) {
      res.status(500).json({
        message: "Action not allowed!",
        error: true,
      });
    }

    const userDel = await userModel.findByIdAndDelete(userid);

    if (!userDel) {
      return res.status(404).json({
        message: "User not found!",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
    });
  }
};

module.exports = deleteUser