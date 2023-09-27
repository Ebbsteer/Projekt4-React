import React from "react";
import nebulae from "../assets/img/nebulae.jpeg";


const Home = () => {
  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>
      <div className="Homebox">
        <input type="text" className="textbox" placeholder="Write something here..." />
      </div>
    </div>
  );
};

export default Home;
