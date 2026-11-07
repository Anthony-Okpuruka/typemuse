import React, { useState } from 'react';
import { Info, Compass } from 'lucide-react';
import { FontRecommendation, FontSearchResponse } from '../../types/fonts';
import { FontCard } from './FontCard';
import { SampleTextEditor } from './SampleTextEditor';
import { FontSpecimenModal } from './FontSpecimenModal';

interface FontResultsProps {
  data: FontSearchResponse;
}

export const FontResults: React.FC<FontResultsProps> = ({ data }) => {
  const [sampleText, setSampleText] = useState('');
  const [fontSize, setFontSize] = useState(30);
  const [selectedFont, setSelectedFont] = useState<FontRecommendation | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto mt-8 sm:mt-16 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Editorial Direction Banner */}
      <div className="bg-white/85 dark:bg-[#16181E]/90 backdrop-blur-xl border border-[#101116]/08 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_12px_32px_rgba(16,17,22,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] text-left">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-mono-code uppercase tracking-wider text-[#101116] dark:text-[#F4F36A] font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#101116] dark:text-[#F4F36A]" />
                Typographic Direction
              </span>
              <span className="text-[#777982] dark:text-neutral-400 text-xs">·</span>
              <span className="text-xs text-[#777982] dark:text-neutral-400 italic">
                "{data.interpretedTheme}"
              </span>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#101116] dark:text-neutral-100 leading-relaxed font-sans max-w-3xl">
              {data.typographyDirection}
            </p>
          </div>

          {data.isFallback && (
            <div className="flex items-start gap-2 p-3 bg-[#FBFBCB]/60 dark:bg-[#F4F36A]/15 border border-[#F4F36A]/50 dark:border-[#F4F36A]/30 rounded-xl sm:rounded-2xl max-w-sm text-xs text-[#101116] dark:text-white shrink-0">
              <Info className="w-4 h-4 text-[#101116] dark:text-[#F4F36A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Curated Catalogue Mode</span>
                <span className="text-neutral-700 dark:text-neutral-300 leading-normal">
                  Matching against 50+ verified Google Fonts specimens.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Sample Text Editor & Font Size Comparison */}
      <SampleTextEditor
        sampleText={sampleText}
        setSampleText={setSampleText}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onReset={() => setSampleText('')}
      />

      {/* Font Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
        {data.recommendations.map(font => (
          <FontCard
            key={font.id || font.family}
            font={font}
            sampleText={sampleText}
            fontSize={fontSize}
            onInspect={f => setSelectedFont(f)}
          />
        ))}
      </div>

      {/* Font Specimen & Pairings Modal */}
      {selectedFont && (
        <FontSpecimenModal
          font={selectedFont}
          onClose={() => setSelectedFont(null)}
          sampleText={sampleText}
        />
      )}
    </section>
  );
};
