import React, { useState } from 'react';
import { Shuffle, Menu, X, Compass, BookOpen, Layers, Heart, ExternalLink } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface HeaderProps {
  onSurpriseMe: () => void;
  onNavigateSection: (section: string) => void;
  themeMode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  onSetThemeMode: (mode: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSurpriseMe,
  onNavigateSection,
  themeMode,
  resolvedTheme,
  onSetThemeMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (section: string) => {
    onNavigateSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-5">
      <div className="flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          className="font-brand text-xl sm:text-2xl font-black tracking-tight text-[#101116] dark:text-white hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
        >
          TYPEMUSE
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#777982] dark:text-neutral-400">
          <button
            onClick={() => onNavigateSection('curated')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Curated Themes
          </button>
          <button
            onClick={() => onNavigateSection('specimens')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Font Specimens
          </button>
          <button
            onClick={() => onNavigateSection('pairings')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pairing Harmony
          </button>
          <button
            onClick={() => onNavigateSection('philosophy')}
            className="hover:text-[#101116] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Philosophy
          </button>
        </nav>

        {/* Zone 3: Actions + Theme + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle
            mode={themeMode}
            resolvedTheme={resolvedTheme}
            onSetMode={onSetThemeMode}
          />

          {/* Surprise Me CTA - responsive layout */}
          <button
            onClick={onSurpriseMe}
            className="inline-flex items-center justify-center gap-1.5 h-9 sm:h-9 px-3 sm:px-4 text-xs font-semibold text-[#101116] bg-[#F4F36A] hover:bg-[#FBFBCB] border border-[#101116]/10 rounded-full transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            title="Discover a random curated typographic aesthetic"
            aria-label="Surprise me with random fonts"
          >
            <Shuffle className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-[#101116] dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-[#101116]/08 dark:border-white/10 rounded-full transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] z-50 bg-white/98 dark:bg-[#12141A]/98 backdrop-blur-2xl border-b border-[#101116]/10 dark:border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.18)] p-5 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1 pb-4 border-b border-[#101116]/06 dark:border-white/06">
            <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#777982] dark:text-neutral-400 block px-3 mb-2">
              Explore TYPEMUSE
            </span>

            <button
              onClick={() => handleMobileNav('curated')}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium text-[#101116] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F4F36A]/30 dark:bg-[#F4F36A]/20 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-[#101116] dark:text-[#F4F36A]" />
              </div>
              <div>
                <span className="block font-semibold">Curated Themes</span>
                <span className="text-xs text-[#777982] dark:text-neutral-400">Hand-selected mood boards and aesthetics</span>
              </div>
            </button>

            <button
              onClick={() => handleMobileNav('specimens')}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium text-[#101116] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-[#101116] dark:text-white" />
              </div>
              <div>
                <span className="block font-semibold">Font Specimens</span>
                <span className="text-xs text-[#777982] dark:text-neutral-400">Catalogue of 50+ verified Google Fonts</span>
              </div>
            </button>

            <button
              onClick={() => handleMobileNav('pairings')}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium text-[#101116] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-[#101116] dark:text-white" />
              </div>
              <div>
                <span className="block font-semibold">Pairing Harmony</span>
                <span className="text-xs text-[#777982] dark:text-neutral-400">Rules of typographic contrast & rhythm</span>
              </div>
            </button>

            <button
              onClick={() => handleMobileNav('philosophy')}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium text-[#101116] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#101116] dark:text-white" />
              </div>
              <div>
                <span className="block font-semibold">Typographic Philosophy</span>
                <span className="text-xs text-[#777982] dark:text-neutral-400">Acoustic timbre of human thought</span>
              </div>
            </button>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-[#777982] dark:text-neutral-400 px-3">
            <span className="font-mono-code text-[11px]">TYPEMUSE v1.0</span>
            <button
              onClick={() => {
                onSurpriseMe();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-[#101116] dark:text-[#F4F36A] font-semibold cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Surprise Theme
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
