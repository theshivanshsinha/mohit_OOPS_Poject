// Nav.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <header className="navhead">
      <div className="logo-tagline">
        <h1>BITSBids</h1>
      </div>
      <div className="search-bar" style={{position:"relative",left:"60px"}}>
        <input type="text" className="search-input" placeholder="Search products..." style={{height:"10px",width:"450px"}} />
        <button className="search-button" style={{height:"45px",width:"150px"}}>Search</button>
      </div>

      <nav style={{backgroundColor:"black"}}>
        <ul>
          <li id="home">
            <Link to="/Home">Home</Link>
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
