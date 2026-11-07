import React from 'react';
import { X, Compass, BookOpen, Layers, Heart } from 'lucide-react';
import { VERIFIED_FONT_CATALOGUE } from '../../lib/fonts/catalogue';

interface InfoModalProps {
  type: 'curated' | 'specimens' | 'pairings' | 'philosophy' | null;
  onClose: () => void;
  onSelectTheme?: (theme: string) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onSelectTheme }) => {
  if (!type) return null;

  const curatedMoods = [
    { title: 'Haute Couture Editorial', desc: 'Dramatic vertical stress, razor-thin hairlines, and aristocratic authority.' },
    { title: 'Cyberpunk Neon Noir', desc: 'Monospaced telemetry, terminal geometry, and synthetic futuristic grit.' },
    { title: 'Artisanal Coffee & Book Press', desc: 'Warm old-style curves, soft humanist quirks, and tactile paper warmth.' },
    { title: 'High-Impact Streetwear', desc: 'Tall, condensed, unapologetic all-caps headlines built for billposters.' },
    { title: 'Scandinavian Architectural Minimalism', desc: 'Low-contrast geometric balance with maximum negative space.' },
    { title: '70s Psychedelic Nostalgia', desc: 'Luscious, heavy organic curves with vibrant groovy rhythm.' },
  ];

  const pairingRules = [
    {
      rule: 'Contrast in Classification',
      formula: 'High-Contrast Serif Display + Neutral Geometric Sans',
      example: 'Playfair Display 700 + Plus Jakarta Sans 400',
      reason: 'Allows the headline to radiate emotional identity while giving body prose effortless readability.',
    },
    {
      rule: 'Unified Geometry & Proportions',
      formula: 'Condensed Grotesque Headline + Proportional Grotesque Subtitles',
      example: 'Bebas Neue 400 + Archivo 400',
      reason: 'Maintains consistent industrial DNA without crowding horizontal reading lines.',
    },
    {
      rule: 'Technical & Organic Juxtaposition',
      formula: 'Fixed-Pitch Monospace + Editorial Serif',
      example: 'Space Mono 400 + Cormorant Garamond 600',
      reason: 'Creates contemporary gallery tensions between algorithmic precision and classical human craft.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#101116]/40 dark:bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white/95 dark:bg-[#14161D]/95 backdrop-blur-2xl border border-[#101116]/10 dark:border-white/10 rounded-3xl shadow-[0_32px_64px_rgba(16,17,22,0.14)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.5)] p-6 sm:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#101116]/08 dark:border-white/10">
          <div className="flex items-center gap-2">
            {type === 'curated' && <Compass className="w-4 h-4 text-[#101116] dark:text-[#F4F36A]" />}
            {type === 'specimens' && <BookOpen className="w-4 h-4 text-[#101116] dark:text-[#F4F36A]" />}
            {type === 'pairings' && <Layers className="w-4 h-4 text-[#101116] dark:text-[#F4F36A]" />}
            {type === 'philosophy' && <Heart className="w-4 h-4 text-[#101116] dark:text-[#F4F36A]" />}
            <h3 className="text-xl font-bold text-[#101116] dark:text-white">
              {type === 'curated' && 'Curated Typographic Themes'}
              {type === 'specimens' && 'Verified Font Catalogue Specimens'}
              {type === 'pairings' && 'The Science of Font Pairing'}
              {type === 'philosophy' && 'The TYPEMUSE Philosophy'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#777982] hover:text-[#101116] dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content by Type */}
        <div className="mt-5 space-y-4">
          {type === 'curated' && (
            <div className="space-y-3">
              <p className="text-xs text-[#777982] dark:text-neutral-400">
                Select an art-directed aesthetic to explore matching typefaces instantly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curatedMoods.map(m => (
                  <button
                    key={m.title}
                    onClick={() => {
                      onSelectTheme?.(m.title);
                      onClose();
                    }}
                    className="p-3.5 text-left bg-neutral-50 dark:bg-neutral-900/60 hover:bg-[#F4F36A]/40 dark:hover:bg-[#F4F36A]/20 border border-[#101116]/06 dark:border-white/08 hover:border-[#101116]/20 dark:hover:border-white/20 rounded-2xl transition-all duration-200 group cursor-pointer"
                  >
                    <span className="block text-sm font-bold text-[#101116] dark:text-white group-hover:underline">
                      {m.title}
                    </span>
                    <span className="block text-xs text-[#777982] dark:text-neutral-400 mt-1 leading-relaxed">
                      {m.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'specimens' && (
            <div className="space-y-3">
              <p className="text-xs text-[#777982] dark:text-neutral-400">
                TYPEMUSE connects with an expansive catalogue of verified Google Fonts. Here are the primary archetypes:
              </p>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {VERIFIED_FONT_CATALOGUE.slice(0, 16).map(f => (
                  <div
                    key={f.family}
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900/60 border border-[#101116]/05 dark:border-white/06 rounded-xl"
                  >
                    <div>
                      <span className="text-sm font-semibold text-[#101116] dark:text-white">{f.family}</span>
                      <span className="block text-[11px] text-[#777982] dark:text-neutral-400">{f.category}</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectTheme?.(f.family);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs text-[#101116] dark:text-white bg-white dark:bg-neutral-800 border border-[#101116]/10 dark:border-white/10 hover:bg-[#F4F36A] dark:hover:bg-[#F4F36A] dark:hover:text-[#101116] rounded-lg transition-colors font-medium cursor-pointer"
                    >
                      Find Similar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'pairings' && (
            <div className="space-y-4">
              <p className="text-xs text-[#777982] dark:text-neutral-400 leading-relaxed">
                Great typographic pairing hinges on deliberate contrast: when two typefaces are too similar, they clash; when their roles are sharply differentiated, harmony emerges.
              </p>
              <div className="space-y-3">
                {pairingRules.map((rule, idx) => (
                  <div key={idx} className="p-4 bg-neutral-50 dark:bg-neutral-900/60 border border-[#101116]/06 dark:border-white/08 rounded-2xl space-y-1.5">
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#777982] dark:text-neutral-400 block">
                      Rule 0{idx + 1} · {rule.rule}
                    </span>
                    <h4 className="text-sm font-bold text-[#101116] dark:text-white">{rule.formula}</h4>
                    <p className="text-xs font-mono-code text-neutral-800 dark:text-neutral-200 bg-white/80 dark:bg-neutral-800/80 p-2 rounded-lg border border-[#101116]/05 dark:border-white/05">
                      Specimen: {rule.example}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1">
                      {rule.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'philosophy' && (
            <div className="space-y-4 text-sm text-[#101116] dark:text-neutral-200 leading-relaxed">
              <div className="p-4 bg-[#FBFBCB]/40 dark:bg-[#F4F36A]/10 border border-[#F4F36A]/50 dark:border-[#F4F36A]/30 rounded-2xl">
                <span className="font-brand text-lg font-bold block text-[#101116] dark:text-white">
                  A Little Type, A Lot of Personality
                </span>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
                  Typography is not merely the vehicle for words—it is the acoustic timber of thought.
                </p>
              </div>

              <p className="text-xs text-[#777982] dark:text-neutral-400 leading-relaxed">
                Before a reader deciphers a sentence, the letterforms have already communicated mood, authority, warmth, or rebellion. TYPEMUSE was conceived as an interactive playground where designers, writers, and brand builders discover typefaces not through dry taxonomic filters, but through the emotional language of creative direction.
              </p>

              <div className="pt-2 text-xs font-mono-code text-[#777982] dark:text-neutral-500">
                Crafted with midnight black contrast, pure typography, and tactile pale lemon details.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
