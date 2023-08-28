import React, { useState } from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css"
import axios from "axios"
 import {useNavigate} from 'react-router-dom'


const ForgotPassword = () => {
    const [email,setEmail]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [answer,setAnswer]=useState('')
  
  
    const navigate = useNavigate()

    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',{
               
                email,
                newPassword,
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
    <Layout title={"forgot password - eccomerce app"}>
      <div className="form-container">
        <h1 className="title">reset password</h1>
        <form className="Auth-form"  onSubmit={handleSubmit}>
          <div>
            <div className="mb-3">
              <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                required
              />
            </div>

            <div className="mb-3">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="new password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={newPassword}
                required
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="what color was your bugati"
                type="password"
                className="form-control"
                id="exampleInputAnswer1"
                value={answer}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              reset
            </button>
            
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
