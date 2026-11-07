import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { VERIFIED_FONT_CATALOGUE, findMatchingCatalogueFonts } from './src/lib/fonts/catalogue.ts';
import { FontRecommendation, FontSearchResponse } from './src/types/fonts.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory query cache for instant sub-millisecond retrieval
const searchCache = new Map<string, FontSearchResponse>();

// List of font family names from our verified catalogue to guide the model
const VERIFIED_FAMILIES = VERIFIED_FONT_CATALOGUE.map(f => f.family).join(', ');

// Server-side Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Streamlined, high-performance system instruction for rapid inference
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

// POST /api/recommend-fonts
app.post('/api/recommend-fonts', async (req: Request, res: Response) => {
  const { theme, count = 5 } = req.body;

  if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a valid theme or mood description.' });
  }

  const cleanTheme = theme.trim();
  const cacheKey = cleanTheme.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

  // Instant response from cache if already queried
  if (searchCache.has(cacheKey)) {
    return res.json(searchCache.get(cacheKey));
  }

  const ai = getGeminiClient();

  if (!ai) {
    const fallback = buildCatalogueResponse(cleanTheme, count, 'Live AI synthesis running with local typographic catalogue fallback (GEMINI_API_KEY not configured).');
    searchCache.set(cacheKey, fallback);
    return res.json(fallback);
  }

  try {
    const prompt = `Recommend 4 to 6 real Google Fonts for: "${cleanTheme}". Select one top match with isTopMatch: true.`;

    // Fast execution with timeout race (3500ms limit to ensure lightning-fast UI)
    const aiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretedTheme: {
              type: Type.STRING,
              description: 'Concise interpretation of the user’s design direction.',
            },
            typographyDirection: {
              type: Type.STRING,
              description: 'Art-directed rationale for the selected typographic anatomy, weights, and geometry.',
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  family: {
                    type: Type.STRING,
                    description: 'Exact font family name on Google Fonts.',
                  },
                  category: {
                    type: Type.STRING,
                    description: 'Typographic classification or style.',
                  },
                  weights: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                    description: 'Recommended font weights (e.g. [400, 700]).',
                  },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '3-4 descriptive keywords.',
                  },
                  matchReason: {
                    type: Type.STRING,
                    description: '1-sentence explanation of why this font fits the mood.',
                  },
                  bestFor: {
                    type: Type.STRING,
                    description: 'Recommended practical design application.',
                  },
                  previewText: {
                    type: Type.STRING,
                    description: 'Custom evocative phrase displaying the font.',
                  },
                  pairingSuggestion: {
                    type: Type.STRING,
                    description: 'Complementary secondary font suggestion.',
                  },
                  isTopMatch: {
                    type: Type.BOOLEAN,
                    description: 'True for the primary match, false for others.',
                  },
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
      setTimeout(() => reject(new Error('AI response timeout (3500ms limit exceeded)')), 3500);
    });

    const response = await Promise.race([aiPromise, timeoutPromise]) as any;

    const rawText = response?.text;
    if (!rawText) {
      throw new Error('Empty response received from Gemini.');
    }

    const parsed = JSON.parse(rawText);

    // Format recommendations with verified URLs
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

    searchCache.set(cacheKey, result);
    return res.json(result);
  } catch (error: any) {
    console.warn('AI search fast fallback engaged:', error?.message);

    // Return instant, high-accuracy semantic catalogue matches
    const fallbackResult = buildCatalogueResponse(cleanTheme, count, error?.message || 'High demand spike; served high-accuracy verified font catalogue matches.');
    searchCache.set(cacheKey, fallbackResult);
    return res.json(fallbackResult);
  }
});

// Start Express server and mount Vite in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TYPEMUSE full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
