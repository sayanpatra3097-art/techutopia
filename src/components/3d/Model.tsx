'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  animate?: boolean;
  animationSpeed?: number;
}

export function Model({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animate = false,
  animationSpeed = 1,
}: ModelProps) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid mutating the original
  const clonedScene = scene.clone();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.add(clonedScene);
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      const scaleValue = Array.isArray(scale) ? scale[0] : scale;
      groupRef.current.scale.set(scaleValue, scaleValue, scaleValue);
    }
  }, [clonedScene, position, rotation, scale]);

  useFrame((_state, delta) => {
    if (animate && groupRef.current) {
      groupRef.current.rotation.y += delta * animationSpeed;
    }
  });

  return (
    // @ts-expect-error - group is a valid R3F component
    <group ref={groupRef} />
  );
}

// Preload model for better performance
Model.preload = (path: string) => {
  useGLTF.preload(path);
};
