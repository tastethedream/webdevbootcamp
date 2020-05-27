const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",  {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

//making the API RESTful GET

//chained route handlers using express
//GET route to fetch all of the articles
//GET route to fetch all of the articles
//POST route to post a new article
//DELETE route to delete all the articles



app.route("/articles")

.get(function(req, res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
      } else {
            res.send(err);
        }
    });    
}) 

.post(function(req, res){

const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
});

newArticle.save(function(err){
    if (!err){
        res.send("Successfully added a new article");
    } else {
        res.send(err);
    }
 });
})

.delete(function(req, res){
    Article.deleteMany(function(err){
        if (!err){
            res.send("Successfully deleted articles");
        } else {
            res.send(err);
        }
    });
});
//chained route handlers using express
//GET route to fetch a specific article

app.route("/articles/:articleTitle")

.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
                res.send(foundArticle);
        } else {
            res.send("There were no articles matching your title");
        }
    });
})
// PUT request to update a specific article

.put(function(req, res){
    Article.findOneAndUpdate(
     
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {returnOriginal: false},
        function(err){
            if (!err){
                res.send("Succesfully updated article");
               
            }    
            
        }
    );
})
//PATCH a specific article

.patch(function(req, res){
    Article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {$set: req.body},
        {returnOriginal: false},
        function(err){
            if(!err){
                res.send("Successfully updated the article")
            } else{
                res.send(err);
            }
        }
    );
})

.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
        if (!err){
            res.send("Successfully deleted article");
        } else {
            res.send(err);
        }
    });
});





app.listen(8080, function(){
    console.log("server is listening on port 8080");
});