import React, { useState } from 'react';
import spacepic from "../assets/img/spacepic.jpeg";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  

  const handleLogin = () => {
    // Implementera inloggningslogik här (till exempel använd en API-förfrågan med Node.js)
  };

  const handleForgotPassword = () => {
    // Implementera logik för att återställa lösenord här
  };

  return (
    <div id="login">
      <div className="spacepic">
        {/* Bakgrundsbild */}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
