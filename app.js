const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");

var items = [];
app.get("/", function(req, res){

    var today  = new Date();
 
    var options = {
        weekday : "long",
        day :"numeric",
        month:"long"
    
    };

    var day= today.toLocaleDateString('en-US', options);

      res.render("list", {day:day, work:items})

});

app.post("/", function(req, res){
  var item = req.body.text1;
  items.push(item);
  console.log(items)
  res.redirect("/");
})


app.listen(3000, function(){
    console.log("server started on port 3000 bitch!")
})