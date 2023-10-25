class TeacherController{
    
    static displayTeacher=async(req,res)=>{
        try {

            res.send('hello displayteacher')
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=TeacherController