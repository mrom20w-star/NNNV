import React, { useState } from 'react';
import {
  PhotonicSettings,
  PhotographicStyle,
  FocalLength,
  Aperture,
  StudioLighting,
} from '../types/camera';
import { CAMERA_PRESETS } from '../utils/presets';
import {
  Sparkles,
  Sliders,
  Sun,
  Camera,
  Layers,
  Zap,
  User,
  Wand2,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CameraControlsProps {
  settings: PhotonicSettings;
  setSettings: React.Dispatch<React.SetStateAction<PhotonicSettings>>;
  lang: 'ar' | 'en';
  onTriggerAiEnhance: () => void;
  isAiEnhancing: boolean;
  hasAiEnhancedImage: boolean;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  settings,
  setSettings,
  lang,
  onTriggerAiEnhance,
  isAiEnhancing,
  hasAiEnhancedImage,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'presets' | 'styles' | 'portrait' | 'optics'>('presets');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const focalLengths: { id: FocalLength; label: string; zoom: string }[] = [
    { id: '13mm', label: '13mm', zoom: '0.5x' },
    { id: '24mm', label: '24mm', zoom: '1x' },
    { id: '28mm', label: '28mm', zoom: '1.2x' },
    { id: '35mm', label: '35mm', zoom: '1.5x' },
    { id: '48mm', label: '48mm', zoom: '2x' },
    { id: '120mm', label: '120mm', zoom: '5x' },
  ];

  const photographicStyles: { id: PhotographicStyle; nameAr: string; nameEn: string; desc: string }[] = [
    {
      id: 'Standard',
      nameAr: 'القياسي القياسي',
      nameEn: 'Standard',
      desc: isAr ? 'ألوان أبل الطبيعية والمتوازنة مع دقة محايدة' : 'True-to-life neutral Apple fidelity',
    },
    {
      id: 'Rich Contrast',
      nameAr: 'تباين غني (أيقونة 17 برو)',
      nameEn: 'Rich Contrast',
      desc: isAr ? 'ظلال داكنة ساحرة وإضاءات قوية بطابع سينمائي' : 'Deep cinematic shadows & punchy highlights',
    },
    {
      id: 'Vibrant',
      nameAr: 'ألوان حيوية',
      nameEn: 'Vibrant',
      desc: isAr ? 'إشراق مكثف للزرقة والخضرة مع حماية البشرة' : 'Brilliant skies and nature colors',
    },
    {
      id: 'Warm',
      nameAr: 'دفء سينمائي',
      nameEn: 'Warm',
      desc: isAr ? 'طيف ذهبي دافئ مستوحى من ساعات الغروب' : 'Golden hour warmth and soothing skin glow',
    },
    {
      id: 'Cool',
      nameAr: 'تيتانيوم بارد',
      nameEn: 'Cool',
      desc: isAr ? 'درجات زرقاء نقية وعصرية للهندسة والأزياء' : 'Crisp modern titanium blue tones',
    },
    {
      id: 'Studio Noir',
      nameAr: 'استوديو نوير (B&W)',
      nameEn: 'Studio Noir',
      desc: isAr ? 'أبيض وأسود فاخر بتدرجات فضية غنية' : 'Dramatic high-key silver monochrome',
    },
  ];

  const apertures: Aperture[] = ['f/1.4', 'f/2.0', 'f/2.8', 'f/4.0', 'f/8.0', 'f/16'];

  const studioLights: { id: StudioLighting; labelAr: string; labelEn: string }[] = [
    { id: 'Natural', labelAr: 'إضاءة طبيعية', labelEn: 'Natural Light' },
    { id: 'Studio', labelAr: 'إضاءة استوديو', labelEn: 'Studio Light' },
    { id: 'Contour', labelAr: 'إضاءة محيطية Contour', labelEn: 'Contour' },
    { id: 'Stage', labelAr: 'إضاءة مسرح Stage', labelEn: 'Stage Light' },
  ];

  const applyPreset = (presetSettings: Partial<PhotonicSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...presetSettings,
    }));
  };

  return (
    <div className="w-full bg-neutral-900/70 backdrop-blur-2xl border border-neutral-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Focal Length Carousel / Switcher (Apple Camera Lens Selector) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            {isAr ? 'عدسة كاميرا 17 برو ماكس (Focal Length)' : '17 Pro Max Lens Focal Length'}
          </span>
          <span className="text-[11px] font-mono text-amber-400">
            {settings.focalLength} • 48MP Fusion
          </span>
        </div>

        <div className="flex items-center justify-between p-1.5 bg-black/60 rounded-2xl border border-neutral-800/80">
          {focalLengths.map((f) => (
            <button
              key={f.id}
              onClick={() => setSettings((s) => ({ ...s, focalLength: f.id }))}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center ${
                settings.focalLength === f.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <span className="text-xs">{f.zoom}</span>
              <span className="text-[10px] font-mono opacity-80">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Generative Engine Trigger Button */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-purple-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Wand2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-right rtl:text-right ltr:text-left">
            <h4 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
              <span>{isAr ? 'ترقية الذكاء الاصطناعي الفائق (Gemini Photonic)' : 'AI Generative Remaster'}</span>
              <span className="text-[10px] bg-amber-400 text-black font-extrabold px-1.5 py-0.2 rounded">
                ULTRA
              </span>
            </h4>
            <p className="text-xs text-neutral-400">
              {isAr
                ? 'إعادة بناء الصورة بالكامل عبر الذكاء الاصطناعي لمطابقة حساس كاميرا 17 برو ماكس'
                : 'Re-synthesizes facial textures and optical physics with Gemini'}
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerAiEnhance}
          disabled={isAiEnhancing}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            isAiEnhancing
              ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          {isAiEnhancing ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>{isAr ? 'جاري التوليد بالذكاء الاصطناعي...' : 'Generating AI Remaster...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'توليد جودة 17 برو الآن' : 'Remaster with AI'}</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs: Presets, Photographic Styles, Portrait/Bokeh, Optics */}
      <div>
        <div className="flex border-b border-neutral-800 pb-2 gap-2 overflow-x-auto">
          {[
            { id: 'presets', labelAr: 'الأنماط الجاهزة', labelEn: 'Presets', icon: Sparkles },
            { id: 'styles', labelAr: 'أنماط التصوير (Styles)', labelEn: 'Styles 2.0', icon: Camera },
            { id: 'portrait', labelAr: 'البورتريه والعزل', labelEn: 'Portrait & Bokeh', icon: User },
            { id: 'optics', labelAr: 'محرك الفوتونيك 48MP', labelEn: 'Photonic Sliders', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-neutral-800 text-amber-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4">
            {CAMERA_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.settings)}
                className="p-3 rounded-2xl bg-black/40 hover:bg-neutral-800/80 border border-neutral-800/90 hover:border-amber-500/50 transition-all text-right rtl:text-right ltr:text-left group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-200 group-hover:text-amber-300 transition-colors">
                    {isAr ? p.nameAr : p.nameEn}
                  </div>
                  <div className="text-[10px] text-neutral-400 line-clamp-2 mt-1 leading-snug">
                    {isAr ? p.descAr : p.nameEn}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-amber-400/80 flex items-center justify-between">
                  <span>{isAr ? 'تطبيق النمط' : 'Apply'}</span>
                  <span>⚡</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Photographic Styles 2.0 */}
        {activeTab === 'styles' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4">
            {photographicStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSettings((s) => ({ ...s, photographicStyle: style.id }))}
                className={`p-3 rounded-2xl border transition-all text-right rtl:text-right ltr:text-left flex flex-col justify-between ${
                  settings.photographicStyle === style.id
                    ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-lg'
                    : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-100">
                    {isAr ? style.nameAr : style.nameEn}
                  </span>
                  {settings.photographicStyle === style.id && (
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 leading-tight">
                  {style.desc}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Tab 3: Portrait Mode & Bokeh */}
        {activeTab === 'portrait' && (
          <div className="pt-4 space-y-4">
            {/* Aperture Ring ƒ-stop */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-300">
                  {isAr ? 'فتحة العدسة البصرية (ƒ-Stop Aperture)' : 'Optical Aperture (ƒ-Stop)'}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {settings.aperture}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1 p-1 bg-black/60 rounded-xl border border-neutral-800">
                {apertures.map((ap) => (
                  <button
                    key={ap}
                    onClick={() => setSettings((s) => ({ ...s, aperture: ap }))}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      settings.aperture === ap
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {ap}
                  </button>
                ))}
              </div>
            </div>

            {/* Bokeh Blur Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300">
                  {isAr ? 'عمق العزل الضبابي (Cinematic Bokeh)' : 'Cinematic Bokeh Depth'}
                </span>
                <span className="font-mono text-amber-400">{settings.portraitBokeh}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.portraitBokeh}
                onChange={(e) => setSettings((s) => ({ ...s, portraitBokeh: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Studio Lighting Options */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 block mb-2">
                {isAr ? 'تأثيرات إضاءة الاستوديو (Apple Portrait Lighting)' : 'Apple Portrait Lighting'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {studioLights.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSettings((s) => ({ ...s, studioLighting: l.id }))}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                      settings.studioLighting === l.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-black/40 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isAr ? l.labelAr : l.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Optics & Photonic Tuning */}
        {activeTab === 'optics' && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Deep Fusion Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'معالج التفاصيل الدقيقة (Deep Fusion II)' : 'Deep Fusion II Details'}
                </span>
                <span className="font-mono text-amber-400">{settings.deepFusionDetail}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.deepFusionDetail}
                onChange={(e) => setSettings((s) => ({ ...s, deepFusionDetail: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Smart HDR 6 Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'المدى الديناميكي (Smart HDR 6)' : 'Smart HDR 6 Boost'}
                </span>
                <span className="font-mono text-amber-400">{settings.hdrBoost}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.hdrBoost}
                onChange={(e) => setSettings((s) => ({ ...s, hdrBoost: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Sharpness Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'حدة العدسة (48MP Razor Sharpness)' : '48MP Razor Sharpness'}
                </span>
                <span className="font-mono text-amber-400">{settings.sharpness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sharpness}
                onChange={(e) => setSettings((s) => ({ ...s, sharpness: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Denoise Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'تنقية تشويش ونويز الحساس (Denoise)' : 'Sensor Noise Reduction'}
                </span>
                <span className="font-mono text-amber-400">{settings.denoise}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.denoise}
                onChange={(e) => setSettings((s) => ({ ...s, denoise: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Skin Tone Enhancement */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'نضارة وتوحيد لون البشرة' : 'Apple Natural Skin Tone'}
                </span>
                <span className="font-mono text-amber-400">{settings.skinToneEnhance}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.skinToneEnhance}
                onChange={(e) => setSettings((s) => ({ ...s, skinToneEnhance: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Color Temperature */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-300 font-medium">
                  {isAr ? 'حرارة الألوان (Color Temperature)' : 'White Balance / Temp'}
                </span>
                <span className="font-mono text-amber-400">{settings.colorTemp > 0 ? `+${settings.colorTemp}` : settings.colorTemp}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={settings.colorTemp}
                onChange={(e) => setSettings((s) => ({ ...s, colorTemp: Number(e.target.value) }))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer h-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toggles: ProRAW 48MP & Apple Watermark */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800/80">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.appleWatermark}
            onChange={(e) => setSettings((s) => ({ ...s, appleWatermark: e.target.checked }))}
            className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
          />
          <span className="text-xs font-medium text-neutral-300">
            {isAr ? 'ختم توثيق كاميرا آيفون 17 برو ماكس الرسمي' : 'Embed  iPhone 17 Pro Max Stamp'}
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.proRawActive}
            onChange={(e) => setSettings((s) => ({ ...s, proRawActive: e.target.checked }))}
            className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
          />
          <span className="text-xs font-semibold text-amber-300">
            {isAr ? 'نمط 48MP ProRAW Max مفعّل' : 'ProRAW 48MP Fusion Active'}
          </span>
        </label>
      </div>
    </div>
  );
};
