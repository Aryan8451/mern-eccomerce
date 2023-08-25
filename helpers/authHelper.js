import bcrypt from "bcrypt"
export const hashPassword = async(password)=>{
 try {
    const SaltRounds = 10;
    const hashedPass = await bcrypt.hash(password,SaltRounds) 
    return hashedPass
 } catch (error) {
    console.log(error)
 }
}
export const comparePassword = async(password,hashedPass)=>{
     return bcrypt.compare(password,hashedPass)
}