import  Express  from "express";
import formidable from 'express-formidable'
import { isAdmin, requireSignIn } from "../middleware/authMiddlware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productPhotoController, productlistController, relatedProductController, searchProductController, updateProductController } from "../controller/productController.js";
const router = Express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete("/delete-product/:id",deleteProductController)
//filter product
router.post("/product-filter",productFilterController)
//search-Product
router.get("/search/:keyword",searchProductController)
//similar products
router.get('/related-products/:pid/:cid',relatedProductController)
// product count 
router.get("/product-count",productCountController)
//product per page 
router.get("/product-list/:page", productlistController)

// category wise product 
router.get('/product-category/:slug',productCategoryController)
//payments routes 

//token
router.get('/braintree/token',braintreeTokenController)
//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)





export default router