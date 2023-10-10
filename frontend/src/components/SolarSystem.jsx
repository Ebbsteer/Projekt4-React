import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";

const Planet = (props) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const colorMap = useLoader(TextureLoader, "earthtexture.jpg");
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(async (state, delta) => {
    await delay(10000);
    meshRef.current.rotation.y += 0.009;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const SolarSystem = () => {
  // const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })

  return (
    <div style={{width: '100%',
    height: '100%' }}>  
    <Canvas flat linear>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Planet position={[0, 0, 0]} />
      <OrbitControls makeDefault />
    </Canvas>
    </div>
  );
};

export default SolarSystem;
