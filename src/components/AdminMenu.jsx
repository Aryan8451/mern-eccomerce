import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
 <div className="list-group">
    <div className="list-group">
     <h4>admin panel</h4>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">crete product</NavLink>
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">create category</NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">users</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">products</NavLink>
  <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">all order</NavLink>
    </div>
  
</div>


    </>
  )
}

export default AdminMenu