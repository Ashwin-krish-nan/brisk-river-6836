const express=require("express")
const {register}=require("./routes/register.route")
const {login}=require("./routes/login.route")
const {menRouter} = require("./routes/men.route")
const {womenRouter} = require("./routes/women.route")
const {connection} = require("./config/db")
const {cart_router} = require("./routes/cart.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
require('dotenv').config()
const app=express()


app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use("/",register)
app.use("/",login)
app.use("/women", womenRouter)
app.use("/men", menRouter)

app.use("/cart", cart_router)









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