"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PointMaterial } from '@react-three/drei';

// Helper function to generate a random point on a sphere
const randomPointOnSphere = (radius: number, variability: number) => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);

  // Add smaller variability to ensure particles stay closer to the sphere surface
  const r = radius + (Math.random() - 0.5) * variability;

  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);

  return [x, y, z];
};

interface ParticleSystemProps {
  count: number;
  radius: number;
  color: string;
}

export function ParticleSystem({ count, radius, color }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Reduced variability to keep particles closer to the sphere surface
      const [x, y, z] = randomPointOnSphere(radius, radius * 0.15);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count, radius]);

  // Generate sizes for particles with more variation
  const sizes = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Create varied sizes with a preference for smaller particles
      sizes[i] = Math.pow(Math.random(), 2) * 0.5 + 0.08;
    }
    return sizes;
  }, [count]);

  // Create original positions copy for reference
  const originalPositions = useMemo(() => {
    return new Float32Array(positions);
  }, [positions]);

  // Setup animation
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Animate particles with subtle movements but maintain overall sphere shape
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Get original position as base
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Apply very gentle oscillation
      const amplitude = 0.02;
      const frequency = 0.15;
      // Use particle index for varied phase
      const phase = i * 0.01;

      positionArray[i3] = origX + Math.sin(time * frequency + phase) * amplitude;
      positionArray[i3 + 1] = origY + Math.cos(time * frequency + phase * 1.3) * amplitude;
      positionArray[i3 + 2] = origZ + Math.sin(time * frequency * 0.7 + phase * 0.5) * amplitude;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors={false}
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#d4af37" // Consistent gold color
        opacity={0.8}
      />
    </points>
  );
}
