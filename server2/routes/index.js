const express = require('express')
const createUser = require('../controllers/createUser')
const loginUser = require('../controllers/loginUser')
const forgotPass = require('../controllers/passwordReset')

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)

router.post('/forgotpass',forgotPass)

module.exports = router