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
      <select>
              <option value="">A-Z</option>
              <option value="">Type</option>
      </select>
      <table>
          <thead>
          <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Temperature- (F)</th>
              <th>Discovered</th>
              <th>Gravity</th>
          </tr>
          </thead>
          <tbody>
          {planets.map((e)=>(
            <tr>
              <td key={e.id}>{e.bodyType}</td>
              <td key={e.id1}>{e.englishName}</td>
              <td key={e.id2}>{e.avgTemp}</td>
              <td key={e.id3}>{e.discoveryDate}</td>
              <td key={e.id4}>{e.gravity}</td>
            </tr>))}
         </tbody>
      </table>
      </div>
    </div>
  );
};

export default Items;