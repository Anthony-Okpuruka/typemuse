export interface FontRecommendation {
  id: string;
  family: string;
  category: string;
  weights: number[];
  tags: string[];
  matchReason: string;
  bestFor: string;
  previewText: string;
  sourceUrl?: string;
  googleFontsFamily?: string;
  isTopMatch?: boolean;
  pairingSuggestion?: string;
}

export interface FontSearchResponse {
  interpretedTheme: string;
  typographyDirection: string;
  recommendations: FontRecommendation[];
  isFallback?: boolean;
  modelUsed?: string;
  errorMessage?: string;
}

export interface CatalogueFont {
  family: string;
  category: string;
  classification: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting';
  weights: number[];
  moods: string[];
  bestFor: string;
  description: string;
  samplePhrase: string;
  pairingSuggestion: string;
}
