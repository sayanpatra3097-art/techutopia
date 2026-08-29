# Example Usage Guide

## Basic 3D Scene Setup

```tsx
import { Scene } from '@/components/3d/Scene';
import { Model } from '@/components/3d/Model';
import { CameraController } from '@/components/3d/CameraController';

function My3DPage() {
  return (
    <div className="h-screen">
      <Scene cameraPosition={[0, 2, 5]}>
        {/* Static Model */}
        <Model 
          path="/models/dragon.glb" 
          position={[-2, 0, 0]}
          scale={1}
        />
        
        {/* Animated Model */}
        <Model 
          path="/models/sword.glb" 
          position={[2, 0, 0]}
          animate={true}
          animationSpeed={0.5}
        />
        
        {/* Camera Animation */}
        <CameraController
          position={[0, 3, 8]}
          target={[0, 0, 0]}
          duration={3}
        />
      </Scene>
    </div>
  );
}
```

## GSAP Camera Animations

```tsx
import { gsap } from 'gsap';
import { useThree } from '@react-three/fiber';

function AnimatedCamera() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Create timeline for complex camera movements
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(camera.position, {
      x: 5,
      y: 2,
      z: 5,
      duration: 3,
      ease: "power2.inOut"
    })
    .to(camera.position, {
      x: -5,
      y: 2,
      z: 5,
      duration: 3,
      ease: "power2.inOut"
    })
    .to(camera.position, {
      x: 0,
      y: 0,
      z: 10,
      duration: 3,
      ease: "power2.inOut"
    });
    
    return () => tl.kill();
  }, [camera]);
  
  return null;
}
```

## Audio Integration

```tsx
import { useAudio } from '@/components/audio/AudioManager';

function PageWithAudio() {
  const audio = useAudio({
    src: '/audio/ambient.mp3',
    volume: 0.3,
    loop: true,
    autoplay: true,
    spatial: true,
    position: [0, 0, 0]
  });
  
  return (
    <div>
      <button onClick={audio.play}>Play</button>
      <button onClick={audio.pause}>Pause</button>
      <button onClick={audio.stop}>Stop</button>
    </div>
  );
}
```

## Lazy Loading 3D Components

```tsx
import { lazy, Suspense } from 'react';

const Lazy3DScene = lazy(() => import('@/components/3d/Scene'));

function Page() {
  return (
    <Suspense fallback={<div>Loading 3D...</div>}>
      <Lazy3DScene>
        <Model path="/models/scene.glb" />
      </Lazy3DScene>
    </Suspense>
  );
}
```

## Performance Optimization

```tsx
import { useIntersectionObserver } from '@/utils/performance';
import { useRef, useState } from 'react';

function Optimized3DComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useIntersectionObserver(containerRef, (isIntersecting) => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true);
    }
  });
  
  return (
    <div ref={containerRef} className="h-screen">
      {shouldLoad && (
        <Scene>
          <Model path="/models/heavy-model.glb" />
        </Scene>
      )}
    </div>
  );
}
```

## Post-Processing Effects

```tsx
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';

function SceneWithEffects() {
  return (
    <Scene>
      <Model path="/models/scene.glb" />
      
      <EffectComposer>
        <Bloom intensity={1.5} />
        <SSAO />
      </EffectComposer>
    </Scene>
  );
}
```

## Model Preloading

```tsx
import { Model } from '@/components/3d/Model';

// Preload models before they're needed
Model.preload('/models/dragon.glb');
Model.preload('/models/sword.glb');

function Page() {
  return (
    <Scene>
      <Model path="/models/dragon.glb" />
    </Scene>
  );
}
```

