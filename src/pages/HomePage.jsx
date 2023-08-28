import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import axios from "axios";
import { Button } from "antd";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //function to get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //get TOtal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.totals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"all product -best offer"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <button
            className="navbar-toggler m-2 w-100 bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <h4 className="text-center"> Filter by category</h4>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="d-flex flex-column text-uppercase m-2 ">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* price filter  */}
          <button
            className="navbar-toggler m-2 w-100 bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
           <h4 className="text-center mt-4"> filter by price</h4> 
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <div className="d-flex flex-column text-uppercase m-2 ">
            {
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            }
          </div>
          </div>
          
          <div>
            <button
              className="d-flex flex-column text-uppercase m-2 btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset filter
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2" id="myCard"
                
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
                    <Button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("item added to cart");
                      }}
                      className="btn btn-secondary ms-1"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="btn btn-warning"
              >
                {loading ? "Loading..." : "load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
//7:28
