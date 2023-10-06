import React, { useEffect, useState } from "react";
import nebulae from "../assets/img/nebulae.jpeg";
import { NavLink } from 'react-router-dom';

const images = [
  '/src/assets/img/mercurymock.png',
  '/src/assets/img/venusmock.png',
  '/src/assets/img/earthmock.png',
  '/src/assets/img/marsmock.png',
  '/src/assets/img/jupitermock.png',
  '/src/assets/img/saturnmock.png',
  '/src/assets/img/uranusmock.png',
  '/src/assets/img/neptunemock.png',
];

const planetNames = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];

const planetInfo = [
  '1st planet',
  '2nd planet',
  '3rd planet',
  '4th planet',
  '5th planet',
  '6th planet',
  '7th planet',
  '8th planet',
];

const planetDirect=[
  '/planet/mercury',
  '/planet/venus',
  '/planet/earth',
  '/planet/mars',
  '/planet/jupiter',
  '/planet/saturn',
  '/planet/uranus',
  '/planet/neptune',
];



const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [images]);
  
  return (
    <div className="slideshow">
      <h1 className="slideshowInfo">{planetNames[currentIndex]}</h1>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slideshowbild"/>
      <p className="slideshowInfo">{planetNames[currentIndex] + " is the " + planetInfo[currentIndex] + " in our solar system"}</p>
      <NavLink to={planetDirect[currentIndex]} className="learnBtn">Learn more</NavLink>
    </div>
  );
};

const Home = () => {

  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);


  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("HEJ");

  // Av Skitkod AB

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds >= 5) {
          setMessage("goober");
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  const [num, setNum] = useState(Math.floor(Math.random()
    * (8 - 1 + 1)) + 1);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  const handleClick = () => {
    setNum(randomNumberInRange(1, 8))
    if (num == 1) {
      window.location = `/planet/mercury`
    }
    else if (num == 2) {
      window.location = `/planet/venus`
    }
    else if (num == 3) {
      window.location = `/planet/earth`
    }
    else if (num == 4) {
      window.location = `/planet/mars`
    }
    else if (num == 5) {
      window.location = `/planet/jupiter`
    }
    else if (num == 6) {
      window.location = `/planet/saturn`
    }
    else if (num == 7) {
      window.location = `/planet/uranus`
    }
    else if (num == 8) {
      window.location = `/planet/neptune`
    }
  };

  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>

      <div className="Homebox">
        <div className="left">

          <div id="planetoftheday">
            <Slideshow images={images}/>
          </div>

        </div>

        <div className="right">

          <div className="textbox">
            <h1>INFORMATION ABOUT PLANETS</h1>

            <p>
              Did you know that Venus rotates in the opposite
              direction to most planets in our solar system?
              While the majority of planets, including Earth,
              rotate counterclockwise, Venus rotates clockwise.
              This means that if you were standing on the surface of Venus,
              the sun would rise in the west and set in the east,
              which is quite different from what we experience on Earth!
            </p>
            <button onClick={handleClick} className="rndBtn">
              Generate random planet
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
