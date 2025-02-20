const mongoose=require('mongoose')
const Product = require('./product')
const cartSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref:'user', required:true},
    cartItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId , ref:'Product',required:true} ,
            quantity:{type:Number,default:1},
           // price:{type:Number , required:true}
        }
    ]

},{timestamps:true})
module.exports=mongoose.model("cart",cartSchema)