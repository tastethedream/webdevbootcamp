//require express and body parser

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Work out", "Eat Breakfast", "Wash dishes"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

// todays date in english format

var today = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};
  
var day = today.toLocaleDateString("en-US",options);

//link to list.ejs file

res.render("list",{kindOfDay: day, newListItems: items});

});
//send user input back and console log

app.post("/", function(req, res){
 var item = req.body.newItem;
 items.push(item);
 
  res.redirect("/");
 

});









app.listen(8080, function(){
  console.log("Server started on port 8080.");
});
