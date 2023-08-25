import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import  JWT  from "jsonwebtoken"
export const registerContoller = async(req,res)=>{
    try {
        const {name,email,phone,password,address,answer} = req.body
        //validation
        if(!name){
            return res.send({message:"Name is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
        if(!phone){
            return res.send({message:"phone is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        }
        if(!answer){
            return res.send({message:"answer is required"})
        }
      // check user
        const existinguser = await userModel.findOne({email:email})
      // checking existing user
      if(existinguser){
        return res.status(200).send({
            success:false,
            message:" already registered please login"
        })
      }
      //register user
      const hashedpassword = await hashPassword(password)
      //save
      const user = await new userModel({name,email,phone,address,password:hashedpassword,answer}).save()
      res.status(201).send({
        success:true,
        message: "User registered successfully ",
        user
      })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registeration",
            error
        })
    }

}

//Post Login 
export const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'invalid email or password'
            })
        }
        //check user
        const user =await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not registered"
            })
        }
        const decrypted =  await comparePassword(password,user.password)
        if(!decrypted){
            return res.status(200).send({
                success:false,
                message:"password is invalid"
            })
        }
        //if all the condition is satisfied we will create a token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        })
        res.status(200).send({
            success:true,
            message:'login succesfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}
//forgotPasswordController 
export const forgotPasswordController =async (req,res)=>{
try {
    const {email,newPassword,answer}= req.body
    if(!email){
        res.status(400).send({message:"email is required"})
    }
    if(!newPassword){
        res.status(400).send({message:"password is required"})
    }
    if(!answer){
        res.status(400).send({message:"answer is required"})
    }
    //checking email and answer is of user
    const user =await userModel.findOne({email,answer})
    //validation
    if(!user)
    return res.status(404).send({
        success:false,
        message:"wrong email or answer"
    })
    //if user is real we are going to hash the existing password
    const hashed =await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:"password reset successfully"
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'something went wrong ',
        error
    })
}
}

// test controller
export const testController=(req,res)=>{
res.send("protected route")
}

// update profile
export const updateProfileController =async (req,res)=>{
    try {
        const {name,email,password,address,phone}=req.body
        const  user =await userModel.findById(req.user._id)
        //password
        if(password && password.length <6){
            return res.json({error:"password is required and 6 character long"})

        }
        const hashedPassword = password? await hashPassword(password):undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password:  hashedPassword || user.password,
            phone: phone || user.phone,
            address : address || user.address
        },{new:true})
        res.status(200).send({
            success:true,
            message:"profile updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error while updating the profile',
            error
        })
    }
}

//orders 
export const  getOrdersController = async (req,res)=>{
    try {
        const orders = await orderModel.find({buyers:req.user._id}).populate("products","-photo").populate("buyers","name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting',
            error
        })
    }
}
//all orders 
export const  getAllOrdersController = async (req,res)=>{
    try {
        const orders = await orderModel.find({}).populate("products","-photo").populate("buyers","name").sort({createdAt:"-1"})
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting',
            error
        })
    }
}
//all users
export const getAllUsersController = async(req,res)=>{
    try {
        const allusers = await userModel.find({ role: 0 },'name')
        res.status(200).send({
            success:true,
            message:"all users fetched successfully",
            allusers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting all users',
            error
        })
    }
}
//order status 
export const orderStatusController = async (req, res) => {
    try {
      const { OrderId } = req.params;
      const { status } = req.body;
   
      const updatedOrder = await orderModel.findByIdAndUpdate(OrderId, { status }, { new: true });
   
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'error while updating order status',
        error
      });
    }
  };
  