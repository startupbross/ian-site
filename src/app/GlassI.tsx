"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";

function SpinningI() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Auto-spin: very slow on Y axis
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003; // super subtle spin
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 5, 1]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={1.0}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
        ior={1.52}
        attenuationColor="#a0d8ff"
        attenuationDistance={2}
        envMapIntensity={.6}
        color="white"
      />
    </mesh>
  );
}

export default function GlassI() {
  return (
    <Canvas
      
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 9], fov: 45 }}
>
    
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Spinning Glass "I" */}
      <SpinningI />

      {/* Reflections */}
      <Environment preset="sunset" background={false} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={.2}
          kernelSize={1}
          luminanceThreshold={0.1}
          luminanceSmoothing={.4}
        />
        <Vignette eskil={false} offset={0.4} darkness={0.7} />
      </EffectComposer>

      {/* Orbit controls locked to Y-axis only */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        dampingFactor={0.05}
        rotateSpeed={0.8}
      />
    </Canvas>
  );
}