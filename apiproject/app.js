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
//GET route to fetch all of the articles

app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });    
});

//POST route to post a new article

app.post("/articles", function(req, res){
    console.log();
    console.log();

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

});













app.listen(8080, function(){
    console.log("server is listening on port 8080");
});