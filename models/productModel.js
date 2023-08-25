import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true,

 },
 slug:{
    type:String,
    required:true,

 },
 description:{
    type:String,
    required:true,
 },
 price:{
    type:Number,
    required:true,
 },
 category:{
    type:mongoose.ObjectId,
    ref:"Category",//name of the model u have assigned in category model
    required:true,
 },
 quantity:{
    type:Number,
    required:true,
 },
 photo:{
    data:Buffer, //to uplaod photo in mongodb use buffer it only have limit of around 10 mb
    contentType:String,
   
 },
 shipping:{
    type:Boolean,
    default:false

 },
},
{timestamps:true})
export default mongoose.model("Products",productSchema)