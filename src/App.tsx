import React, { useState, useEffect, useRef } from 'react';
import { FloatingLetters } from './components/typography/FloatingLetters';
import { Header } from './components/layout/Header';
import { FontSearch } from './components/hero/FontSearch';
import { FontResults } from './components/typography/FontResults';
import { InfoModal } from './components/modals/InfoModal';
import { FontSearchResponse } from './types/fonts';
import { preloadFontBatch } from './lib/fonts/loader';
import { ThemeMode } from './components/layout/ThemeToggle';
import { generateClientFontRecommendations } from './lib/fonts/clientEngine';
import { Loader2 } from 'lucide-react';

const RANDOM_MOODS = [
  'Bold, aggressive, athletic & high-impact',
  'Luxury haute couture editorial fashion',
  'Cyberpunk futuristic developer terminal',
  'Warm artisanal coffee & independent book press',
  'Minimalist Scandinavian architecture',
  'Retro 70s psychedelic groovy sunshine',
  'Delicate poetic romantic wedding stationery',
  'Monumental classical Roman stone engraving',
  'Raw grunge skatepunk permanent marker',
  'Playful approachable modern children brand',
];

/**
 * Calculates whether the current local solar time corresponds to dark mode.
 * Nighttime: 7:00 PM (19:00) to 6:59 AM (06:59) -> 'dark'
 * Daytime:   7:00 AM (07:00) to 6:59 PM (18:59) -> 'light'
 */
const getSolarTheme = (): 'light' | 'dark' => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? 'dark' : 'light';
};

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FontSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'curated' | 'specimens' | 'pairings' | 'philosophy' | null>(null);

  // Theme mode: 'auto' (real-time solar detection), 'light' (forced light), or 'dark' (forced dark)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('typemuse_theme_mode') as ThemeMode;
      if (saved === 'auto' || saved === 'light' || saved === 'dark') return saved;
      // Legacy theme key fallback
      const legacy = localStorage.getItem('theme');
      if (legacy === 'dark' || legacy === 'light') return legacy;
    }
    return 'auto'; // Default: automatic real-time detection
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (themeMode === 'light') return 'light';
    if (themeMode === 'dark') return 'dark';
    return getSolarTheme();
  });

  const resultsRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Synchronize theme with DOM and monitor real-time clock
  useEffect(() => {
    const updateTheme = () => {
      let active: 'light' | 'dark';
      if (themeMode === 'auto') {
        active = getSolarTheme();
      } else {
        active = themeMode;
      }

      setResolvedTheme(active);

      const root = document.documentElement;
      if (active === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();
    localStorage.setItem('typemuse_theme_mode', themeMode);

    // Re-check solar time every 30 seconds so transitions happen smoothly in real time
    const interval = setInterval(updateTheme, 30000);
    return () => clearInterval(interval);
  }, [themeMode]);

  // Preload a few staple fonts for immediate fluidity
  useEffect(() => {
    preloadFontBatch([
      { family: 'Playfair Display', weights: [400, 700] },
      { family: 'Syne', weights: [700, 800] },
      { family: 'Bebas Neue', weights: [400] },
      { family: 'Plus Jakarta Sans', weights: [400, 700] },
      { family: 'Space Mono', weights: [400] },
    ]);
  }, []);

  // Global Keyboard Shortcuts (/ to search, Esc to dismiss modal or blur)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea';

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'Escape') {
        if (activeModal) {
          setActiveModal(null);
        } else if (isInput) {
          (e.target as HTMLElement).blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleSearch = async (searchTheme: string) => {
    if (!searchTheme.trim()) return;

    setIsLoading(true);
    setError(null);
    setQuery(searchTheme);

    // Update URL query parameter seamlessly for shareability
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchTheme.trim());
      window.history.replaceState(null, '', url.toString());
    }

    try {
      let data: FontSearchResponse | null = null;

      // 1. Try server-side API endpoint first (works on full-stack, Vercel serverless, etc.)
      try {
        const response = await fetch('/api/recommend-fonts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: searchTheme.trim(), count: 6 }),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          console.warn(`Server responded with ${response.status}; engaging client typography engine.`);
        }
      } catch (networkErr) {
        console.warn('Backend unavailable; switching to client typography engine:', networkErr);
      }

      // 2. Seamless client fallback: if backend returned 404 or host is static (GitHub Pages, Netlify, etc.),
      // immediately generate matching fonts using the built-in verified typography engine with zero errors!
      if (!data || !data.recommendations || data.recommendations.length === 0) {
        data = generateClientFontRecommendations(searchTheme.trim(), 6);
      }

      setResults(data);

      // Preload recommended fonts in the background
      if (data.recommendations && data.recommendations.length > 0) {
        preloadFontBatch(data.recommendations);
      }

      // Smooth scroll to results on next tick
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Typographic search fallback triggered:', err);
      const fallback = generateClientFontRecommendations(searchTheme.trim(), 6);
      setResults(fallback);
      preloadFontBatch(fallback.recommendations);
    } finally {
      setIsLoading(false);
    }
  };


  // URL query parameter check on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get('q') || params.get('theme');
      if (initialQuery && initialQuery.trim()) {
        handleSearch(initialQuery.trim());
      }
    }
  }, []);

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_MOODS.length);
    const chosen = RANDOM_MOODS[randomIndex];
    handleSearch(chosen);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0D0E12] text-[#101116] dark:text-[#F3F4F6] flex flex-col justify-between selection:bg-[#F4F36A] selection:text-[#101116] overflow-x-hidden transition-colors duration-300">
      {/* 1. Background: Interactive Floating Typography with edge cut-off oversized characters */}
      <FloatingLetters />

      {/* 2. Top Header Navigation with Real-Time Solar Engine & manual overrides */}
      <Header
        onSurpriseMe={handleSurpriseMe}
        onNavigateSection={section => setActiveModal(section as any)}
        themeMode={themeMode}
        resolvedTheme={resolvedTheme}
        onSetThemeMode={setThemeMode}
      />

      {/* 3. Main Central Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto w-full text-center">

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#101116] dark:text-white tracking-tight leading-[1.08] max-w-3xl mb-5 font-brand text-balance">
          Find the type that feels right.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#777982] dark:text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Describe a mood, a brand or an idea. Let AI find the fonts that bring it to life.
        </p>

        {/* Central Floating Search Bar with Subtle Suspension Animation */}
        <div className="w-full transition-transform duration-700 ease-in-out hover:-translate-y-0.5">
          <FontSearch
            ref={searchInputRef}
            onSearch={handleSearch}
            isLoading={isLoading}
            currentQuery={query}
          />
        </div>

        {/* Loading Indicator with Animated Typographic Sequence */}
        {isLoading && (
          <div className="mt-12 flex flex-col items-center gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-[#16181E]/90 backdrop-blur-md rounded-2xl border border-[#101116]/10 dark:border-white/10 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-[#101116] dark:text-[#F4F36A]" />
              <span className="text-xs font-mono-code text-[#101116] dark:text-neutral-200 font-medium">
                Analyzing typography proportions, weights & contrast...
              </span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mt-8 p-4 bg-red-50/90 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/60 rounded-2xl text-xs text-red-700 dark:text-red-300 max-w-md mx-auto text-left">
            <span className="font-bold block mb-1">Notice</span>
            {error}
          </div>
        )}

        {/* Results Anchor & Container */}
        <div ref={resultsRef} className="w-full">
          {results && !isLoading && (
            <FontResults data={results} />
          )}
        </div>

        {/* Signature Line */}
        <div className="mt-16 sm:mt-24 pt-8 text-xs font-mono-code text-[#777982] dark:text-neutral-500 tracking-wider uppercase border-t border-[#101116]/05 dark:border-white/06 w-full max-w-sm mx-auto">
          Good design starts with the right type.
        </div>
      </main>

      {/* 4. Minimal Footer */}
      <footer className="relative z-10 py-6 px-6 sm:px-10 border-t border-[#101116]/06 dark:border-white/08 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777982] dark:text-neutral-400 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-brand font-bold text-[#101116] dark:text-white">TYPEMUSE</span>
          <span>—</span>
          <span>AI Font Discovery Engine</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setActiveModal('specimens')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors cursor-pointer"
          >
            Google Fonts Verified
          </button>
          <span>·</span>
          <button
            onClick={() => setActiveModal('pairings')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors cursor-pointer"
          >
            Pairing Harmony
          </button>
        </div>
      </footer>

      {/* Info & Modals */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectTheme={theme => handleSearch(theme)}
      />
    </div>
  );
}
