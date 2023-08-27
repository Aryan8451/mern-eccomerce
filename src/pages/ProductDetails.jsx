import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [products, setProducts] = useState({});
  const [realatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);
  //getproducts
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category?._id); //8.14
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          {" "}
          <img
            src={`/api/v1/product/product-photo/${products._id}`}
            className="card-img-top"
            alt={products.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h4>name: {products.name}</h4>
          <h4>description: {products.description}</h4>
          <h4>price: ₹{products.price}</h4>
          <h4>category: {products.category?.name}</h4>

          <Button className="btn btn-secondary ms-1">add to cart</Button>
        </div>
      </div>
      <hr />
      <div className="row container ">
        <h6>Similar product</h6>
        {realatedProducts.length<1 &&(<p>no similar found</p> )}
        <div className="d-flex flex-wrap ">
          {realatedProducts?.map((p) => (
            <div
              className="card m-2"
              onClick={() => navigate(`/product/${p.slug}`)}
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
                  <Button className="btn btn-secondary ms-1">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
