import axios from "axios";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css";

function Signup() {

  const baseURL = 'http://192.168.137.1:8080';

  const [formData, setFormData] = useState({
    firstname: '',
    hostel: '',
    lastname: '',
    bitsid: '',
    email: '',
    username: '',
    phNumber: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@hyderabad\.bits-pilani\.ac\.in$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      setError('Email must end with @hyderabad.bits-pilani.ac.in');
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters with at least one number and one special character');
      return false;
    }

    return true;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await axios.post(`${baseURL}/users`, formData);
  
      // Handle the response as needed
      console.log("Form data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };
  

  return (
    <div className='outerbox'>
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="firstname">First name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="hostel">Hostel:</label>
              <input
                type="text"
                id="hostel"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="lastname">Last name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="bitsid">BITS ID:</label>
              <input
                type="text"
                id="bitsid"
                name="bitsid"
                value={formData.bitsid}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label htmlFor="phNumber">Ph. Number:</label>
              <input
                type="tel"
                id="phNumber"
                name="phNumber"
                value={formData.phNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="error-message">{error}</div>
          <div className="haveanaccount">
            <Link to="/login">Have an account?</Link>
          </div>
          <button type="submit" onClick={handleSubmit}>Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
