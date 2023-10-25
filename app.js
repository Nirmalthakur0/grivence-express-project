const express=require('express')
//console.log(express)
const app=express()
const port=3000
const web=require('./routes/web')
const connectdb=require('./db/connectdb')

//view engine ejs
app.set('view engine','ejs')

//css and image link 
app.use(express.static('public'))

//db connection
connectdb()

//data getting
app.use(express.urlencoded({extended:true}))

// flash
const session = require('express-session')
const flash = require('connect-flash');
const fileUpload = require("express-fileupload");

// For msg show use 
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

// for file upload
app.use(fileUpload({useTempFiles: true}));


//message show

app.use(flash());

//cookie

const cookieparser = require('cookie-parser');
app.use(cookieparser());


//routing load
app.use('/',web)


//server create
app.listen(port, () => {
    console.log(`server is running ${port}`)
  })