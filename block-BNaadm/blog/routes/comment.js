var express = require("express")
var router = express.Router()
var Article  = require("../models/article")
var Comment = require("../models/comment")


router.get("/:id/edit" , (req,res,next)=> {
    var id =req.params.id
    Comment.findById(id,(err,comment)=> {
        if(err) return next(err)
        res.render("updateComment.ejs" , {comment:comment})
    })
})


router.post("/:id" , (req,res , next)=> {
    var id =req.params.id
    Comment.findByIdAndUpdate(id ,req.body ,(err, updatedcomment)=> {
        if(err) return next(err)
     res.redirect("/articles/"+updatedcomment.articleId)
    })
})


router.get("/:id/delete" ,(req,res,next)=> {
    var id =req.params.id
    Comment.findByIdAndDelete(id ,(err,comment)=> {
        if(err) return next(err)
        Article.findByIdAndUpdate(comment.articleId , {$pull:{comments:comment._id}} , (err,comment)=> {
            res.redirect("/articles/"+comment.articleId)
        })  
        
    })
})


module.exports=router