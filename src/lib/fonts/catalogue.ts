import { CatalogueFont } from '../../types/fonts';

export const VERIFIED_FONT_CATALOGUE: CatalogueFont[] = [
  // High-Contrast & Luxury Serifs
  {
    family: 'Playfair Display',
    category: 'Transitional Display Serif',
    classification: 'serif',
    weights: [400, 600, 700, 900],
    moods: ['luxury', 'editorial', 'elegant', 'fashion', 'classic', 'high-end', 'vogue'],
    bestFor: 'Luxury editorial titles, haute couture branding, and perfume packaging',
    description: 'High contrast between thick and thin stems with delicate ball terminals, echoing 18th-century European Enlightenment bookmaking.',
    samplePhrase: 'HAUTE COUTURE & TIMELESS GRACE',
    pairingSuggestion: 'Plus Jakarta Sans 300 for crisp, contemporary captions',
  },
  {
    family: 'Cormorant Garamond',
    category: 'Renaissance Master Serif',
    classification: 'serif',
    weights: [300, 400, 600, 700],
    moods: ['poetic', 'literary', 'quiet luxury', 'museum', 'delicate', 'academic', 'historical', 'refined'],
    bestFor: 'Art gallery identities, poetry anthologies, and high-end culinary menus',
    description: 'Breathtakingly slender proportions and razor-sharp serifs influenced by Claude Garamont’s 16th-century classical type specimens.',
    samplePhrase: 'Quiet Solitude in Sunlit Marble',
    pairingSuggestion: 'DM Sans 400 for balanced modern editorial clarity',
  },
  {
    family: 'Fraunces',
    category: 'Old-Style Variable Display Serif',
    classification: 'serif',
    weights: [400, 600, 700, 800],
    moods: ['retro', 'warm', 'editorial', 'quirky', 'artisanal', 'craft', 'characterful', 'organic'],
    bestFor: 'Specialty coffee roasters, independent book presses, and artisanal apothecary packaging',
    description: 'Rich undulating curves, soft "wonky" humanist details, and tactile warmth rooted in early 20th-century packaging.',
    samplePhrase: 'Artisanal Roasts & Handcrafted Notes',
    pairingSuggestion: 'Urbanist 400 for an airy geometric counterpart',
  },
  {
    family: 'Bodoni Moda',
    category: 'Didone Modern Serif',
    classification: 'serif',
    weights: [400, 600, 700, 900],
    moods: ['dramatic', 'fashion', 'luxury', 'architectural', 'austere', 'commanding', 'expensive'],
    bestFor: 'Metropolitan fashion lookbooks, luxury watchmaker identity, and monograph covers',
    description: 'Extreme vertical stress and hairline horizontal serifs that exude dramatic aristocratic authority.',
    samplePhrase: 'AVANT-GARDE VISION & PURE FORM',
    pairingSuggestion: 'Manrope 300 for discreet technical specification text',
  },
  {
    family: 'Cinzel',
    category: 'Classical Roman Inscriptional',
    classification: 'serif',
    weights: [400, 600, 700, 900],
    moods: ['monumental', 'classical', 'roman', 'epic', 'solemn', 'cinematic', 'heritage', 'sovereign'],
    bestFor: 'Epic film titles, architectural foundations, luxury spirits, and commemorative seals',
    description: 'Chiseled lapidary capitals inspired by first-century Roman inscriptions on Trajan’s Column.',
    samplePhrase: 'ETERNAL ARCHITECTURE OF STONE',
    pairingSuggestion: 'Plus Jakarta Sans 400 for modern legibility',
  },
  {
    family: 'DM Serif Display',
    category: 'High-Impact Transitional Serif',
    classification: 'serif',
    weights: [400],
    moods: ['journalistic', 'confident', 'news', 'literary', 'authoritative', 'editorial'],
    bestFor: 'Opinion essay headlines, investigative journalism magazines, and book jacket covers',
    description: 'Sturdy teardrop terminals and muscular serif bracketing designed for crisp legibility at headline scales.',
    samplePhrase: 'The Future of Thought and Design',
    pairingSuggestion: 'DM Sans 400 for a unified typographic family system',
  },
  {
    family: 'Prata',
    category: 'Didone Editorial Serif',
    classification: 'serif',
    weights: [400],
    moods: ['delicate', 'romantic', 'soft', 'feminine', 'graceful', 'botanical', 'fine art'],
    bestFor: 'Boutique bridal stationery, natural botanical skincare, and museum invitations',
    description: 'Graceful teardrop accents, gentle curves, and elegant didone contrast that breathes romantic serenity.',
    samplePhrase: 'Petals, Whispers & Morning Mist',
    pairingSuggestion: 'Outfit 300 for clean minimal support',
  },
  {
    family: 'Abril Fatface',
    category: '19th-Century Heavy Didone Display',
    classification: 'serif',
    weights: [400],
    moods: ['bold', 'theatrical', 'vintage', 'posters', 'victorian', 'loud', 'circus', 'dramatic'],
    bestFor: 'Festival marquee posters, gourmet food packaging, and vintage cocktail menus',
    description: 'Massive, dramatic black weight balanced with razor-thin hairlines inspired by Victorian advertising broadsides.',
    samplePhrase: 'GRAND SPECTACLE & DELIGHTS',
    pairingSuggestion: 'Outfit 400 for tight contemporary subtitles',
  },

  // Bold, Heavy, Athletic & Condensed
  {
    family: 'Bebas Neue',
    category: 'Condensed Sans Headline',
    classification: 'sans-serif',
    weights: [400],
    moods: ['bold', 'athletic', 'impact', 'sports', 'streetwear', 'loud', 'urgent', 'industrial'],
    bestFor: 'Sports apparel, high-adrenaline video game covers, and urgent campaign posters',
    description: 'All-caps condensed proportions that pack intense visual punch into minimal horizontal space.',
    samplePhrase: 'NEVER RETREAT. NEVER SURRENDER.',
    pairingSuggestion: 'Plus Jakarta Sans 400 for neutral body prose',
  },
  {
    family: 'Anton',
    category: 'Heavy Advertising Sans',
    classification: 'sans-serif',
    weights: [400],
    moods: ['heavy', 'commanding', 'punchy', 'loud', 'aggressive', 'bold', 'rebellious'],
    bestFor: 'Brutalist concert posters, disruptive activism banners, and high-impact packaging',
    description: 'Massive solid stems and compact apertures engineered to dominate billboards and demanding screens.',
    samplePhrase: 'UNCOMPROMISING MAXIMUM IMPACT',
    pairingSuggestion: 'JetBrains Mono 400 for brutalist technical contrast',
  },
  {
    family: 'Archivo Black',
    category: 'Heavy Grotesque Display',
    classification: 'sans-serif',
    weights: [400],
    moods: ['strong', 'modern', 'brutal', 'industrial', 'confident', 'urban', 'hardcore'],
    bestFor: 'Automotive performance brands, industrial machinery, and bold electronic music labels',
    description: 'Uncompromisingly thick geometric stems built with raw industrial fortitude and modern proportions.',
    samplePhrase: 'HEAVY METAL ENGINEERING',
    pairingSuggestion: 'Archivo 400 for continuous stylistic cohesion',
  },
  {
    family: 'Big Shoulders Display',
    category: 'Condensed Super-Family Sans',
    classification: 'sans-serif',
    weights: [400, 700, 900],
    moods: ['chicago', 'urban', 'tall', 'architectural', 'bold', 'rebellious', 'streetwear'],
    bestFor: 'Urban streetwear lookbooks, hip-hop album vinyls, and municipal architecture exhibits',
    description: 'Tall, narrow x-height and sharp turns inspired by Chicago’s rich history of protest graphics and public works.',
    samplePhrase: 'URBAN MONUMENTS & CONCRETE BEATS',
    pairingSuggestion: 'DM Sans 400 for balanced functional contrast',
  },
  {
    family: 'Oswald',
    category: 'Reworked Alternate Gothic Sans',
    classification: 'sans-serif',
    weights: [400, 600, 700],
    moods: ['editorial', 'athletic', 'modern', 'news', 'crisp', 'tall', 'direct'],
    bestFor: 'Digital publication headlines, fitness tracking dashboards, and broadcast infographics',
    description: 'Narrow proportions and tight tracking modeled on the classic Alternate Gothic headline archetype.',
    samplePhrase: 'CHAMPIONSHIP PERFORMANCE PROTOCOL',
    pairingSuggestion: 'Plus Jakarta Sans 300 for pristine modern tables',
  },
  {
    family: 'Teko',
    category: 'Ultra-Tall Condensed Sans',
    classification: 'sans-serif',
    weights: [400, 600, 700],
    moods: ['tall', 'sharp', 'speed', 'racing', 'aerodynamic', 'athletic', 'extreme'],
    bestFor: 'Formula racing telemetry, esports branding, and vertical cinematic titles',
    description: 'Monumentally vertical proportions with squared counterforms tailored for intense kinetic energy.',
    samplePhrase: 'SUPERSONIC VELOCITY & ZERO DRAG',
    pairingSuggestion: 'Space Mono 400 for technical data alignment',
  },

  // Geometric, Modern & Neo-Grotesque
  {
    family: 'Syne',
    category: 'Expressive Avant-Garde Sans',
    classification: 'display',
    weights: [500, 700, 800],
    moods: ['creative', 'artistic', 'fashion', 'experimental', 'sculptural', 'avant-garde', 'futuristic'],
    bestFor: 'Contemporary art festivals, conceptual design studios, and experimental luxury fashion',
    description: 'Dramatic flared terminals and sculptural geometry that turn every character into an architectural statement.',
    samplePhrase: 'SYNTHESIS OF RAW CREATIVE WILL',
    pairingSuggestion: 'Plus Jakarta Sans 400 for understated functional UI',
  },
  {
    family: 'Plus Jakarta Sans',
    category: 'Refined Modern Neo-Grotesque',
    classification: 'sans-serif',
    weights: [400, 500, 600, 700],
    moods: ['clean', 'tech', 'modern', 'minimalist', 'versatile', 'swiss', 'precise', 'corporate'],
    bestFor: 'World-class SaaS products, precision industrial tools, and modern corporate identities',
    description: 'Impeccable balance between crisp geometric clarity and warm contemporary readability.',
    samplePhrase: 'Precision Engineering for Tomorrow',
    pairingSuggestion: 'Playfair Display 700 for editorial contrast',
  },
  {
    family: 'Outfit',
    category: 'Contemporary Geometric Sans',
    classification: 'sans-serif',
    weights: [300, 400, 600, 700, 800],
    moods: ['friendly', 'tech', 'digital', 'clean', 'modern', 'fintech', 'lifestyle', 'polished'],
    bestFor: 'Consumer tech apps, digital banking platforms, and modern electric mobility brands',
    description: 'Open circular geometry and balanced metrics that feel approachable yet technologically advanced.',
    samplePhrase: 'Simplicity Redefined in Every Detail',
    pairingSuggestion: 'Fraunces 600 for high-contrast warm juxtaposition',
  },
  {
    family: 'Space Grotesk',
    category: 'Neo-Grotesque with Monospace Roots',
    classification: 'sans-serif',
    weights: [400, 600, 700],
    moods: ['tech', 'cyberpunk', 'futuristic', 'geek', 'crypto', 'developer', 'scientific', 'quirky'],
    bestFor: 'Web3 protocols, developer tools, scientific journals, and speculative fiction interfaces',
    description: 'Proportional grotesque built on a rigid monospace grid, retaining subtle mechanical idiosyncrasies.',
    samplePhrase: 'Quantum Entanglement & Distributed Truth',
    pairingSuggestion: 'Space Mono 400 for unified developer aesthetic',
  },
  {
    family: 'DM Sans',
    category: 'Low-Contrast Geometric Sans',
    classification: 'sans-serif',
    weights: [400, 500, 700],
    moods: ['minimalist', 'clean', 'neutral', 'objective', 'scandinavian', 'understated', 'modern'],
    bestFor: 'Museum wall labels, architecture monographs, and Scandinavian lifestyle publications',
    description: 'Unflinching neutrality with subtle humanist breathing room for distraction-free reading.',
    samplePhrase: 'Form Follows Silence and Light',
    pairingSuggestion: 'Cormorant Garamond 600 for timeless grace',
  },
  {
    family: 'Urbanist',
    category: 'Geometric Humanist Sans',
    classification: 'sans-serif',
    weights: [300, 400, 600, 700, 800],
    moods: ['architectural', 'clean', 'urban', 'modernist', 'airy', 'spacious', 'metropolitan'],
    bestFor: 'Contemporary architecture studios, urban planning firms, and high-end interior designers',
    description: 'Pure circular forms and spacious tracking evocative of modernist glass and steel facades.',
    samplePhrase: 'Spatial Harmony & Minimalist Purity',
    pairingSuggestion: 'Bodoni Moda 700 for dramatic architectural poise',
  },
  {
    family: 'Manrope',
    category: 'Modern Open-Source Grotesque',
    classification: 'sans-serif',
    weights: [400, 600, 700, 800],
    moods: ['robust', 'tech', 'product', 'modern', 'solid', 'trustworthy', 'universal'],
    bestFor: 'Fintech dashboards, enterprise platforms, and industrial design showcases',
    description: 'Semi-condensed, rounded geometric construction with exceptional legibility across screen sizes.',
    samplePhrase: 'Uncompromising Systems Architecture',
    pairingSuggestion: 'DM Serif Display 400 for punchy headline contrast',
  },

  // Monospace, Technical & Cyberpunk
  {
    family: 'Space Mono',
    category: 'Geometric Fixed-Pitch',
    classification: 'monospace',
    weights: [400, 700],
    moods: ['developer', 'terminal', 'retro-futuristic', 'cyberpunk', 'code', 'space', 'hacker', 'brutalist'],
    bestFor: 'Retro computer terminals, sci-fi spacecraft telemetry, and brutalist web portfolios',
    description: 'Square geometry blended with 1960s space-age headline characteristics.',
    samplePhrase: 'ORBITAL_VELOCITY // 27,600 KM/H',
    pairingSuggestion: 'Space Grotesk 700 for proportional headlines',
  },
  {
    family: 'JetBrains Mono',
    category: 'Crafted Developer Monospace',
    classification: 'monospace',
    weights: [400, 600, 700],
    moods: ['technical', 'code', 'clean', 'data', 'precision', 'scientific', 'modern'],
    bestFor: 'Code editors, mathematical papers, data analytics dashboards, and algorithmic art',
    description: 'Generous character width and carefully optimized code ligatures engineered for zero eye fatigue.',
    samplePhrase: 'const reality = await quantum.observe();',
    pairingSuggestion: 'Plus Jakarta Sans 600 for primary headings',
  },
  {
    family: 'Major Mono Display',
    category: 'Experimental Geometric Monospace',
    classification: 'monospace',
    weights: [400],
    moods: ['experimental', 'glitch', 'cyberpunk', 'avant-garde', 'abstract', 'futuristic', 'weird'],
    bestFor: 'Electronic music festival posters, cybernetic art installations, and glitch aesthetics',
    description: 'Playful unpredictability mixing uppercase and lowercase forms within a strict geometric monospace grid.',
    samplePhrase: 'sYnThEtIc cOnScIoUsNeSs eMeRgInG',
    pairingSuggestion: 'Outfit 400 for grounding readability',
  },

  // Playful, Quirky, Display & Organic
  {
    family: 'Righteous',
    category: 'Deco-Space Display',
    classification: 'display',
    weights: [400],
    moods: ['playful', 'retro-futurism', 'arcade', 'fun', 'groove', '80s', 'neon', 'energetic'],
    bestFor: 'Indie game titles, retro synthwave concerts, and playful craft soda labels',
    description: 'Grid-based Art Deco letterforms adapted into a bold, punchy electronic display face.',
    samplePhrase: 'NEON VELOCITY ARCADE 1984',
    pairingSuggestion: 'Plus Jakarta Sans 400 for balanced UI body copy',
  },
  {
    family: 'Bungee',
    category: 'Urban Vertical Signage Display',
    classification: 'display',
    weights: [400],
    moods: ['loud', 'urban', 'signage', 'blocky', 'playful', 'fun', 'street', 'cartoon'],
    bestFor: 'Street food trucks, skate parks, cartoon merchandise, and bold outdoor signage',
    description: 'Thick, monoline stems and dramatic proportions engineered to thrive in dense city spaces.',
    samplePhrase: 'STREET TACOS & CRUNCHY VIBES',
    pairingSuggestion: 'DM Sans 500 for crisp secondary menu text',
  },
  {
    family: 'Shrikhand',
    category: 'Retro Psychedelic Script/Display',
    classification: 'display',
    weights: [400],
    moods: ['fun', '70s', 'psychedelic', 'groovy', 'warm', 'delicious', 'retro', 'quirky'],
    bestFor: 'Artisan ice cream parlors, natural wine labels, and feel-good music festivals',
    description: 'Luscious, heavy curves and vibrant rhythmic personality inspired by hand-painted Gujarati street signage.',
    samplePhrase: 'Luscious Swirls & Sunshine Days',
    pairingSuggestion: 'Outfit 400 for clean packaging ingredient lists',
  },
  {
    family: 'Caveat',
    category: 'Handwritten Casual Marker',
    classification: 'handwriting',
    weights: [400, 600, 700],
    moods: ['handwritten', 'personal', 'friendly', 'warm', 'casual', 'authentic', 'journal'],
    bestFor: 'Personal diary apps, artisanal bakery branding, handwritten notes, and cozy recipe books',
    description: 'Lively, unhurried brush strokes that replicate the authentic intimacy of real human handwriting.',
    samplePhrase: 'Baked fresh with love every single morning.',
    pairingSuggestion: 'Plus Jakarta Sans 400 for crisp interface clarity',
  },
  {
    family: 'Permanent Marker',
    category: 'Heavy Felt-Tip Marker',
    classification: 'display',
    weights: [400],
    moods: ['raw', 'grunge', 'punk', 'street', 'skate', 'authentic', 'bold', 'rebellious'],
    bestFor: 'Skateboard decks, punk zines, street art flyers, and rebellious apparel tags',
    description: 'Bold, gritty, high-contrast strokes mimicking an industrial waterproof chisel-tip marker.',
    samplePhrase: 'NO COMPROMISE. RAW PASSION.',
    pairingSuggestion: 'Space Grotesk 400 for street-smart typography',
  },
  {
    family: 'Pacifico',
    category: '1950s American Surf Script',
    classification: 'handwriting',
    weights: [400],
    moods: ['surf', 'california', 'vintage', 'sunny', 'friendly', 'beach', 'nostalgic', 'cozy'],
    bestFor: 'Beachwear brands, organic smoothie bars, retro diner logos, and vacation postcards',
    description: 'Warm, breezy cursive script inspired by mid-century American surf culture.',
    samplePhrase: 'Catching Golden Sunset Waves',
    pairingSuggestion: 'Plus Jakarta Sans 400 for modern balance',
  },

  // Scandinavian, Minimalist & Architectural
  {
    family: 'Tenor Sans',
    category: 'Sculptural Humanist Sans',
    classification: 'sans-serif',
    weights: [400],
    moods: ['scandinavian', 'minimalist', 'architectural', 'clean', 'interior', 'zen', 'calm'],
    bestFor: 'Nordic furniture catalogues, sustainable architecture portfolios, and serene day spas',
    description: 'Delicate flaring and wide proportions that evoke Nordic light, wood, and negative space.',
    samplePhrase: 'Light, Birch & Quiet Scandinavian Spaces',
    pairingSuggestion: 'DM Sans 300 for harmonious product descriptions',
  },
  {
    family: 'Montserrat',
    category: 'Urban Geometric Sans',
    classification: 'sans-serif',
    weights: [300, 400, 600, 800],
    moods: ['solid', 'urban', 'geometric', 'classic', 'timeless', 'strong', 'versatile'],
    bestFor: 'City wayfinding systems, contemporary art books, and timeless brand identities',
    description: 'Inspired by early 20th-century street posters and painted signs in the historical Montserrat neighborhood.',
    samplePhrase: 'TIMELESS URBAN METROPOLIS',
    pairingSuggestion: 'Cormorant Garamond 400 for poetic contrast',
  },
  {
    family: 'Quicksand',
    category: 'Soft Rounded Geometric Sans',
    classification: 'sans-serif',
    weights: [400, 600, 700],
    moods: ['soft', 'friendly', 'approachable', 'children', 'gentle', 'warm', 'wellness'],
    bestFor: 'Mindfulness apps, modern children’s brands, pet care products, and wellness packaging',
    description: 'Rounded terminals and open geometry that communicate soothing gentleness and approachability.',
    samplePhrase: 'Gentle Moments for Mindful Living',
    pairingSuggestion: 'Plus Jakarta Sans 400 for crisp subtext',
  },

  // Retro, Vintage & 70s/90s
  {
    family: 'Alfa Slab One',
    category: 'Fat Slab Serif Display',
    classification: 'serif',
    weights: [400],
    moods: ['retro', 'slab', 'bold', 'punchy', '70s', 'loud', 'vintage', 'heavy'],
    bestFor: 'Craft beer cans, retro diner menus, varsity graphics, and bold podcast cover art',
    description: 'Ultra-bold slab serifs with immense weight and extreme contrast designed for unmistakable punch.',
    samplePhrase: 'GENUINE CRAFT BREWERY 1974',
    pairingSuggestion: 'Plus Jakarta Sans 400 for secondary packaging copy',
  },
  {
    family: 'Rye',
    category: 'Wild West Wood-Type Serif',
    classification: 'serif',
    weights: [400],
    moods: ['western', 'vintage', 'whiskey', 'americana', 'rustic', 'heritage', 'woodcut'],
    bestFor: 'Artisan bourbon labels, frontier barbecue joints, and heritage leather workshops',
    description: 'Dramatic barbed serifs and spiky center-stem ornaments inspired by 19th-century American wood type.',
    samplePhrase: 'AGED OAK BARREL BOURBON',
    pairingSuggestion: 'DM Sans 400 for ingredient and provenance specs',
  },
  {
    family: 'Lobster',
    category: 'Bold Retro Casual Script',
    classification: 'display',
    weights: [400],
    moods: ['retro', 'script', 'diner', 'friendly', '50s', 'classic', 'warm'],
    bestFor: 'Classic burger joints, nostalgic roadside attractions, and vintage ice cream parlors',
    description: 'Chunky, cheerful connected script packed with mid-century American charm and optimism.',
    samplePhrase: 'Hand-Spun Shakes & Fresh Fries',
    pairingSuggestion: 'Outfit 400 for menu pricing and details',
  },

  // Literary, Academic & Editorial
  {
    family: 'Lora',
    category: 'Contemporary Humanist Book Serif',
    classification: 'serif',
    weights: [400, 600, 700],
    moods: ['literary', 'academic', 'book', 'thoughtful', 'journal', 'calm', 'classic', 'reading'],
    bestFor: 'Long-form essays, literary quarterly journals, university presses, and contemplative blogs',
    description: 'Brushed curves and moderate contrast rooted in calligraphy, optimized for continuous reading cadence.',
    samplePhrase: 'The Unwritten Chapters of Modern Memory',
    pairingSuggestion: 'Plus Jakarta Sans 400 for footnotes and metadata',
  },
  {
    family: 'Source Serif 4',
    category: 'Rational Editorial Serif',
    classification: 'serif',
    weights: [400, 600, 700],
    moods: ['scholarly', 'trustworthy', 'editorial', 'journalistic', 'clean', 'authoritative'],
    bestFor: 'Think tank whitepapers, digital encyclopedias, and high-credibility newsrooms',
    description: 'Rational proportions and clear bracketing engineered for rigorous legibility in dense compositions.',
    samplePhrase: 'Empirical Evidence & Democratic Discourse',
    pairingSuggestion: 'DM Sans 500 for navigation and section headers',
  },
  {
    family: 'Cinzel Decorative',
    category: 'Ornate Lapidary Inscriptional',
    classification: 'display',
    weights: [400, 700],
    moods: ['ornate', 'fantasy', 'mythological', 'royal', 'epic', 'luxury', 'ancient'],
    bestFor: 'Fantasy book sagas, royal heraldry, perfume bottle inscriptions, and luxury tarot cards',
    description: 'Inscriptional Roman capitals embellished with majestic swashes and flourishing terminals.',
    samplePhrase: 'REALMS OF GOLD & SHADOW',
    pairingSuggestion: 'Plus Jakarta Sans 300 for modern legibility',
  },
];

/**
 * Common typographic aesthetic synonym dictionary for ultra-accurate matching.
 */
const THEME_SYNONYMS: Record<string, string[]> = {
  bold: ['heavy', 'black', 'impact', 'loud', 'strong', 'commanding', 'aggressive', 'punchy', 'thick'],
  impact: ['bold', 'heavy', 'commanding', 'punchy', 'loud', 'solid', 'athletic'],
  luxury: ['elegant', 'fashion', 'vogue', 'editorial', 'expensive', 'refined', 'chic', 'delicate', 'haute'],
  elegant: ['luxury', 'delicate', 'refined', 'graceful', 'poetic', 'sophisticated'],
  retro: ['vintage', '70s', '80s', '90s', 'nostalgic', 'psychedelic', 'groove', 'old-school', 'classic'],
  futuristic: ['tech', 'cyberpunk', 'modern', 'digital', 'sci-fi', 'space', 'terminal', 'code', 'future'],
  cyberpunk: ['futuristic', 'terminal', 'glitch', 'neon', 'code', 'hacker', 'space', 'developer'],
  minimalist: ['clean', 'scandinavian', 'neutral', 'simple', 'airy', 'spacious', 'modern', 'understated'],
  architecture: ['architectural', 'clean', 'scandinavian', 'geometric', 'spacious', 'modernist', 'monumental'],
  playful: ['quirky', 'fun', 'friendly', 'cheerful', 'cartoon', 'informal', 'approachable'],
  editorial: ['magazine', 'literary', 'journal', 'vogue', 'headline', 'article', 'news', 'authoritative'],
  streetwear: ['urban', 'athletic', 'skate', 'punk', 'heavy', 'rebellious', 'bold', 'raw'],
  tech: ['developer', 'code', 'fintech', 'precision', 'digital', 'scientific', 'modern'],
  romantic: ['delicate', 'soft', 'wedding', 'botanical', 'script', 'calligraphy', 'gentle'],
  coffee: ['artisanal', 'warm', 'craft', 'organic', 'book', 'roaster', 'packaging'],
};

/**
 * Intelligent semantic matcher for verified catalogue fonts.
 */
export function findMatchingCatalogueFonts(theme: string, count: number = 5): CatalogueFont[] {
  const normalized = theme.toLowerCase().trim();
  const rawTokens = normalized.split(/[\s,._\-&/]+/).filter(t => t.length > 2);

  // Expand tokens with semantic synonyms
  const searchTokens = new Set<string>(rawTokens);
  rawTokens.forEach(token => {
    // Stem basic suffixes (ing, ful, ous, ic, ist, ive, ed)
    const stem = token.replace(/(ing|ful|ous|ic|ist|ive|ed|ly|s)$/, '');
    if (stem.length > 2) searchTokens.add(stem);

    for (const [key, synonyms] of Object.entries(THEME_SYNONYMS)) {
      if (token.includes(key) || key.includes(token)) {
        searchTokens.add(key);
        synonyms.forEach(syn => searchTokens.add(syn));
      }
    }
  });

  const tokenArray = Array.from(searchTokens);

  // Score each font with weighted factors
  const scored = VERIFIED_FONT_CATALOGUE.map(font => {
    let score = 0;
    const fontNameLower = font.family.toLowerCase();
    const catLower = font.category.toLowerCase();
    const descLower = font.description.toLowerCase();
    const bestForLower = font.bestFor.toLowerCase();

    // 1. Direct family name match (highest priority)
    if (normalized.includes(fontNameLower) || tokenArray.some(t => fontNameLower.includes(t))) {
      score += 70;
    }

    // 2. Classification match (e.g. if user mentions "serif", "sans", "display", "mono")
    if (normalized.includes(font.classification)) {
      score += 30;
    }

    // 3. Mood tags matches
    font.moods.forEach(mood => {
      const moodLower = mood.toLowerCase();
      if (normalized.includes(moodLower)) {
        score += 25;
      } else if (tokenArray.some(t => moodLower.includes(t) || t.includes(moodLower))) {
        score += 15;
      }
    });

    // 4. Practical context & description matches
    tokenArray.forEach(t => {
      if (bestForLower.includes(t)) score += 8;
      if (catLower.includes(t)) score += 6;
      if (descLower.includes(t)) score += 4;
    });

    return { font, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Guarantee high quality results with at least one high-contrast diversity spread
  const topMatches = scored.filter(s => s.score > 0).map(s => s.font);

  if (topMatches.length >= count) {
    return topMatches.slice(0, count);
  }

  // If fewer matches, pad with versatile anchor fonts without duplicates
  const result: CatalogueFont[] = [...topMatches];
  const defaults = [
    VERIFIED_FONT_CATALOGUE[0],  // Playfair Display
    VERIFIED_FONT_CATALOGUE[8],  // Bebas Neue
    VERIFIED_FONT_CATALOGUE[14], // Syne
    VERIFIED_FONT_CATALOGUE[15], // Plus Jakarta Sans
    VERIFIED_FONT_CATALOGUE[21], // Space Mono
    VERIFIED_FONT_CATALOGUE[28], // Tenor Sans
  ];

  for (const d of defaults) {
    if (result.length >= count) break;
    if (!result.some(f => f.family === d.family)) {
      result.push(d);
    }
  }

  return result.slice(0, count);
}

