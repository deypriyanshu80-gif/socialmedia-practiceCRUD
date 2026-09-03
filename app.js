const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const User=require("./models/User.js");
const Post=require("./models/Post.js");
const isAdmin=require("./middleware.js");
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
app.get("/posts",async(req,res)=>{
    try{
    let posts=await Post.find({});
    res.json(posts);
    }catch(err)
    {
        console.log("error loading in the posts",err);
        res.status(500).json({message:"failed loading in the posts"});
    }
})
//not using new route
//show route
app.get("/posts/:id",async(req,res)=>{
    try{const user=await Post.findById(req.params.id).populate();
    if(!user)
    {
        console.log("user does not exist");
        res.status(404).json({message:"user notfound"});
    }
    res.json(post);
}catch(err){
    console.log("error found while showing post",err);
    res.status(500).json({message:"failed in showing post"});
}
})
//create route
app.post("/posts",isAdmin,async(req,res)=>{
    try{
    const newPost=new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
    }catch(err){
          console.log("error creating new post");
        res.status(400).json({message:"problem in making the new post"});
        
    }
})//edit post is not needed
//UPDATE route
app.put("/posts/:id",isAdmin,async(req,res)=>{
    try{
    const updatepost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatepost);
    }
    catch(err){
         console.log("error updating post");
        res.status(400).json({message:"problem in updating the  post"});
    }
})
//delete route
app.delete("/posts/:id",isAdmin,async(req,res)=>{
    try{
    const deletedpost=await Post.findByIdAndDelete(req.params.id);
    res.json(deletedpost);
    }
    catch(err){
         console.log("error deleting post");
        res.status(400).json({message:"problem in deleting the  post"});
    }
})




app.listen(3000,()=>{
    console.log("server listening");
})