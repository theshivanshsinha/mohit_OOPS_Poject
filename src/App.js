import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct/AddProduct';
import Bid from './components/Bid/Bid';
import Home from './components/Home/Home';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import MessageBidder from './components/MessageBidder/MessageBidder';
import MessageSeller from './components/MessageSeller/MessageSeller';
import ProfileBid from './components/ProfileBid/ProfileBid';
import ProfileSell from './components/ProfileSell/ProfileSell';
import Signup from './components/Signup/Signup';
import SpecificProduct from './components/SpecificProduct/SpecificProduct';
import Wallet from './components/Wallet/Wallet';
import YourBid from './components/YourBid/YourBid';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/bid" element={<Bid />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/message-bidder" element={<MessageBidder />} />
          <Route path="/message-seller" element={<MessageSeller />} />
          <Route path="/profile-bid" element={<ProfileBid />} />
          <Route path="/profile-sell" element={<ProfileSell />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/specific-product" element={<SpecificProduct />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/your-bid" element={<YourBid />} />
        </Routes>
      </Router>
  );
}

export default App;
