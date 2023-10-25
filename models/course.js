const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

   cname:{
    type:String,
    required : true,
   },

 },{timestamps:true})

 const coursemodel= mongoose.model('course',courseSchema)

 module.exports=coursemodel;