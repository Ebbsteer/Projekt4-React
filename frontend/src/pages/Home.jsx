import React, { useEffect, useState } from "react";
import nebulae from "../assets/img/nebulae.jpeg";
import { NavLink } from "react-router-dom";
import { SolarSystem } from "../components";

const images = [
    "/src/assets/img/mercurymock.png",
    "/src/assets/img/venusmock.png",
    "/src/assets/img/earthmock.png",
    "/src/assets/img/marsmock.png",
    "/src/assets/img/jupitermock.png",
    "/src/assets/img/saturnmock.png",
    "/src/assets/img/uranusmock.png",
    "/src/assets/img/neptunemock.png",
];

const planetNames = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
];

const planetInfo = [
    "1st planet",
    "2nd planet",
    "3rd planet",
    "4th planet",
    "5th planet",
    "6th planet",
    "7th planet",
    "8th planet",
];

const planetDirect = [
    "/planet/mercury",
    "/planet/venus",
    "/planet/earth",
    "/planet/mars",
    "/planet/jupiter",
    "/planet/saturn",
    "/planet/uranus",
    "/planet/neptune",
];

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            document.getElementById("slideshowBIld").classList.add("nextSlide");
            setTimeout(() => {
                document
                    .getElementById("slideshowBIld")
                    .classList.remove("nextSlide");
            }, 1000);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setTimeout(() => {
                document
                    .getElementById("slideshowBIld")
                    .classList.add("nextSlide1");
                setTimeout(() => {
                    document
                        .getElementById("slideshowBIld")
                        .classList.remove("nextSlide1");
                }, 1000);
            }, 1000);
        }, 29000);

        return () => {
            clearInterval(timer);
        };
    }, [images]);

    return (
        <div className="slideshow">
            <p className="slideshowInfo title">{planetNames[currentIndex]}</p>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slideshowbild" id="slideshowBIld" />
            <p className="slideshowInfo text">{planetNames[currentIndex] + " is the " + planetInfo[currentIndex] + " in our solar system"}</p>
            <button className="learn-button">
                <NavLink to={planetDirect[currentIndex]}><span>Learn more</span></NavLink>
            </button>
        </div>
    );
};

const Home = () => {
    var now = new Date();
  
  
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const planetPaths = [
        "/planet/mercury",
        "/planet/venus",
        "/planet/earth",
        "/planet/mars",
        "/planet/jupiter",
        "/planet/saturn",
        "/planet/uranus",
        "/planet/neptune",
    ];

    const handleClick = () => {
        const randomNum = randomNumberInRange(0, planetPaths.length - 1);
        window.location = planetPaths[randomNum];
    };

    return (
        <div id="home">
            <div className="nebulae">
                {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
            </div>

            <div className="Homebox">
                <div className="left">
                    <SolarSystem />
                </div>

                <div className="right">
                    <div className="textbox">
                        <div id="planetoftheday">
                            <Slideshow images={images} />
                        </div>
                    </div>
                    
                    <p onClick={handleClick} className="random-planet-button">
                        Generate random planet
                    </p>
                    
                </div>
            </div>

            
        </div>
    );
};

export default Home;
