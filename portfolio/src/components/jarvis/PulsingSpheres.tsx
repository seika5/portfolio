"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PulsingSphereProps {
  position: [number, number, number];
  baseRadius: number;
  color: string;
  pulseSpeed: number;
  phaseOffset: number;
  animationSpeed: number;
}

function PulsingSphere({ position, baseRadius, color, pulseSpeed, phaseOffset, animationSpeed }: PulsingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef(Math.random() * 0.5 + 0.2);
  const scaleRef = useRef(Math.random() * 0.5 + 0.5);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const effectivePulseSpeed = pulseSpeed * animationSpeed;

    // Pulsing animation
    const scaleFactor = 0.2 * Math.sin(time * effectivePulseSpeed + phaseOffset) + 1;
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Opacity animation
    if (meshRef.current.material instanceof THREE.Material) {
      const opacityValue = 0.3 * Math.sin(time * effectivePulseSpeed * 0.7 + phaseOffset) + 0.5;
      meshRef.current.material.opacity = opacityValue;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[baseRadius, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.5}
        wireframe={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface DataNodeProps {
  position: [number, number, number];
  size: number;
  color: string;
  animationSpeed: number;
}

function DataNode({ position, size, color, animationSpeed }: DataNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowIntensityRef = useRef(Math.random() * 0.3 + 0.7);
  const glowDirectionRef = useRef(Math.random() > 0.5 ? 1 : -1);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Subtle glow effect
    if (meshRef.current.material instanceof THREE.Material) {
      const glowSpeed = 0.01 * animationSpeed;

      glowIntensityRef.current += glowSpeed * glowDirectionRef.current;

      if (glowIntensityRef.current > 1.2) {
        glowDirectionRef.current = -1;
      } else if (glowIntensityRef.current < 0.7) {
        glowDirectionRef.current = 1;
      }

      meshRef.current.material.opacity = glowIntensityRef.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface PulsingSpheresProps {
  animationSpeed?: number;
  color?: string;
}

export function PulsingSpheres({ animationSpeed = 1, color = '#d4af37' }: PulsingSpheresProps) {
  // Extract base color metrics for creating variations
  const baseColorHue = useMemo(() => {
    const hex = color.toLowerCase();

    if (hex.startsWith('#')) {
      // Convert hex to HSL
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;

      if (max !== min) {
        if (max === r) {
          h = 60 * ((g - b) / (max - min)) + (g < b ? 360 : 0);
        } else if (max === g) {
          h = 60 * ((b - r) / (max - min)) + 120;
        } else {
          h = 60 * ((r - g) / (max - min)) + 240;
        }
      }

      return h;
    }

    return 45; // Default to gold-ish hue
  }, [color]);

  // Generate spheres with different parameters
  const spheres = useMemo(() => {
    const result = [];
    const hue = baseColorHue;

    // Add pulsing spheres
    for (let i = 0; i < 3; i++) { // Reduced from 4 to 3 spheres
      const angle = (Math.PI * 2 * i) / 3;
      const radius = 2 + Math.random() * 1.5;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = (Math.random() - 0.5) * 2;

      result.push({
        position: [x, y, z] as [number, number, number],
        baseRadius: 0.1 + Math.random() * 0.15,
        color: `hsl(${hue}, 95%, ${55 + Math.random() * 15}%)`, // Richer gold, less whitish
        pulseSpeed: 0.5 + Math.random() * 0.5,
        phaseOffset: Math.random() * Math.PI * 2
      });
    }

    return result;
  }, [baseColorHue]);

  // Generate data nodes (small glowing points)
  const dataNodes = useMemo(() => {
    const nodes = [];
    const nodeCount = 40; // Reduced from 50 to 40 nodes
    const hue = baseColorHue;

    for (let i = 0; i < nodeCount; i++) {
      // Place nodes randomly within a certain volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 3;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodes.push({
        position: [x, y, z] as [number, number, number],
        size: 0.03 + Math.random() * 0.04,
        color: `hsl(${hue}, 100%, ${60 + Math.random() * 15}%)` // Richer gold, less whitish
      });
    }

    return nodes;
  }, [baseColorHue]);

  return (
    <>
      {spheres.map((sphere, i) => (
        <PulsingSphere
          key={`sphere-${i}`}
          {...sphere}
          animationSpeed={animationSpeed}
        />
      ))}

      {dataNodes.map((node, i) => (
        <DataNode
          key={`node-${i}`}
          {...node}
          animationSpeed={animationSpeed}
        />
      ))}
    </>
  );
}
