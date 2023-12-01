// Inventory.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for a specific user (replace 'userid' with the actual user ID)
    axios.get('/products/userid').then((res) => {
      console.log(res.data);
      setProducts(res.data); // Assuming the response contains an array of products
    });

    const getUsernameFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('username');
    };

    const setWelcomeMessage = () => {
      const username = getUsernameFromURL();

      const greetingElement = document.getElementById('greeting');
      if (username) {
        greetingElement.textContent = `Welcome, ${username}!`;
      } else {
        greetingElement.textContent = 'Welcome!';
      }
    };

    document.addEventListener('DOMContentLoaded', setWelcomeMessage);
  }, []);

  return (
    <div>
      <header>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
        <span className="tagline">...bid the BITS way</span>
      </header>
      <nav>
        <ul>
          {/* Use Link instead of anchor tags */}
          <li id="inventory">
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/add-product">Add Products</Link>
          </li>
          <li>
            <Link to="/message-bidder">Message Bidder</Link>
          </li>
          <li>
            <Link to="/profile-sell">Profile</Link>
          </li>
          <li>
            <Link to="/">Back to Bidding</Link>
          </li>
        </ul>
      </nav>
      <main>
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.imageUrl} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p>${product.price}</p>
            <div className="bid-info">
              <p>Highest Bid: ${product.highestBid}</p>
              <p>Bidder: {product.bidderName}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Inventory;
