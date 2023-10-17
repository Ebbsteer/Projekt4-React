import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

function Drop() {
    document.getElementById("droppa").classList.toggle("toggla");
}

const Navbar = () => {
    const cookieName = "cid";

    const allCookies = document.cookie;

    useEffect(() => {
        // Kontrollera om den önskade cookien finns
        if (allCookies.includes(`${cookieName}=`)) {
            document.getElementById("signOutBtn").classList.add("togglaSign");
            // Cookien finns
            console.log(`Cookien ${cookieName} finns.`);
        } else {
            document
                .getElementById("signOutBtn")
                .classList.remove("togglaSign");
            // Cookien finns inte
            console.log(`Cookien ${cookieName} finns inte.`);
        }
    }, []);

    function goToProfile() {
        if (allCookies.includes(`${cookieName}=`)) {
            window.location.href = "/profil";
        } else {
            window.location.href = "/login";
        }
    }

    function refreshPage() {
        if (allCookies.includes(`${cookieName}=`)) {
            window.location.href = "/items/fav";
        } else {
 
        }
    }

    function handleLogOut() {
        fetch("http://localhost:3000/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    alert("You succesfully logged out!");
                    window.location.href = "/";
                } else {
                    alert("Logout failed!");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    }

    function DropPlan() {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDrop = () => {
            setIsOpen(!isOpen);
            document
                .getElementById("myPlanets")
                .classList.toggle("togglaPlanets");
        };

        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.matches("#planetsID")) {
                setIsOpen(false);
                document
                    .getElementById("myPlanets")
                    .classList.remove("togglaPlanets");
            }
        };

        React.useEffect(() => {
            document.addEventListener("click", handleOutsideClick);
            return () => {
                document.removeEventListener("click", handleOutsideClick);
            };
        }, [isOpen]);

        return (
            <div className="droppaPlanets">
                <a onClick={toggleDrop} id="planetsID" className="navLink">
                    PLANETS&#8681;
                </a>
                <div id="myPlanets" className="contentPlanets">
                    <NavLink to="/planet/mercury" className="navLink">
                        Mercury
                    </NavLink>
                    <NavLink to="/planet/venus" className="navLink">
                        Venus
                    </NavLink>
                    <NavLink to="/planet/earth" className="navLink">
                        Earth
                    </NavLink>
                    <NavLink to="/planet/mars" className="navLink">
                        Mars
                    </NavLink>
                    <NavLink to="/planet/jupiter" className="navLink">
                        Jupiter
                    </NavLink>
                    <NavLink to="/planet/saturn" className="navLink">
                        Saturn
                    </NavLink>
                    <NavLink to="/planet/uranus" className="navLink">
                        Uranus
                    </NavLink>
                    <NavLink to="/planet/neptune" className="navLink">
                        Neptune
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <>
            <nav id="nav">
                <div className="inner">
                    <div id="not-droppa">
                        <NavLink to="" className="navLink">
                            <img src="../src/assets/img/logospace.jpg" alt="" />
                        </NavLink>
                        <button onClick={Drop} id="dropknapp">
                            <div className="hamb1"></div>
                            <div className="hamb2"></div>
                            <div className="hamb3"></div>
                        </button>
                    </div>

                    <div id="droppa">
                        <div id="navleft">
                            <NavLink to="/" className="navLink">
                                HOME
                            </NavLink>
                            <NavLink to="/items" className="navLink">
                                ITEMS
                            </NavLink>
                            <DropPlan></DropPlan>
                        </div>

                        <div id="navright">
                            <NavLink className="navLink" onClick={refreshPage}>
                                &#9733;
                            </NavLink>

                            <NavLink className="navLink" onClick={goToProfile}>
                                <FontAwesomeIcon icon={faUserAstronaut} />
                            </NavLink>

                            <button onClick={handleLogOut} id="signOutBtn">
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                ></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
