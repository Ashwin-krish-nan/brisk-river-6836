const mongoose = require("mongoose")

const menSchema = mongoose.Schema({
    name:String,
    avatar:String,
    price:Number,
    rating:Number
})

const MenModel = mongoose.model("men",menSchema)

module.exports = {MenModel}