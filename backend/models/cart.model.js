const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    name:String,
    avatar:String,
    price:Number,
    rating:Number,
    product_id:String
})

const CartModel = mongoose.model("cart",cartSchema)

module.exports = {CartModel}