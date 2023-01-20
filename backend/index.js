const express=require("express")
const {register}=require("./routes/register.route")
const {login}=require("./routes/login.route")
const {connection} = require("./config/db")
require('dotenv').config()
const app=express()


app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use("/",register)
app.use("/",login)










app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connection DB done");
    } catch (error) {
        console.log("Trouble connection error");
        console.log(error);
    }
    console.log(`running at port ${process.env.port}`);
})
















/* {
     "first_name":"ashwin",
     "last_name":"Beena",
   "email":"ashwin@gmail.com",
     "password":"ashwin123"
   } */