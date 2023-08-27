import { Button  } from "antd";
import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate =useNavigate()
  const [values, setValues] = useSearch();
  return (
    <Layout title="search result">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <Button className="btn btn-primary  ms-1 "  onClick={() => navigate(`/product/${p.slug}`)}>
                    more details
                  </Button>
                  <Button className="btn btn-secondary ms-1">
                    add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
