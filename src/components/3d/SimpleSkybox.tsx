'use client';

import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, createElement } from 'react';
import * as THREE from 'three';

interface SimpleSkyboxProps {
  imagePath: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function SimpleSkybox({
  imagePath,
  autoRotate = true,
  rotationSpeed = 0.001,
}: SimpleSkyboxProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useTexture(imagePath);

  useFrame(() => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return createElement(
    'mesh',
    { ref: meshRef, scale: [-1, 1, 1] },
    createElement('sphereGeometry', { args: [500, 64, 64] }),
    createElement('meshBasicMaterial', {
      map: texture,
      side: THREE.BackSide,
      toneMapped: false,
    }),
  );
}
