const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const tryScehema=new mongoose.Schema({
    name: String
});
const item=mongoose.model("task",tryScehema);

app.get("/",(req,res)=>{
      item.find({},(err,foundItems)=>{
        if(err){
            console.log(err);
        }  
        else{
            res.render("list",{ejes:foundItems});
        }
      }) ;
});
app.post("/",(req,res)=>{
var itemName=(req.body.ele1);
const todo2=new item({
    name :itemName
});
todo2.save();
res.redirect("/");
});
app.post("/delete",(req,res)=>{
    const checked=req.body.checkbox1;
    item.findByIdAndRemove(checked,(err)=>{
        if(!err)
       {res.redirect("/") }
    });
});





app.listen(3000,()=>{
    console.log("server started");
});