import React, { useState, useEffect } from 'react';
import profil from "../assets/img/profilwallpaper.gif";

const Profil = () => {
  const [readonly, setReadonly] = useState(true);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || 'Your Name');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || 'Your Last Name');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Your Username');
  const [Password, setPassword] = useState(localStorage.getItem('Password') || 'Your Password');
  const [SecurityQuestion, setSecurityQuestion] = useState(localStorage.getItem('Security Question') || 'Your Security Answer');

  useEffect(() => {
    localStorage.setItem('Your Name', firstName);
    localStorage.setItem('Your last Name', lastName);
    localStorage.setItem('Your userName', userName);
    localStorage.setItem('Your Password', Password);
    localStorage.setItem('Your Security Question', SecurityQuestion);
  }, [firstName, lastName, userName, Password, SecurityQuestion]);

  const toggleReadonly = () => {
    setReadonly(!readonly);
  };

  return (
    <div id="profil">
      <img className="profilwallpaper" src={profil} alt="Profile Wallpaper" />
      {/* Other content for your Profil component */}
      
      <div className="container">
        <div className="card">
          <div className="info">
            <span>Profile Info</span>
            <button onClick={toggleReadonly}>
              {readonly ? 'Edit' : 'Save'}
            </button>
          </div>
          <div className="forms">
            <div className="inputs">
              <span>First Name</span>
              <input
                type="text"
                readOnly={readonly}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Last Name</span>
              <input
                type="text"
                readOnly={readonly}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Username</span>
              <input
                type="text"
                readOnly={readonly}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Password</span>
              <input
                type="text"
                readOnly={readonly}
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Security Question</span>
              <input
                type="text"
                readOnly={readonly}
                value={SecurityQuestion}
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
