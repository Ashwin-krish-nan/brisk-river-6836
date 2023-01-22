const express=require("express")
const jwt = require('jsonwebtoken');
const {Registermodel}=require("../models/register.model")
const bcrypt = require('bcrypt');
const register=express.Router()


register.post("/register",async(req,res)=>{
 let {first_name, last_name,email,password}=req.body

 try {
   const alreadyusedemail = await Registermodel.find({email})
 if(alreadyusedemail.length>0){
   res.status(409)
  res.send("Email already in use please login")
 }else{
  bcrypt.hash(password, 5, async(err, hash)=> {
    // Store hash in your password DB.
    if(err){
     console.log(err);
    }else{
     const user= new Registermodel({first_name, last_name,email,password:hash})
  await user.save()
  res.send("registerd successfully")
    }
});
 }

  
 } catch (error) {
  res.send  ("error registering")
  console.log("err"+error);
 }
 
})














module.exports={
 register
}