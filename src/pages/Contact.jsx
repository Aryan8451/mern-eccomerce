import React from 'react'
import Layout from '../components/Layout'
import {BiMailSend,BiPhoneCall,BiSupport}  from "react-icons/bi"

const Contact = () => {
  return (

    <Layout title={"Contact us"}>
    <div className="row contactus ">
     
      <div className="col-md-4 " style={{"width":"70rem"}}>
        <h1 className=" p-2 text-dark text-center">CONTACT US</h1>
        <h2 className="text-justify mt-2">
          Any query and info about prodduct feel free to call anytime we 24X7 vaialible
        </h2>
        <p className="mt-3">
          <BiMailSend /> : www.help@ecommerceapp.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : 012-3456789
        </p>
        <p className="mt-3">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  </Layout>
  )
}

export default Contact