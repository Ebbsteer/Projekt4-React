import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Items = () => {
  const { id } = useParams();
  console.log(id);

  const itemList = "https://api.le-systeme-solaire.net/rest/bodies/";

  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
          type="text"
          placeholder="Sök..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Num</th>
              <th>Type</th>
              <th>Name</th>
              <th>Temperature- (K)</th>
              <th>Discovered</th>
              <th>Gravity</th>
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
                  <td>
                    <button
                      onClick={() => {
                        fetch("http://localhost:3000/add-favorite", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(planet.id),
                        })
                          .then((response) => {
                            console.log(response);
                          })
                          .catch((error) => {
                            console.error("Fetch error:", error);
                          });
                      }}
                    >
                      &#9733;
                    </button>
                  </td>
                  <td>{i}</td>
                  <td>{planet.bodyType}</td>
                  <td>{planet.englishName}</td>
                  <td>{planet.avgTemp}</td>
                  <td>{planet.discoveryDate}</td>
                  <td>{planet.gravity}</td>
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
