import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Line, Html, Preload } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, MOUSE } from "three";
import { useThree } from "@react-three/fiber";
//import { useHistory } from "react-router-dom";

const planetsData = [
    {
        name: "sun",
        texture: "suntexture.jpg",
        initialPosition: [0, 0, 0],
        tiltAngle: 0, // No tilt for the sun
        scale: [1, 1, 1], // Increase the scale to make it larger
        speed: 0.005,
    },
    {
        name: "mercury",
        texture: "mercurytexture.jpg",
        initialPosition: [3, 0, 0],
        tiltAngle: 0, // No axial tilt for Mercury
        scale: [0.2, 0.2, 0.2], // Adjust the scale
        speed: 0.005 * 1.61,
    },
    {
        name: "venus",
        texture: "venustexture.jpg",
        initialPosition: [-4, 0],
        tiltAngle: (177.4 * Math.PI) / 180, // Venus's axial tilt
        scale: [0.4, 0.4, 0.4], // Adjust the scale
        speed: 0.005 * 1.18,
    },
    {
        name: "earth",
        texture: "earthtexture.jpg",
        initialPosition: [6, 0, 0],
        tiltAngle: (23.5 * Math.PI) / 180, // Earth's axial tilt
        scale: [0.4, 0.4, 0.4], // Adjust the scale
        speed: 0.005,
    },
    {
        name: "mars",
        texture: "marstexture.jpg",
        initialPosition: [-8, 0, 0],
        tiltAngle: 25.2, // Mars's axial tilt
        scale: [0.3, 0.3, 0.3], // Adjust the scale
        speed: 0.005 * 0.81,
    },
    {
        name: "jupiter",
        texture: "jupitertexture.jpg",
        initialPosition: [12, 0, 0],
        tiltAngle: (3.13 * Math.PI) / 180, // Jupiter's axial tilt
        scale: [1, 1, 1], // Adjust the scale
        speed: 0.005 * 0.44,
    },
    {
        name: "saturn",
        texture: "saturntexture.jpg",
        initialPosition: [-18, 0, 0],
        tiltAngle: (26.7 * Math.PI) / 180, // Saturn's axial tilt
        scale: [1.5, 1.5, 1.5], // Adjust the scale
        speed: 0.005 * 0.33,
    },
    {
        name: "uranus",
        texture: "uranustexture.jpg",
        initialPosition: [24, 0, 0],
        tiltAngle: (97.8 * Math.PI) / 180, // Uranus's axial tilt
        scale: [1.2, 1.2, 1.2], // Adjust the scale
        speed: 0.005 * 0.23,
    },
    {
        name: "neptune",
        texture: "neptunetexture.jpg",
        initialPosition: [-30, 0, 0],
        tiltAngle: (28.3 * Math.PI) / 180, // Neptune's axial tilt
        scale: [1.1, 1.1, 1.1], // Adjust the scale
        speed: 0.005 * 0.18,
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
      const url =  `/planet/${name}`
      console.log(name)
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
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial transparent opacity={0.7} />
                </mesh>
            )}
            {showTooltip && (
                <Html position={[0, 1.2, 0]}>
                    <div className="tooltip">
                        <h3>{name}</h3>
                        <p style={{fontSize : "3.5rem",}}>Additional information about {name}.</p>
                    </div>
                </Html>
            )}
        </mesh>
    );
};

const SolarSystem = () => {
    // Define a component for individual planets.
    const [isControlsEnabled, setIsControlsEnabled] = useState(true);

    return (
        <Canvas>
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
                enablePan={isControlsEnabled}
                enableRotate={true}
                mouseButtons={{
                    LEFT: MOUSE.ROTATE,
                    MIDDLE: MOUSE.PAN,
                    RIGHT: MOUSE.DOLLY, // Change RIGHT to DOLLY
                }}
            />
            <Preload all />
        </Canvas>
    );
};

export default SolarSystem;
