const studentmodel = require('../../models/Student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const coursemodel=require('../../models/course')

cloudinary.config({
    cloud_name: 'dmjrtw2ka',
    api_key: '313746345967124',
    api_secret: 'Qk58gPydAixIM4FipNuVNeajMpE'
});


class StudentController {
    static addstudent = async (req, res) => {
        try {
            const { name, role,image } = req.data1
            const data = await studentmodel.find().sort({ _id: -1 })
            const course = await coursemodel.find()
            // console.log(data)

            res.render('admin/student/addstudent', { n: name, d: data, role: role , c:course , msg:req.flash('error'),msg1 : req.flash('success'),img:image })

        } catch (error) {
            console.log(error)
        }
    }

    static insertstudent = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Profile Image'
            })
            // console.log(image_upload)
            const { name, email, password,course,image} = req.body
            const student=await studentmodel.findOne({email:email})
            if (student) {
                req.flash('error', 'email is already exits')
                res.redirect('/admin/addstudent')            
            } else {
                if (name && email && password && course) {
                    const hashpassword = await bcrypt.hash(password, 10)
                    // console.log(req.body)
                    const result = new studentmodel({
                        name: name,
                        email: email,
                        password: hashpassword,
                        course:course,
                        image: {
                            public_id: image_upload.public_id,
                            url: image_upload.secure_url,
                        }
        
                    })
                    req.flash('success', 'addstudent successfully')
                    await result.save()
                    res.redirect('/admin/addstudent')
        
                }  else{

                }
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    static viewstudent = async (req, res) => {
        try {
            // console.log(req.param.id)
            const { name, role,image } = req.data1
            const data = await studentmodel.findById(req.params.id)
            // console.log(data)
            res.render('admin/student/view', { d: data, n: name, role: role,img:image })
        } catch (error) {
            console.log(error)

        }
    }

    //edit student

    static editstudent = async (req, res) => {
        try {
            // console.log(req.params.id)
            const { name, role, email, password,image } = req.data1
            const data = await studentmodel.findById(req.params.id)
            //    console.log(data)
            res.render('admin/student/edit', { d: data, n: name, role: role, email: email, password: password ,img:image})
        } catch (error) {

            console.log(error)

        }
    }

    //update student 

    static updatestudent = async (req, res) => {

        const { name, email, password, } = req.body
        const hashpassword = await bcrypt.hash(password, 10)

        // image delete code
        try {

            // console.log(req.files.image)
            if (req.files) {
                const student = await studentmodel.findByIdAndUpdate(req.params.id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                // update image
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Profile Image'
                })
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }

                }
            } else {
                var data = {
                    name: name,
                    email: email,
                    password: password,
                }
            }
            // console.log(req.params.id)
            const id = (req.params.id)
            const update = await studentmodel.findByIdAndUpdate(id, data)
            req.flash('success', 'update successfully')
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }

    // delete data
    static studentdelete = async (req, res) => {
        try {

            await studentmodel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }



    // login student
    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await studentmodel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const ismatched = await bcrypt.compare(password, user.password)
                    // const ismatched=true
                    if (ismatched) {
                        if (user.role == 'admin') {
                            // Genrate token for login security
                            const token = jwt.sign({ ID: user._id }, 'nirmal@123')
                            // console.log(token) 
                            //token store in cookie
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        }
                        if (user.role == 'student') {
                            // Genrate token for login security
                            const token = jwt.sign({ ID: user._id }, 'nirmal@123')
                            // console.log(token) 
                            //token store in cookie
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        }

                    } else {
                        req.flash('error','email and password is incorrect')
                        res.redirect('/student')
                    }
                } else {
                    req.flash('error','user not registerd ')
                    res.redirect('/student')
                }
            } else {
                req.flash('error','email and password required')
                res.redirect('/student')
            }
        } catch (error) {
            console.log(error)
        }
    }





    // change password
    static passwordchange = async (req, res) => {
        try {
            // for name on dash
            const { name, role,image } = req.data1
            res.render('admin/student/changepassword', { n: name, msg: req.flash('error'), msg1: req.flash('success'), role: role ,img:image})
        } catch (error) {
            console.log(error)
        }
    }

     //update password
     static updatepassword = async (req, res) => {
        try {
            // console.log('password change')
            const { name, email, id } = req.data1
            const { oldpassword, newpassword, cpassword } = req.body

            //for password check
            if (oldpassword && newpassword && cpassword) {
                const user = await studentmodel.findById(id)
                const ismatched = await bcrypt.compare(oldpassword, user.password)
                if (!ismatched) {
                    req.flash('error', 'old password is incorrect')
                    res.redirect('/changepassword')
                } else {
                    if (newpassword != cpassword) {
                        req.flash('error', 'new password and cpassword does not match')
                        res.redirect('/changepassword')
                    } else {
                        const newhashpassword = await bcrypt.hash(newpassword, 10)
                        const result = await studentsmodel.findByIdAndUpdate(id, {
                            password: newhashpassword,
                        })
                        req.flash('success', 'password update successfully')
                        res.redirect('/changepassword')
                    }
                }
            } else {
                req.flash('error', 'All Fields Are Required')
                res.redirect('/changepassword')
            }

        } catch (error) {
            console.log(error)
        }
    }


    static updateprofile = async (req, res) => {
        try {
            const { name, email, phone,city, address,role, image } = req.data1
            res.render('admin/student/updateprofile', { n: name, e: email, p: phone, c: city, a: address, role: role, img: image, })
        } catch (error) {
            console.log(error)
        }
    }

    static profileupdate = async (req, res) => {
        try {
            //for name on Dash
            const { name, email, id,phone,address,city } = req.data1;
               //   console.log(req.body)
            if (req.files) {
                const student = await studentmodel.findById(id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                // update image
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Profile Image'
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    address: req.body.address,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }

            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    address: req.body.address,
                }
            }
            const update = await studentmodel.findByIdAndUpdate(id, data)
            res.redirect('/updateprofile')

        } catch (error) {
            console.log(error)
        }

    }




    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = StudentController;