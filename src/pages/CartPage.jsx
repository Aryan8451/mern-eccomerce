import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });

      const formattedTotal = total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });

      return formattedTotal;
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
     
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              {cart?.map((p) => (
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
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 text-center">
            <h2 className=" fw-bolder text-uppercase"> cart summary</h2>
            <h5>Total | checkout | payment</h5>
            <hr />
            <h4>Total :{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3"></div>
                <h4>Current address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className=" btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  update address
                </button>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className=" btn btn-outline-warning"
                  >
                    update address{" "}
                  </button>
                ) : (
                  <button
                    className=" btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    {" "}
                    please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className=" btn btn-primary"
                    onClick={handlePayment}
                    disabled={  !instance || !auth?.user?.address}
                  >
                    {loading ? "proccessing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
