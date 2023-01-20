const express=require("express")
const jwt = require('jsonwebtoken');
const {Registermodel}=require("../models/register.model")
const bcrypt = require('bcrypt');
const login=express.Router()








login.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await Registermodel.find({email})
        const hashed_password = user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hashed_password, (err, result)=> {
                if(result){
                    const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"msg":"Login Successfull","token":token})  
                }else{
                    res.send("Wrong credential")
                    //console.log(err);
                }
            });
        } else {
            res.send("Wrong credential")
        }
    } catch (error) {
        console.log(error)
        res.send("something went error")
    }
})




module.exports = {
 login
}