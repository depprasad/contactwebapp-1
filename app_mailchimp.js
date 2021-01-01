//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));

const request = require("request");


app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/mailchimp.html");
})

app.post("/",function(req,res){

  var firstName = req.body.fName;
  var lastName  = req.body.lName;
  var eMail = req.body.eMail;

  console.log (firstName, lastName, eMail)


})
app.listen(process.env.PORT||3030, function (req,res){
  console.log("Server is up and running on port 3030");

})

// mailchimp list ID : ce3287388e
// API Key for Mail Chimp : ca7a3d85fbb15553bfe873969e49e123-us7
