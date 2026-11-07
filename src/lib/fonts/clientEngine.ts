import { VERIFIED_FONT_CATALOGUE, findMatchingCatalogueFonts } from './catalogue';
import { FontRecommendation, FontSearchResponse } from '../../types/fonts';

/**
 * Client-side typographic recommendation engine.
 * Ensures the app works 100% reliably across all hosting environments
 * (static hosting, GitHub Pages, Netlify, Vercel, Cloudflare, etc.)
 * even when a Node.js backend server is not running or returns 404.
 */
export function generateClientFontRecommendations(theme: string, count: number = 6): FontSearchResponse {
  const cleanTheme = theme.trim();
  const matched = findMatchingCatalogueFonts(cleanTheme, count);

  const recommendations: FontRecommendation[] = matched.map((font, idx) => ({
    id: `font-client-${idx + 1}-${font.family.toLowerCase().replace(/\s+/g, '-')}`,
    family: font.family,
    category: font.category,
    weights: font.weights,
    tags: font.moods.slice(0, 4),
    matchReason: font.description,
    bestFor: font.bestFor,
    previewText: font.samplePhrase,
    sourceUrl: `https://fonts.google.com/specimen/${font.family.replace(/\s+/g, '+')}`,
    googleFontsFamily: font.family,
    isTopMatch: idx === 0,
    pairingSuggestion: font.pairingSuggestion,
  }));

  return {
    interpretedTheme: cleanTheme,
    typographyDirection: `Curated typographic hierarchy matching "${cleanTheme}" with verified optical balance, proportion, and contrast.`,
    recommendations,
    isFallback: true,
  };
}
