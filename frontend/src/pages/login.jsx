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

    console.log(loginData);

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
          // For example, you can display an alert
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

  const handleRegister = () => {
    // Redirect to http://localhost:5173/profil
    window.location.href = 'http://localhost:5173/src/pages/profil.jsx';
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
          {/* Button to navigate to http://localhost:5173/profil */}
          <button className="register-button" onClick={handleRegister}>
            Register here
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
