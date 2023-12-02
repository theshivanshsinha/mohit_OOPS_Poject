// Nav.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    // Access the search input value
    const searchInputValue = document.querySelector('.search-input').value;

    // You can use the searchInputValue or any other logic before navigating
    // For example, navigate to a search results page
    navigate(`/search-results?query=${searchInputValue}`);
  };

  return (
    <header className="navhead">
      <div className="logo-tagline">
        <h1>BITSBids</h1>
      </div>
      <div className="search-bar" style={{ position: "relative", left: "60px" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          style={{ height: "10px", width: "450px" }}
        />
        <button className="search-button" style={{ height: "45px", width: "150px" }} onClick={handleSearch}>
          Search
        </button>
      </div>

      <nav style={{ backgroundColor: "black" }}>
        <ul>
          <li id="home">
            <Link to="/Home">Home</Link>
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
