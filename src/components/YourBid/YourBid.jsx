import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Yourbid.css';
import Nav from '../Nav1/Nav';

function ProductBox({ productId, imageUrl, productName, bidAmount }) {
  return (
    <div className="product-box">
      <Link to={`/specificproduct/${productId}`}>
        <img className="product-image" src={imageUrl} alt={productName} />
      </Link>
      <div className="product-details">
        <h2>{productName}</h2>
        <p className="bid-text">
          Your Bid: <span className="bid-amount">${bidAmount}</span>
        </p>
      </div>
    </div>
  );
}

function YourBid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <header style={{backgroundColor:"black"}}>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
      </header>

      <nav style={{backgroundColor:"black"}}>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/bid">Bid</Link>
          </li>
          <li id="yourbids">
            <Link to="/your-bid">Your BIDS</Link>
          </li>
          <li>
            <Link to="/message-seller">Message Seller</Link>
          </li>
          <li>
            <Link to="/wallet">Wallet</Link>
          </li>
          <li>
            <Link to="/profile-bid">Profile</Link>
          </li>
          <li>
            <Link to="/inventory">Sell</Link>
          </li>
        </ul>
      </nav>

      <main>
        <div className="product-container">
          {products.map((product) => (
            <ProductBox
              key={product.id}
              productId={product.id}
              imageUrl={product.imageUrl}
              productName={product.name}
              bidAmount={product.bidAmount}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default YourBid;
