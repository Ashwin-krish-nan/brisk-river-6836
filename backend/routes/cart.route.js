const express = require("express")
const {CartModel} = require("../models/cart.model")

const cart_router = express.Router()

cart_router.get("/",async (req,res)=>{
    const query = req.query
    try {
        const cart = await CartModel.find(query)
        res.send(cart)
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

cart_router.post("/create",async (req,res)=>{
    const payload = req.body
    try {
        const new_cartdata = new CartModel(payload)
        await new_cartdata.save()
        res.send("Product has been added inside the cart")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

cart_router.patch("/update/:id",async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    try {
        await CartModel.findByIdAndUpdate({_id:id},payload)
        res.send("Cart Product has been Updated")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

cart_router.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id
    try {
        await CartModel.findByIdAndDelete({_id:id})
        res.send("Cart Product has been Deleted")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {cart_router}