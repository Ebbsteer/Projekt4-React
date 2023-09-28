import React from "react";
import { useParams } from "react-router-dom";

const planetInfo = [
    {
      id: 1,
      name: "Mercury",
      image: "../img/planets/mercury.jpg",
      description: "Mercury is the closest planet to the Sun and is known for its extreme temperatures. It has a thin atmosphere and is heavily cratered.",
    },
    {
      id: 2,
      name: "Venus",
      image: "../img/planets/venus.jpg",
      description: "Venus is often called Earth's twin due to its similar size and composition. It has a thick, toxic atmosphere and a scorching surface temperature.",
    },
    {
      id: 3,
      name: "Earth",
      image: "../img/planets/earth.jpg",
      description: "Earth is the only known planet with abundant life. It has a diverse climate and is home to a wide variety of ecosystems and species.",
    },
    {
      id: 4,
      name: "Mars",
      image: "../img/planets/mars.jpg",
      description: "Mars is often called the 'Red Planet' due to its reddish appearance. It has a thin atmosphere and has been a target for robotic exploration.",
    },
    {
      id: 5,
      name: "Jupiter",
      image: "../img/planets/jupiter.jpg",
      description: "Jupiter is the largest planet in our solar system and is known for its massive size and iconic bands of clouds. It has a strong magnetic field.",
    },
    {
      id: 6,
      name: "Saturn",
      image: "../img/planets/saturn.jpg",
      description: "Saturn is famous for its stunning ring system, which consists of icy particles. It is a gas giant with a distinct golden hue.",
    },
    {
      id: 7,
      name: "Uranus",
      image: "../img/planets/uranus.jpg",
      description: "Uranus is a unique planet that rotates on its side, making it appear to roll along its orbital path. It has a blue-green color due to methane in its atmosphere.",
    },
    {
      id: 8,
      name: "Neptune",
      image: "../img/planets/neptune.jpg",
      description: "Neptune is the farthest known planet from the Sun and is known for its deep blue color. It has strong winds and a dynamic atmosphere.",
    },
    {
      id: 9,
      name: "Pluto",
      image: "../img/planets/pluto.jpg",
      description: "Pluto is a dwarf planet located in the Kuiper Belt. It was once considered the ninth planet but was reclassified. It has a highly elliptical orbit.",
    },
  ];

const Planet = () => {
  const { id } = useParams();
  console.log(id);

  const planet = planetInfo.find((p) => p.id === parseInt(id, 10));
  



  return (
    <><div id="planet" style={{
        backgroundImage: `url(${planet.image})`,
      }}>
    
      <div className="planet-info">
        <h1>{planet.name}</h1>
        <p>{planet.description}</p>
      </div>
    </div>

    
    </>
  );
};

export default Planet;
