import React, { useEffect, useState }  from "react";
import nebulae from "../assets/img/nebulae.jpeg";

const Home = () => {

    const [num, setNum] = useState(0);

    const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random()
      *(max - min + 1)) + min;
    };

  const handleClick=()=>{
    setNum(randomNumberInRange(1,8))
    if(num==1){
      window.location = `/planet/mercury`
    }
  };

  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>
      <div className="Homebox">
        <h2>Number is: {num}</h2>
      <button onClick={handleClick}>
                Click Me Generate
            </button>
        <div className="textbox">
          <h1>INFORMATION ABOUT PLANETS</h1>
          <p>Did you know that Venus rotates in the opposite 
            direction to most planets in our solar system?
             While the majority of planets, including Earth, 
             rotate counterclockwise, Venus rotates clockwise. 
             This means that if you were standing on the surface of Venus, 
             the sun would rise in the west and set in the east, 
             which is quite different from what we experience on Earth!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
