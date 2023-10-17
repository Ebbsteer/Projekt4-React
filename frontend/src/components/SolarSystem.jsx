import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Line, Html, Preload,PerspectiveCamera  } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, MOUSE } from "three";
import { useThree } from "@react-three/fiber";
//import { useHistory } from "react-router-dom";


const planetsData = [
    {
        name: "Sun",
        texture: "suntexture.jpg",
        initialPosition: [0, 0, 0],
        tiltAngle: 0, // No tilt for the sun
        scale: [1, 1, 1], // Increase the scale to make it larger
        speed: 0.005,
        temp: "6000 °C", // temperature off planet
        description: "The suns inner temperature is around 15 000 000 °C. But the surfase temperature at 6000 °C is enough to make diamonds boil.", // information about the planet
    },
    {
        name: "Mercury",
        texture: "mercurytexture.jpg",
        initialPosition: [3, 0, 0],
        tiltAngle: 0, // No axial tilt for Mercury
        scale: [0.2, 0.2, 0.2], // Adjust the scale
        speed: 0.005 * 1.61,
        temp: "167 °C", // temperature off planet
        description: "Mercury is the closest planet to the Sun and is known for its extreme temperatures. It has a thin atmosphere and is heavily cratered.", // information about the planet
    },
    {
        name: "Venus",
        texture: "venustexture.jpg",
        initialPosition: [-4, 0],
        tiltAngle: (177.4 * Math.PI) / 180, // Venus's axial tilt
        scale: [0.4, 0.4, 0.4], // Adjust the scale
        speed: 0.005 * 1.18,
        temp: "464 °C", // temperature off planet
        description: "Venus is often called Earth's twin due to its similar size and composition. It has a thick, toxic atmosphere and a scorching surface temperature.", // information about the planet
    },
    {
        name: "Earth",
        texture: "earthtexture.jpg",
        initialPosition: [6, 0, 0],
        tiltAngle: (23.5 * Math.PI) / 180, // Earth's axial tilt
        scale: [0.4, 0.4, 0.4], // Adjust the scale
        speed: 0.005,
        temp: "15 °C", // temperature off planet
        description: "Earth is the only known planet with abundant life. It has a diverse climate and is home to a wide variety of ecosystems and species.", // information about the planet
    },
    {
        name: "Mars",
        texture: "marstexture.jpg",
        initialPosition: [-8, 0, 0],
        tiltAngle: 25.2, // Mars's axial tilt
        scale: [0.3, 0.3, 0.3], // Adjust the scale
        speed: 0.005 * 0.81,
        temp: "-63 °C", // temperature off planet
        description: "Mars is often called the 'Red Planet' due to its reddish appearance. It has a thin atmosphere and has been a target for robotic exploration.", // information about the planet
    },
    {
        name: "Jupiter",
        texture: "jupitertexture.jpg",
        initialPosition: [12, 0, 0],
        tiltAngle: (3.13 * Math.PI) / 180, // Jupiter's axial tilt
        scale: [1, 1, 1], // Adjust the scale
        speed: 0.005 * 0.44,
        temp: "-108 °C", // temperature off planet
        description: "Jupiter is the largest planet in our solar system and is known for its massive size and iconic bands of clouds. It has a strong magnetic field.", // information about the planet
    },
    {
        name: "Saturn",
        texture: "saturntexture.jpg",
        initialPosition: [-18, 0, 0],
        tiltAngle: (26.7 * Math.PI) / 180, // Saturn's axial tilt
        scale: [1.5, 1.5, 1.5], // Adjust the scale
        speed: 0.005 * 0.33,
        temp: "-139 °C", // temperature off planet
        description: "Saturn is famous for its stunning ring system, which consists of icy particles. It is a gas giant with a distinct golden hue.", // information about the planet
    },
    {
        name: "Uranus",
        texture: "uranustexture.jpg",
        initialPosition: [24, 0, 0],
        tiltAngle: (97.8 * Math.PI) / 180, // Uranus's axial tilt
        scale: [1.2, 1.2, 1.2], // Adjust the scale
        speed: 0.005 * 0.23,
        temp: "-197 °C", // temperature off planet
        description: "Uranus is a unique planet that rotates on its side, making it appear to roll along its orbital path. It has a blue-green color due to methane in its atmosphere.", // information about the planet
    },
    {
        name: "Neptune",
        texture: "neptunetexture.jpg",
        initialPosition: [-30, 0, 0],
        tiltAngle: (28.3 * Math.PI) / 180, // Neptune's axial tilt
        scale: [1.1, 1.1, 1.1], // Adjust the scale
        speed: 0.005 * 0.18,
        temp: "-218 °C", // temperature off planet
        description: "Neptune is the farthest known planet from the Sun and is known for its deep blue color. It has strong winds and a dynamic atmosphere.", // information about the planet
    },
];

// Helper function to create an orbit line based on a given radius.
const createOrbitLine = (radius) => {
    const points = [];
    const segments = 128; // You can adjust this for the smoothness of the line
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        points.push(x, 0, z);
    }

    const orbitGeometry = new BufferGeometry();
    orbitGeometry.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(points), 3)
    );

    return (
        <line geometry={orbitGeometry}>
            <lineBasicMaterial color="white" linewidth={1}  opacity={0}/>
        </line>
    );
};

const Planet = ({
    name,
    texture,
    initialPosition,
    tiltAngle,
    scale,
    speed /*history*/,
    temp,
    description,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const colorMap = useLoader(TextureLoader, texture); // Load the planet's texture
    const meshRef = useRef(); // Create a reference for the planet's 3D mesh
    const [active, setActive] = useState(false); // State to track if the planet is active (hovered).
    const { camera } = useThree(); // Access the camera from the three.js context.
   





    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const orbitRadius = initialPosition[0]; // Distance from the sun

        const updatePosition = () => {
            setAngle(angle + speed);

            const x = orbitRadius * Math.cos(angle);
            const z = orbitRadius * Math.sin(angle);

            meshRef.current.position.set(x, 0, z);
        };
        // Create an animation loop to update the planet's position in its orbit.
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (!active) updatePosition();
        };

        // Start animation loop
        animationFrameId = requestAnimationFrame(animate);

        // Clean up the animation frame when the component unmounts.
        return () => cancelAnimationFrame(animationFrameId);
    }, [active, angle]);

    // Use a render loop to rotate the planet (unless it's active).
    useFrame(async (state, delta) => {
        if (!active) {
            meshRef.current.rotation.y += 0.009;
            meshRef.current.rotation.x = tiltAngle;
        }
    });
    //let angle = 0;
    const handlePlanetPointerOver = () => {
        setShowTooltip(true);
        setActive(true); // Activate the planet
    };

    // When you hover out of a planet
    const handlePlanetPointerOut = () => {
        setShowTooltip(false);
        setActive(false); // Deactivate the planet
    };


    const handleClick = () => {
      const url =  `/planet/${name.toLowerCase()}`
      console.log(name.toLowerCase())
      if(url==`/planet/sun`){
          url=``
      }
      window.location.href = url ; // Navigate to the specified URL
    };
  


    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePlanetPointerOver}
            onPointerOut={handlePlanetPointerOut}
            onClick={handleClick}
            position={initialPosition}
            scale={scale}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={colorMap} />
            {showTooltip && (
                <mesh>
                
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial transparent opacity={0.1} />
                </mesh>
            )}
            {showTooltip && (
                <Html position={[0, -1, 0]}>
                    <div className="tooltip" id={name}>
                        <p className="name">{name}</p>
                        <p className="description">{description}</p>
                        <p className="temp">avg temp: {temp}</p>
                        <p className="click-info">Click for more info</p>
                    </div>
                </Html>
            )}
        </mesh>
    );
};

const SolarSystem = () => {
    // Define a component for individual planets.
    
    const cameraRef = useRef();

    // Function to handle the scroll event
    const handleScroll = () => {
      console.log("bjfhgufhguf")


      }

    

    return (
        <Canvas onWheel={handleScroll} onWheelCapture={handleScroll}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {planetsData.map((planet, index) => (
                <React.Fragment key={index}>
                    <Planet {...planet} />
                    {createOrbitLine(planet.initialPosition[0])}
                </React.Fragment>
            ))}
            <OrbitControls
                enableDamping
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
        
                mouseButtons={{
                    LEFT: MOUSE.ROTATE,
                    MIDDLE: MOUSE.PAN,
                    RIGHT: MOUSE.DOLLY, // Change RIGHT to DOLLY
                }}
            />
            <Preload all />
            <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[90, 90,0 ]} // Adjust the camera's position
      />

        </Canvas>
    );
};

export default SolarSystem;
