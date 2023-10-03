import React from 'react';
import profil from "../assets/img/profilwallpaper.gif";

const Profil = () => {
    return (
        <div id="profil">
            <img className="profilwallpaper" src={profil} alt="Profile Wallpaper" />
            {/* Other content for your Profil component */}
        </div>
    );
};

export default Profil;
