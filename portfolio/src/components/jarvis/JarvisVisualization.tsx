"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { RotatingFormations } from './RotatingFormations';
import { PulsingSpheres } from './PulsingSpheres';
import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export function JarvisVisualization() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isMouseMovingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());

  const goldColor = "#d4af37";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      const dx = (x - lastMousePosRef.current.x) / Math.max(deltaTime, 0.01);
      const dy = (y - lastMousePosRef.current.y) / Math.max(deltaTime, 0.01);

      lastMousePosRef.current = { x, y };

      velocityRef.current.x = velocityRef.current.x * 0.8 + dx * 0.2;
      velocityRef.current.y = velocityRef.current.y * 0.8 + dy * 0.2;

      setMousePosition({ x, y });
      isMouseMovingRef.current = true;

      if (controlsRef.current) {
        controlsRef.current.setAzimuthalAngle(x * 0.5);
        controlsRef.current.setPolarAngle(Math.PI / 2 + y * 0.2);
        controlsRef.current.update();
      }

      setTimeout(() => {
        isMouseMovingRef.current = false;
      }, 100);
    };

    const animateMomentum = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!isMouseMovingRef.current) {
        const decay = Math.pow(0.95, deltaTime * 60);
        velocityRef.current.x *= decay;
        velocityRef.current.y *= decay;

        if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
          if (controlsRef.current) {
            controlsRef.current.setAzimuthalAngle(
              controlsRef.current.getAzimuthalAngle() + velocityRef.current.x * 0.01
            );
            controlsRef.current.setPolarAngle(
              Math.min(
                Math.max(
                  controlsRef.current.getPolarAngle() + velocityRef.current.y * 0.01,
                  Math.PI / 4
                ),
                Math.PI * 3 / 4
              )
            );
            controlsRef.current.update();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animateMomentum);
    };

    animationFrameRef.current = requestAnimationFrame(animateMomentum);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas className="transition-opacity duration-1000">
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <ParticleSystem
            count={2000}
            radius={5}
            color={goldColor}
          />
          <RotatingFormations
            animationSpeed={1}
            color={goldColor}
            mousePosition={{ x: -mousePosition.x, y: -mousePosition.y }}
          />
          <PulsingSpheres
            animationSpeed={1}
            color={goldColor}
          />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          zoomSpeed={0.6}
          autoRotate={false}
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
