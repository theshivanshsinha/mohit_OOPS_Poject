// Login.jsx
import React, { useState } from 'react';
import { Button, Input, Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Make a POST request to your login endpoint
      const response = await axios.post('/user/login', loginData);

      if (response.data.success) {
        // Show a custom toast on successful login
        alert(`Welcome, ${username}!`);

        // Redirect or perform actions for successful login
        console.log('Login successful!');
      } else {
        // Show a custom error toast on unsuccessful login
        alert('Wrong Password. Please check your username and password.');

        // Handle authentication failure, show error messages, etc.
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during login:', error);
    }
  };

  // Function to handle login button click
  const handleLoginButtonClick = () => {
    handleLogin();
  };

  return (
    <Box className="logouterbox">
      <Box className="container">
        <Heading as="h2">Login</Heading>
        <span className="bitsbids-text">BITSBids</span>
        <form>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <Button type="button" onClick={handleLoginButtonClick}>
            Login
          </Button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Box>
    </Box>
  );
}

export default Login;
