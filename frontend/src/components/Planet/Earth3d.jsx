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
  //const controls = useRef();
  // Set up state for the hovered and active state
  //const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame(async (state, delta) => {
    if (!active) {
      meshRef.current.rotation.y += 0.009;
    }
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      //  onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setActive(!active)}
      onPointerOut={(event) => setActive(!active)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Earth3d = () => {
  // const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Planet position={[0, 0, 0]} />
      <OrbitControls makeDefault maxDistance={13} minDistance={2} />
    </Canvas>
  );
};

export default Earth3d;
