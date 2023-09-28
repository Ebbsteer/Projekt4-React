import React from "react";
import { useParams } from "react-router-dom";

const Items = () => {
    const {id} = useParams() 
    console.log(id);


  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>
      <div class="tabellDiv">
      <p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p><p>He</p>
      </div>
    </div>
  );
};

export default Items;