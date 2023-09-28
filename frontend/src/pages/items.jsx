import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

const Items = () => {
    const {id} = useParams() 
    console.log(id);

    const itemList=("https://api.le-systeme-solaire.net/rest/bodies/")

    const [planets, setPlanets] = useState([])
  
    const fetchUserData = () => {
      fetch(itemList)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);
          setPlanets(data.bodies);
        })
    }
  
    useEffect(() => {
      fetchUserData()
    }, [])


  return (
    <div id="home">
      <div className="nebulae">
        {/* <img className="nebaulae" alt="nebaulae" src={nebulae} draggable={false}/> */}
      </div>
      <div className="tabellDiv">
      <table>
          <thead>
          <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Moons</th>
              <th>Temperature</th>
              <th>Discovered</th>
              <th>Gravity</th>
          </tr>
          {planets.map((e)=>(<tr><td key={e.id}>{e.name}</td></tr>))}
          </thead>
      </table>
      </div>
    </div>
  );
};

export default Items;