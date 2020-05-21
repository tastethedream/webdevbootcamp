//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// create new mongoDB database for this application

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlparser: true});

//schema

const itemsSchema = {
  name: String
};

//mongoose model

const Item = mongoose.model("Item", itemsSchema);

//add in new items to the DB
const eat = new Item({
  name: "eat"
});

const sleep = new Item({
  name: "sleep"
});

const rave = new Item({
  name: "rave"
});

const repeat = new Item({
  name: "repeat"
});

app.get("/", function(req, res) {

//const day = date.getDate();

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
