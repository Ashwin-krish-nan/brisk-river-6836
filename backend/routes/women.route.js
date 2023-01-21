const express = require("express")
const {WomenModel} = require("../models/women.model")

const womenRouter = express.Router()

womenRouter.get("/",async (req,res)=>{
    const query = req.query
    try {
        const product = await WomenModel.find(query)
        res.send(product)
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

womenRouter.post("/create",async (req,res)=>{
    const payload = req.body
    try {
      /*   await WomenModel.insertMany(payload) */
        const new_pro = new WomenModel(payload)
        await new_pro.save()
        res.send("Women Product has been Created")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

womenRouter.patch("/update/:id",async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    try {
        await WomenModel.findByIdAndUpdate({_id:id},payload)
        res.send("Women Product has been Updated")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

womenRouter.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id
    try {
        await WomenModel.findByIdAndDelete({_id:id})
        res.send("Women Product has been deleted")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {womenRouter}