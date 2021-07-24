var express = require("express")
var router = express.Router()
var Article = require("../models/Articles")

router.get("/" , (req,res)=> {
    //handle here
    Article.find({}, (err,articles)=> {
        if (err) return next(err)
        res.render("articles.ejs" , {articles:articles})
    })
})


// create article form
router.get("/new" , (req,res)=> {
    res.render("addArticle.ejs")
})


//fetch single article
router.get("/:id" , (req,res,next)=> {
    var id =req.params.id
    //handle here
    Article.findById(id , (err,article)=> {
        if(err) return next(err)
        res.render("articleDetails.ejs" , {article:article})
    })
})

// capture created article
router.post("/" , (req,res,next)=> {
    req.body.tags =req.body.tags.trim().split(" ")
    //handle here
    Article.create(req.body , (err , createdArticle)=> {
        if(err) return next(err)
        res.redirect("/articles")
    })
})


// edit article form
router.get("/:id/edit" , (req,res,next)=> {
    var id = req.params.id
    Article.findById(id,(err,article)=> {
        article.tags =article.tags.join(" ")
        if(err) return next(err)
        res.render("editArticleForm.ejs" ,{article:article})
    })
})


//update article
router.post("/:id" , (req,res)=> {
    var id =req.params.id
    req.body.tags =req.body.tags.split(" ")
    //handle here
    Article.findByIdAndUpdate(id , (err ,updatedArticle)=> {
        if(err) return next(err)
        res.redirect("/articles/"+id)
    })
})


//delete article
router.get("/:id/delete" , (req,res,next)=> {
    var id = req.params.id
    Article.findByIdAndDelete(id , (err,article)=> {
        if(err) return next(err)
        res.redirect("/articles")
    })

})


//increment likes
router.get("/:id/likes" , (req,res,next)=> {
    var id =req.params.id
    Article.findByIdAndUpdate(id , {likes:{$inc:1}} , (err ,article)=> {
        if(err) return next(err)
        res.redirect("/articles/"+id)
    })
})



module.exports =router