'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ConchShell3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current; // Store ref early for cleanup

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b35, 0.8, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x35a7ff, 0.6, 10);
    pointLight2.position.set(3, -2, -3);
    scene.add(pointLight2);

    // Load the conch shell model
    const loader = new GLTFLoader();
    loader.load(
      '/Conch_shell_LOD0.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Scale and position the model
        model.scale.setScalar(2);
        model.position.set(0, 0, 0);

        // Enable shadows for the model
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Enhance the material
            if (child.material) {
              child.material.envMapIntensity = 1;
              child.material.roughness = 0.3;
              child.material.metalness = 0.1;
            }
          }
        });

        scene.add(model);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );    // Mouse interaction for model rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let lastInteractionTime = Date.now();
    let isInteracting = false;
    const RESET_TIMEOUT = 3000; // 3 seconds of inactivity before reset

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
      lastInteractionTime = Date.now();
      isInteracting = true;
    };

    const onMouseDown = () => {
      lastInteractionTime = Date.now();
      isInteracting = true;
    };

    const onMouseUp = () => {
      lastInteractionTime = Date.now();
    };

    const onWheel = () => {
      lastInteractionTime = Date.now();
      isInteracting = true;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('wheel', onWheel);    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const currentTime = Date.now();
      const timeSinceLastInteraction = currentTime - lastInteractionTime;

      // Check if we should reset to default position
      if (timeSinceLastInteraction > RESET_TIMEOUT && isInteracting) {
        isInteracting = false;
        // Gradually reset to default rotation
        targetRotationX = 0;
        targetRotationY = 0;
      }

      // Smooth mouse-based rotation or reset to default
      if (modelRef.current) {
        modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.05;
        modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.05;
      }

      // Update controls
      controls.update();

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
          Sacred Conch Shell
        </h1>        <p className="text-sm opacity-80 max-w-sm">
          Click and drag to rotate • Scroll to zoom • Auto-rotation enabled
          <br />
          <span className="text-xs opacity-60">Returns to default after 3s of inactivity</span>
        </p>
      </div>

      {/* Controls info */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-70 z-10">        <div className="bg-black bg-opacity-30 p-3 rounded-lg backdrop-blur-sm">
          <p>🖱️ Mouse: Interactive rotation</p>
          <p>🔄 Auto-rotate: Enabled</p>
          <p>🔍 Scroll: Zoom in/out</p>
          <p>⏱️ Auto-reset: 3s timeout</p>
        </div>
      </div>
    </div>
  );
}
