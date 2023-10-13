import React, { useRef, useState, useEffect } from "react";
import {  Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Line, Html } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, MOUSE  } from "three";
import { useThree } from "@react-three/fiber";



const planetsData = [
  {
    name: "sun",
    texture: "suntexture.jpg",
    position: [0, 0, 0],
    tiltAngle: 0, // No tilt for the sun
    scale: [1, 1, 1], // Increase the scale to make it larger
  },
  {
    name: "mercury",
    texture: "mercurytexture.jpg",
    position: [3, 0, 0],
    tiltAngle: 0, // No axial tilt for Mercury
    scale: [0.2, 0.2, 0.2], // Adjust the scale
  },
  {
    name: "venus",
    texture: "venustexture.jpg",
    position: [-4, 0],
    tiltAngle: (177.4 * Math.PI) / 180, // Venus's axial tilt
    scale: [0.4, 0.4, 0.4], // Adjust the scale
  },
  {
    name: "earth",
    texture: "earthtexture.jpg",
    position: [6, 0, 0],
    tiltAngle: (23.5 * Math.PI) / 180, // Earth's axial tilt
    scale: [0.4, 0.4, 0.4], // Adjust the scale
  },
  {
    name: "mars",
    texture: "marstexture.jpg",
    position: [-8, 0, 0],
    tiltAngle: 25.2, // Mars's axial tilt
    scale: [0.3, 0.3, 0.3], // Adjust the scale
  },
  {
    name: "jupiter",
    texture: "jupitertexture.jpg",
    position: [12, 0, 0],
    tiltAngle: (3.13 * Math.PI) / 180, // Jupiter's axial tilt
    scale: [1, 1, 1], // Adjust the scale
  },
  {
    name: "saturn",
    texture: "saturntexture.jpg",
    position: [-18, 0, 0],
    tiltAngle: (26.7 * Math.PI) / 180, // Saturn's axial tilt
    scale: [1.5, 1.5, 1.5], // Adjust the scale
  },
  {
    name: "uranus",
    texture: "uranustexture.jpg",
    position: [24, 0, 0],
    tiltAngle: (97.8 * Math.PI) / 180, // Uranus's axial tilt
    scale: [1.2, 1.2, 1.2], // Adjust the scale
  },
  {
    name: "neptune",
    texture: "neptunetexture.jpg",
    position: [-30, 0, 0],
    tiltAngle: (28.3 * Math.PI) / 180, // Neptune's axial tilt
    scale: [1.1, 1.1, 1.1], // Adjust the scale
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
      <lineBasicMaterial color="white" linewidth={1} />
    </line>
  );
};

const SolarSystem = () => {
   
  // Define a component for individual planets.
  const Planet = ({ name, texture, position, tiltAngle, scale }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoveredPlanet, setHoveredPlanet] = useState(null); // Track hovered planet
    const colorMap = useLoader(TextureLoader, texture); // Load the planet's texture
    const meshRef = useRef(); // Create a reference for the planet's 3D mesh
    const [active, setActive] = useState(false); // State to track if the planet is active (hovered).

    const [lastPosition, setLastPosition] = useState(position); // Store the last position
  
 const { camera } = useThree(); // Access the camera from the three.js context.
    camera.position.set(0, 30, 20); // Adjust the values as needed
    camera.lookAt(0, 0, 0); // Look at the center of the solar system

    useEffect(() => {
        
      if (!active) {
        const orbitRadius = position[0]; // Distance from the sun
        const orbitSpeed = 0.005; // Adjust the speed as needed
        let angle = 0;

        const updatePosition = () => {
            const x = orbitRadius * Math.cos(angle);
            const z = orbitRadius * Math.sin(angle);
            meshRef.current.position.set(x, 0, z);
            angle += orbitSpeed;
          };
        const stopAnimation = () => {
          cancelAnimationFrame(animationFrameId);
          //setLastPosition(meshRef.current.position.clone()); // Store the last position
        };
        // Create an animation loop to update the planet's position in its orbit.
        let animationFrameId;

        const animate = () => {
          if (hoveredPlanet !== name) {
            updatePosition();
          }
          else{
            setLastPosition(meshRef.current.position)
          }
          if (meshRef.current.position.distanceTo(lastPosition) <= 0.001) {
            stopAnimation();
          } else {
            animationFrameId = requestAnimationFrame(animate);
          }
        };
  
        // Start animation loop
        animationFrameId = requestAnimationFrame(animate);
  
        // Clean up the animation frame when the component unmounts.
        return () => cancelAnimationFrame(animationFrameId);
      }
    }, [active, position, hoveredPlanet]);

    // Use a render loop to rotate the planet (unless it's active).
    useFrame(async (state, delta) => {
      if (!active) {
        meshRef.current.rotation.y += 0.009;
        meshRef.current.rotation.x = tiltAngle;
      }
    });
    //let angle = 0;
    const handlePlanetPointerOver = () => {
        setHoveredPlanet(name);
        setShowTooltip(true);
        setActive(true); // Activate the planet
       
      };
  
      // When you hover out of a planet
      const handlePlanetPointerOut = () => {
        setHoveredPlanet(null);
        setShowTooltip(false);
        setActive(false); // Deactivate the planet
       //angle = Math.atan2(meshRef.current.position.z, meshRef.current.position.x);
      };

    return (
      <mesh
        ref={meshRef}
       onPointerOver={handlePlanetPointerOver}
        onPointerOut={handlePlanetPointerOut}
        position={position}
        scale={scale}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={colorMap} />

        {showTooltip && (
          <mesh>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial transparent opacity={0.7} />
          </mesh>
        )}

        {showTooltip && (
          <Html position={[0, 1.2, 0]}>
            <div className="tooltip">
              <h3>{name}</h3>
              <p>Additional information about {name}.</p>
            </div>
          </Html>
        )}
      </mesh>
    );
  };

  const [isControlsEnabled, setIsControlsEnabled] = useState(true);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {planetsData.map((planet, index) => (
        <React.Fragment key={index}>
          <Planet {...planet} />
          {createOrbitLine(planet.position[0])}
        </React.Fragment>
      ))}
      <OrbitControls
        enableDamping
        enableZoom={false}
        enablePan={isControlsEnabled}
        enableRotate={isControlsEnabled}
        mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ZOOM,  // Change RIGHT to DOLLY
          }}
      />
    </Canvas>
  );
};

export default SolarSystem;
