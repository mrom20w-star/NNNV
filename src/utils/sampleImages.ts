/**
 * Realistic photo samples representing real-world phone photos with typical defects:
 * - Grainy sensor noise
 * - Underexposed shadows / blown highlights
 * - Blurry edges / low resolution
 * These allow instant 1-click testing of the iPhone 17 Pro Max Photonic Engine.
 */

export interface SamplePhoto {
  id: string;
  titleAr: string;
  titleEn: string;
  cameraSource: string;
  descriptionAr: string;
  dataUrl: string;
}

/**
 * Creates an authentic sample canvas image with realistic photo rendering
 * and realistic mobile sensor imperfections (grain, chromatic noise, soft focus).
 */
function createSyntheticPhonePhoto(type: 'portrait' | 'street' | 'lowlight'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  if (type === 'portrait') {
    // Background: Warm room / outdoor bokeh
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#59687a');
    bgGrad.addColorStop(0.4, '#3d4d5e');
    bgGrad.addColorStop(1, '#252e38');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Soft warm window light
    const winGrad = ctx.createRadialGradient(w * 0.8, h * 0.2, 50, w * 0.8, h * 0.2, 450);
    winGrad.addColorStop(0, 'rgba(255, 230, 190, 0.45)');
    winGrad.addColorStop(1, 'rgba(255, 230, 190, 0)');
    ctx.fillStyle = winGrad;
    ctx.fillRect(0, 0, w, h);

    // Shoulders / torso
    ctx.fillStyle = '#1e242c';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.95, w * 0.45, h * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.fillStyle = '#b88365';
    ctx.beginPath();
    ctx.roundRect(w * 0.44, h * 0.55, w * 0.12, h * 0.2, 10);
    ctx.fill();

    // Face
    const faceGrad = ctx.createRadialGradient(w * 0.48, h * 0.42, 40, w * 0.5, h * 0.45, 180);
    faceGrad.addColorStop(0, '#e5ab8e');
    faceGrad.addColorStop(0.7, '#c98a6c');
    faceGrad.addColorStop(1, '#9b644b');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.42, w * 0.2, h * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#1c1614';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.36, w * 0.23, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.32, h * 0.42, w * 0.08, h * 0.18, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.68, h * 0.42, w * 0.08, h * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(w * 0.43, h * 0.41, 24, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.57, h * 0.41, 24, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris & pupils
    ctx.fillStyle = '#3a2318';
    ctx.beginPath();
    ctx.arc(w * 0.43, h * 0.41, 11, 0, Math.PI * 2);
    ctx.arc(w * 0.57, h * 0.41, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.arc(w * 0.43, h * 0.41, 6, 0, Math.PI * 2);
    ctx.arc(w * 0.57, h * 0.41, 6, 0, Math.PI * 2);
    ctx.fill();

    // Catchlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.44, h * 0.40, 3, 0, Math.PI * 2);
    ctx.arc(w * 0.58, h * 0.40, 3, 0, Math.PI * 2);
    ctx.fill();

    // Lips
    ctx.fillStyle = '#b85d58';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.52, 32, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'street') {
    // Golden hour street / cafe scene
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#f59e0b');
    skyGrad.addColorStop(0.5, '#fbbf24');
    skyGrad.addColorStop(1, '#93c5fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // City buildings / cafes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(w * 0.1, h * 0.35, w * 0.35, h * 0.65);
    ctx.fillStyle = '#334155';
    ctx.fillRect(w * 0.55, h * 0.28, w * 0.4, h * 0.72);

    // Street pavement
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Street lamps & car headlights glow
    const lampGrad = ctx.createRadialGradient(w * 0.7, h * 0.65, 10, w * 0.7, h * 0.65, 180);
    lampGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    lampGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = lampGrad;
    ctx.fillRect(0, 0, w, h);
  } else {
    // Low-light night indoor
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, w, h);

    // Dim neon sign / candle glow
    const neonGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 30, w * 0.5, h * 0.4, 380);
    neonGrad.addColorStop(0, '#ec4899');
    neonGrad.addColorStop(0.4, '#8b5cf6');
    neonGrad.addColorStop(0.8, '#1e1b4b');
    neonGrad.addColorStop(1, '#0a0d14');
    ctx.fillStyle = neonGrad;
    ctx.fillRect(0, 0, w, h);

    // Silhouette subject
    ctx.fillStyle = '#05070c';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.45, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.85, 260, 200, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inject typical cheap mobile phone noise & grain!
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    // Add chromatic noise typical of small phone sensors
    const noise = (Math.random() - 0.5) * 36;
    const chroma = (Math.random() - 0.5) * 16;
    d[i] = Math.min(255, Math.max(0, d[i] + noise + chroma));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise - chroma));
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.88);
}

export const getSamplePhotos = (): SamplePhoto[] => {
  return [
    {
      id: 'sample-portrait',
      titleAr: 'بورتريه بهاتف قديم (إضاءة باهتة)',
      titleEn: 'Indoor Portrait (Old Phone)',
      cameraSource: 'Samsung Galaxy A12 (Sensor 1/2.8", f/2.2)',
      descriptionAr: 'لقطة بورتريه كلاسيكية بتشويش نويز في الوجه والظلال مع ألوان غير مشبعة وعزل غائب.',
      dataUrl: createSyntheticPhonePhoto('portrait'),
    },
    {
      id: 'sample-street',
      titleAr: 'لقطة شوارع خارجية (سماء محروقة)',
      titleEn: 'Street Golden Hour',
      cameraSource: 'Redmi Note 9 (ISO 400, Muddy Shadows)',
      descriptionAr: 'لقطة شمسية بمدى ديناميكي ضعيف وألوان مسطحة وظلال داكنة تفتقد للتفاصيل.',
      dataUrl: createSyntheticPhonePhoto('street'),
    },
    {
      id: 'sample-night',
      titleAr: 'تصوير ليلي ضعيف الإضاءة (نويز عالي)',
      titleEn: 'Low-Light Night Cafe',
      cameraSource: 'Generic Android Sensor (ISO 1600 Grain)',
      descriptionAr: 'صورة ليلية بنويز رقمي كثيف وحبيبات ملونة مع بهتان المعالم والخطوط.',
      dataUrl: createSyntheticPhonePhoto('lowlight'),
    },
  ];
};
