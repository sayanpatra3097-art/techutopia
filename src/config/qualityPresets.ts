export type QualityPreset = {
  pixelRatio: number;
  antialias: boolean;
  shadowMap: boolean;
  shadowMapSize: number;
  postProcessing: boolean;
  bloomIntensity: number;
  ssaoEnabled: boolean;
  modelLOD: number;
  maxLights: number;
  textureMaxSize: number;
};

export const qualityPresets: Record<'high' | 'medium' | 'low', QualityPreset> = {
  high: {
    pixelRatio: 2, // Retina quality
    antialias: true,
    shadowMap: true,
    shadowMapSize: 2048,
    postProcessing: true,
    bloomIntensity: 1.5,
    ssaoEnabled: true,
    modelLOD: 0, // Highest detail
    maxLights: 8,
    textureMaxSize: 4096,
  },
  medium: {
    pixelRatio: 1.5,
    antialias: true,
    shadowMap: true,
    shadowMapSize: 1024,
    postProcessing: true,
    bloomIntensity: 1.0,
    ssaoEnabled: false,
    modelLOD: 1,
    maxLights: 4,
    textureMaxSize: 2048,
  },
  low: {
    pixelRatio: 1,
    antialias: false,
    shadowMap: true,
    shadowMapSize: 512,
    postProcessing: false,
    bloomIntensity: 0,
    ssaoEnabled: false,
    modelLOD: 2,
    maxLights: 2,
    textureMaxSize: 1024,
  },
};
