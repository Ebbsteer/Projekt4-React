import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Items = () => {
const[activeButtons, setActiveButtons]=useState(false);

const toggleClass = (planetId) => {
  const updatedButtons = {...activeButtons};
  updatedButtons[planetId] = !updatedButtons[planetId];
  setActiveButtons(updatedButtons);

  localStorage.setItem("activeButtons", JSON.stringify(updatedButtons));
};

const handleButtonClick = (planetId, planetI) => {
  toggleClass(planetId);

  fetch("http://localhost:3000/add-favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planetId),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
    console.log(planetId, planetI);
};

  
  const { id } = useParams();

  const itemList = "https://api.le-systeme-solaire.net/rest/bodies/";

  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(()=>{
    const storedButtons = JSON.parse(localStorage.getItem("activeButtons")) || {};
    setActiveButtons(storedButtons);
  },[]);


  const sortlistName =() => {
    




  }
  

  const fetchUserData = () => {
    fetch(itemList)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPlanets(data.bodies);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const filteredData = planets.filter((item) =>
      item.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [planets, searchTerm]);


  return (
    <div id="home">
      <div className="nebulae"></div>
      <div className="tabellDiv">
        <input
          className="search"
          type="text"
          placeholder="Sök..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="itemtable">
          <thead>
            <tr>
              <th className="item-table-title-favo"></th>
              <th className="item-table-title-nr">Nr</th>
              <th className="item-table-title-type">Type</th>
              <th onClick={sortlistName} className="item-table-title-name">Name</th>
              <th className="item-table-title-temp">Temperature- (K)</th>
              <th className="item-table-title-grav">Gravity</th>
              <th className="item-table-title-disc">Discovered</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr>
                <td colSpan="5">Inga resultat hittades</td>
              </tr>
            ) : (
              searchResults.map((planet,i) => (
                <tr key={planet.id}>
                  <td className="item-table-info-favo">
                    <button id="favoriteButton"
                    className={activeButtons[planet.id] ? 'makeFavorite' : ''} 
                      onClick={() => handleButtonClick(planet.id, i)}
                    >
                      <p id="btnContent">&#9733;</p>
                    </button>
                  </td>
                  <td className="item-table-info-nr">{i}</td>
                  <td className="item-table-info-type">{planet.bodyType}</td>
                  <td className="item-table-info-name">{planet.englishName}</td>
                  <td className="item-table-info-temp">{planet.avgTemp}</td>
                  <td className="item-table-info-grav">{planet.gravity}</td>
                  <td className="item-table-info-disc">{planet.discoveryDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
