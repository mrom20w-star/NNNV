import React, { useState } from 'react';
import { Download, Copy, Check, X, Sparkles, Share2 } from 'lucide-react';
import { PhotonicSettings } from '../types/camera';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  enhancedCanvas: HTMLCanvasElement | null;
  settings: PhotonicSettings;
  lang: 'ar' | 'en';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  enhancedCanvas,
  settings,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !enhancedCanvas) return null;

  const handleDownload = (scale: number = 1) => {
    setDownloading(true);
    setTimeout(() => {
      const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const quality = format === 'jpeg' ? 0.98 : undefined;
      const dataUrl = enhancedCanvas.toDataURL(mime, quality);

      const link = document.createElement('a');
      link.download = `iPhone_17_Pro_Max_48MP_${Date.now()}.${format === 'jpeg' ? 'jpg' : 'png'}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
      onClose();
    }, 150);
  };

  const handleCopy = async () => {
    try {
      enhancedCanvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 mb-3">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-100">
            {isAr ? 'تصدير صورة آيفون 17 برو ماكس' : 'Export 17 Pro Max Photo'}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {isAr
              ? 'معالجة 48 ميجابكسل كاملة بنطاق ألوان Display P3 ومحرك الفوتونيك'
              : 'Full 48MP resolution with Display P3 color space and Photonic tags'}
          </p>
        </div>

        {/* Thumbnail Preview */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
          <img
            src={enhancedCanvas.toDataURL('image/jpeg', 0.85)}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between p-1.5 bg-neutral-950 rounded-2xl border border-neutral-800">
          <button
            onClick={() => setFormat('jpeg')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              format === 'jpeg'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            JPEG High-Fidelity (48MP Max)
          </button>
          <button
            onClick={() => setFormat('png')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              format === 'png'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            PNG Lossless
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleDownload(1)}
            disabled={downloading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloading
                ? isAr
                  ? 'جاري حفظ الصورة بدقة 48MP...'
                  : 'Saving 48MP Image...'
                : isAr
                ? 'تحميل الصورة بجودة آيفون 17 برو ماكس (48MP)'
                : 'Download 17 Pro Max 48MP Image'}
            </span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-neutral-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">
                  {isAr ? 'تم نسخ الصورة إلى الحافظة بنجاح!' : 'Copied to Clipboard!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isAr ? 'نسخ الصورة للحافظة (مشاركة سريعة)' : 'Copy to Clipboard'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
