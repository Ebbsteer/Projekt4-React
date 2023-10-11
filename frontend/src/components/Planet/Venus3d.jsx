import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";

const Planet = (props) => {
  const colorMap = useLoader(TextureLoader, "venustexture.jpg");
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (!active) {
      meshRef.current.rotation.y += 0.009;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Venus3d = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Planet position={[0, 0, 0]} />
      <OrbitControls makeDefault maxDistance={13} minDistance={2} />
    </Canvas>
  );
};

export default Venus3d;
