import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./SpecificProduct.css";

const BASE_URL = 'http://localhost:8080'; // Replace with your actual backend URL

function SpecificProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const [productDetails, setProductDetails] = useState({
    description: "",
    basePrice: 0.0,
    currentBid: 0.0,
    biddingEnds: "",
    currentPrice: 0.0,
  });

  const images = ["product-image.jpg"];

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const fetchProductDetails = async () => {
    try {
      const productId = 'yourProductId'; // Replace with the actual product ID
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      const product = response.data; // Assuming the response contains product details

      // Update state with fetched product details
      setProductDetails({
        description: product.description,
        basePrice: product.basePrice,
        currentBid: product.currentBid,
        biddingEnds: product.biddingEnds,
        currentPrice: product.currentPrice,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const placeBid = async () => {
    try {
      const productId = 'yourProductId'; // Replace with the actual product ID
      const bidAmount = 30.0; // Replace with the actual bid amount
      const response = await axios.post(`${BASE_URL}/products/${productId}/bids`, { amount: bidAmount });

      // Handle bid response, e.g., show success message
      console.log('Bid placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  useEffect(() => {
    // Fetch product details when the component mounts
    fetchProductDetails();
  }, []);

  return (
    <div>
      <header>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>

        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search products..." />
          <button className="search-button">Search</button>
        </div>

        <span className="tagline">...bid the BITS way</span>
      </header>

      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bid">Bid</Link></li>
            <li><Link to="/your-bid">Your BIDS</Link></li>
            <li><Link to="/message-seller">Message Seller</Link></li>
            <li><Link to="/wallet">Wallet</Link></li>
            <li><Link to="/profile-bid">Profile</Link></li>
            <li><Link to="/inventory">Sell</Link></li>
          </ul>
        </nav>
      </header>

      <div id="greeting" style={{ textAlign: "center", padding: "20px" }}></div>

      <main>
        <div className="product-details">
          <div className="product-image">
            <img src={images[currentImage]} alt="Product Name" id="productImage" />
            <div className="image-arrows">
              <button className="arrow-button" onClick={prevImage}>❮</button>
              <button className="arrow-button" onClick={nextImage}>❯</button>
            </div>
          </div>
          <div className="product-description">
            <p>Description: {productDetails.description}</p>
            <p>Base Price: ${productDetails.basePrice}</p>
            <p>Current Bid: ${productDetails.currentBid}</p>
            <p>Bidding ends: {productDetails.biddingEnds}</p>
            <p>Current Price: ${productDetails.currentPrice}</p>
            <button className="bid-button" onClick={placeBid}>Place a Bid</button>
            <button className="message-seller-button">Message Seller</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SpecificProduct;
