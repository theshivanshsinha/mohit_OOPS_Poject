import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from the server using Axios
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      {/* Header Section */}
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

      {/* Navigation Section */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bid">Bid</Link></li>
          <li><Link to="/yourbids">Your BIDS</Link></li>
          <li><Link to="/messageseller">Message Seller</Link></li>
          <li><Link to="/wallet">Wallet</Link></li>
          <li><Link to="/profile-bid">Profile</Link></li>
          <li><Link to="/inventory">Sell</Link></li>
        </ul>
      </nav>

      {/* Main Content Section */}
      <main>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product-box">
              <Link to={`/specificproduct/${product.id}`}>
                <img className="product-image" src={product.imageSrc} alt={product.title} />
                <div className="product-title">{product.title}</div>
              </Link>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bid;
