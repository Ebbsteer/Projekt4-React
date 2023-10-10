import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const SolarSystem = () => {
  const containerRef = useRef();
  const camera = useRef();
  const controls = useRef();
  let isUserInteracting = false;
  let spinTimeout;

  useEffect(() => {
    const container = containerRef.current;
    container.style.height = '400px';

    const scene = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.current.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('../src/assets/textures/earthtexture.jpg');

    const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    controls.current = new OrbitControls(camera.current, renderer.domElement);

    controls.current.addEventListener('start', () => {
      isUserInteracting = true;
      clearTimeout(spinTimeout);
    });

    controls.current.addEventListener('end', () => {
      isUserInteracting = false;
      spinTimeout = setTimeout(() => {
        startSpinning();
      }, 10000);
    });

    function startSpinning() {
      if (!isUserInteracting) {
       
        sphere.rotation.y += 0.005;
        
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      startSpinning();
      renderer.render(scene, camera.current);
    };

    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.current.dispose();
      renderer.dispose(); // Dispose of the renderer to prevent memory leaks
    };
  }, []);

  return (
    <div ref={containerRef}>
      <orbitControls ref={controls} args={[camera.current]} enableZoom={true} />
    </div>
  );
};

export default SolarSystem;
