const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const User=require('../models/Users');
var bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser');
const dotenv=require('dotenv').config({path:'../.env.local'});
const JWT_SECRET=process.env.JWT_SECRET;
const mongoose=require('mongoose');

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
        let success=true;
        let user=await User.findOne({email:req.body.email});
        if(user){
            success=false;
            return res.status(400).json({success,error:"User with this email already exists"});
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
        const jwtData=jwt.sign(data, JWT_SECRET,{expiresIn:'1h'});
        //console.log(jwtData);
        //console.log(user);
        success=true;
        res.json({success,jwtData});
    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
    
})

//Route 2: Login User
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    let success=true;
    let user1=await User.findOne({email:email});
    if(!user1){
        success=false;
        return res.status(400).json({success,error:"Incorrect Email provided"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=(await bcrypt.hash(password,salt));

    let passwordCompare = await bcrypt.compare(password, user1.password);
    // console.log(password);
    // console.log(user1.password);
    // console.log(passwordCompare);
    if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error:"Incorrect Password provided"});
    }

    const data={
        user:{
            id:user1.id,
        }
    }
    success=true;
    const authToken=jwt.sign(data,JWT_SECRET,{expiresIn:'1h'});
    res.json({success,authToken});
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

//Route 4: Update User details
router.put('/updateUser/:id',fetchuser,[
    body('password').isLength({min:8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/).withMessage("Password should be atleast 8 charcaters long"),
],async(req,res)=>{
    const {name,email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let newUser={};
    if(name){newUser.name=name};
    if(email){newUser.email=email};
    if(password){
        const salt=await bcrypt.genSalt(10);
        const secPass=(await bcrypt.hash(req.body.password,salt));
        newUser.password=secPass;
    }
    let user1=await User.findById(req.params.id);
    if(!user1){
        return res.status(404).send("User not found");
    }
    if(user1.id.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    user1=await User.findByIdAndUpdate(req.params.id,{$set:newUser},{new:true});
    res.json(user1);
})

//Route 5: Delete User
router.delete('/deleteUser/:id',fetchuser,async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid user ID format");
    }
    let user1=await User.findById(req.params.id);
    if(!user1){
        return res.status(404).send("User not found");
    }
    if(user1.id.toString()!=req.user.id){
        return res.status(401).send("Not allowed");
    }
    user1=await User.findByIdAndDelete(req.params.id);
    res.json({success:true,message:"User has been deleted"});
})

module.exports=router;