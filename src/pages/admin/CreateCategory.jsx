import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from "antd";


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState('')
  const [visible,setVisible]=useState(false)
  const [selected,setSelected] =useState(null)
  const [updatedName,setUpdatedName] =useState("")


  //update the text
  const handleUpdate =async (e)=>{
    e.preventDefault()
    try {
      
        const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
          name: updatedName
        });
        if (data?.success) {
                 toast.success(`${updatedName} is updated `)
         setSelected(null)
          getAllCategory();
          setUpdatedName("")
          setVisible(false)

        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while updating the category");
      }
  }


  //delete the text
  const handleDelete =async (pid)=>{
   
    try {
      
        const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`, {
          name: updatedName
        });
        if (data?.success) {
                 toast.success(`category is deleted `)
         
          getAllCategory();
          
          

        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while deleting the category");
      }
  }

  //handleform
  const handleSubmit =async(e)=>{
    
    e.preventDefault()
    try {
        const {data }= await axios.post("/api/v1/category/create-category",{
            name,
        })
        if(data?.success){
            toast.success(`${name} is created`)
            getAllCategory()
        }else{
            toast.error(data.message)
        }
        } catch (error) {
        console.log(error)
        toast.error("something went wrong in input form")
    }
  }
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
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>manage category</h1>
            <div className="p3">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
               
                  {categories?.map((c) => (
                         <tr key={c._id}>
                         <td>{c.name}</td>
                         <td>
                           <button className="ms-2 btn btn-primary" onClick={()=>{setVisible(true) ; setUpdatedName(c.name) ; setSelected(c)}   }>Edit</button>
                           <button className="ms-3 btn btn-danger"onClick={()=>{handleDelete(c._id)}}>delete</button>
                         </td>
                       </tr>
                        
                  ))}
                  
                
              </tbody>
            </table>
                 </div>
        </div>
      </div>
      <Modal onOk={()=>prompt("yes")} onCancel={()=>setVisible(false)} open={visible} footer={null} title={"update categories"}>
                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
      </Modal>
    </Layout>
  );
};
//5.43

export default CreateCategory;
