import mongoose from "mongoose"
import colors from "colors"
const connectDb = async()=>{
 try {
    const conection = await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to db",conection.connection.host.blue)
 } catch (error) {
    console.log(`error in db ${error}`.bgBlack.red)
 }
}
export default connectDb