import React from 'react';
import { Shuffle } from 'lucide-react';
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
  return (
    <header className="relative z-10 flex items-center justify-between gap-8 px-6 sm:px-10 py-5 w-full max-w-7xl mx-auto">
      {/* Zone 1: Brand Wordmark (Single text element in display face) */}
      <a
        href="/"
        className="font-brand text-2xl font-black tracking-tight text-[#101116] dark:text-white hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
      >
        TYPEMUSE
      </a>

      {/* Zone 2: 4 Single-Line Text Links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#777982] dark:text-neutral-400">
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

      {/* Zone 3: 1 Primary Action + Real-Time Solar Theme Switcher */}
      <div className="flex items-center gap-3 shrink-0">
        <ThemeToggle
          mode={themeMode}
          resolvedTheme={resolvedTheme}
          onSetMode={onSetThemeMode}
        />

        <button
          onClick={onSurpriseMe}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#101116] bg-[#F4F36A] hover:bg-[#FBFBCB] border border-[#101116]/10 rounded-full transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap shrink-0"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Surprise Me
        </button>
      </div>
    </header>
  );
};
