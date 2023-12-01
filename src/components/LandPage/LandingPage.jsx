// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className='coin'>
        <img
          src="https://media.giphy.com/media/RJVwGvc2U9RjYwrc1p/giphy.gif"
          alt="Bitcoin GIF"
          style={{ height: '400px', width: '400px' }}
        />
      </div>
      <div className="landing-content">
        <h1 className="landing-title">BitsBids</h1>
        <p className="landing-description">
          Your platform for exciting bids and great deals!
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button">
            Login
          </Link>
          <Link to="/signup" className="landing-button">
            Signup
          </Link>
        </div>
        <p className="landing-author">Created by Mohit Kohli</p>
      </div>
    </div>
  );
};

export default LandingPage;
