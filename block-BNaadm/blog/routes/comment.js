var express = require("express")
var router = express.Router()
var Article  = require("../models/article")
var Comment = require("../models/article")


router.get("/:id/edit" , (req,res,next)=> {
    var id =req.params.id
    Comment.findById(id,(err,comment)=> {
        if(err) return next(err)
        res.render("updateComment.ejs" , {comment:comment})
    })
})


module.exports=router