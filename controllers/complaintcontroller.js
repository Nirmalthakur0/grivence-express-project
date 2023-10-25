const complaintmodel = require('../models/complaint')
const cloudinary = require('cloudinary').v2;
const nodemailer=require('nodemailer')

cloudinary.config({
    cloud_name: 'dmjrtw2ka',
    api_key: '313746345967124',
    api_secret: 'Qk58gPydAixIM4FipNuVNeajMpE'
});


class complaintcontroller {

    static addcomplaint = async(req,res)=>{
        try{
            const{name, email, role, image,id}=req.data1
            const cdata = await complaintmodel.find({user_id:id})
            res.render('admin/complaint/addcomplaint',{ c:cdata,n:name, role:role,img:image })
        }catch(error){
            console.log(error)
        }
    }
    static insertcomplaint = async (req, res) => {
        try {
            const { name, email, role, image, id } = req.data1
            // console.log(req.body)
            // console.log(req.files.image)
            const { ctype, semester, subject, cdetail, user_id } = req.body
            const complaint = await complaintmodel.findById(id)
            // console.log(id)
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Complaint Image'
            })
            const result = new complaintmodel({
                name: name,
                email: email,
                ctype: ctype,
                cdetail: cdetail,
                semester: semester,
                subject: subject,
              user_id:id,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                }
            })
            await result.save()
            this.sendEmail(name,email,ctype)
            res.redirect('/addcomplaint')
        } catch (error) {
            console.log(error)
        }
    }

    static viewcomplaint = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            // console.log(req.params.id)
            const cdata = await complaintmodel.findById(req.params.id)
            // console.log(data)
            res.render('admin/complaint/viewcomplaint', { c: cdata, n: name, role: role, image: image,e:email })
        } catch (error) {
            console.log(error)
        }
    }   
    
    static editcomplaint = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            // console.log(req.params.id)
            const cdata = await complaintmodel.findById(req.params.id)
            // console.log(data)
            res.render('admin/complaint/edit', { c: cdata, n: name, role: role, img: image })
        } catch (error) {
            console.log(error)
        }
    }
    
    static deletecomplaint = async (req, res) => {
        try {
            const { name, email, } = req.data1
            // console.log(req.params.id)
            const cdata = await complaintmodel.findByIdAndDelete(req.params.id)
            // console.log(data)
            res.redirect('/addcomplaint')
        } catch (error) {
            console.log(error)
        }
    }
    static updatestatus = async (req,res) =>{
        try {
          const {name, email, comment, status} = req.body
          // console.log(req.body)
          await complaintmodel.findByIdAndUpdate(req.params.id,{
            comment:comment,
            status:status
          })
        //   this.sendEmail(name,email,comment,email)
          res.redirect('/admin/displaycomplaint')
        } catch (error) {
          console.log(error)
        }
      }

      static sendEmail = async(name, email)=> {
        //console.log("email sending")
        //console.log("propertyName")
        //console.log(name,email)

        //connect with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "ranuparihar24@gmail.com",
                pass: "ytwhlazhtlcaqzax",
            },
        });
        let info = await transporter.sendMail({
            from:"test@gmail.com", //sender address
            to: email, //list of receivers
            subject: "Create Property Registration Succesfully", //Subject line
            text: "hello", //plain text body
            html: `<b>${name}</b> Property registration is successfull!`, // html body
        });
        // console.log("Message sent: %s", info.messageId);
    }

    
   
    
      
    
    
    
}

module.exports = complaintcontroller;