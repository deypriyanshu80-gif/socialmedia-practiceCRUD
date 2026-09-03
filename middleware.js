const isAdmin=(req,res,next)=>{
    if(req.headers.role=="admin")
    {
        next();
    }
    else{
        res.status(403).json({message:"access denied"});
    }
}
module.exports=isAdmin;
