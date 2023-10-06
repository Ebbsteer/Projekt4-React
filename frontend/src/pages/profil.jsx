import React, { useState, useEffect } from 'react';
import profil from "../assets/img/profilwallpaper.gif";

const Profil = () => {
  const [readonly, setReadonly] = useState(true);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || 'John');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || 'Doe');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'john.doe12@gmail.com');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'johndoe12');
  const [country, setCountry] = useState(localStorage.getItem('country') || 'United States');

  useEffect(() => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    localStorage.setItem('country', country);
  }, [firstName, lastName, email, userName, country]);

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Password</span>
              <input
                type="text"
                readOnly={readonly}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <span>Security Question</span>
              <input
                type="text"
                readOnly={readonly}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
