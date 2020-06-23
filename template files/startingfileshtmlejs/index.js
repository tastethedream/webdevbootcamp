//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const path = require ('path');

const app = express();

const pathPublicDirectory = path.join(__dirname, './public');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(pathPublicDirectory));


app.get("/", function(req, res){
  // 
  res.render ('index');
});

app.listen(8080, function(){
  console.log("Server started on port 8080.");
});
