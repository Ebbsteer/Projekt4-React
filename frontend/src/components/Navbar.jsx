import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";

function Drop(){
    document.getElementById("droppa").classList.toggle("toggla");
}

const Navbar = () => {

    function handleLogOut(){
        fetch("http://localhost:3000/logout", {
            // Update with your server URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    alert("you logged out");
                } else {
                    alert("Logout failed");
                }
            })
            .catch((error) => {
                // Handle any network or request error here
                console.error("Login error:", error);
            });
    }

    function DropPlan(){
        const[isOpen, setIsOpen] = useState(false);
    
        const toggleDrop=()=>{
            setIsOpen(!isOpen);
            document.getElementById("myPlanets").classList.toggle("togglaPlanets");
        };
    
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.matches('#planetsID')) {
              setIsOpen(false);
              document.getElementById("myPlanets").classList.remove("togglaPlanets");
            }
          };
    
          React.useEffect(() => {
            document.addEventListener('click', handleOutsideClick);
            return () => {
              document.removeEventListener('click', handleOutsideClick);
            };
          }, [isOpen]);

          return(
                <div className="droppaPlanets">
                    <a onClick={toggleDrop} id="planetsID" className="navLink">PLANETS&#8681;</a>
                    <div id="myPlanets" className="contentPlanets">
                        <NavLink to="/planet/mercury" className="navLink">Mercury</NavLink>
                        <NavLink to="/planet/venus" className="navLink">Venus</NavLink>
                        <NavLink to="/planet/earth" className="navLink">Tellus</NavLink>
                        <NavLink to="/planet/mars" className="navLink">Mars</NavLink>
                        <NavLink to="/planet/jupiter" className="navLink">Jupiter</NavLink>
                        <NavLink to="/planet/saturn" className="navLink">Saturn</NavLink>
                        <NavLink to="/planet/uranus" className="navLink">Uranus (lol)</NavLink>
                        <NavLink to="/planet/neptune" className="navLink">Neptune</NavLink>
                    </div>
                </div>
          );
        
    }

    return <>
    <div id="nav">
        <NavLink to="" className="navLink">
            <img src="../src/assets/img/logospace.jpg" alt="" />
        </NavLink>

        <button onClick={Drop} id="dropknapp">
            <div className="hamb1"></div>
            <div className="hamb2"></div>
            <div className="hamb3"></div>
        </button>

        <div id="droppa">
            <div id="navleft">
                <NavLink to="/" className="navLink">HOME</NavLink>
                <NavLink to="/items" className="navLink">ITEMS</NavLink>
                <DropPlan></DropPlan>
            </div>
           
            <div id="navright">
                <NavLink to="/items/fav" className="navLink">&#9733;</NavLink>


                <NavLink to="/login" className="navLink">
                <FontAwesomeIcon icon={faUserAstronaut} />
                </NavLink>

                <button onClick={handleLogOut}>Hej</button>

            </div>
        </div>
    </div>
    </>;
};

export default Navbar;
