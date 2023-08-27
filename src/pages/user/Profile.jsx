import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
const Profile = () => {

  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //get user data
  useEffect(()=>{
    const { email,name,phone,address,password}=auth.user 
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error)

      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls =localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user =data.updatedUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("profile update successfully")
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="title">Register page</h1>
            <form style={{ width: "35rem" }} onSubmit={handleSubmit}>
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="name"
                  
                  />
                </div>
                <div className="mb-3">
                  <input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    disabled
                  
                  />
                </div>

                <div className="mb-3">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                  
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="phone"
                    type="text"
                    className="form-control"
                    id="exampleInputphone"
                    value={phone}
                  
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="address"
                    type="text"
                    className="form-control"
                    id="exampleInputaddress"
                    value={address}
                  
                  />
                </div>
                

                <button type="submit" className="btn btn-primary">
                  update 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
