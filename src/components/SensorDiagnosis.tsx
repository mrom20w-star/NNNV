import React from 'react';
import { CameraDiagnosis } from '../types/camera';
import { ShieldCheck, Cpu, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface SensorDiagnosisProps {
  diagnosis: CameraDiagnosis | null;
  lang: 'ar' | 'en';
  isAnalyzing: boolean;
}

export const SensorDiagnosis: React.FC<SensorDiagnosisProps> = ({
  diagnosis,
  lang,
  isAnalyzing,
}) => {
  const isAr = lang === 'ar';

  if (isAnalyzing) {
    return (
      <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 text-center animate-pulse">
        <div className="flex items-center justify-center gap-2 text-amber-400 font-mono text-xs mb-2">
          <Cpu className="w-4 h-4 animate-spin" />
          <span>{isAr ? 'جاري فحص الحساس البصري للهاتف السابق عبر الذكاء الاصطناعي...' : 'Auditing Source Phone Optical Sensor...'}</span>
        </div>
        <div className="h-2 w-48 mx-auto bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 w-1/2 animate-shimmer" />
        </div>
      </div>
    );
  }

  if (!diagnosis) return null;

  const score = diagnosis.sourceSensorScore || 45;

  return (
    <div className="w-full bg-gradient-to-b from-neutral-900/80 to-black/80 backdrop-blur-xl border border-neutral-800/90 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header title */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-100">
              {isAr ? 'تقرير فحص كاميرا الهاتف ومطابقة 17 برو ماكس' : 'Optical Sensor Audit & 17 Pro Max Match'}
            </h3>
            <p className="text-xs text-neutral-400">
              {isAr ? 'تحليل معماري للحساس، المدى الديناميكي، ومستوى الضوضاء' : 'Hardware dynamic range & sensor noise evaluation'}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
          Photonic Engine v6.4
        </span>
      </div>

      {/* Comparison Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Camera Card */}
        <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400">
              {isAr ? 'حساس الهاتف الأصلي المسجل' : 'Source Phone Camera'}
            </span>
            <span className="text-xs font-bold font-mono text-red-400">
              {score}/100
            </span>
          </div>

          <div className="text-sm font-bold text-neutral-200 mb-2 truncate">
            {diagnosis.estimatedSourceDevice}
          </div>

          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* 17 Pro Max Upgrade Card */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <span></span>
              <span>{isAr ? 'معيار آيفون 17 برو ماكس' : 'Target: iPhone 17 Pro Max'}</span>
            </span>
            <span className="text-xs font-bold font-mono text-amber-300">
              99/100
            </span>
          </div>

          <div className="text-sm font-bold text-amber-200 mb-2 truncate">
            {diagnosis.simulatedExif.lens}
          </div>

          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full w-[99%]" />
          </div>
        </div>
      </div>

      {/* Detected Defects Resolved */}
      {diagnosis.detectedFlaws && diagnosis.detectedFlaws.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-neutral-300 block mb-2.5">
            {isAr
              ? 'العيوب البصرية التي تمت معالجتها ورفعها لجودة 17 برو ماكس:'
              : 'Optical Flaws Corrected to 17 Pro Max Standards:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {diagnosis.detectedFlaws.map((flaw, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{flaw}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executive Summary */}
      {diagnosis.cameraExecutiveSummaryAr && (
        <div className="p-3.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-sans">
          <span className="font-bold text-amber-400 ml-1">
            {isAr ? 'التقرير الفني لمهندسي التصوير:' : 'Imaging Scientist Report:'}
          </span>
          {diagnosis.cameraExecutiveSummaryAr}
        </div>
      )}
    </div>
  );
};
