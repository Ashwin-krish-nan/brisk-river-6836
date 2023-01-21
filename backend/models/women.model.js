const mongoose = require("mongoose")

const womenSchema = mongoose.Schema({
    name:String,
    avatar:String,
    price:Number,
    rating:Number
})

const WomenModel = mongoose.model("women",womenSchema)

module.exports = {WomenModel}