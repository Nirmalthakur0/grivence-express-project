const express = require('express')
const FrontController = require('../controllers/FrontController')
const TeacherController = require('../controllers/TeacherController')
const admincontroller = require('../controllers/admin/admincontroller')
const StudentController = require('../controllers/admin/StudentController')
const coursecontroller=require('../controllers/admin/coursecontroller')
const complaintcontroller =require('../controllers/complaintcontroller')
const route = express.Router()
const checkauth = require('../middlewear/auth')
const studentmodel = require('../models/Student')
const coursemodel = require('../models/course')

// routing
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/adminlogin',FrontController.adminlogin)
route.get('/benifits',FrontController.benifits)
route.get('/features',FrontController.features)
route.get('/grievance',FrontController.grievance)
route.get('/help',FrontController.help)
route.get('/principal',FrontController.principal)
route.get('/student',FrontController.student)

//teachercontroller
route.get('/teacher/display',TeacherController.displayTeacher)
   
//admin controller
route.get('/admin/dashboard',checkauth,admincontroller.dashboard)
route.get('/admin/login',checkauth,admincontroller.login)
route.get('/admin/registration',checkauth,admincontroller.registration)
route.post('/admininsert',checkauth,admincontroller.admininsert)
route.get('/admin/displaycomplaint',checkauth,admincontroller.displaycomplaint)
// route.post('/admin/verifylogin',checkauth,admincontroller.loginverify)



//admin student controller
route.get('/admin/addstudent',checkauth,StudentController.addstudent)
route.post('/insertstudent',checkauth,StudentController.insertstudent)
route.get('/admin/studentview/:id',checkauth,StudentController.viewstudent)
route.get('/admin/studentedit/:id',checkauth,StudentController.editstudent)
route.post('/admin/studentupdate/:id',checkauth,StudentController.updatestudent)
route.get('/admin/studentdelete/:id',StudentController.studentdelete)
route.post('/student/verifylogin',StudentController.verifylogin)
route.get('/changepassword',checkauth,StudentController.passwordchange)
route.get('/updateprofile',checkauth,StudentController.updateprofile)
route.post('/profileupdate',checkauth,StudentController.profileupdate)
route.post('/updatepassword',checkauth,StudentController.updatepassword)
route.get('/logout',StudentController.logout)

// course controller start
route.get('/addcourse',checkauth,coursecontroller.addcourse)
route.post('/insertcourse',checkauth,coursecontroller.insertcourse)
route.get('/admin/viewcourse/:id',checkauth,coursecontroller.viewcourse)
route.get('/admin/editcourse/:id',checkauth,coursecontroller.editcourse)
route.get('/admin/deletecourse/:id',checkauth,coursecontroller.coursedelete)
route.post('/admin/updatecourse/:id',checkauth,coursecontroller.updatecourse)
route.post('/updatestatus/:id',checkauth,complaintcontroller.updatestatus)


// complaint controller start
route.get('/addcomplaint',checkauth,complaintcontroller.addcomplaint)
route.post('/insertcomplaint',checkauth,complaintcontroller.insertcomplaint)
route.get('/admin/viewcomplaint/:id',checkauth,complaintcontroller.viewcomplaint)
route.get('/admin/deletecomplaint/:id',checkauth,complaintcontroller.deletecomplaint)
route.get('/editcomplaint/:id',checkauth,complaintcontroller.editcomplaint)



module.exports = route;
