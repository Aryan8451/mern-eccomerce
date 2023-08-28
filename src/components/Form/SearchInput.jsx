import React, { useState } from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
    const navigate  = useNavigate()
    const [values,setValues] =useSearch()
    const [search,setSearch] =useState("search")
    const handleSubmit=async(e)=>{

        e.preventDefault()
if(!values.keyword.trim()){
  return setSearch("type something to search")
}

        try {
            const {data } =await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data})
            navigate('/search')
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
         <form className="d-flex" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2" type="search" placeholder={search} aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})} />
  <button className="btn btn-outline-success"  type="submit">Search</button>
</form>

    </>
  )
}

export default SearchInput