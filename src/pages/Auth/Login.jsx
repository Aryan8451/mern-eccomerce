import React, { useState } from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css"
import axios from "axios"
 import {useNavigate,useLocation} from 'react-router-dom'
import { useAuth } from "../../context/auth";

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [auth, setAuth] =useAuth()
    const location = useLocation()
  
    const navigate = useNavigate()

    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login',{
               
                email,
                password,
               
            })
            if(res.data.success){
                toast.success(res.data.message)
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state||'/')
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
        <h1 className="title">login form</h1>
        <form className="Auth-form"  onSubmit={handleSubmit}>
          <div>
           
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
           
           
            <button type="submit" className="btn btn-primary">
              login
            </button>
            <button type="button" onClick={()=>{navigate('/forgot-password')}} className="btn btn-primary">
              forgot password
            </button>
          </div>
        </form>
      </div>
    </Layout>

  )
}

export default Login