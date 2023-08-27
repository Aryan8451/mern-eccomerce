import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ({path="login"}) => {
    const [count,setCount] =useState(3)
    const navigate =useNavigate()
    const location =useLocation()
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((preValue)=> --preValue)
        }, 1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div style={{height:"100vh"}}  className="text-center w-100 d-flex justify-content-center align-items-center flex-column">
  <div  className="spinner-border" role="status">
    <span className="sr-only"></span>

  </div>
  <h1> Redirecting you in {count}</h1>
  
</div>
  )
}

export default Spinner