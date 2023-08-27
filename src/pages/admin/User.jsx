import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import {Chart} from "chart.js"

const User = () => {
  const [allusers, setAllusers] = useState([]);



  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/all-users");
      const userArray =response.data.allusers
      setAllusers(userArray);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 text-center">
          <h1>All users</h1>
        {allusers.map((user, index) => (
    <h1 key={user?._id}>Name: {user?.name}</h1>
    
  ))}
  
  
  <canvas id="purchaseChart"></canvas>
        </div>
      </div>
    </Layout>
  );
};

export default User;
