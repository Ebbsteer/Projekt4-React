import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";

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
    position: [4, 0, 0],
    tiltAngle: (177.4 * Math.PI) / 180, // Venus's axial tilt
    scale: [0.4, 0.4, 0.4], // Adjust the scale
  },
  {
    name: "earth",
    texture: "earthtexture.jpg",
    position: [5, 0, 0],
    tiltAngle: (23.5 * Math.PI) / 180, // Earth's axial tilt
    scale: [0.4, 0.4, 0.4], // Adjust the scale
  },
  {
    name: "mars",
    texture: "marstexture.jpg",
    position: [7, 0, 0],
    tiltAngle: 25.2, // Mars's axial tilt
    scale: [0.3, 0.3, 0.3], // Adjust the scale
  },
  {
    name: "jupiter",
    texture: "jupitertexture.jpg",
    position: [11, 0, 0],
    tiltAngle: (3.13 * Math.PI) / 180, // Jupiter's axial tilt
    scale: [2, 2, 2], // Adjust the scale
  },
  {
    name: "saturn",
    texture: "saturntexture.jpg",
    position: [17, 0, 0],
    tiltAngle: (26.7 * Math.PI) / 180, // Saturn's axial tilt
    scale: [1.5, 1.5, 1.5], // Adjust the scale
  },
  {
    name: "uranus",
    texture: "uranustexture.jpg",
    position: [23, 0, 0],
    tiltAngle: (97.8 * Math.PI) / 180, // Uranus's axial tilt
    scale: [1.2, 1.2, 1.2], // Adjust the scale
  },
  {
    name: "neptune",
    texture: "neptunetexture.jpg",
    position: [29, 0, 0],
    tiltAngle: (28.3 * Math.PI) / 180, // Neptune's axial tilt
    scale: [1.1, 1.1, 1.1], // Adjust the scale
  },
];

const SolarSystem = () => {
  const Planet = ({ name, texture, position, tiltAngle, scale }) => {
    const colorMap = useLoader(TextureLoader, texture);
    const meshRef = useRef();
    const [active, setActive] = useState(false);

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
    
          const animationFrameId = requestAnimationFrame(function animate() {
            updatePosition();
            animationFrameId = requestAnimationFrame(animate);
          });
    
          return () => cancelAnimationFrame(animationFrameId);
        }
      }, [active, position]);
    useFrame(async (state, delta) => {
      if (!active) {
        meshRef.current.rotation.y += 0.009;
        meshRef.current.rotation.x = tiltAngle;
      }
    });

    return (
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setActive(true);
        }}
        onPointerOut={() => {
          setActive(false);
        }}
        position={position}
        scale={scale}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    );
  };

  const [isControlsEnabled, setIsControlsEnabled] = useState(true);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {planetsData.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
      <OrbitControls
        enableDamping
        // maxDistance={13}
        // minDistance={2}
        enableZoom={isControlsEnabled}
        enablePan={isControlsEnabled}
        enableRotate={isControlsEnabled}
      />
    </Canvas>
  );
};

export default SolarSystem;
