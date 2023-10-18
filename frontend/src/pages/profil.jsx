import React, { useState, useEffect } from "react";
import profil from "../assets/img/nebulae1.png";

const Profil = () => {
    const [userID, setUserID] = useState("User ID");
    const [userUsername, setUserUsername] = useState("Username");
    const [userQuestion, setUserQuestion] = useState("Question");
    const [userImage, setUserImage] = useState("User image");
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch user data, including the profile picture, from the server
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
                setProfileImage(userData.profileImage); // Set profile image if available
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []); // This useEffect will run when the component mounts.

    const handleSave = () => {
        // Convert profileImage to base64 and save it along with other user data
        if (profileImage) {
            fetch("http://localhost:3000/user/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username: userUsername,
                    image: profileImage
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
                })
                .catch((error) => {
                    console.error("Error saving user data:", error);
                });

            setIsEditing(false);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        // Convert the selected image to base64
        const reader = new FileReader();
        reader.onload = function (e) {
            setProfileImage(e.target.result);
        };
        reader.readAsDataURL(selectedImage);
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
                            <>
                                <div className="box-profile-image">
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
                                        <button className="button-upload">Upload Image</button>
                                    </div>
                                </div>
                                <button onClick={handleSave}>Save</button>
                                    
                            </>
                        ) : (
                            <>
                                {profileImage && (
                                    <img
                                        src={profileImage}
                                        className="profile-image"
                                        alt="Profile Image"
                                    />
                                )}
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
                                onChange={(e) => setUserUsername(e.target.value)}
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
                        {/* <div className="inputs">
                            <span>Image</span>
                            <input
                                type="text"
                                readOnly={!isEditing}
                                value={userImage}
                                onChange={(e) => setUserImage(e.target.value)}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
