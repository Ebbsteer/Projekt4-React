import React from "react";
import nebulae from "../assets/img/nebulae.jpeg";

const Home = () => {
  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>
      <div className="Homebox">
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
