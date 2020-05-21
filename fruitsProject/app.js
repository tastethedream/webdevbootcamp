// require mongoose

const mongoose = require("mongoose");

//connect mongoose

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });


//schema for fruit
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "no name specified, plase check your entry!"]
  },
  rating: {
    type: Number,
      
    min:1,
    max: 10
  },
  review: String

});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 5,
  review: "nice"

});

//fruit.save();

//schema for people

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "pineapple",
  score: 9,
  review: "perfect"

});
//pineapple.save();

const grapes = new Fruit({
  name: "grapes",
  score: 8,
  review: "not wine but close enough!"

});
grapes.save();

const person = new Person({
  name:"John",
  age: 52,
  favouriteFruit: grapes
});

person.save();

// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 10,
//   review: "king of fruits"

// });
// const orange = new Fruit({
//   name: "orange",
//   rating: 5,
//   review: "sour"

// });
// const banana = new Fruit({
//   name: "banana",
//   rating: 9,
//   review: "awesome"

// });

// Fruit.insertMany([kiwi, orange,banana], function(err){
//   if (err){
//     console.log (err);
//   } else {
//     console.log("successfully saved to fruitsDB");
//   }

// });

Fruit.find(function (err, fruits){
 if (err){
  console.log(err);
 } else {

  //closing the database after running the query

mongoose.connection.close();
 }
 });
  
// fruits.forEach(function(fruit){
//   console.log(fruit.name);
// });
// }
// });
//deleting one record
// Fruit.deleteOne({name: "apple"}, function(err){
//   if (err){
//     console.log (err);
//   } else {
//     console.log("entry successfully deleted!");
//   }
  

// Person.deleteMany({name: "John"}, function(err){
//   if (err){
//     console.log (err);
//   } else {
//     console.log ("records deleted successfully!");
//   }
// });