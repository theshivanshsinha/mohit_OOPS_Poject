import React, { useState, useEffect } from "react";
import Product from "../../Props/Product/Product"; 
import "./Product.css";
import Axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [productsData, setProductsData] = useState({
    trending: [],
    newArrivals: [],
  });

  useEffect(() => {
    Axios.get("/products")
      .then((res) => {
        const backendProductsData = res.data;
        setProductsData(backendProductsData);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return (
    <div>
    <Link to="/bid">
      <Product products={productsData} />
    </Link>
    </div>
  );
}

export default App;
