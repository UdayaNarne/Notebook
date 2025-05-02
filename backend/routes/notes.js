const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const mongoose=require('mongoose');
const fetchuser=require('../middleware/fetchUser');
const Notes=require("../models/Notes")

//Route 1: Retrieving notes
router.get('/getNotes',fetchuser,async(req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.send(notes);
})

//Route 2: Creating a note

router.post('/createNote',fetchuser,[
    body('title').isLength({min:3}).withMessage("Title should be atleast 3 characters long"),
    body('description').isLength({min:5}).withMessage("Description should be atleast 5 characters long"),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const note=new Notes({
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id
    })
    note.save().then(()=>{
        res.json(note);
    }).catch((err)=>{
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    })
})

// Route 3: Update existing note
router.put('/updateNote/:id',fetchuser,[
    body('title').optional().isLength({min:3}).withMessage("Title should be atleast 3 characters long"),
    body('description').optional().isLength({min:5}).withMessage("Description should be atleast 5 characters long"),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let note= await Notes.findById(req.params.id);
    console.log(note);
    if(!note){
        return res.status(404).send("Note not found");
    }
    console.log(note.user.toString());
    console.log(req.user.id);
    // if(note.user.toString()===req.user.id){
    //     console.log("yes");
    // }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    } 
    
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
    // let note=Notes.findById(req.params.id);
    // if(!note){
    //     return res.status(404).send("Note not found");
    // }

})

//Route 4: Deleting a note
router.delete('/deleteNote/:id',fetchuser,[
    body('title').optional().isLength({min:3}).withMessage("Title should be atleast 3 characters"),
    body('description').optional().isLength({min:5}).withMessage("Description shpuld be atleast 5 letters")
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors:errors.array()});
    }
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({note});
})
module.exports=router;