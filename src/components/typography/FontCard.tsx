import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { FontRecommendation } from '../../types/fonts';
import { loadGoogleFont, getGoogleFontsSpecimenUrl } from '../../lib/fonts/loader';

interface FontCardProps {
  font: FontRecommendation;
  sampleText: string;
  fontSize: number;
  onInspect: (font: FontRecommendation) => void;
}

export const FontCard: React.FC<FontCardProps> = ({ font, sampleText, fontSize, onInspect }) => {
  const [copied, setCopied] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    loadGoogleFont(font.family, font.weights || [400, 700]).then(() => {
      if (isMounted) setFontLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, [font.family, font.weights]);

  const handleCopyName = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(font.family);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayText = sampleText.trim() ? sampleText : font.previewText;

  return (
    <div
      onClick={() => onInspect(font)}
      className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
        font.isTopMatch
          ? 'bg-white/95 dark:bg-[#1A1D26]/95 border-2 border-[#101116]/15 dark:border-white/20 shadow-[0_20px_48px_rgba(16,17,22,0.08)] dark:shadow-[0_20px_48px_rgba(0,0,0,0.45)] ring-4 ring-[#F4F36A]/30 dark:ring-[#F4F36A]/20'
          : 'bg-white/80 dark:bg-[#15171F]/80 hover:bg-white/95 dark:hover:bg-[#1A1D26]/90 border border-[#101116]/08 dark:border-white/10 hover:border-[#101116]/15 dark:hover:border-white/20 shadow-[0_12px_32px_rgba(16,17,22,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_40px_rgba(16,17,22,0.07)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
      } backdrop-blur-xl hover:-translate-y-1`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#777982] dark:text-neutral-400">
              {font.category}
            </span>

            {font.isTopMatch && (
              <>
                <span className="text-[#777982] dark:text-neutral-500 text-xs">·</span>
                <span className="bg-[#F4F36A] text-[#101116] text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                  Best Match
                </span>
              </>
            )}
          </div>

          <h3 className="text-2xl font-bold text-[#101116] dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors truncate">
            {font.family}
          </h3>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
          <button
            onClick={handleCopyName}
            title="Copy font family name"
            className="p-2 text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all cursor-pointer"
            aria-label={`Copy ${font.family}`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <a
            href={font.sourceUrl || getGoogleFontsSpecimenUrl(font.family)}
            target="_blank"
            rel="noopener noreferrer"
            title="Open on Google Fonts"
            className="p-2 text-[#777982] dark:text-neutral-400 hover:text-[#101116] dark:hover:text-white hover:bg-[#F4F36A]/60 dark:hover:bg-[#F4F36A] dark:hover:text-[#101116] rounded-xl transition-all cursor-pointer"
            aria-label={`Open ${font.family} on Google Fonts`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Actual Live Typography Preview */}
      <div className="my-6 min-h-[110px] flex items-center justify-start overflow-hidden py-3 border-y border-[#101116]/05 dark:border-white/08">
        <p
          style={{
            fontFamily: fontLoaded ? `"${font.family}", sans-serif` : 'system-ui',
            fontSize: `${fontSize}px`,
            lineHeight: 1.25,
            transition: 'opacity 0.2s ease',
            opacity: fontLoaded ? 1 : 0.4,
          }}
          className="text-[#101116] dark:text-white break-words line-clamp-3 select-none w-full"
        >
          {displayText}
        </p>
      </div>

      {/* Match Rationale & Details */}
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
          {font.matchReason}
        </p>

        {/* Clean Unboxed Metadata (following anti-slop rules: no pill enclosures) */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#777982] dark:text-neutral-400">
          <span className="font-medium text-[#101116]/80 dark:text-neutral-200">{font.bestFor}</span>
          {font.tags && font.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{font.tags.slice(0, 3).join(' / ')}</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar: Inspect CTA */}
      <div className="mt-5 pt-4 border-t border-[#101116]/06 dark:border-white/08 flex items-center justify-between text-xs font-medium">
        <button
          onClick={() => onInspect(font)}
          className="inline-flex items-center gap-1.5 text-[#101116] dark:text-white group-hover:underline underline-offset-4 font-semibold cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#777982] dark:text-neutral-400" />
          Inspect Specimen & Pairings
        </button>

        <span className="text-[11px] font-mono-code text-[#777982] dark:text-neutral-400">
          {font.weights?.length ? `${font.weights.length} weights` : 'Regular / Bold'}
        </span>
      </div>
    </div>
  );
};
