var express = require("express")
var mongoose =require("mongoose")
var path = require("path")
var logger = require("morgan")

mongoose.connect("mongodb://localhost/blog" , {useNewUrlParser:true , useUnifiedTopology:true} , (err)=> {
    console.log(err ? err: "connect to database")
})


var app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//setup view engine
app.set("view engine" , "ejs" )
app.set("views" , path.join(__dirname , "views"))

//routing middleware
app.use("/articles" , require("./routes/blog"))
app.use("/comments" , require("./routes/comment"))

//Error handler
app.use((req,res,next)=> {
    res.send("Page not found")
})

app.use((err,req,res,next)=> {
    res.send(err)
})

//listen
app.listen(4000,()=>{
    console.log("server is listening to port 4000")
})