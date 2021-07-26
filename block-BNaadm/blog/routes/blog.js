var express = require("express")
var router = express.Router()
var Article  = require("../models/article")
var Comment = require("../models/comment")


router.get("/" , (req,res,next)=> {
    Article.find({} , (err,articles)=> {
     if(err) return next(err)
     res.render("articles.ejs" ,  {articles:articles})
    })
})


// create article form
router.get("/new" , (req,res)=> {
    res.render("addArticle.ejs")
})


/*router.get("/:id" , (req,res,next)=> {
    var id =req.params.id
    //handle here
    
    Article.findById(id , (err,article)=> {
        
        if(err) return next(err)
        res.render("articleDetails.ejs" , {article:article})
    })
})*/


router.get("/:id" , (req,res,next)=> {
    var id =req.params.id
    Article.findById(id).populate("comments").exec((err ,article)=> {
        console.log(err,article)
        if(err) return next(err)
        res.render("articleDetails.ejs" , {article:article})
    })
})




router.post("/" , (req,res,next)=> {
    req.body.tags =req.body.tags.trim().split(" ")
   
   Article.create(req.body , (err , createdArticle)=> {
    console.log(req.body)
       if(err) return next(err)
       res.redirect("/articles")
   })
})


//Edit article form

router.get("/:id/edit" , (req,res,next)=> {
    var id =req.params.id
    
    Article.findById(id , (err,article)=> {
        article.tags =article.tags.join(" ")
        
        if(err) return next(err)
        res.render("editArticleForm.ejs", {article:article}) 
    })
})


//save updated data
router.post("/:id" , (req,res,next)=> {
    var id = req.params.id
    req.body.tags =req.body.tags.split(" ")
    Article.findByIdAndUpdate(id,req.body,(err,updatedArticle)=> {
        
        if(err) return next(err)
        res.redirect("/articles/"+id)
    })
})


//delete article
router.get("/:id/delete" , (req,res,next)=> {
    var id =req.params.id
    Article.findByIdAndDelete(id, (err,article)=> {
        if(err) return next(err)
        res.redirect("/articles")
    })
})

//increment likes
router.get("/:id/likes" , (req,res,next)=> {
    var id =req.params.id
    Article.findByIdAndUpdate(id , {$inc:{likes:1}} , (err,article)=> {
        if(err) return next(err)
        res.redirect("/articles/"+id)
    })

})

//decrement likes
router.get("/:id/dislikes" , (req,res,next)=> {
    var id =req.params.id
    Article.findByIdAndUpdate(id , {$inc:{likes:-1}} , (err ,article)=> {
        if(err) return next(err)
        res.redirect("/articles/"+id)
    })
})


//create comments
router.post("/:id/comments" ,(req,res,next)=> {
    var id = req.params.id
    req.body.articleId  = id
    Comment.create(req.body , (err , comment)=> {
        if(err) return next(err)
        console.log(err,comment)
        //update book with comment id into comments section
        Article.findByIdAndUpdate(id , {$push:{comments:comment._id}} , (err ,updatedArticle)=> {
            console.log(err,updatedArticle)
            if(err) return next(err)
            
            res.redirect("/articles/"+id)

        })

        
    })
} )

module.exports=router
