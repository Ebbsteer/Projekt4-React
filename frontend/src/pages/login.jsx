import React, { useState } from "react";
import Cookies from "js-cookie";
import spacepic from "../assets/img/spacepic.jpeg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Prepare the login data as an object
        const loginData = {
            username,
            password,
        };

        console.log(loginData);

        // Send a POST request to your server (localhost:3000 or your server URL)
        fetch("http://localhost:3000/login", {
            // Update with your server URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle a successful login response here
                    // For example, you can display an alert
                    alert("Login successful");
                } else {
                    // Handle an unsuccessful login response here
                    alert("Login failed");
                }
            })
            .catch((error) => {
                // Handle any network or request error here
                console.error("Login error:", error);
            });
    };

    const handleForgotPassword = () => {
        // Implement logic for password reset here
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Förhindra standardbeteendet för knappen
        setIsRegistering(!isRegistering);
    };

    return (
        <div id="login" className="login-container">
            <div className="spacepic">{/* Background image */}</div>
            <div className="login-container">
                <h2>{isRegistering ? "Register" : "Login"}</h2>
                <form className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="show-password-button"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {isRegistering && (
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-type Password"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                    )}
                    <button
                        type="button"
                        onClick={isRegistering ? handleRegister : handleLogin}
                    >
                        {isRegistering ? "Register" : "Login"}
                    </button>
                    {!isRegistering && (
                        <button type="button" onClick={handleForgotPassword}>
                            Forgot Password
                        </button>
                    )}
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        Remember Me
                    </label>
                    <button
                        className="register-button"
                        onClick={handleRegister}
                    >
                        {isRegistering ? "Back to Login" : "Register here"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
