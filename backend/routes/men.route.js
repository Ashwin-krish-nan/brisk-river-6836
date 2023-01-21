const express = require("express")
const {MenModel} = require("../models/men.model")
const menRouter = express.Router()

menRouter.get("/",async (req,res)=>{
    const query = req.query
    try {
        const product = await MenModel.find(query)
        res.send(product)
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

menRouter.post("/create",async (req,res)=>{
    const payload = req.body
    try {
     await MenModel.insertMany(payload)
/*         const new_pro = new MenModel(payload)
        await new_pro.save() */
        res.send("Men Product has been Created")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

menRouter.patch("/update/:id",async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    try {
        await MenModel.findByIdAndUpdate({_id:id},payload)
        res.send("Men Product has been Updated")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

menRouter.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id
    try {
        await MenModel.findByIdAndDelete({_id:id})
        res.send("Men Product has been deleted")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {menRouter}