import React from "react";
import { useParams } from "react-router-dom";

const Planet = () => {
const {id} = useParams() 
console.log(id);


  return (
    <>
        <div id="planet">
    


           
        </div>
    </>
  );
};

export default Planet;