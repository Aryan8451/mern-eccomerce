import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
    const [auth] = useAuth()
    
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin name: {auth?.user?.name}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
              <h3>Admin contact: {auth?.user?.phone}</h3>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
   
  )
}

export default AdminDashboard