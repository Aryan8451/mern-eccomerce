import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDb from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path"


//configuring dotenv
dotenv.config()
//database config
connectDb()

//
const app = express()
//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

//get 
app.use('*',function (req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
} )
//Port 
const PORT = process.env.PORT || 8000
//listening the port
app.listen(PORT,()=>{
   
})

//1:26