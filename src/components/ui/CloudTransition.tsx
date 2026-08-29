'use client';

import { useEffect, useState } from 'react';

interface CloudTransitionProps {
  type: 'cover' | 'uncover';
  onComplete?: () => void;
}

export function CloudTransition({ type, onComplete }: CloudTransitionProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Trigger animation frame
    requestAnimationFrame(() => setActive(true));

    const duration = 3000; // Slower: 3 seconds total transition
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Cloud configuration
  const clouds = [
    // Corner clouds moving to center
    {
      src: '/Cloud1.webp',
      from: 'translate(-100%, -100%)',
      to: 'translate(-20%, -20%)',
      delay: '0s',
    },
    {
      src: '/Cloud2.webp',
      from: 'translate(100%, -100%)',
      to: 'translate(20%, -20%)',
      delay: '0.1s',
    },
    {
      src: '/Cloud3.webp',
      from: 'translate(-100%, 100%)',
      to: 'translate(-20%, 20%)',
      delay: '0.2s',
    },
    {
      src: '/Cloud4.webp',
      from: 'translate(100%, 100%)',
      to: 'translate(20%, 20%)',
      delay: '0.15s',
    },

    // Center fillers
    {
      src: '/Cloud1.webp',
      from: 'translate(0, -150%) scale(1.5)',
      to: 'translate(0, -10%) scale(2)',
      delay: '0.3s',
    },
    {
      src: '/Cloud2.webp',
      from: 'translate(0, 150%) scale(1.5)',
      to: 'translate(0, 10%) scale(2)',
      delay: '0.35s',
    },

    // Massive darkness fillers
    {
      src: '/Cloud3.webp',
      from: 'translate(-150%, 0) scale(2)',
      to: 'translate(-10%, 0) scale(3)',
      delay: '0.4s',
    },
    {
      src: '/Cloud4.webp',
      from: 'translate(150%, 0) scale(2)',
      to: 'translate(10%, 0) scale(3)',
      delay: '0.45s',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Dark background fade */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-[1500ms] ease-in-out"
        style={{
          opacity: type === 'cover' ? (active ? 1 : 0) : active ? 0 : 1,
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud, i) => {
        // Determine transform based on type
        // Cover: Out -> In
        // Uncover: In -> Out
        const initialTransform = type === 'cover' ? cloud.from : cloud.to;
        const finalTransform = type === 'cover' ? cloud.to : cloud.from;

        return (
          <img
            key={i}
            src={cloud.src}
            alt=""
            className="absolute w-[80%] h-auto object-contain transition-transform duration-[1500ms] ease-in-out"
            style={{
              transform: active ? finalTransform : initialTransform,
              transitionDelay: cloud.delay,
              // OPTIMIZATION: Removed expensive filter (brightness/contrast) to fix transition lag
              opacity: type === 'cover' ? (active ? 1 : 0) : active ? 0 : 1,
              transition: `transform 2.5s ease-in-out ${cloud.delay}, opacity 1.5s ease-in-out ${cloud.delay}`,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
}
