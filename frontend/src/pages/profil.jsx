import React, { useState, useEffect } from "react";
import profil from "../assets/img/nebulae1.png";

const Profil = () => {
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

    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

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
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUserName(userData.userName);
                setPassword(userData.password);
                setSecurityQuestion(userData.securityQuestion);
                // Retrieve profile image URL here if available
                // setProfileImage(userData.profileImage);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleSave = () => {
        // Save user data to your server
        fetch("http://localhost:3000/save-user", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                userName,
                password,
                securityQuestion,
                profileImage, // Include profile image data in the request
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to save user data");
                }
            })
            .then((data) => {
                console.log("User data saved:", data);
                // Update profileImage with the URL of the uploaded image
                setProfileImage(profileImage);
            })
            .catch((error) => {
                console.error("Error saving user data:", error);
            });

        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setProfileImage(URL.createObjectURL(selectedImage));
    };

    return (
        <div id="profil">
            <img className="profilwallpaper" src={profil} alt="Profile Wallpaper" />
            <div className="container">
                <div className="card">
                    <div className="info">
                        <span>Profile Info</span>
                        {isEditing ? (
                            <div>
                                {profileImage && (
                                    <div className="profile-image">
                                        <img src={profileImage} alt="Profile Image" />
                                    </div>
                                )}
                                <div className="upload-button">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <button>Upload Image</button>
                                </div>
                                <button onClick={handleSave}>Save</button>
                            </div>
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
