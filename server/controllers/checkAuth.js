
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found', error: true });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: true });
  }
};

module.exports = checkAuth ;
