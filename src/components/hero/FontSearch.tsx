import React, { useState, useEffect, forwardRef } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

interface FontSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  currentQuery: string;
}

const SUGGESTIONS = [
  'Bold & Impactful',
  'Luxury & Elegant',
  'Retro 70s Psychedelic',
  'Cyberpunk Futuristic',
  'Minimalist Architecture',
  'Playful & Quirky',
  'Poetic Editorial Serif',
  'Quiet Scandinavian Modern',
];

export const FontSearch = forwardRef<HTMLInputElement, FontSearchProps>(
  ({ onSearch, isLoading, currentQuery }, ref) => {
    const [inputVal, setInputVal] = useState(currentQuery);

    // Sync input when query changes from external action (e.g., surprise me or suggestion click)
    useEffect(() => {
      setInputVal(currentQuery);
    }, [currentQuery]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputVal.trim() && !isLoading) {
        onSearch(inputVal.trim());
      }
    };

    const handleSelectSuggestion = (suggestion: string) => {
      setInputVal(suggestion);
      onSearch(suggestion);
    };

    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Floating Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="relative w-full flex items-center bg-white/85 dark:bg-[#16181E]/90 backdrop-blur-2xl border border-[#101116]/10 dark:border-white/10 hover:border-[#101116]/20 dark:hover:border-white/20 focus-within:border-[#101116]/30 dark:focus-within:border-white/30 focus-within:ring-4 focus-within:ring-[#F4F36A]/40 rounded-full shadow-[0_20px_50px_rgba(16,17,22,0.07)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-2 pl-5 sm:pl-6 transition-all duration-300">
            <Search className="w-5 h-5 text-[#777982] dark:text-neutral-400 shrink-0 mr-3" />

            <input
              ref={ref}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              disabled={isLoading}
              placeholder='Try "bold, rebellious, high-impact" or "quiet luxury"...'
              className="w-full bg-transparent text-[#101116] dark:text-white placeholder:text-[#777982]/80 dark:placeholder:text-neutral-500 text-sm sm:text-lg outline-none font-normal"
              aria-label="Describe font mood, theme or brand direction"
            />

            {/* Subtle Keyboard Shortcut Badge */}
            <span
              title="Press / anywhere to focus search"
              className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 mr-2 text-[11px] font-mono-code text-[#777982] dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-[#101116]/08 dark:border-white/10 rounded-md select-none shrink-0"
            >
              /
            </span>

            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-[#101116] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-40 text-white dark:text-[#101116] font-medium text-xs sm:text-sm transition-all duration-200 shrink-0 group shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F4F36A] dark:text-[#101116]" />
                  <span className="hidden sm:inline">Synthesizing...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Discover Type</span>
                  <ArrowRight className="w-4 h-4 text-[#F4F36A] dark:text-[#101116] group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Curated Prompt Suggestion Chips */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2">
          <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#777982] dark:text-neutral-400 mr-1 hidden sm:inline-flex items-center">
            Explore Moods:
          </span>

          {SUGGESTIONS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => handleSelectSuggestion(s)}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs text-[#101116]/80 dark:text-neutral-200 hover:text-[#101116] dark:hover:text-[#101116] bg-white/70 dark:bg-neutral-900/80 hover:bg-[#F4F36A]/60 dark:hover:bg-[#F4F36A] border border-[#101116]/08 dark:border-white/10 hover:border-[#101116]/20 dark:hover:border-white/20 rounded-full transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(16,17,22,0.02)] active:scale-95 whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

