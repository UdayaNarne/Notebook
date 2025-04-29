const express=require('express');
const router=express.Router();
const User=require('../models/Users');
console.log(User.name);
router.post('/',(req,res)=>{
    console.log(req.body);
    const user=User(req.body);
    console.log(user);
    user.save();
    res.send("Hello from auth.js");
})

module.exports=router;