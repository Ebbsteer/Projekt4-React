import React, { useState, useEffect } from "react";
import profil from "../assets/img/nebulae1.png";

const Profil = () => {
    const [userID, setUserID] = useState("User ID");
    const [userUsername, setUserUsername] = useState("Username");
    const [userQuestion, setUserQuestion] = useState("Question");
    const [userImage, setUserImage] = useState("User image");

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
                setUserID(userData.id);
                setUserUsername(userData.username);
                setUserQuestion(userData.question);
                setUserImage(userData.image);
                // Retrieve profile image URL here if available
                // setProfileImage(userData.profileImage);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleSave = () => {
        // Save user data to your server
        fetch("http://localhost:3000/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username: userUsername,
                image: userImage,
            }),
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
            <img
                className="profilwallpaper"
                src={profil}
                alt="Profile Wallpaper"
            />
            <div className="container">
                <div className="card">
                    <div className="info">
                        <span>Profile Info</span>
                        {isEditing ? (
                            <div>
                                {profileImage && (
                                    <div className="profile-image">
                                        <img
                                            src={profileImage}
                                            alt="Profile Image"
                                        />
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
                            <>
                                <img
                                    src={profileImage}
                                    className="profile-image"
                                ></img>
                                <button onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                    <div className="forms">
                        <div className="inputs">
                            <span>ID</span>
                            <p>{userID}</p>
                        </div>
                        <div className="inputs">
                            <span>Username</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={userUsername}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <span>Question</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={userQuestion}
                                onChange={(e) =>
                                    setUserQuestion(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputs">
                            <span>Image</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={userImage}
                                onChange={(e) => setUserImage(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
