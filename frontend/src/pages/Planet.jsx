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
    image: "../img/planets/earth.jpg",
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

  useEffect(() => {
    const planetURL = `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

    const fetchPlanetData = async () => {
      try {
        const response = await fetch(planetURL);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPlanet(data); // Update the state with fetched data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // Call the fetchPlanetData function when the component mounts
    fetchPlanetData();
  }, [id]);

  useEffect(() => {
    const filteredData = planet.moons
      ? planet.moons.filter((moon) =>
          moon.moon.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setSearchResults(filteredData);
  }, [planet, searchTerm]);

  return (
    <>
      <div
        id="planet"
        style={{
          backgroundImage: `url(${bodies.image})`,
        }}
      >
        <div className="planet-container">
          <div className="planet-box">
            <div className="box-title">
              <h1>{bodies.name}</h1>
            </div>
            <br />
            <div className="planet-info">
              <p>{bodies.description}</p>
            </div>
          </div>

          <div className="right-box">
            <input
              type="text"
              placeholder="Search Moon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <td colSpan="2">No results found</td>
                  </tr>
                ) : (
                  searchResults.map((moon, index) => (
                    <tr key={index}>
                      <td>{moon.moon}</td>
                      <td>
                        <a
                          href={moon.rel}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planet;
