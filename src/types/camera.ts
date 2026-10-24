export type PhotographicStyle =
  | 'Standard'
  | 'Rich Contrast'
  | 'Vibrant'
  | 'Warm'
  | 'Cool'
  | 'Studio Noir';

export type FocalLength = '13mm' | '24mm' | '28mm' | '35mm' | '48mm' | '120mm';

export type Aperture = 'f/1.4' | 'f/2.0' | 'f/2.8' | 'f/4.0' | 'f/8.0' | 'f/16';

export type StudioLighting = 'Natural' | 'Studio' | 'Contour' | 'Stage';

export type TitaniumColor = 'desert' | 'natural' | 'black' | 'white';

export interface PhotonicSettings {
  sharpness: number; // 0 - 100
  hdrBoost: number; // 0 - 100
  deepFusionDetail: number; // 0 - 100
  denoise: number; // 0 - 100
  portraitBokeh: number; // 0 - 100
  studioLighting: StudioLighting;
  studioLightIntensity: number; // 0 - 100
  photographicStyle: PhotographicStyle;
  focalLength: FocalLength;
  aperture: Aperture;
  colorTemp: number; // -50 (cooler) to +50 (warmer)
  skinToneEnhance: number; // 0 - 100
  contrast: number; // 0 - 100
  saturation: number; // 0 - 100
  resolutionScale: number; // 1x, 2x, 4x (48MP simulation)
  appleWatermark: boolean;
  proRawActive: boolean;
}

export interface CameraDiagnosis {
  estimatedSourceDevice: string;
  sourceSensorScore: number; // 0 to 100
  detectedFlaws: string[];
  recommended17ProSettings: Partial<PhotonicSettings>;
  cameraExecutiveSummaryAr: string;
  simulatedExif: {
    camera: string;
    lens: string;
    sensor: string;
    iso: number;
    shutter: string;
    photonicEngineVersion: string;
  };
}

export interface PresetMode {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  icon: string;
  settings: Partial<PhotonicSettings>;
}
