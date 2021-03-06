//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require ("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-dawn:<password goes here>@cluster0-5mxtx.mongodb.net/todolistDB", { useNewUrlParser: true });

//schema

const itemsSchema = {
  name: String
};

//mongoose model

const Item = mongoose.model("Item", itemsSchema);

//add in new items to the DB

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<----- click here to delete an item"
});

// put the items in an array

const defaultItems = [item1, item2, item3];

//schema for alternative lists
const listSchema = {
  name:String,
  items:[itemsSchema]
};
//mongoose model for alternative lists
const List = mongoose.model("list", listSchema);
  

app.get("/", function(req, res) {

Item.find({}, function(err, foundItems){
//render the items in the database if the array is empty
if (foundItems.length === 0){
  
  Item.insertMany(defaultItems, function(err){
      if (err){
        console.log (err);
      } else {
        console.log("successfully saved to itemsDB");
      }
    });  
    res.redirect("/");  
} else{
  res.render("list", {listTitle: "Today", newListItems: foundItems});
}
});


});
//dynamic route to enable multiple lists and added lodash to prevent case issues

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize (req.params.customListName);

//to discover if a list searched by thre user exixts or not

  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if(!foundList){
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        
        list.save();
        res.redirect("/" + customListName);
      } else {
     //show the existing list
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });



});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
});
//if using the today list save item to that list and redirect to home page
if (listName === "Today"){
  item.save();
  res.redirect("/");
} else {
  //else find the relevent list and add the new item to that list and save the list then redirect to the route the user came from

  List.findOne({name: listName}, function(err, foundList){
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + listName );
  });
}
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  //if statement to see if the item to be deleted is from home route or one of the other lists and action accordingly

  if(listName === "Today"){
  // deleting the checked off item using its id
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err){
        console.log("successfully deleted checked item");
        res.redirect("/");
      }
    });

  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id:checkedItemId}}},function (err, foundList){
      if(!err){
        res.redirect("/" + listName);
      }
  });

}

});








app.get("/about", function(req, res){
  res.render("about");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
app.listen(port);



app.listen(8080, function() {
  console.log("Server started successfully");

});
