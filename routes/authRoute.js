import  express  from "express";
import {registerContoller, loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllUsersController, getAllOrdersController, orderStatusController} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddlware.js";
 const router = express.Router()
// all routing
//reister || post
router.post('/register',registerContoller)

//login || post
router.post("/login",loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)//note while using any middleware it should be in sequence like first requiresignin and than check if he is admin
// forgot password || post
router.post('/forgot-password',forgotPasswordController)

//protected route user
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
//admin route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)
//all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)
//all users
router.get('/all-users',requireSignIn,isAdmin,getAllUsersController)
// order status update
router.put('/order-status/:OrderId',requireSignIn,isAdmin,orderStatusController)


export default  router;
