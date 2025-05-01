const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config({path:'../env.local'});
let fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
        const string=jwt.verify(token,process.env.JWT_SECRET);
        req.user=string.user;
        next();
    }
    catch(err){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    
}
module.exports=fetchuser;