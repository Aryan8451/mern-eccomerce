import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async(req,res)=>{
try {
    const {name} = req.body
    if(!name){
        return res.status(401).send({message:"name is required"})

    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"category already exist"
        })
    }
    const category = await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:"new category created ",
        category
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in category '
    })
}
}

//update category 
export const updateCategoryController =async(req,res)=>{
try {
    const {name}=req.body
    const {id} =req.params
    const Category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})//to update new true is mandatory
    res.status(200).send({
        success:true,
        message:"category updated successfully",
        Category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in updating category '
    })
}
}

//get all category
export const categoryController =async (req,res)=>{
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:'all categories list',
        category,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error while getting all categories '
    })
}
}
//single category
export const singleCategoryController = async(req,res)=>{
    try {
        const {slug} =req.params
        const category =await categoryModel.findOne({slug})
        res.status(200).send({
            success:true,
            message:"get single category succesfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single categories '
        })
    }
}
//delete category
export const deleteCategoryController = async (req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while deleting categories '
        })
    }    
}
