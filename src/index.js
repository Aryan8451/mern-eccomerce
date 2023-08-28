import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { ProductProvider } from "./context/product";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
  <BrowserRouter>
    <SearchProvider>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </SearchProvider>
  </BrowserRouter>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();