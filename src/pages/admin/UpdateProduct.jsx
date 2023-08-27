import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {Select}from 'antd'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import { useProductContext } from '../../context/product'

const { Option} = Select

const UpdateProduct = () => {
  const {getAllProducts} =useProductContext()
  const location =useLocation()
  const params =useParams()
  const navigate = useNavigate()
  const [categories,setCategories] =useState([])
  const [photo,setPhoto]=useState("")
  const [name,setName]=useState("")
  const [description,setdescription]=useState("")
  const [category,setCategory]=useState("")
  const [quantity,setquantitys]=useState("")
  const [shipping,setShipping]=useState("")
  const [price,setPrice]=useState("")
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [id,setId] =useState('')
 
//get Single product
const getSingleProduct = async ()=>{
  try {
    const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
    setName(data.product.name)
    setId(data.product._id)
    setdescription(data.product.description)
    setquantitys(data.product.quantity)
    setPrice(data.product.price)
    setShipping(data.product.shipping)
    setCategory(data.product.category._id)
  } catch (error) {
    console.log( error)
    
  }
}
useEffect(()=>{
  getSingleProduct()
  
},[])

//function to get all category
const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong in getting category");
  }
};
useEffect(() => {
  getAllCategory();
 
}, []);

//create product function
const handleUpdate = async (e)=>{
  e.preventDefault()
  try {
    const productData= new FormData()
    productData.append("name",name)
    productData.append("description",description)
    productData.append("price",price)
    productData.append("quantity",quantity)
    photo && productData.append("photo",photo)
    productData.append("category",category)
    productData.append("shipping",shipping)
    const {data} = axios.put(`/api/v1/product/update-product/${id}`,
      productData
    )
    if(data?.success){
      toast.error(data?.message)
    }else{
      toast.success("Product updated successfully")

      
      getAllProducts();
      navigate("/dashboard/admin/products")
      
    }
  } catch (error) {
    console.log(error)
    toast.error("something went wrong")
  }

}
//delete a product
const handleDelete = async ()=>{
  try {
    let answer = window.prompt("are you sure you want to delete this product, if yes than write anything and click on ok ")
    if(!answer)return 
    const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
    toast.success('product deleted successfully')
    navigate('/dashboard/admin/products')    
  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
  }
}

  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
               <h1>update product</h1> 
               <div className="m-1 w-75" >
              <Select bordered={false} placeholder="select a category " size='large'showSearch className='form-select m-3' onChange={(value)=>{setCategory(value)} }  value={category}>
              {categories?.map(c=>(
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
              </Select>
              <div className="mb-3">
                <label  className='btn btn-outline-secondary col-md-12'>

                  {photo ? photo.name:"upload photo"}
                  <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0]) } hidden/>
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className='img img-responsive'/>

                  </div>
                ):(

                  <div className="text-center">
                    <img src={`/api/v1/product/product-photo/${id}`} alt="product photo" height={'200px'} className='img img-responsive'/>

                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="text" value={description} placeholder='write a description' className='form-control' onChange={(e)=>setdescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='write a price' className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder='write the quantity' className='form-control' onChange={(e)=>setquantitys(e.target.value)}/>
              </div>
              <div className="mb-3">
               <Select bordered={false} placeholder="select shipping" size='large' showSearch onChange={(value)=>setShipping(value)} value={shipping?"yes":"no"} >
                    <Option value="0">yes</Option>
                    <Option value="1" >no</Option>
               </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary ' onClick={handleUpdate}>update product</button>
              </div>
              <div className="mb-3">
                <button className='btn btn-danger ' onClick={handleDelete}>delete product</button>
              </div>
            </div>
            </div>
            
            
        </div>
        </Layout>
  )
}

export default UpdateProduct