'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group } from 'three';

/**
 * A single lightweight 3D object: a wireframe icosahedron wrapped around a
 * glowing core, drifting slowly and reacting subtly to the pointer.
 * Deliberately small — one geometry, no textures, no postprocessing —
 * so it stays cheap on the main thread and GPU.
 */
function Gem() {
  const group = useRef<Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    // Slow ambient rotation + gentle pointer parallax
    group.current.rotation.y = t * 0.15 + pointer.x * 0.35;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.1 + pointer.y * -0.25;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh scale={0.72}>
          <icosahedronGeometry args={[1.45, 0]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#8B5CF6"
            emissiveIntensity={0.9}
            roughness={0.25}
            metalness={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      className="!pointer-events-none"
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} color="#22D3EE" />
      <Suspense fallback={null}>
        <Gem />
      </Suspense>
    </Canvas>
  );
}
