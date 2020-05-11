//require node express
const express = require("express");
//require that native node https module
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   

});

app.post("/", function(req, res){
  
    const query = req.body.cityName;

const apiKey = "eb2242ce2659ffaa57f92d915eadebe5";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units="+ units;
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write ("<p>The weather is currently " + description + "<P>");
        res.write("<h1>the temperature in " + query + " is " + temp + " degrees Celcius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send()
  });

});

});

//add event listener
app.listen(8080, function(){
    console.log("Server is running on port 8080.");

});
