const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true
   },

   password: {
      type: String,
      required: true
   },

   phone: {
      type: String,
      
      
   },
   city: {
      type: String,
     
   },
   address: {
      type: String,
     
      
   },

   role: {
      type: String,
      default: 'student',
   },

   course:{
      type:String,
   },

   image: {
      public_id: {
         type: String,
      },
      url: {
         type: String
      }
   },



})


const studentmodel = mongoose.model('student', StudentSchema)
module.exports = studentmodel;