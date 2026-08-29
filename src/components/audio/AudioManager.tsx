'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';

interface UseAudioOptions {
  src: string | string[];
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
  spatial?: boolean;
  position?: [number, number, number];
}

export function useAudio({
  src,
  volume = 0.5,
  loop = false,
  autoplay = false,
  spatial = false,
  position = [0, 0, 0],
}: UseAudioOptions) {
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    const howl = new Howl({
      src: Array.isArray(src) ? src : [src],
      volume,
      loop,
      autoplay,
      html5: true, // Use HTML5 Audio for better performance
    });

    if (spatial) {
      // Enable 3D spatial audio
      howl.pos(position[0], position[1], position[2]);
      howl.pannerAttr({
        panningModel: 'HRTF',
        distanceModel: 'inverse',
        refDistance: 1,
        maxDistance: 100,
        rolloffFactor: 1,
      });
    }

    howlRef.current = howl;

    return () => {
      howl.unload();
    };
  }, [src, volume, loop, autoplay, spatial, position]);

  const play = useCallback(() => {
    return howlRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    howlRef.current?.stop();
  }, []);

  const setVolume = useCallback((vol: number) => {
    howlRef.current?.volume(vol);
  }, []);

  return {
    play,
    pause,
    stop,
    setVolume,
    howl: howlRef.current,
  };
}
