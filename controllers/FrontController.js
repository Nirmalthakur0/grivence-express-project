const e = require("express")

class FrontController {

    static home = async (req, res) => {
        try {
            res.render('home')
        } catch (error) {

            console.log(error)

        }
    }


    static about = async(req,res) => {
   try {

    res.render('about')
    
   } catch (error) {

    console.log(error)
    
   }
}

   static benifits = async(req,res) =>{

    try {
        res.render('benifits')
    } catch (error) {
        console.log(error)
        
    }
   }

   static adminlogin = async(req,res) =>{
    try {
        res.render('adminlogin')
    } catch (error) {
        console.log(error)
        
    }
   }

    static features = async (req, res) => {
        try {
            res.render('features')
        } catch (error) {

            console.log(error)

        }
    }

    static grievance = async(req,res)=>{

        try {
            res.render('grievance')
        } catch (error) {

            console.log(error)
            
        }
    }

    static help= async(req,res)=>{

        try {
           
            res.render('help')
            
        } catch (error) {

            console.log(error)
            
        }
    }

    static principal=async(req,res)=>{

        try {
            res.render('principal')
        } catch (error) {
            console.log(error)
        }
    }

    static student= async(req,res)=>{
        try {
            res.render('student',{  msg: req.flash('error'), msg1: req.flash('success'),  })
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = FrontController