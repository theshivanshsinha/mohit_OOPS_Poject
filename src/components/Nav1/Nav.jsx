// Nav.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <header>
      <div className="logo-tagline">
        <h1>BITSBids</h1>
      </div>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search products..." />
        <button className="search-button">Search</button>
      </div>

      <span className="tagline">...bid the BITS way</span>

      <nav>
        <ul>
          {/* Use Link instead of anchor tags */}
          <li id="home">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bid">Bid</Link>
          </li>
          <li>
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
    </header>
  );
}

export default Nav;
