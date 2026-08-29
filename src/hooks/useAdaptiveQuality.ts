import { useState, useEffect } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

export function useAdaptiveQuality() {
  const [quality, setQuality] = useState<QualityLevel>('high');
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const currentFPS = frameCount;
        setFps(currentFPS);
        frameCount = 0;
        lastTime = currentTime;

        // Adaptive quality adjustment with hysteresis to prevent flickering
        if (currentFPS < 30 && quality === 'high') {
          setQuality('medium');
        } else if (currentFPS < 25 && quality === 'medium') {
          setQuality('low');
        } else if (currentFPS > 55 && quality === 'low') {
          setQuality('medium');
        } else if (currentFPS > 58 && quality === 'medium') {
          setQuality('high');
        }
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [quality]);

  return { quality, fps, setQuality };
}
