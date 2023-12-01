// Wallet.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Wallet.css';


const Wallet = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');

  useEffect(() => {
    const getUsernameFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('username') || '';
    };

    setUsername(getUsernameFromURL());
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${username}`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleAddAmount = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/users/${username}`, {
        balance: balance + parseFloat(amountToAdd),
      });
      console.log('Amount added successfully:', response.data);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error adding amount:', error);
    }
  };

  return (
    <div >
      <header>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
        <span className="tagline">...bid the BITS way</span>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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

      <div className='walletbox'>
        <div className="wallet-container">
          <main className="main">
            <div className="wallet-content">
              <h2 className="wallet-heading">Your Wallet</h2>
              <div className="balance-container">
                <label htmlFor="balance" className="balance-label">
                  Current Balance:
                </label>
                <span className="balance-value">{balance} BTC</span>
              </div>

              <div className="add-amount-container">
                <label htmlFor="amount" className="amount-label">
                  Add Amount:
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="amount-input"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(e.target.value)}
                  required
                />
              </div>

              <button type="button" className="add-button" onClick={handleAddAmount}>
                Add Bitcoins
              </button>

              <p className="note">Minimum 200 BITCOINS are required in the wallet</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
