// Dynamic font loader for Google Fonts

const loadedFonts = new Set<string>();

export function getGoogleFontHref(family: string, weights: number[] = [400, 700]): string {
  const formattedFamily = family.trim().replace(/\s+/g, '+');
  const weightsParam = weights.length > 0 ? `:wght@${weights.sort((a, b) => a - b).join(';')}` : '';
  return `https://fonts.googleapis.com/css2?family=${formattedFamily}${weightsParam}&display=swap`;
}

export function getGoogleFontsSpecimenUrl(family: string): string {
  const formattedFamily = family.trim().replace(/\s+/g, '+');
  return `https://fonts.google.com/specimen/${formattedFamily}`;
}

/**
 * Dynamically loads a Google Font into document head.
 */
export async function loadGoogleFont(family: string, weights: number[] = [400, 700]): Promise<boolean> {
  if (typeof document === 'undefined') return true;

  const fontKey = `${family}:${weights.join(',')}`;
  if (loadedFonts.has(fontKey)) {
    return true;
  }

  const linkId = `gfont-${family.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = getGoogleFontHref(family, weights);
    document.head.appendChild(link);
  }

  loadedFonts.add(fontKey);

  // Wait for font to become available via FontFaceSet API
  try {
    if ('fonts' in document) {
      await document.fonts.load(`16px "${family}"`);
      await document.fonts.ready;
    }
    return true;
  } catch (err) {
    console.warn(`Font load check warning for ${family}:`, err);
    return true;
  }
}

/**
 * Preload an array of font families simultaneously.
 */
export async function preloadFontBatch(fonts: { family: string; weights?: number[] }[]): Promise<void> {
  await Promise.allSettled(fonts.map(f => loadGoogleFont(f.family, f.weights || [400, 700])));
}
