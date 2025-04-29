const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const User=require('../models/Users');
console.log(User.name);
router.post('/createuser',[
    body('name').isLength({min:5,max:16}).withMessage('Name should be between 5 and 16 characters'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/).withMessage("Password should be atleast 8 charcaters long"), 
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"User with this email already exists"});
        }
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }).then(user=>res.json(user)).catch((err)=>res.status(500).json({error:err.message}));
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports=router;