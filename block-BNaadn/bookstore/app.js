var express = require("express")
var mongoose = require("mongoose")
var path =require("path")

//connect to databse
mongoose.connect("mongodb://localhost/bookstore" , {useNewUrlParser:true, useUnifiedTopology:true} , (err)=> {
    console.log(err ? err : "connected to databse")
} )

var app = express()

//middlewares to capture data
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//setup view engine
app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "views"))

//routing middlewares

//Error handle
app.use((req,res,next)=> {
    res.send("page not found")
})


app.use((err,req,res,next)=> {
     res.send(err)
})

//listen
app.listen(5000 , ()=> {
    console.log("server listening to port 5k")
})