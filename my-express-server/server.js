const express  = require('express');

const app = express();

app.get("/", function(request, response){

    response.send("Hello");
});
app.get("/contact", function(req, res){
    res.send ("Contact me at:tastethedream.com");

});

app.get("/about", function(req, res){
    res.send ("My name is Dawn and I am learning to build web sites");

});

app.get ("/socials", function (req, res){
    res.send ("follow me on Facebook, Insta and Twitter");
});

app.listen(3000, function(){
console.log("Server started on port 3000");

});