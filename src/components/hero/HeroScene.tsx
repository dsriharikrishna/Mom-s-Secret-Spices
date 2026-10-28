'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Realistic Stand-Up Sachet / Barrier Pouch with authentic brand label, top heat-sealed crimp & notches
function SpiceSachet3D({ textureUrl }: { textureUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(textureUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureUrl]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth dynamic cursor parallax tilt (Agrumea style)
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.45,
        4,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        4,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Stand-Up Pouch Main Body (Curved, puffy barrier pouch) */}
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.5, 0.45, 16, 16, 8]} />
        <meshStandardMaterial
          color="#3A1D1A"
          roughness={0.4}
          metalness={0.12}
        />
      </mesh>

      {/* Front Face with Sachet Label Art */}
      <mesh position={[0, -0.15, 0.235]} castShadow>
        <planeGeometry args={[1.96, 2.46, 16, 16]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.32}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top Heat-Sealed Crimp Strip */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[2.04, 0.32, 0.08]} />
        <meshStandardMaterial
          color="#2C1412"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Top Gold Crimp Notch Highlight */}
      <mesh position={[0, 1.38, 0.02]} castShadow>
        <boxGeometry args={[2.06, 0.05, 0.09]} />
        <meshStandardMaterial
          color="#D97706"
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>

      {/* Left Easy-Tear Notch */}
      <mesh position={[-1.02, 1.2, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.12]} />
        <meshStandardMaterial color="#1E0E0C" />
      </mesh>

      {/* Right Easy-Tear Notch */}
      <mesh position={[1.02, 1.2, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.12]} />
        <meshStandardMaterial color="#1E0E0C" />
      </mesh>

      {/* Bottom Gusset Stand */}
      <mesh position={[0, -1.42, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 0.85, 0.1, 32]} />
        <meshStandardMaterial
          color="#2C1412"
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

// Pre-generated deterministic pseudo-random particles
const STATIC_PARTICLES = Array.from({ length: 45 }, (_, i) => {
  const seed1 = Math.sin(i * 12.9898) * 43758.5453;
  const seed2 = Math.sin((i + 1) * 78.233) * 43758.5453;
  const seed3 = Math.sin((i + 2) * 45.164) * 43758.5453;
  const r1 = seed1 - Math.floor(seed1);
  const r2 = seed2 - Math.floor(seed2);
  const r3 = seed3 - Math.floor(seed3);
  return {
    x: (r1 - 0.5) * 7.5,
    y: (r2 - 0.5) * 5.5,
    z: (r3 - 0.5) * 4,
    speed: 0.3 + r1 * 0.6,
    factor: 0.5 + r2 * 2,
  };
});

// 3D Floating Spices: Star Anise & Golden Aroma Particles
function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      STATIC_PARTICLES.forEach((p, i) => {
        dummy.position.set(
          p.x + Math.sin(time * p.speed + p.factor) * 0.25,
          p.y + Math.cos(time * p.speed + p.factor) * 0.3,
          p.z + Math.sin(time * p.speed) * 0.15
        );
        dummy.rotation.set(time * 0.3, time * 0.4, 0);
        dummy.scale.setScalar(0.045 + Math.sin(time + p.factor) * 0.015);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STATIC_PARTICLES.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="#E8A33A"
        emissive="#A9472A"
        emissiveIntensity={0.4}
        roughness={0.4}
      />
    </instancedMesh>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={42} />

        {/* Warm Studio Key & Rim Lighting */}
        <ambientLight intensity={1.1} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.4}
          color="#FFF2D6"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-4, 3, -2]}
          intensity={1.2}
          color="#E8A33A"
        />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#A9472A" />

        {/* Floating 3D Stand-Up Sachet with natural hover physics */}
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
          <SpiceSachet3D textureUrl="/images/products/sample-sachet-garam-masala.jpg" />
        </Float>

        {/* Golden Floating Spice Dust */}
        <FloatingParticles />

        {/* Soft Contact Shadows on Table Surface */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.5}
          scale={5.5}
          blur={2.2}
          far={3.2}
          color="#39251E"
        />
      </Canvas>
    </div>
  );
}
