const jwt = require('jsonwebtoken')
const studentmodel = require('../models/Student')

const checkauth = async (req, res, next) => {
    // console.log('Hello Middlewear')
    //token get
    const { token } = req.cookies // here token is a variable with the help of req.cookies we can get token  
    if (!token) {                   
        res.redirect('/')
    } else {
        const verifytoken = jwt.verify(token, 'nirmal@123')
        //for user data show
        const data = await studentmodel.findOne({ _id: verifytoken.ID })
        console.log(data)
        req.data1 = data
        // console.log(verifytoken) 
     
    }
    next()
}
module.exports = checkauth