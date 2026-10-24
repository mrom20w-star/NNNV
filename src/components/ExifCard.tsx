import React from 'react';
import { PhotonicSettings, CameraDiagnosis } from '../types/camera';
import { Camera, Layers, Zap, Info, ShieldCheck } from 'lucide-react';

interface ExifCardProps {
  settings: PhotonicSettings;
  diagnosis: CameraDiagnosis | null;
  lang: 'ar' | 'en';
}

export const ExifCard: React.FC<ExifCardProps> = ({ settings, diagnosis, lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="w-full bg-neutral-950/80 border border-neutral-800/90 rounded-3xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="text-lg"></span>
          <span className="text-sm font-bold text-neutral-200">
            {isAr ? 'بيانات الصورة المشفرة (17 Pro Max EXIF Metadata)' : 'iPhone 17 Pro Max EXIF'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-400">
          RAW DNG / Display P3
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase">{isAr ? 'الكاميرا' : 'Camera'}</div>
          <div className="font-bold text-neutral-200 mt-0.5">iPhone 17 Pro Max</div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase">{isAr ? 'العدسة البؤرية' : 'Lens / Focal'}</div>
          <div className="font-bold text-amber-300 mt-0.5">{settings.focalLength} • {settings.aperture}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase">{isAr ? 'الدقة' : 'Resolution'}</div>
          <div className="font-bold text-neutral-200 mt-0.5">48 MP Quad-Pixel</div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase">{isAr ? 'المعالجة' : 'Processing'}</div>
          <div className="font-bold text-neutral-200 mt-0.5">Photonic Engine 6.4</div>
        </div>
      </div>
    </div>
  );
};
