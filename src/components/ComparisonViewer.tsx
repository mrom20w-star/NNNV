import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sliders,
  Columns,
  Eye,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';

interface ComparisonViewerProps {
  originalUrl: string;
  enhancedCanvas: HTMLCanvasElement | null;
  lang: 'ar' | 'en';
  isProcessing: boolean;
  onHoldOriginalChange?: (isHolding: boolean) => void;
}

export const ComparisonViewer: React.FC<ComparisonViewerProps> = ({
  originalUrl,
  enhancedCanvas,
  lang,
  isProcessing,
}) => {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [isHoldingOriginal, setIsHoldingOriginal] = useState(false);
  const [showLoupe, setShowLoupe] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, relX: 0.5, relY: 0.5 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const enhancedImgUrlRef = useRef<string | null>(null);
  const [enhancedDataUrl, setEnhancedDataUrl] = useState<string | null>(null);

  // Sync canvas to image dataUrl for clean rendering
  useEffect(() => {
    if (enhancedCanvas) {
      const url = enhancedCanvas.toDataURL('image/jpeg', 0.95);
      enhancedImgUrlRef.current = url;
      setEnhancedDataUrl(url);
    }
  }, [enhancedCanvas]);

  const updateSliderFromClientX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (isDragging) {
      updateSliderFromClientX(e.clientX);
    }

    if (showLoupe) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLoupePos({
        x,
        y,
        relX: Math.max(0, Math.min(1, x / rect.width)),
        relY: Math.max(0, Math.min(1, y / rect.height)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-3 px-2">
        {/* Left: View Mode Toggle & Loupe */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 rounded-2xl border border-neutral-800">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'slider'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isAr ? 'مقبض المقارنة' : 'Slider'}</span>
          </button>

          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{isAr ? 'جنباً إلى جنب' : 'Side by Side'}</span>
          </button>

          <button
            onClick={() => setShowLoupe(!showLoupe)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              showLoupe
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
            title={isAr ? 'عدسة مكبرة لمعاينة تفاصيل المسام والشعر' : 'Loupe Inspector'}
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isAr ? 'مكبر 200%' : 'Loupe 200%'}</span>
          </button>
        </div>

        {/* Center: Hold-to-view Original Quick Action */}
        <div className="flex items-center gap-2">
          <button
            onMouseDown={() => setIsHoldingOriginal(true)}
            onMouseUp={() => setIsHoldingOriginal(false)}
            onMouseLeave={() => setIsHoldingOriginal(false)}
            onTouchStart={() => setIsHoldingOriginal(true)}
            onTouchEnd={() => setIsHoldingOriginal(false)}
            className={`px-4 py-1.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isHoldingOriginal
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg scale-95'
                : 'bg-neutral-900/90 text-neutral-300 border-neutral-700/80 hover:border-amber-400/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isAr ? 'اضغط مطولاً لرؤية الأصل' : 'Hold to View Original'}</span>
          </button>
        </div>

        {/* Right: Resolution status pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
          <span>{isAr ? 'السابق: هاتف عادي' : 'Source: Generic Phone'}</span>
          <span className="text-amber-400 font-bold">➔</span>
          <span className="text-amber-300 font-bold">17 Pro Max 48MP</span>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full max-h-[72vh] aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-2xl flex items-center justify-center cursor-ew-resize select-none"
        >
          {/* Enhanced 17 Pro Max Image (Background Layer) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            {enhancedDataUrl ? (
              <img
                src={isHoldingOriginal ? originalUrl : enhancedDataUrl}
                alt="Enhanced 17 Pro Max"
                className="w-full h-full object-contain pointer-events-none transition-opacity duration-150"
              />
            ) : (
              <div className="text-neutral-500 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span>{isAr ? 'جاري تفعيل معالج Photonic Engine...' : 'Initializing Photonic Engine...'}</span>
              </div>
            )}
          </div>

          {/* Original Image (Foreground Clipped Layer) */}
          {!isHoldingOriginal && (
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <img
                src={originalUrl}
                alt="Original Phone Photo"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Slider Line & Thumb */}
          {!isHoldingOriginal && (
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.8)] pointer-events-none z-20 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-neutral-900 border-2 border-amber-400 flex items-center justify-center shadow-xl shadow-black/80 text-amber-300">
                <Sliders className="w-4 h-4 transform rotate-90" />
              </div>
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700/80 text-xs font-semibold text-neutral-300 shadow-lg">
              {isAr ? '📷 الهاتف الأصلي' : '📷 Original Phone'}
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-xs font-bold text-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5">
              <span></span>
              <span>{isAr ? 'معالجة آيفون 17 برو ماكس 48MP' : '17 Pro Max 48MP'}</span>
            </div>
          </div>

          {/* Magnifier / Loupe */}
          {showLoupe && enhancedDataUrl && (
            <div
              className="absolute z-30 w-44 h-44 rounded-full border-4 border-amber-400 shadow-2xl pointer-events-none overflow-hidden bg-black"
              style={{
                left: `${loupePos.x - 88}px`,
                top: `${loupePos.y - 88}px`,
              }}
            >
              <div
                className="w-full h-full relative"
                style={{
                  backgroundImage: `url(${enhancedDataUrl})`,
                  backgroundPosition: `${loupePos.relX * 100}% ${loupePos.relY * 100}%`,
                  backgroundSize: '350%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
                2x Zoom ProRAW
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Side by Side Mode */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: Original */}
          <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 aspect-[4/3] flex items-center justify-center p-2">
            <img src={originalUrl} alt="Original Phone" className="w-full h-full object-contain" />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-neutral-300 border border-neutral-700">
              {isAr ? 'الهاتف الأصلي (نويز وعمق عادي)' : 'Original Phone Camera'}
            </div>
          </div>

          {/* Right: 17 Pro Max Enhanced */}
          <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border-2 border-amber-500/60 aspect-[4/3] flex items-center justify-center p-2 shadow-xl shadow-amber-500/10">
            {enhancedDataUrl ? (
              <img src={enhancedDataUrl} alt="iPhone 17 Pro Max" className="w-full h-full object-contain" />
            ) : (
              <div className="text-neutral-500 text-sm">Loading...</div>
            )}
            <div className="absolute top-3 right-3 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <span></span>
              <span>{isAr ? 'آيفون 17 برو ماكس Photonic' : 'iPhone 17 Pro Max Photonic'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Helpful Hint */}
      <div className="text-xs text-neutral-500 font-medium mt-2 flex items-center gap-2">
        <span>
          {isAr
            ? '💡 اسحب المقبض يميناً ويساراً للمقارنة الفورية، أو اضغط مطولاً على "رؤية الأصل".'
            : '💡 Drag the slider to compare in real-time, or press and hold "View Original".'}
        </span>
      </div>
    </div>
  );
};
