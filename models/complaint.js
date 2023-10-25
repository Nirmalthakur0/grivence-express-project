const mongoose = require('mongoose')
const complaintSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   ctype: {
      type: String,
      required: true,
   },
   semester: {
      type: String,
      required: true,
   },
   subject: {
      type: String,
      required: true,
   },
   cdetail: {
      type: String,
      required: true,
   },
   user_id: {
      type: String,
      required: true,
   },
   comment: {
      type: String
   },
   image: {
      public_id: {
         type: String,
      },
      url: {
         type: String,
      },
   },
   status: {
      type: String,
      default: 'pending',
   },
}, { timestamps: true })

const complaintmodel = mongoose.model('complaint', complaintSchema)

module.exports = complaintmodel