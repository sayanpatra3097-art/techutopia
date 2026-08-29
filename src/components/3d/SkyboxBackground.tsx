'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Skybox } from './Skybox';

interface SkyboxBackgroundProps {
  imagePath: string;
  intensity?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableControls?: boolean;
}

export function SkyboxBackground({
  imagePath,
  intensity = 0.8,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableControls = true,
}: SkyboxBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 0], fov: 75 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 0]} />
          <Skybox imagePath={imagePath} intensity={intensity} />
          {enableControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.05}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
