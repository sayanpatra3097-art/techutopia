'use client';

import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface SkyboxProps {
  imagePath: string;
  intensity?: number;
}

export function Skybox({ imagePath, intensity = 1 }: SkyboxProps) {
  const { scene } = useThree();

  const texture = useTexture(imagePath);

  useEffect(() => {
    if (texture) {
      try {
        // Set the texture as the scene background
        scene.background = texture;

        // Optionally set as environment map for realistic lighting
        scene.environment = texture;
        scene.environmentIntensity = intensity;

        // Ensure proper texture settings for skybox
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
      } catch (err) {
        console.error('Error setting up skybox:', err);
      }
    }

    // Cleanup function
    return () => {
      if (scene) {
        scene.background = null;
        scene.environment = null;
      }
    };
  }, [texture, scene, intensity]);

  return null; // This component doesn't render anything visible itself
}
