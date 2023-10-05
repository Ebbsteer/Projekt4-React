import React, { useEffect, useState } from "react";
import nebulae from "../assets/img/nebulae.jpeg";

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
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

const Slideshow = ({ images, names }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, [images, names]);

  return (
    <div className="slideshow">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slideshowbild"/>
      <p>{planetNames[currentIndex]}</p>
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

            <h1>Timer: {seconds} sekunder</h1>

            <h2>{day}</h2>
          </div>
          <div>
            <button onClick={handleClick}>
              Click Me Generate
            </button>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
