import React, { useState } from 'react';
import { Button, Input, Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://192.168.137.1:8080/users/${email}`);
      if (response.data) {
        if (response.data.password === password) {
          alert(`Welcome, ${response.data.username}!`);
          navigate('/home', { state: { username: response.data.username } });
        } else {
          alert('Incorrect Password. Please check your email and password.');
          console.error('Login failed: Incorrect password');
        }
      } else {
        alert('User not found. Please check your email and password.');
        console.error('Login failed: User not found');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginButtonClick = () => {
    handleLogin();
  };

  return (
    <Box className="login-outer-box">
      <Box className="container">
        <Heading as="h2">Login</Heading>
        <span className="bitsbids-text">BITSBids</span>
        <form>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Button type="button" onClick={handleLoginButtonClick} id="btn">
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
