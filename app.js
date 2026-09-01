const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const User=require("./models/User.js");
const Post=require("./models/Post.js");
const mongo="mongodb://localhost:27017/sm";
mongoose.connect(mongo)
.then(()=>{
    console.log("connected to mongo db");
})
.catch((err)=>{
    console.log("mongo db connection failed");
})
app.use(express.urlencoded({extended:true})); //on submitting this parses the strings and packages to req.body
app.use(methodOverride("method"));//handles put ,delete
app.get("/",(req,res)=>{
    res.send("server works gng");
})
app.listen(3000,()=>{
    console.log("server listening");
})