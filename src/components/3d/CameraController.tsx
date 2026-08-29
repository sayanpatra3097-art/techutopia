'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CameraControllerProps {
  target?: [number, number, number];
  position?: [number, number, number];
  duration?: number;
  onComplete?: () => void;
}

type Controls = {
  target: { x: number; y: number; z: number };
  update: () => void;
};

export function CameraController({
  target = [0, 0, 0],
  position = [0, 0, 5],
  duration = 2,
  onComplete,
}: CameraControllerProps) {
  const { camera, controls } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!controls) return;

    // Create GSAP timeline for smooth camera movement
    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    // Animate camera position
    tl.to(
      camera.position,
      {
        x: position[0],
        y: position[1],
        z: position[2],
        duration,
        ease: 'power2.inOut',
      },
      0,
    );

    // Animate camera target (if controls support it)
    if ('target' in controls) {
      tl.to(
        (controls as unknown as Controls).target,
        {
          x: target[0],
          y: target[1],
          z: target[2],
          duration,
          ease: 'power2.inOut',
        },
        0,
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [camera, controls, target, position, duration, onComplete]);

  useFrame(() => {
    if (controls && 'update' in controls) {
      (controls as unknown as Controls).update();
    }
  });

  return null;
}
