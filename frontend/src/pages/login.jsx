import React, { useState } from "react";
import Cookies from "js-cookie";
import spacepic from "../assets/img/spacepic.jpeg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [resetPasswordUsername, setResetPasswordUsername] = useState(""); // New state for resetting password username

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
        setResettingPassword(true); // Set the state to indicate password reset
        setUsername(""); // Clear the username field
    };

    const handleResetPassword = () => {
        // Retrieve the security question and answer from localStorage based on the username
        const storedData = localStorage.getItem(resetPasswordUsername);

        if (storedData) {
            const { securityQuestion: storedSecurityQuestion } = JSON.parse(storedData);

            if (securityQuestion === storedSecurityQuestion) {
                // Implement your password reset logic here
                alert("Password reset successful");
                setResettingPassword(false); // Reset the state to hide the reset form
            } else {
                alert("Incorrect security answer");
            }
        } else {
            alert("Username not found");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent the default behavior of the button
        setIsRegistering(!isRegistering);

        // Prepare the registration data as an object
        const registerData = {
            username,
            password,
            securityQuestion,
        };

        console.log(registerData);

        // Store registration data in localStorage
        localStorage.setItem(username, JSON.stringify(registerData));

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(registerData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Registration successful");
                } else {
                    alert("Registration failed");
                }
            })
            .catch((error) => {
                console.error("Registration error:", error);
            });
    };

    return (
        <div id="login" className="login-container">
            <div className="spacepic">{/* Background image */}</div>
            <div className="login-container">
                <h2>{isRegistering ? "Register" : "Login"}</h2>
                {resettingPassword ? ( // Display password reset form when resettingPassword is true
                    <form className="reset-password-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={resetPasswordUsername}
                            onChange={(e) => setResetPasswordUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Security Question: What is your mom's name?"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                        />
                        <button type="button" onClick={handleResetPassword}>
                            Reset Password
                        </button>
                    </form>
                ) : (
                    // Display login/registration form when resettingPassword is false
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
                            <>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Re-type Password"
                                    value={retypePassword}
                                    onChange={(e) => setRetypePassword(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Security Question: What is your mom's name?"
                                    value={securityQuestion}
                                    onChange={(e) => setSecurityQuestion(e.target.value)}
                                />
                            </>
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
                )}
            </div>
        </div>
    );
};

export default Login;
