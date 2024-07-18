const express = require('express')
const register = require('../controllers/register')
const assignCourse = require('../controllers/assignCourse')
const login = require('../controllers/login')
const logout = require('../controllers/logout')
const updateUserDetails = require('../controllers/updateUserDetails')
const deleteUser = require('../controllers/deleteUser')
const checkAuth = require('../controllers/checkAuth')
const allEmployees = require('../controllers/allEmployees')
const userCourseDetails = require('../controllers/userCourseDetails')
const userCourseDetailsbyToken = require('../controllers/userCourseDetailsbyToken')
const updateStatus = require('../controllers/updateStatus')
const router = express.Router()


//create user api
router.post('/register',register)
//login user api
router.post('/login',login)
//logout user api
router.get('/logout',logout)
//update user details
router.post('/updateuser',updateUserDetails)
//delete user
router.post('/deleteuser',deleteUser)
//token authentication
router.get('/checkauth',checkAuth)
//fetch all employee 
router.get('/allemployees',allEmployees)
//fetch user course details
router.get('/usercoursedetails',userCourseDetails)
//
router.get('/usercoursedetailsbytoken',userCourseDetailsbyToken)
//assign course to employee
router.post('/assigncourse',assignCourse)
//
router.post('/updateuserstatus', updateStatus)

module.exports = router