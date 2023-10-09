import React, { useState, useEffect } from "react";
import profil from "../assets/img/profilwallpaper.gif";

const Profil = () => {
    // Initialize state variables with default values or retrieve from localStorage
    const [firstName, setFirstName] = useState(
        localStorage.getItem("firstName") || "Your First Name"
    );
    const [lastName, setLastName] = useState(
        localStorage.getItem("lastName") || "Your Last Name"
    );
    const [userName, setUserName] = useState(
        localStorage.getItem("username") || "Your Username"
    );
    const [password, setPassword] = useState(
        localStorage.getItem("password") || "Your Password"
    );
    const [securityQuestion, setSecurityQuestion] = useState(
        localStorage.getItem("securityQuestion") || "Your Security Question"
    );

    // State variable to manage edit mode
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/user", {
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch user data");
                }
            })
            .then((userData) => {
                // Update state with the user data from the server
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUserName(userData.userName);
                setPassword(userData.password);
                setSecurityQuestion(userData.securityQuestion);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleSave = () => {
        // Save the edited data to your storage or server
        // For now, we'll just simulate saving by updating localStorage
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("username", userName);
        localStorage.setItem("password", password);
        localStorage.setItem("securityQuestion", securityQuestion);

        // Exit edit mode
        setIsEditing(false);
    };

    return (
        <div id="profil">
            <img className="profilwallpaper" src={profil} alt="Profile Wallpaper" />
            <div className="container">
                <div className="card">
                    <div className="info">
                        <span>Profile Info</span>
                        {isEditing ? (
                            <button onClick={handleSave}>Save</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                    </div>
                    <div className="forms">
                        <div className="inputs">
                            <span>First Name</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <span>Last Name</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <span>Username</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <span>Password</span>
                            <input
                                type="password"
                                readOnly={!isEditing}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <span>Security Question</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={securityQuestion}
                                onChange={(e) => setSecurityQuestion(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
