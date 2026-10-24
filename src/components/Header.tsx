import React from 'react';
import { Camera, Sparkles, Smartphone, Layers, Sliders } from 'lucide-react';
import { TitaniumColor } from '../types/camera';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  titaniumColor: TitaniumColor;
  setTitaniumColor: (color: TitaniumColor) => void;
  isProcessing: boolean;
  statusMessage: string;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  titaniumColor,
  setTitaniumColor,
  isProcessing,
  statusMessage,
}) => {
  const isAr = lang === 'ar';

  const colorStyles: Record<TitaniumColor, { ring: string; labelAr: string; labelEn: string; bg: string }> = {
    desert: { ring: 'ring-amber-500/70', labelAr: 'تيتانيوم صحراوي', labelEn: 'Desert Titanium', bg: 'bg-[#d8c2aa]' },
    natural: { ring: 'ring-neutral-400/70', labelAr: 'تيتانيوم طبيعي', labelEn: 'Natural Titanium', bg: 'bg-[#9f9b96]' },
    black: { ring: 'ring-neutral-600/70', labelAr: 'تيتانيوم أسود', labelEn: 'Black Titanium', bg: 'bg-[#28272a]' },
    white: { ring: 'ring-neutral-200/70', labelAr: 'تيتانيوم أبيض', labelEn: 'White Titanium', bg: 'bg-[#f2f1ed]' },
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/75 border-b border-neutral-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/60 p-0.5 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-amber-500/50 transition-colors">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
              <span className="text-[9px] font-bold text-amber-300">17</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                {isAr ? 'كاميرا آيفون 17 برو ماكس' : 'iPhone 17 Pro Max Camera'}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                PRO 48MP
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium hidden sm:block">
              {isAr
                ? 'محرك Photonic Engine 6.4 لمعالجة صور أي هاتف في العالم'
                : 'Photonic Engine 6.4 Studio for Any Smartphone Photo'}
            </p>
          </div>
        </div>

        {/* Dynamic Island Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-inner">
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isProcessing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              }`}
            />
            <span className="text-xs font-mono font-medium text-neutral-300 tracking-wide">
              {statusMessage || (isAr ? 'محرك الفوتونيك جاهز • 48MP Fusion' : 'Photonic Engine Ready • 48MP Fusion')}
            </span>
          </div>
        </div>

        {/* Controls: Titanium Finishes & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Titanium Color Picker */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 rounded-xl border border-neutral-800/80">
            {(Object.keys(colorStyles) as TitaniumColor[]).map((c) => (
              <button
                key={c}
                onClick={() => setTitaniumColor(c)}
                title={isAr ? colorStyles[c].labelAr : colorStyles[c].labelEn}
                className={`w-5 h-5 rounded-full ${colorStyles[c].bg} transition-all duration-200 ${
                  titaniumColor === c ? `ring-2 ${colorStyles[c].ring} scale-110 shadow-sm` : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all flex items-center gap-1"
          >
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
