const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

   password:{
    type:String,
    required:true
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
course:{
   type:String
},

 role: {
    type: String,
    default: 'student',
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

const Adminmodel=mongoose.model('admin',AdminSchema)
module.exports=Adminmodel