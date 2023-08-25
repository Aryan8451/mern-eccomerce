import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true,
    trim:true, // remove all the whitespaces 
 },
 email:{
    type:String,
    required:true,
    unique:true,
    
 },
 password:{
    type: String,
    required:true,
 },
 phone:{
    type:String,
    required:true,
 },
 address:{
    type:{},
    required:true,
 },
 role:{
    type: Number,
    default:0,
 },
 answer:{
   type:String,
   required:true
 }

},
{
    timestamps:true
})
export default mongoose.model("users",userSchema)