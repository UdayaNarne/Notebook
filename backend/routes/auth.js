const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const User=require('../models/Users');
var bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser');
const dotenv=require('dotenv').config({path:'../.env.local'});
const JWT_SECRET=process.env.JWT_SECRET;
console.log(JWT_SECRET);
//Route 1: Creation of New User
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
        const salt=await bcrypt.genSalt(10);
        const secPass=(await bcrypt.hash(req.body.password,salt));

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });
        const data={
            user:{
                id:user.id,
            }
        }
        const jwtData=jwt.sign(data, JWT_SECRET);
        console.log(jwtData);
        console.log(user);
        res.json({jwtData});
        //return 
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//Route 2: Login User
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/).withMessage("Password should be atleast 8 charcaters long"),
],async(req,res)=>{
    const {email,password}=req.body;
    let user1=await User.findOne({email:email});
    if(!user1){
        res.status(400).json("Incorrect Email provided");
    }
    let passwordCompare=await bcrypt.compare(password,user1.password);
    if(!passwordCompare){
        res.status(400).json("Incorrect Password provided");
    }
    const data={
        user:{
            id:user1.id,
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({authToken});
})

//Route 3 : Get Logged in User Details
router.post('/getUser',fetchuser,async(req,res)=>{
    try{
        const user1=await User.findById(req.user.id).select("-password");
        res.send(user1);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;