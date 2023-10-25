const mongoose=require('mongoose')
const Db_liveurl='mongodb+srv://nirmalparihar06:Nirmal2000@cluster0.o19krfd.mongodb.net/grievanceportal?retryWrites=true&w=majority'
const local_url='mongodb://127.0.0.1:27017/grievanceportal'


const connectdb=()=>{
    return mongoose.connect(Db_liveurl)
    .then(()=>{
        console.log('connection sucessfully')
    }).catch(()=>{
        console.log(error)
    })
}
module.exports=connectdb
