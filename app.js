const express = require("express");
const bodyParser = require("body-parser");
const Date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const _ = require("lodash");
const { raw } = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', "ejs");
mongoose.connect("mongodb+srv://sagar-kash30:sagarkashyap@cluster0.lk9zp.mongodb.net/itemDB", {useNewUrlParser : true});

      const itemSchema = new mongoose.Schema({
        name:String
})

    const Item = mongoose.model("item", itemSchema)
    const item1 = new Item({
      name:"eat"
    })

const item2 = new Item({
  name:"sleep"
})


    const item3 = new Item({        
      name:"repeate"  
})    
 
    const defaultItems =[item1,item3,item2];
    // console.log("sagar isafs ");


const listSchema = new mongoose.Schema({
  name:String,
  items:[itemSchema]
})

const List = mongoose.model("list", listSchema);



app.get("/", function(req, res){
      Item.find({}, function(err, foundData){
        if(foundData.length===0){
          Item.insertMany(defaultItems, function(err){
            console.log("sagar is ");
            if(err){
              console.log(err);
            }else{console.log("array submiyted successfully")};
          });
       res.redirect("/");
        }else{
        res.render("list", {day:"day", work:foundData})
      }
      })
      
});




app.post("/", function(req, res){
 
  
  var item = req.body.text1;
  var Name = req.body.btn;
  console.log(Name);
  const item4 = new Item({
    name:item
  })
 if(Name==="day"){

item4.save();
res.redirect("/")
 }else{

  List.findOne({name:Name}, function(err, foundList){
    console.log("/"+Name);
    foundList.items.push(item4);
    foundList.save();
    res.redirect("/"+Name);
 
  })
 }

   


});


app.post("/delete", function(req, res){
 
  const deleteItem = req.body.checkbox;
  const ListName= req.body.ListName;
  console.log(ListName);

if(ListName==="day"){
  Item.findByIdAndRemove(deleteItem,function(err){
    if(err){
      console.log(err);
    }else{
      console.log("sucessfully deleted");
    }
 })
}else{
  List.findOneAndUpdate({name:ListName},{$pull: {items:{_id: deleteItem }}}, function(err, result){
   
   if(!err){
     res.redirect("/"+ListName);
   } 
  })
}

 res.redirect("/");
});

app.get("/:paramsName", function(req, res){
  console.log("newLocal");
  const newLocal =_.capitalize(req.params.paramsName);

 
   List.findOne({name: newLocal}, function(err, foundList){
     if(!err){
       if(!foundList){
        const newList = new List({
          name:newLocal,
          items:defaultItems
        })
        newList.save();
        res.redirect("/"+newLocal)
       }else{
        res.render("list", {day:newLocal, work:foundList.items})

       }
     }
   })

 
})



app.post("/:paramsName", function(req, res){
 
  // res.send("hello world");
  
  List.findOne({name: newLocal}, function(err, foundList){
    if(!err){
      if(foundList){
        res.render("list", {day:newLocal, work:foundList.items})
      }
    }
  })

});



app.listen(3000, function(){
    console.log("server started on port 3000 bitchdsafds!")
})