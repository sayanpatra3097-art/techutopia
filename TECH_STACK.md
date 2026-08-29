# Tech Stack Plan for High-Performance 3D Website

## Core Framework (Current - Keep)
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety
- **Vite** - Fast build tool and HMR
- **React Router** - Multi-page navigation

## 3D Rendering & Models

### Primary 3D Stack
- **@react-three/fiber** - React renderer for Three.js (declarative 3D)
- **three** - Core 3D library
- **@react-three/drei** - Useful helpers for R3F:
  - GLTF/GLB model loading
  - Camera controls
  - Environment maps
  - Text3D
  - Performance optimizations

### Model Formats
- **GLTF/GLB** - Recommended format (compressed, efficient)
- **FBX** - Alternative (via loaders)
- **gltf-transform** - Optimize models before deployment

## Advanced Animations

### Animation Libraries
- **GSAP (GreenSock)** - Professional animation library
  - Timeline-based animations
  - Scroll-triggered animations
  - Camera movement animations
  - Complex sequencing
- **Framer Motion** - Keep for UI animations (already installed)
- **@react-spring/three** - Physics-based animations for 3D

## Audio

### Audio Libraries
- **Howler.js** - Best for spatial audio and 3D sound
  - 3D positional audio
  - Multiple audio formats
  - Low latency
- **Tone.js** - For music/sound synthesis (if needed)

## Performance Optimizations

### Code Splitting & Lazy Loading
- **React.lazy()** - Lazy load 3D components
- **Dynamic imports** - Load models on demand
- **Intersection Observer** - Load 3D scenes when visible

### 3D Performance
- **@react-three/postprocessing** - Post-processing effects (bloom, SSAO, etc.)
- **leva** - Debug panel for tweaking 3D parameters
- **use-gpu-reducer** - GPU-accelerated state (if needed)

### Asset Optimization
- **sharp** - Image optimization
- **gltf-pipeline** - Model compression
- **@loaders.gl/gltf** - Advanced GLTF loading

## Visual Effects

### Shaders & Effects
- **Custom Shaders**: GLSL shaders for unique effects (e.g., ImageCloudSystem)
- **@react-three/postprocessing**: Bloom, SSAO, DOF, etc.
- **react-three-gui**: Visual tweaking (alternative to leva)
- **Custom Particle Systems**: Efficient RealmParticles implementation
- **Parallax Effects**: Cloud transitions and depth-based scrolling

## Deep Performance Optimization

### Rendering Strategies
- **Instanced Rendering**: For high-count objects like particles and clouds
- **Texture Compression**: WebP/AVIF with smart loading
- **Resource Management**: explicit disposal of geometries and materials

## Build & Deployment

### Vite Plugins
- **vite-plugin-glsl** - Import GLSL shaders
- **vite-plugin-compression** - Gzip/Brotli compression
- **rollup-plugin-visualizer** - Bundle analysis

## Recommended Package Versions

```json
{
  "dependencies": {
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "@react-three/postprocessing": "^2.15.0",
    "three": "^0.160.0",
    "gsap": "^3.12.5",
    "howler": "^2.2.4",
    "leva": "^0.9.35"
  },
  "devDependencies": {
    "vite-plugin-glsl": "^1.1.2",
    "vite-plugin-compression": "^0.5.1",
    "@types/three": "^0.160.0",
    "@types/howler": "^2.2.11"
  }
}
```

## Performance Best Practices

1. **Model Optimization**
   - Use GLB format (binary GLTF)
   - Compress textures (WebP/AVIF)
   - Reduce polygon count
   - Use Draco compression

2. **Code Splitting**
   - Lazy load 3D components per page
   - Load models only when needed
   - Split large animations

3. **Rendering**
   - Use `instancedMesh` for repeated objects
   - Implement LOD (Level of Detail)
   - Use `useFrame` efficiently
   - Limit post-processing effects

4. **Audio**
   - Preload critical audio
   - Use spatial audio for 3D positioning
   - Compress audio files (MP3/OGG)

5. **Caching**
   - Cache models in IndexedDB
   - Use service workers for offline support

## Architecture Recommendations

### Component Structure
```
src/
  components/
    3d/
      Scene.tsx          # Main 3D scene wrapper
      Camera.tsx         # Camera controls
      Models/
        Model1.tsx       # Individual model components
        Model2.tsx
      Effects/
        PostProcessing.tsx
    animations/
      CameraAnimations.ts
      ModelAnimations.ts
    audio/
      AudioManager.tsx
      SpatialAudio.tsx
```

### Performance Monitoring
- Use React DevTools Profiler
- Monitor FPS with stats.js
- Track bundle sizes
- Monitor memory usage

