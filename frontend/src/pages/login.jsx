import React, { useState } from 'react';
import spacepic from "../assets/img/spacepic.jpeg";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Prepare the login data as an object
    const loginData = {
      username,
      password
    };

    console.log(loginData)

    // Send a POST request to your server (localhost:3000 or your server URL)
    fetch('http://localhost:3000/login', { // Update with your server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful login response here
          // For example, you can redirect the user to a different page
          alert('Login successful');
        } else {
          // Handle an unsuccessful login response here
          alert('Login failed');
        }
      })
      .catch((error) => {
        // Handle any network or request error here
        console.error('Login error:', error);
      });
  };

  const handleForgotPassword = () => {
    // Implement logic for password reset here
  };

  return (
    <div id="login" className="login-container">
      <div className="spacepic">
        {/* Background image */}
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button type="button" onClick={handleForgotPassword}>
            Forgot Password
          </button>
          {/* Endast en knapp för att registrera här */}
          <button className="register-button">Register here</button>
          {/* Font link */}
          <a href="https://www.fontspace.com/category/jungle"></a>
        </form>
      </div>
    </div>
  );
};

export default Login;
