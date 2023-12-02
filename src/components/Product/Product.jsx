import React, { useEffect, useState } from "react";
import "./Product.css";
import Axios from "axios";

function Product({ product }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      if (newRemainingTime <= 0) {
        // If remaining time is less than or equal to 0, delete the product
        deleteProduct();
        clearInterval(timer); // Stop the timer
      }
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function calculateRemainingTime() {
    const endTime = new Date(product.endTime).getTime();
    const currentTime = new Date().getTime();
    return Math.max(0, endTime - currentTime);
  }

  async function deleteProduct() {
    try {
      await Axios.delete(`http://192.168.137.1:8080/products/${product.id}`);
      console.log("Product deleted:", product.name);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img src={product.imageKey} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>Bid Price: {product.bidPrice}</p>
      <p>Remaining Time: {formatRemainingTime(remainingTime)}</p>
    </div>
  );
}

function formatRemainingTime(remainingTime) {
  const seconds = Math.floor(remainingTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

export default Product;
