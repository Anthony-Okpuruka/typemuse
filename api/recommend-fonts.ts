import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { VERIFIED_FONT_CATALOGUE, findMatchingCatalogueFonts } from '../src/lib/fonts/catalogue.ts';
import { FontRecommendation, FontSearchResponse } from '../src/types/fonts.ts';

const VERIFIED_FAMILIES = VERIFIED_FONT_CATALOGUE.map(f => f.family).join(', ');

const SYSTEM_INSTRUCTION = `You are TYPEMUSE, a master typographer and AI font curator.
Interpret the user's theme, mood, or brand direction, and recommend 4 to 6 real Google Fonts that embody that personality.
Verified reference fonts: ${VERIFIED_FAMILIES}.
Rules:
1. Always recommend REAL Google Fonts.
2. Provide a 1-sentence typographyDirection analyzing the anatomy, weight, and contrast.
3. For each font: family name, category, weights [400, 700], 3 short tags, a concise 1-sentence matchReason, bestFor use, custom previewText, and pairingSuggestion.
4. Exactly one font marked isTopMatch: true.`;

function buildCatalogueResponse(cleanTheme: string, count: number, errorNotice?: string): FontSearchResponse {
  const matched = findMatchingCatalogueFonts(cleanTheme, count);
  const recommendations: FontRecommendation[] = matched.map((font, idx) => ({
    id: `font-${idx + 1}-${font.family.toLowerCase().replace(/\s+/g, '-')}`,
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
    typographyDirection: `Curated typographic hierarchy matching "${cleanTheme}" with verified optical balance and contrast.`,
    recommendations,
    isFallback: true,
    errorMessage: errorNotice,
  };
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { theme, count = 6 } = req.body || {};

  if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a valid theme or mood description.' });
  }

  const cleanTheme = theme.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const fallback = buildCatalogueResponse(cleanTheme, count);
    return res.status(200).json(fallback);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Recommend 4 to 6 real Google Fonts for: "${cleanTheme}". Select one top match with isTopMatch: true.`;

    const aiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretedTheme: { type: Type.STRING },
            typographyDirection: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  family: { type: Type.STRING },
                  category: { type: Type.STRING },
                  weights: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  matchReason: { type: Type.STRING },
                  bestFor: { type: Type.STRING },
                  previewText: { type: Type.STRING },
                  pairingSuggestion: { type: Type.STRING },
                  isTopMatch: { type: Type.BOOLEAN },
                },
                required: ['family', 'category', 'matchReason', 'bestFor', 'tags', 'previewText'],
              },
            },
          },
          required: ['interpretedTheme', 'typographyDirection', 'recommendations'],
        },
      },
    });

    const timeoutPromise = new Promise<null>((_, reject) => {
      setTimeout(() => reject(new Error('AI response timeout')), 4000);
    });

    const response = await Promise.race([aiPromise, timeoutPromise]) as any;
    const rawText = response?.text;
    if (!rawText) throw new Error('Empty response from model');

    const parsed = JSON.parse(rawText);

    const formattedRecommendations: FontRecommendation[] = (parsed.recommendations || []).map(
      (rec: any, idx: number) => ({
        id: `rec-${idx + 1}-${(rec.family || 'font').toLowerCase().replace(/\s+/g, '-')}`,
        family: rec.family,
        category: rec.category || 'Google Font',
        weights: Array.isArray(rec.weights) && rec.weights.length > 0 ? rec.weights : [400, 700],
        tags: Array.isArray(rec.tags) ? rec.tags : ['Modern', 'Editorial'],
        matchReason: rec.matchReason || 'Carefully chosen to embody the aesthetic brief.',
        bestFor: rec.bestFor || 'Headlines and branding',
        previewText: rec.previewText || 'The quick brown fox jumps over the lazy dog',
        sourceUrl: `https://fonts.google.com/specimen/${encodeURIComponent(rec.family)}`,
        googleFontsFamily: rec.family,
        isTopMatch: rec.isTopMatch ?? idx === 0,
        pairingSuggestion: rec.pairingSuggestion || 'Plus Jakarta Sans 400 for balanced body copy',
      })
    );

    if (!formattedRecommendations.some(r => r.isTopMatch) && formattedRecommendations.length > 0) {
      formattedRecommendations[0].isTopMatch = true;
    }

    const result: FontSearchResponse = {
      interpretedTheme: parsed.interpretedTheme || cleanTheme,
      typographyDirection: parsed.typographyDirection || 'Refined typographic hierarchy matched to your creative brief.',
      recommendations: formattedRecommendations,
      isFallback: false,
      modelUsed: 'gemini-3.8-flash',
    };

    return res.status(200).json(result);
  } catch (error: any) {
    const fallback = buildCatalogueResponse(cleanTheme, count, error?.message);
    return res.status(200).json(fallback);
  }
}
