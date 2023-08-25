import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
 products: [{
     type:mongoose.ObjectId,
    ref:'Products',   
    },
 ],
 payment:{},
 buyers:{
    type:mongoose.ObjectId,
    ref:'users'
},
status:{
    type :String,
    default:"not processed",
    enum:["not processed"," processing" , "shipped","deliver","cancel"]
}
 
    
},{timestamps:true})
export default mongoose.model("order",orderSchema)