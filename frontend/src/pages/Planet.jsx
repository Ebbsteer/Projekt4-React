import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bodyInfo = [
  {
    name: "Mercury",
    image: "../img/planets/mercury.jpg",
    description:
      "Mercury is the closest planet to the Sun and is known for its extreme temperatures. It has a thin atmosphere and is heavily cratered.",
  },
  {
    name: "Venus",
    image: "../img/planets/venus.jpg",
    description:
      "Venus is often called Earth's twin due to its similar size and composition. It has a thick, toxic atmosphere and a scorching surface temperature.",
  },
  {
    name: "Earth",
    image: "../assets/planets/earth.jpg",
    description:
      "Earth is the only known planet with abundant life. It has a diverse climate and is home to a wide variety of ecosystems and species.",
  },
  {
    name: "Mars",
    image: "../img/planets/mars.jpg",
    description:
      "Mars is often called the 'Red Planet' due to its reddish appearance. It has a thin atmosphere and has been a target for robotic exploration.",
  },
  {
    name: "Jupiter",
    image: "../img/planets/jupiter.jpg",
    description:
      "Jupiter is the largest planet in our solar system and is known for its massive size and iconic bands of clouds. It has a strong magnetic field.",
  },
  {
    name: "Saturn",
    image: "../img/planets/saturn.jpg",
    description:
      "Saturn is famous for its stunning ring system, which consists of icy particles. It is a gas giant with a distinct golden hue.",
  },
  {
    name: "Uranus",
    image: "../img/planets/uranus.jpg",
    description:
      "Uranus is a unique planet that rotates on its side, making it appear to roll along its orbital path. It has a blue-green color due to methane in its atmosphere.",
  },
  {
    name: "Neptune",
    image: "../img/planets/neptune.jpg",
    description:
      "Neptune is the farthest known planet from the Sun and is known for its deep blue color. It has strong winds and a dynamic atmosphere.",
  },
  {
    name: "Pluto",
    image: "../img/planets/pluto.jpg",
    description:
      "Pluto is a dwarf planet located in the Kuiper Belt. It was once considered the ninth planet but was reclassified. It has a highly elliptical orbit.",
  },
];
const Planet = () => {
  const { id } = useParams();

  const bodies = bodyInfo.find((p) => p.name.toLowerCase() === id);

  const [planet, setPlanet] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [moonEnglish, setmoonEnglish] = useState({});
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const planetURL = `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

    const fetchPlanetData = async () => {
      // try {
      const response = await fetch(planetURL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response.body);

      const data = await response.json().catch(console.log);
      setPlanet(data); // Update the state with fetched data

      if (data.moons && data.moons.length > 0) {
        const moonDataArray = data.moons.map((moon) =>
          fetch(moon.rel).then((moonResponse) =>
            moonResponse
              .text()
              .then((text) =>
                JSON.parse(
                  text.replaceAll('": ,', '": "",').replaceAll('":,', '": "",')
                )
              )
              .catch((error) => {
                console.log("error", error, moon);
              })
          )
        );

        // for (let i = 0; i < data.moons.length; i++) {
        //   var moonResponse = await fetch(data.moons[i].rel);
        //   if (!moonResponse.ok) {
        //     throw new Error("Network response for moon data was not ok");
        //   }
        //   const moonData = await moonResponse.json();
        //   moonDataArray.push(moonData);
        // }.
        const yeet = await Promise.all(moonDataArray);

        setmoonEnglish(yeet); // Set the moon data as an array
      }
      // } catch (error) {
      //   console.error("Fetch error:", error, planetURL);
      // }
    };

    // Call the fetchPlanetData function when the component mounts
    fetchPlanetData();
  }, [id]);

  //console.log(moonEnglish[index]?.englishName);

  useEffect(() => {
    const filteredData = planet.moons
      ? planet.moons.filter((moon) =>
          moon.moon.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setSearchResults(filteredData);
  }, [planet, searchTerm]);

  var planMass = planet.mass?.massValue.toFixed(2);

  var planetimg = "/src/assets/img/" + id + "mock.png";
  var planetBackground = "/src/assets/planets/" + id + ".png";

  const infohandler = (index) => {
    // Toggle the state for the clicked moon
    setShowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the value
    }));
  };

  const exponent2 = "\u00B2";





  return (
    <>
      <div
        id="planet"
        style={{
          backgroundImage: `url(${planetBackground})`
        }}
      >
        <div className="planet-container" id={id}>
          <div className="planet-box">
            <div
              className="title-img"
              
              style={{
                backgroundImage: `url(${planetimg})`
              }}
            >
              <h1>{bodies.name}</h1>
            </div>

            <div className="planet-info">
              <p>{bodies.description}</p>
            </div>

            <div className="table-container">
              <table className="planet-info-table">
                {" "}
                <thead>
                  <tr>
                    <th className="th1">Gravity</th>
                    <th className="th2">Temperature</th>
                    <th className="th3"> Discovered </th>
                    <th className="th4"> Mass </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {planet.gravity} m/s{exponent2} </td>
                    <td> {planet.avgTemp - 273} °C </td>
                    <td> {planet.discoveryDate}</td>
                    <td>
                      {" "}
                   
  
                   {planMass} x 10<sup>{planet.mass?.massExponent}</sup> kg{" "}
  

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="right-box">
            <input
              className="moon-search"
              type="text"
              placeholder="Search Moon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="table-container moon-container"
                // style={{padding:'10px',}}
                  >
              <table>
                <thead className="moon-table-head">
                  <tr>
                    <th className="planet-table-title-moon">Moons <FontAwesomeIcon icon={faMoon}/></th>
                    <th className="planet-table-title-details">Details</th>
                  </tr>
                </thead>
                <tbody className="moon-table-body">
                  {searchResults.length === 0 ? (
                    <tr>
                      <td colSpan="2">This planet has no moons</td>
                    </tr>
                  ) : (
                    searchResults.map((moon, index) => (
                      <tr  key={index}>
                        <td className="moon-td1">{moonEnglish[index]?.englishName}</td>
                        <td className="moon-td2" onClick={() => infohandler(index)}>
                          {showDetails[index]
                            ? "  Hide Details"
                            : "Show Details"}

                          {showDetails[index] && (
                            
                            <tbody className="planet-table-innertable">
                                
                                  <span className="planet-table-innertable-type">Moon Mass: </span>
                                  <span className="planet-table-innertable-info">
                                    {" "}
                                    {/* Add additional information here */}
                                    {moonEnglish[index]?.mass?.massValue.toFixed( 2 )}
                                    {" "}
                                    x 10
                                    <sup> {moonEnglish[index]?.mass?.massExponent} </sup>
                                    {" "}
                                    kg 
                                    {/* Add more details as needed */}
                                  </span>

                                  <span className="flex-break-planet-table-innertable"></span>

                                  <span className="planet-table-innertable-type">Gravity: </span>
                                  <span className="planet-table-innertable-info"> 
                                    {moonEnglish[index]?.gravity}
                                    m/s
                                    {exponent2}
                                  </span>
                                
                            </tbody>
                            
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planet;
