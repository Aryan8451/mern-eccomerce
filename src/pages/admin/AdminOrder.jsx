
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import { Toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const {Option} =Select

const AdminOrder  = () => {
    const[status,setStatus] = useState(["not processed"," processing" , "shipped","deliver","cancel"])
    const [ changeStatus,setChangeStatus] = useState("")
    const [orders,setOrders] =useState([])
  const [auth,setAuth]=useAuth()

  const  getOrders = async()=>{
    try {
      const {data} = await axios.get("/api/v1/auth/all-orders")
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token)getOrders()
  },[auth?.token])
  const handleChange = async (orderId, value) => {
    try {

      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
    <Layout title={"all order data "}> 
        <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9">
                <h1 className='text-center'>All orders</h1>
                {
                     orders?.map((o,i)=>{
                        return(
                          <div className="border shadow" key={i}>
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
                                  <td>
                                    <Select bordered = { false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                                    {status.map((s,i)=>(
                                        <Option key={i} value={s}>
                                            {s}
                                        </Option>
                                    ))}
                                    </Select>
                                  </td>
                                  <td>{o?.buyers?.name}</td>
                                  <td>{moment(o?.createdAt).fromNow()}</td>
                                  <td>{o?.payment.success?"success":"failed"}</td>
                                  <td>{o?.products?.length}</td>
                                  </tr>
                    
                              </tbody>
                            </table>
                            <div className="container">
                            {o?.products?.map((p,i) => (
                    <div className="row mb-2 p-3 card flex-row "key={i}>
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
    </Layout>
    </>
  )
}

export default AdminOrder