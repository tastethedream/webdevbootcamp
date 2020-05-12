const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express ();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
   
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us18.api.mailchimp.com/3.0/lists/52e95ce58b';

    const options = {
        method: "POST",
        auth: "dawnr:bff9ac5b7bfbe0e229d722be95076efe-us18"
    }
    const request = https.request(url, options, function(response){

       if  (response.statusCode === 200) {
            res.sendFile (__dirname + "/success.html");
        } else {
            res.sendFile (__dirname + "/faliure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

//post request for faliure route

app.post("/faliure", function(req, res){
    res.redirect("/");

});












const port = process.env.PORT || 8080;


app.listen(port, function(){
    console.log (`Server is running on port ${port}`);

});

//api key
// bff9ac5b7bfbe0e229d722be95076efe-us18
//list id
// 52e95ce58b