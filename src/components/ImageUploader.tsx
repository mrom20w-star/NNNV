import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { getSamplePhotos, SamplePhoto } from '../utils/sampleImages';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string, fileName?: string) => void;
  lang: 'ar' | 'en';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, lang }) => {
  const isAr = lang === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [samples, setSamples] = useState<SamplePhoto[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Load synthetic test samples
    setSamples(getSamplePhotos());

    // Listen for clipboard paste anywhere
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            readAndSelectFile(blob);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
      stopCamera();
    };
  }, []);

  const readAndSelectFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onImageSelected(e.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      readAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      alert(isAr ? 'تعذر الوصول إلى الكاميرا. يرجى السماح بالإذن أو رفع صورة.' : 'Could not access camera. Please allow permission or upload an image.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    stopCamera();
    onImageSelected(dataUrl, 'Live_Camera_Capture.jpg');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      {/* Live Camera Viewfinder Modal / Panel */}
      {isCameraActive && (
        <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-amber-500/50 shadow-2xl mb-8 p-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] max-h-[500px] flex items-center justify-center bg-neutral-950">
            <video ref={videoRef} playsInline autoPlay muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-amber-400/80 rounded-2xl animate-pulse" />
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-amber-300">
              iPhone 17 Pro Live Viewfinder
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 py-2">
            <button
              onClick={stopCamera}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={captureCameraPhoto}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            >
              <div className="w-4 h-4 rounded-full border-2 border-black bg-white" />
              <span>{isAr ? 'التقاط الصورة الآن' : 'Snap Photo Now'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center overflow-hidden backdrop-blur-xl ${
          isDragging
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-neutral-800 hover:border-amber-500/50 bg-gradient-to-b from-neutral-900/60 to-black/60 hover:bg-neutral-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              readAndSelectFile(e.target.files[0]);
            }
          }}
        />

        {/* Subtle camera lens ring reflection */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Stylized Shutter Button */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 p-1 border border-neutral-700/80 group-hover:border-amber-400/80 group-hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center group-hover:bg-neutral-800/80 transition-colors">
              <Upload className="w-8 h-8 text-amber-400 group-hover:translate-y-[-2px] transition-transform" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-2">
            {isAr
              ? 'ضع صورتك هنا من أي هاتف في العالم'
              : 'Drop Your Photo Here from Any Phone'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-lg mb-6 leading-relaxed">
            {isAr
              ? 'اسحب الصورة وأفلتها هنا، أو اضغط لاختيارها من جهازك، أو الصقها مباشرة (Ctrl+V). سيقوم النظام فورياً برفع جودتها لمعايير كاميرا آيفون 17 برو ماكس 48 ميجابكسل.'
              : 'Drag & drop, click to browse, or paste directly (Ctrl+V). Our neural Photonic Engine will instantly upscale it to 48MP iPhone 17 Pro Max optical quality.'}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isAr ? 'اختيار من الاستوديو' : 'Browse Gallery'}</span>
            </button>

            <button
              type="button"
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800/90 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-sm transition-all hover:scale-105"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'التقاط صورة مباشرة' : 'Take Live Photo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instant 1-Click Test Samples */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-neutral-300">
              {isAr ? 'جرّب على صور هواتف قديمة جاهزة (بنقرة واحدة):' : 'Or try with sample test photos (1-click):'}
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {isAr ? 'معاينة فورية' : 'Instant Demo'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {samples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onImageSelected(sample.dataUrl, `${sample.titleEn}.jpg`)}
              className="group cursor-pointer p-3 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-amber-500/50 transition-all duration-200 flex items-center gap-3 shadow-md hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-950 flex-shrink-0 border border-neutral-700/60 group-hover:border-amber-400/60 transition-colors">
                <img
                  src={sample.dataUrl}
                  alt={isAr ? sample.titleAr : sample.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0 text-right rtl:text-right ltr:text-left">
                <div className="text-xs font-bold text-neutral-200 group-hover:text-amber-300 transition-colors truncate">
                  {isAr ? sample.titleAr : sample.titleEn}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {sample.cameraSource}
                </div>
                <div className="text-[10px] text-amber-400/80 font-medium mt-1 flex items-center gap-1">
                  <span>{isAr ? 'اضغط للمعاينة ↗' : 'Click to test ↗'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
