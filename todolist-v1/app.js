//require express and body parser

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

const items = ["Work out", "Eat Breakfast", "Wash dishes"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.getDate();


//link to list.ejs file

res.render("list",{listTitle: day, newListItems: items});

});
//send user input back 

app.post("/", function(req, res){

  const item = req.body.newItem;

if (req.body.list === "Work"){
  workItems.push(item);
  res.redirect("/work");
} else {
  items.push(item);
  res.redirect("/");
}
 
});

app.get ("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get ("/about", function(req, res){
  res.render("about");
});



app.listen(8080, function(){
  console.log("Server started on port 8080.");
});

