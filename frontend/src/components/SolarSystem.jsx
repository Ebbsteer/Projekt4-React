import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls from three/examples/jsm/controls/OrbitControls

extend({ OrbitControls });

const SolarSystem = () => {
  const containerRef = useRef();
  const camera = useRef();
  const controls = useRef();

  useEffect(() => {
    const container = containerRef.current;

    // Set a fixed height for the container
    container.style.height = '400px'; // You can adjust the height as needed

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    camera.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.current.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    // Load the Earth texture image (make sure the path is correct)
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('../src/assets/textures/earthtexture.jpg'); // Adjust the path as needed

    // Create a material with the Earth texture
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    controls.current = new OrbitControls(camera.current, renderer.domElement);

    // Animation loop
    // Animation loop
const animate = () => {
    requestAnimationFrame(animate);
  
    // Clear the previous rotation

  
    // Apply the new rotation
    sphere.rotation.y += 0.005; // Rotate the Earth sphere slowly
  
    renderer.render(scene, camera.current);
  };
  
  animate();
  

    // Event listener for window resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <orbitControls
        ref={controls}
        args={[camera.current]} // Pass camera.current as an argument
        enableZoom={true} // You can customize controls options as needed
      />
    </div>
  );
};

export default SolarSystem;
