const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const request=require("request");
const https=require("https");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-niharika:test123@cluster0.0f7ty.mongodb.net/todolistDB",{useNewUrlParser:true});

const postSchema = {
  title: String,
  content: String
};

const userSchema = {
  fname: String,
  lname:String,
  email: String,
  phone:String,
  address:String,
  design:String

};

const Post = mongoose.model("Post", postSchema);

const User = mongoose.model("User", userSchema);


app.get("/",function(req,res){
    res.render("splash");
});
app.get("/home",function(req,res){
    res.render("home");
});
app.get("/about",function(req,res){
    res.render("about");
});
app.get("/contact",function(req,res){
    res.render("contact");
});



app.post("/contact", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/home");
    }
  });
});
app.get("/book",function(req,res){
    res.render("book");
});

app.post("/book", function(req, res){
  const user = new User({
    fname: req.body.firstname,
    lname: req.body.lastname,
      email: req.body.emailadd,
      phone: req.body.pno,
    address: req.body.addr,
      design: req.body.design
    });
      const  firstName=req.body.fname;
  const  lastName=req.body.lname;
  const  email=req.body.emailadd;

   const data={
     members:[
       {
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName
         }
       }
     ]
   };
   const jsonData=JSON.stringify(data);

  const url="PRIVATE_API";

  const options={
    method:"POST",
    auth: "PRIVATE_KEY"
  }

const request= https.request(url,options,function(response){

  if(response.statusCode=== 200){
    res.sendFile(__dirname+"/views/success.ejs");
  }else{
      res.sendFile(__dirname+"/views/failure.ejs");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();



  user.save(function(err){
    if (!err){
res.redirect("/success");
    }
  });
});

app.get("/success",function(req,res){
  res.render("success");

});
app.get("/failure",function(req,res){
  res.render("failure");

});


app.get("/portfolio",function(req,res){
    res.render("portfolio");
});

app.get("/additionals",function(req,res){
    res.render("additionals");
});
app.get("/bathrooms",function(req,res){
    res.render("bathrooms");
});
app.get("/bedrooms",function(req,res){
    res.render("bedrooms");
});
app.get("/kitchen",function(req,res){
    res.render("kitchen");
});
app.get("/exteriors",function(req,res){
    res.render("exteriors");
});
app.get("/livingroom",function(req,res){
    res.render("livingroom");
});

app.post("/failure",function(req,res){
  res.redirect("book");
});
app.post("/success",function(req,res){
  res.redirect("/home");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
