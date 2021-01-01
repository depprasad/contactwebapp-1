//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const client = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));

const request = require("request");


app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eMail = req.body.eMail;
  const phone = req.body.mobile;

  const data = {
    members1: [{
      email_address: eMail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: phone
      }
    }]
  };

  const jsonData = JSON.stringify(data)
  console.log(firstName, lastName, eMail, jsonData)

  client.setConfig({
    apiKey: "ca7a3d85fbb15553bfe873969e49e123-us7",
    server: "us7",
  });

  const run = async () => {
    const response = await client.lists.batchListMembers("ce3287388e", {
      members: [{
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phone }
      }]
    });

    if (response.total_created === 0 ) {
      res.send("<h2 > Oh ! there is an error.....   "+ response.errors[0].error_code+"</h2>");
    } else {
      res.send("Contact name " + "<h2>" + response.new_members[0].merge_fields.FNAME +"</h2> with Email ID - <h2>"+ response.new_members[0].email_address + "</h2> Successfully Created ");
    }

    //
    //

    // console.log(response);
  };

  run();


})


app.listen(process.env.PORT|3000, function (req,res){
  console.log("Server is up and running on port 3000");

})

// mailchimp list ID : ce3287388e
// API Key for Mail Chimp : ca7a3d85fbb15553bfe873969e49e123-us7

// const client = require("mailchimp-marketing");
//

//
