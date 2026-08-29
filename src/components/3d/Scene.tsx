'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Leva } from 'leva';
import { useAdaptiveQuality } from '@/hooks/useAdaptiveQuality';
import { qualityPresets } from '@/config/qualityPresets';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  enableEnvironment?: boolean;
  adaptiveQuality?: boolean;
}

export function Scene({
  children,
  cameraPosition = [0, 0, 5],
  enableControls = true,
  enableEnvironment = true,
  adaptiveQuality = true,
}: SceneProps) {
  const { quality } = useAdaptiveQuality();
  const preset = adaptiveQuality ? qualityPresets[quality] : qualityPresets.high;

  return (
    <div className="w-full h-full">
      <Leva collapsed />
      <Canvas
        gl={{
          antialias: preset.antialias,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows={preset.shadowMap}
        dpr={preset.pixelRatio} // Adaptive pixel ratio
        performance={{ min: 0.5 }} // Adaptive performance
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          {enableEnvironment && <Environment preset="sunset" />}
          {enableControls && <OrbitControls enableDamping dampingFactor={0.05} />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
