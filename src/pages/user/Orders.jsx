import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"

const Orders = () => {
  const [orders,setOrders] =useState([])
  const [auth,setAuth]=useAuth()

  const  getOrders = async()=>{
    try {
      const {data} = await axios.get("/api/v1/auth/orders")
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token)getOrders()
  },[auth?.token])
  return (
    <Layout>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <h1 className='text-center'>all orders</h1>
                {
                  orders?.map((o,i)=>{
                    return(
                      <div className="border shadow">
                        <table className='table'>
                          <thead>
                            <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>status</th>
                              <th scope='col'>buyer</th>
                              <th scope='col'>date</th>
                              <th scope='col'>payment</th>
                              <th scope='col'>quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                              <tr>
                                <td>{i+1}</td>
                              <td>{o?.status}</td>
                              <td>{o?.buyers?.name}</td>
                              <td>{moment(o?.createdAt).fromNow()}</td>
                              <td>{o?.payment.success?"success":"failed"}</td>
                              <td>{o?.products?.length}</td>
                              </tr>
                
                          </tbody>
                        </table>
                        <div className="container">
                        {o?.products?.map((p,i) => (
                <div className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4 ">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width={"100px"}
                      height={"100px"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: ₹{p.price} </p>
                    
                  </div>
                </div>
              ))}
                        </div>
                      </div>
                    )
                  })
                }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders