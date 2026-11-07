import React, { useState, useEffect } from 'react';
import { X, Check, Copy, ExternalLink, Sliders, Type, Layers } from 'lucide-react';
import { FontRecommendation } from '../../types/fonts';
import { getGoogleFontsSpecimenUrl } from '../../lib/fonts/loader';

interface FontSpecimenModalProps {
  font: FontRecommendation | null;
  onClose: () => void;
  sampleText: string;
}

export const FontSpecimenModal: React.FC<FontSpecimenModalProps> = ({ font, onClose, sampleText }) => {
  const [activeWeight, setActiveWeight] = useState<number>(font?.weights?.[0] || 400);
  const [copiedCss, setCopiedCss] = useState(false);
  const [activeTab, setActiveTab] = useState<'specimen' | 'pairing' | 'glyphs'>('specimen');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!font) return null;

  const cssDeclaration = `font-family: '${font.family}', ${font.category.toLowerCase().includes('serif') ? 'serif' : font.category.toLowerCase().includes('mono') ? 'monospace' : 'sans-serif'};`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssDeclaration);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const weights = font.weights && font.weights.length > 0 ? font.weights : [400, 700];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101116]/50 dark:bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white/95 dark:bg-[#14161D]/95 backdrop-blur-2xl border border-[#101116]/10 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_32px_64px_rgba(16,17,22,0.18)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.6)] p-4 sm:p-7"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#101116]/08 dark:border-white/10 gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code">
                {font.category}
              </span>
              {font.isTopMatch && (
                <>
                  <span className="text-[#777982] dark:text-neutral-500 text-xs">·</span>
                  <span className="bg-[#F4F36A] text-[#101116] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                    Best Match
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#101116] dark:text-white tracking-tight truncate">
              {font.family}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={font.sourceUrl || getGoogleFontsSpecimenUrl(font.family)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 h-9 px-2.5 sm:px-3 text-xs font-medium text-[#101116] dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-[#F4F36A] dark:hover:bg-[#F4F36A] dark:hover:text-[#101116] rounded-xl transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Google Fonts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls - Swipeable on mobile */}
        <div className="flex items-center gap-1.5 mt-4 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl overflow-x-auto no-scrollbar w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('specimen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'specimen'
                ? 'bg-white dark:bg-neutral-700 text-[#101116] dark:text-white shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Specimen
          </button>
          <button
            onClick={() => setActiveTab('pairing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'pairing'
                ? 'bg-white dark:bg-neutral-700 text-[#101116] dark:text-white shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Pairing
          </button>
          <button
            onClick={() => setActiveTab('glyphs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'glyphs'
                ? 'bg-white dark:bg-neutral-700 text-[#101116] dark:text-white shadow-sm'
                : 'text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Glyphs
          </button>
        </div>

        {/* Tab 1: Specimen */}
        {activeTab === 'specimen' && (
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            {/* Weight Switcher */}
            {weights.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-xs text-[#777982] dark:text-neutral-400 font-medium mr-1 shrink-0">Weight:</span>
                {weights.map(w => (
                  <button
                    key={w}
                    onClick={() => setActiveWeight(w)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                      activeWeight === w
                        ? 'bg-[#101116] dark:bg-white text-white dark:text-[#101116] font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}

            {/* Live Custom Text Preview */}
            <div className="p-4 sm:p-6 bg-neutral-50/70 dark:bg-neutral-900/50 border border-[#101116]/06 dark:border-white/08 rounded-xl sm:rounded-2xl">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-2 sm:mb-3">
                Live Rendering ({activeWeight} Weight)
              </span>
              <p
                style={{
                  fontFamily: `"${font.family}", sans-serif`,
                  fontWeight: activeWeight,
                }}
                className="text-2xl sm:text-4xl text-[#101116] dark:text-white leading-tight break-words"
              >
                {sampleText || font.previewText}
              </p>
            </div>

            {/* Curatorial Rationale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 bg-white dark:bg-neutral-900/70 border border-[#101116]/08 dark:border-white/10 rounded-xl">
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-1">
                  Typographic Rationale
                </span>
                <p className="text-xs sm:text-sm text-[#101116] dark:text-neutral-200 leading-relaxed">
                  {font.matchReason}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-white dark:bg-neutral-900/70 border border-[#101116]/08 dark:border-white/10 rounded-xl">
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-1">
                  Optimal Practical Context
                </span>
                <p className="text-xs sm:text-sm text-[#101116] dark:text-neutral-200 leading-relaxed">
                  {font.bestFor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pairing Harmony */}
        {activeTab === 'pairing' && (
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 bg-neutral-50/70 dark:bg-neutral-900/50 border border-[#101116]/06 dark:border-white/08 rounded-xl sm:rounded-2xl">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-2 sm:mb-3">
                Headline & Body Contrast Demonstration
              </span>

              {/* Headline in target font */}
              <h3
                style={{ fontFamily: `"${font.family}", serif` }}
                className="text-xl sm:text-3xl font-bold text-[#101116] dark:text-white mb-2 sm:mb-3 break-words"
              >
                The Architecture of Pure Silence
              </h3>

              {/* Body in recommended pairing */}
              <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
                {font.pairingSuggestion || 'Pairs naturally with Plus Jakarta Sans 400 for balanced clarity.'} When applied across editorial spreads, high visual contrast establishes authoritative hierarchy while preserving uninterrupted reading cadence.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#FBFBCB]/40 dark:bg-[#F4F36A]/10 border border-[#F4F36A]/40 dark:border-[#F4F36A]/20 rounded-xl">
              <span className="text-xs font-bold text-[#101116] dark:text-[#F4F36A] uppercase tracking-wider block">
                Recommended Companion
              </span>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
                {font.pairingSuggestion}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Glyphs & Anatomy */}
        {activeTab === 'glyphs' && (
          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-5">
            <div className="p-3.5 sm:p-4 bg-neutral-50/70 dark:bg-neutral-900/50 border border-[#101116]/06 dark:border-white/08 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-1 sm:mb-2">
                Uppercase Characters
              </span>
              <p
                style={{ fontFamily: `"${font.family}", sans-serif` }}
                className="text-base sm:text-xl text-[#101116] dark:text-white tracking-widest leading-relaxed break-words"
              >
                A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
              </p>
            </div>

            <div className="p-3.5 sm:p-4 bg-neutral-50/70 dark:bg-neutral-900/50 border border-[#101116]/06 dark:border-white/08 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-1 sm:mb-2">
                Lowercase Characters
              </span>
              <p
                style={{ fontFamily: `"${font.family}", sans-serif` }}
                className="text-base sm:text-xl text-[#101116] dark:text-white tracking-widest leading-relaxed break-words"
              >
                a b c d e f g h i j k l m n o p q r s t u v w x y z
              </p>
            </div>

            <div className="p-3.5 sm:p-4 bg-neutral-50/70 dark:bg-neutral-900/50 border border-[#101116]/06 dark:border-white/08 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777982] dark:text-neutral-400 font-mono-code mb-1 sm:mb-2">
                Numerals & Punctuation
              </span>
              <p
                style={{ fontFamily: `"${font.family}", sans-serif` }}
                className="text-base sm:text-xl text-[#101116] dark:text-white tracking-widest leading-relaxed break-words"
              >
                0 1 2 3 4 5 6 7 8 9 & % $ € £ @ # * ? ! ( ) [ ] — /
              </p>
            </div>
          </div>
        )}

        {/* Footer with CSS snippet copy */}
        <div className="mt-6 pt-4 border-t border-[#101116]/08 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="text-xs font-mono-code text-[#777982] dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 px-3 py-2 rounded-xl overflow-x-auto whitespace-nowrap border border-transparent dark:border-white/05">
            <span>{cssDeclaration}</span>
          </div>

          <button
            onClick={copyCss}
            className="flex items-center justify-center gap-1.5 h-10 px-4 text-xs font-medium text-white dark:text-[#101116] bg-[#101116] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            {copiedCss ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F4F36A] dark:text-emerald-600" />
                Copied CSS
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy CSS Declaration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
