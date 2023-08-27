
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd'

const CategoryProduct = () => {
    const params = useParams()
    const[products,setProducts] = useState([])
    const[category,setCategory] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
     if(params?.slug) getProductsByCat()
    },[params?.slug])
    const getProductsByCat =async ()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    
   
  return (
    <Layout>

        <div className="container mt-3">
            <h4 className='text-center'> Category - {category?.name}</h4>
            <h6 className='text-center' >{products?.length} result found</h6>
            <div className="row">
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2"
                style={{ flex: "0 0 calc(33.33% - 1rem)" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h3 className="card-title fw-bolder">{p.name}</h3>
                  <div>
                    <h5 className="card-text">
                      {p.description.substring(0, 50)}...
                    </h5>
                    <p className="card-text">₹{p.price}</p>
                  </div>
                  <div className="buttons">
                    <Button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn btn-primary ms-1"
                    >
                      More Details
                    </Button>
                    <Button className="btn btn-secondary ms-1">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct