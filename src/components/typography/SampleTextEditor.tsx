import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface SampleTextEditorProps {
  sampleText: string;
  setSampleText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  onReset: () => void;
}

const PRESETS = [
  { label: 'Pangram', text: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Headline', text: 'A Little Type, A Lot of Personality' },
  { label: 'Branding', text: 'AVANT-GARDE VISION & PURE FORM' },
  { label: 'Numerals', text: '0123456789 &?!#$' },
];

export const SampleTextEditor: React.FC<SampleTextEditorProps> = ({
  sampleText,
  setSampleText,
  fontSize,
  setFontSize,
  onReset,
}) => {
  const [casing, setCasing] = useState<'normal' | 'upper' | 'lower' | 'title'>('normal');

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  };

  const applyCasing = (mode: 'normal' | 'upper' | 'lower' | 'title') => {
    setCasing(mode);
    if (!sampleText) return;
    if (mode === 'upper') {
      setSampleText(sampleText.toUpperCase());
    } else if (mode === 'lower') {
      setSampleText(sampleText.toLowerCase());
    } else if (mode === 'title') {
      setSampleText(toTitleCase(sampleText));
    }
  };

  return (
    <div className="w-full bg-white/80 dark:bg-[#16181E]/85 backdrop-blur-xl border border-[#101116]/08 dark:border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_24px_rgba(16,17,22,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Custom Text Input */}
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={sampleText}
          onChange={e => {
            setSampleText(e.target.value);
            setCasing('normal');
          }}
          placeholder="Type custom text to preview across all fonts..."
          className="w-full px-3.5 py-2 text-sm bg-neutral-50/80 dark:bg-neutral-900/80 border border-[#101116]/08 dark:border-white/10 rounded-xl text-[#101116] dark:text-white placeholder:text-[#777982] dark:placeholder:text-neutral-500 outline-none focus:border-[#101116]/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-neutral-900 transition-all font-sans"
        />

        {/* Text Case Toggles */}
        <div className="flex items-center gap-0.5 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => applyCasing('upper')}
            title="UPPERCASE"
            className={`px-2 py-1 text-[11px] font-mono-code font-bold rounded-lg transition-colors cursor-pointer ${
              casing === 'upper'
                ? 'bg-[#101116] dark:bg-white text-white dark:text-[#101116] shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            AA
          </button>
          <button
            type="button"
            onClick={() => applyCasing('lower')}
            title="lowercase"
            className={`px-2 py-1 text-[11px] font-mono-code rounded-lg transition-colors cursor-pointer ${
              casing === 'lower'
                ? 'bg-[#101116] dark:bg-white text-white dark:text-[#101116] shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            aa
          </button>
          <button
            type="button"
            onClick={() => applyCasing('title')}
            title="Title Case"
            className={`px-2 py-1 text-[11px] font-mono-code rounded-lg transition-colors cursor-pointer ${
              casing === 'title'
                ? 'bg-[#101116] dark:bg-white text-white dark:text-[#101116] shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            Aa
          </button>
        </div>

        {sampleText && (
          <button
            onClick={() => {
              onReset();
              setCasing('normal');
            }}
            title="Reset to default custom phrases"
            className="p-2 text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Reset text"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Presets & Font Size Controls */}
      <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
        {/* Presets */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => {
                setSampleText(p.text);
                setCasing('normal');
              }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                sampleText === p.text
                  ? 'bg-[#101116] dark:bg-white text-white dark:text-[#101116] font-medium shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-[#777982] dark:text-neutral-300 hover:text-[#101116] dark:hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Font Size Slider */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#101116]/08 dark:border-white/10 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#777982] dark:text-neutral-400" />
          <input
            type="range"
            min="20"
            max="56"
            step="2"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            className="w-20 accent-[#101116] dark:accent-[#F4F36A] cursor-pointer"
            aria-label="Font preview size"
          />
          <span className="text-xs font-mono-code text-[#777982] dark:text-neutral-400 w-8 tabular-nums">
            {fontSize}px
          </span>
        </div>
      </div>
    </div>
  );
};

