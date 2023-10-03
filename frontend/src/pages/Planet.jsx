import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const infohandler  = () => { 
    var element = document.getElementsByClassName("details");

  }

  return (
    <>
      <div
        id="planet"
        style={{
          backgroundImage: `url(${planetBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="planet-container">
          <div className="planet-box">
            <div
              className="title-img"
              style={{
                backgroundImage: `url(${planetimg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "30vw",
                width: "30vw",
                height: "30vw",
              }}
            >
              <h1>{bodies.name}</h1>
            </div>
            <div></div>

            <br />
            <div className="planet-info">
              <p>{bodies.description}</p>
            </div>

            <div className="table-container">
              <table>
                {" "}
                <thead>
                  <tr>
                    <th>gravity</th>
                    <th>temperature</th>
                    <th> Discovered </th>

                    <th> mass </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {planet.gravity} m.s-2 </td>
                    <td> {planet.avgTemp - 273} °C </td>
                    <td> {planet.discoveryDate}</td>
                    <td>
                      {" "}
                      {planMass} x 10^ {planet.mass?.massExponent} kg{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="right-box">
          <input
              type="text"
              placeholder="Search Moon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginTop: '5%',
            marginBottom:'-5%' }}
            />
            <div className="table-container">
              
              <table>
                <thead>
                  <tr>
                    <th>Moon</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.length === 0 ? (
                    <tr>
                      <td colSpan="2">This planet has no moons</td>
                    </tr>
                  ) : (
                    searchResults.map((moon, index) => (
                      <tr key={index}>
                        <td>{moonEnglish[index]?.englishName}</td>
                        <td>
                          <a
                            onClick={infohandler}
                          >
                            View Details
                          </a>
                          <div className="details">    <td> difggjdif  </td>   </div>
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
