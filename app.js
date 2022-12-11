const express = require("express");

const client = require("@mailchimp/mailchimp_marketing"); // you need to add dependency first. See tips.


const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended : true}));
 
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/singup.html");
});
 
client.setConfig({
  apiKey: "b3df97da9d0be375e6f44d40958be144-us12",
  server: "us12",
});
 
app.post("/", function(req, res) {
  const firstName = req.body.FirstName;
  const lastName = req.body.SecondName;
  const email = req.body.Mail;
  console.log(firstName, lastName, email);
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }
 
  const run = async () => {
    try {
      const response = await client.lists.addListMember("171196e35f", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };
 
  run();
});
 
app.post("/failure", function(req, res) {
  res.redirect("/");
});
 






app.listen("3000", (req, res) => {
  console.log("app is running on port 3000")
})













































/*const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express")
 
const md5 = require("md5");

const app = express();

const listId = "171196e35f";



app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

     res.sendFile(__dirname + "/singup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.Firstname
    const lastName = req.body.SecondName
    const email = req.body.Mail
    
    const data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }],};
      
      mailchimp.setConfig({
        apiKey: "b3df97da9d0be375e6f44d40958be144-us12",
        server: "us12",
      });
      
      const subscriberHash = md5(email.toLowerCase());
      async function run() {
        try {
          const response = await mailchimp.lists.getListMember(
            listId,
      subscriberHash
          );
          
           
          

        } catch (e) {
          
           if (e.status === 404) {
            res.sendFile(__dirname+"/failure.html");
    console.error(e);
          }
        }
      }
      
     run()
      
    });
     
    app.post("/failure", function(req, res) {
      res.redirect("/");
    });
      
  

 /*   
    client.setConfig({apiKey: "b3df97da9d0be375e6f44d40958be144-us12",  server: "us12",});
    const subscribingUser = {firstName: firstName, lastName: lastName, email: email}

    const run = async () => {
        const response = await client.lists.addListMember("171196e35f", {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
          }
        });
        console.log(response); // (optional) 
      };
      run();
    console.log(`This user's subscription status is ${response.status}.`);
  */
     
    

    








// API key
// b3df97da9d0be375e6f44d40958be144-us12


// 171196e35f



/*
const jsonData = JSON.stringify(data);

const url = "https://us12.api.mailchimp.com/3.0/lists/171196e35f/members/";

const options = {
  method: "POST",
  auth: "misho1:b3df97da9d0be375e6f44d40958be144-us12"
}


const request = https.request(url, options, function(response){
 response.on("data", function(data){
  console.log(JSON.parse(data));
 })
})

request.write(jsonData);
reque

*/

