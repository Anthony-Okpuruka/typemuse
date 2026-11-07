import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Clock, ChevronDown } from 'lucide-react';

export type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeToggleProps {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  onSetMode: (mode: ThemeMode) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, resolvedTheme, onSetMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const isNight = hours >= 19 || hours < 7;
      setCurrentTimeStr(`${displayHours}:${minutes} ${ampm} · ${isNight ? 'Night' : 'Day'}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCycle = () => {
    if (mode === 'auto') onSetMode('light');
    else if (mode === 'light') onSetMode('dark');
    else onSetMode('auto');
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Trigger Button */}
      <div className="flex items-center">
        <button
          onClick={handleCycle}
          title={`Theme: ${mode.toUpperCase()} (Active: ${resolvedTheme}) — Click to cycle, or use dropdown`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#777982] dark:text-neutral-300 hover:text-[#101116] dark:hover:text-white bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 border border-[#101116]/08 dark:border-white/10 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
          aria-label="Color theme selector"
        >
          {mode === 'auto' ? (
            <>
              <Clock className="w-3.5 h-3.5 text-[#101116] dark:text-[#F4F36A]" />
              <span className="hidden sm:inline text-[11px] font-mono-code">Auto</span>
            </>
          ) : resolvedTheme === 'dark' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline text-[11px] font-mono-code">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline text-[11px] font-mono-code">Light</span>
            </>
          )}

          <span
            onClick={e => {
              e.stopPropagation();
              setIsOpen(prev => !prev);
            }}
            className="p-0.5 hover:bg-neutral-300/60 dark:hover:bg-neutral-600/60 rounded-full transition-colors ml-0.5"
            title="Choose theme mode"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>
      </div>

      {/* Popover Selection Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-1.5 bg-white/95 dark:bg-[#16181E]/95 backdrop-blur-xl border border-[#101116]/10 dark:border-white/12 rounded-2xl shadow-[0_16px_36px_rgba(16,17,22,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.5)] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-[#101116]/06 dark:border-white/06 mb-1">
            <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#777982] dark:text-neutral-400 block">
              Real-Time Solar Engine
            </span>
            <span className="text-xs font-medium text-[#101116] dark:text-neutral-200 block truncate">
              {currentTimeStr}
            </span>
          </div>

          <button
            onClick={() => {
              onSetMode('auto');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
              mode === 'auto'
                ? 'bg-[#F4F36A]/40 dark:bg-[#F4F36A]/20 text-[#101116] dark:text-white font-semibold'
                : 'text-[#777982] dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Solar (Auto)</span>
            </div>
            {mode === 'auto' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#101116] dark:bg-[#F4F36A]" />
            )}
          </button>

          <button
            onClick={() => {
              onSetMode('light');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
              mode === 'light'
                ? 'bg-[#F4F36A]/40 dark:bg-[#F4F36A]/20 text-[#101116] dark:text-white font-semibold'
                : 'text-[#777982] dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5" />
              <span>Light Canvas</span>
            </div>
            {mode === 'light' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#101116] dark:bg-[#F4F36A]" />
            )}
          </button>

          <button
            onClick={() => {
              onSetMode('dark');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
              mode === 'dark'
                ? 'bg-[#F4F36A]/40 dark:bg-[#F4F36A]/20 text-[#101116] dark:text-white font-semibold'
                : 'text-[#777982] dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5" />
              <span>Obsidian Midnight (Dark)</span>
            </div>
            {mode === 'dark' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#101116] dark:bg-[#F4F36A]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
