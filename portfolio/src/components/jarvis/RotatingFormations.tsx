"use client";

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Function to create points along an arc
const createArc = (
  radius: number,
  theta1: number,
  theta2: number,
  phiStart: number,
  phiLength: number,
  density: number
) => {
  const points = [];
  const thetaStep = (theta2 - theta1) / Math.floor(density * (theta2 - theta1));
  const phiStep = phiLength / Math.floor(density * phiLength);

  for (let theta = theta1; theta <= theta2; theta += thetaStep) {
    for (let phi = phiStart; phi <= phiStart + phiLength; phi += phiStep) {
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
  }

  return points;
};

interface FormationProps {
  points: THREE.Vector3[];
  color: string;
  rotationAxis: THREE.Vector3;
  rotationSpeed: number;
  animationSpeed: number;
  mousePosition?: { x: number; y: number };
  fadeInOut?: boolean;
}

function Formation({
  points,
  color,
  rotationAxis,
  rotationSpeed,
  animationSpeed,
  mousePosition = { x: 0, y: 0 },
  fadeInOut = false
}: FormationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const opacityRef = useRef(1);
  const fadeDirectionRef = useRef(-1);

  // State to track current rotation axis and transition
  const [currentAxis, setCurrentAxis] = useState(new THREE.Vector3().copy(rotationAxis));
  const [targetAxis, setTargetAxis] = useState(new THREE.Vector3().copy(rotationAxis));
  const [transitionProgress, setTransitionProgress] = useState(1); // 1 means transition complete
  const [nextTransitionTime, setNextTransitionTime] = useState(Math.random() * 10 + 5); // Random initial time

  const positions = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
      positions[i * 3] = points[i].x;
      positions[i * 3 + 1] = points[i].y;
      positions[i * 3 + 2] = points[i].z;
    }
    return positions;
  }, [points]);

  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const deltaTime = state.clock.getDelta();
    const effectiveSpeed = rotationSpeed * animationSpeed;

    // Mouse influence on rotation
    if (mousePosition) {
      // Apply subtle mouse influence on current rotation
      groupRef.current.rotation.x += mousePosition.y * deltaTime * 0.5;
      groupRef.current.rotation.y += mousePosition.x * deltaTime * 0.5;
    }

    // Check if it's time to change direction
    if (time > nextTransitionTime && transitionProgress >= 1) {
      // Set a new target rotation axis
      const newTarget = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(Math.max(0.2, Math.random()));

      setCurrentAxis(new THREE.Vector3().copy(targetAxis));
      setTargetAxis(newTarget);
      setTransitionProgress(0);

      // Set next transition time (between 8-15 seconds later)
      setNextTransitionTime(time + Math.random() * 7 + 8);
    }

    // Handle smooth transition between rotation axes
    if (transitionProgress < 1) {
      setTransitionProgress(Math.min(transitionProgress + deltaTime * 0.2, 1));

      // Smoothly interpolate between current and target axis
      const t = easeSineInOut(transitionProgress);
      rotationAxis.x = currentAxis.x * (1 - t) + targetAxis.x * t;
      rotationAxis.y = currentAxis.y * (1 - t) + targetAxis.y * t;
      rotationAxis.z = currentAxis.z * (1 - t) + targetAxis.z * t;
    }

    // Apply rotation
    groupRef.current.rotation.x += rotationAxis.x * effectiveSpeed * 0.01;
    groupRef.current.rotation.y += rotationAxis.y * effectiveSpeed * 0.01;
    groupRef.current.rotation.z += rotationAxis.z * effectiveSpeed * 0.01;

    // Fade in/out effect
    if (fadeInOut && pointsRef.current.material instanceof THREE.PointsMaterial) {
      const fadeSpeed = 0.005 * animationSpeed;

      if (fadeDirectionRef.current < 0) {
        opacityRef.current -= fadeSpeed;
        if (opacityRef.current <= 0.2) {
          fadeDirectionRef.current = 1;
        }
      } else {
        opacityRef.current += fadeSpeed;
        if (opacityRef.current >= 1) {
          fadeDirectionRef.current = -1;
        }
      }

      pointsRef.current.material.opacity = opacityRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={color}
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Easing function for smooth transitions
function easeSineInOut(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

interface RotatingFormationsProps {
  animationSpeed?: number;
  color?: string;
  mousePosition?: { x: number; y: number };
}

export function RotatingFormations({
  animationSpeed = 1,
  color = '#d4af37',
  mousePosition = { x: 0, y: 0 }
}: RotatingFormationsProps) {
  // Extract base color metrics
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

  // Create multiple formations with different parameters
  const formations = useMemo(() => {
    const result = [];

    // Create a color palette based on the main color
    const hue = baseColorHue;

    // Arc 1: Semi-circle on the equator
    result.push({
      points: createArc(2.5, 0, Math.PI, Math.PI / 2, Math.PI / 8, 10),
      color: `hsl(${hue}, 90%, 60%)`,
      rotationAxis: new THREE.Vector3(0, 1, 0.2),
      rotationSpeed: 0.5,
      fadeInOut: true
    });

    // Arc 2: Quarter circle
    result.push({
      points: createArc(3, Math.PI / 4, Math.PI * 5 / 4, Math.PI / 4, Math.PI / 6, 12),
      color: `hsl(${hue}, 90%, 55%)`,
      rotationAxis: new THREE.Vector3(0.3, 0.7, 0),
      rotationSpeed: 0.7,
      fadeInOut: false
    });

    // Arc 3: Small dense arc
    result.push({
      points: createArc(3.5, 0, Math.PI / 2, Math.PI / 3, Math.PI / 10, 20),
      color: `hsl(${hue}, 95%, 65%)`,
      rotationAxis: new THREE.Vector3(0.5, 0.2, 0.8),
      rotationSpeed: 0.9,
      fadeInOut: true
    });

    // Arc 4: Large sparse arc
    result.push({
      points: createArc(4, Math.PI / 2, Math.PI * 3 / 2, Math.PI / 2, Math.PI / 5, 8),
      color: `hsl(${hue}, 100%, 50%)`,
      rotationAxis: new THREE.Vector3(0.1, 0.5, 0.2),
      rotationSpeed: 0.4,
      fadeInOut: false
    });

    // Arc 5: Vertical arc
    result.push({
      points: createArc(3.2, 0, Math.PI * 2, 0, Math.PI / 4, 15),
      color: `hsl(${hue}, 85%, 58%)`,
      rotationAxis: new THREE.Vector3(1, 0.1, 0.1),
      rotationSpeed: 0.6,
      fadeInOut: true
    });

    return result;
  }, [baseColorHue]);

  return (
    <>
      {formations.map((formation, i) => (
        <Formation
          key={i}
          {...formation}
          animationSpeed={animationSpeed}
          mousePosition={mousePosition}
        />
      ))}
    </>
  );
}
