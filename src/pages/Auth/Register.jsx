import React, { useState } from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css"
import axios from "axios"
 import {useNavigate} from 'react-router-dom'
const Register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const [answer,setAnswer]=useState('')
    const navigate = useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register',{
                name,
                email,
                password,
                phone,
                address,
                answer
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/login')
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

  return (
    <Layout>
      <div className="form-container">
        <h1 className="title">Register page</h1>
        <form className="Auth-form"  onSubmit={handleSubmit}>
          <div>
            <div className="mb-3">
             
              <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="form-control"
                id="exampleInputName1"
               placeholder="name"
               required
              />
            </div>
            <div className="mb-3">
              
              <input placeholder="email"
              onChange={(e)=>setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                required
              />
            </div>


            <div className="mb-3">
             
              <input
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                required
              />
            </div>
            <div className="mb-3">
             
              <input
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="phone"
                type="text"
                className="form-control"
                id="exampleInputphone"
               value={phone}
               required
              />
            </div>
            <div className="mb-3">
             
              <input
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="address"
                type="text"
                className="form-control"
                id="exampleInputaddress"
               value={address}
               required
              />
            </div>
            <div className="mb-3">
             
              <input
              onChange={(e)=>setAnswer(e.target.value)}
              placeholder="what colour is your buggati?"
                type="text"
                className="form-control"
                id="exampleInputanswer"
               value={answer}
               required
              />
            </div>
          
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
