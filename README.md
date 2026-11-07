# TYPEMUSE — AI Font Theme Finder

> **Find the type that feels right.**  
> An editorial typography exhibition and AI font discovery engine designed to translate abstract moods, brand identities, and creative directions into verified Google Fonts pairings.

---

## 🌟 Key Features

- **Semantic Typographic Discovery**: Describe any mood (*"warm artisanal coffee & book press"*, *"cyberpunk terminal noir"*, *"quiet Scandinavian modern"*), and Gemini 3.8 Flash synthesizes verified Google Fonts with matching character, proportions, and pairing companions.
- **Interactive Floating Typography Exhibition**: Tactile background canvas featuring floating glyphs with organic physics and edge-cropping oversized characters (`g`, `&`, `M`, `Q`).
- **Real-Time Solar Theme Engine**: Automatic time detection mode that dynamically synchronizes canvas light/dark appearance with your local solar clock (Daytime 7 AM–7 PM = Light Canvas; Nighttime 7 PM–7 AM = Obsidian Midnight), alongside manual override toggles.
- **Interactive Font Specimen & Glyph Anatomy**: Live specimen preview with dynamic weight switching (300 to 900), headline/body pairing harmony demonstrators, glyph character maps, and 1-click CSS `@import` / `font-family` copy.
- **Sample Text & Case Transformations**: Real-time pangram / custom text testing across all 6 recommendations simultaneously, with instant case switches (`AA` UPPERCASE, `aa` lowercase, `Aa` Title Case) and size sliders.
- **Curated Typographic Philosophy & Rules**: Embedded guides on classical contrast, proportional grotesques, and classification harmony.
- **Direct Google Fonts Integration**: Dynamically loads web fonts on-demand via the Google Fonts API with fast font rendering and zero layout thrashing.
- **Precision Drafting Aesthetic**: Custom technical SVG pen & pencil drafting cursors and a minimalist pale lemon & midnight black visual identity.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
- **Backend / API**: Express 4, Node.js, `@google/genai` (Gemini 3.8 Flash SDK)
- **Tooling**: Vite 8, `tsx`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<username>/typemuse.git
cd typemuse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and provide your Gemini API key:
```bash
cp .env.example .env
```
Inside `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

---

## ⌨️ Keyboard Shortcuts

- `/` — Jump to and focus the font discovery search bar
- `Esc` — Close active modals / blur search input

---

## 📄 License
Apache-2.0
