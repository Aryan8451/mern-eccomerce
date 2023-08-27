import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

// Create a context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  return (
    <ProductContext.Provider value={{ products, getAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProductContext = () => useContext(ProductContext);
