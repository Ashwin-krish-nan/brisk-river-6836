const mongoose=require("mongoose")

const registerSchema=mongoose.Schema({
 first_name:String,
 last_name:String,
 email:String,
 password:String
})

const Registermodel=mongoose.model("user",registerSchema)

module.exports={
Registermodel
}