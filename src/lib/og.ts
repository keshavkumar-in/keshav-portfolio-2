/**
 * Shared pieces for the generated Open Graph cards.
 *
 * The cards are rendered by next/og (satori), which does NOT read the site's
 * SCSS — it only understands inline styles and needs font data handed to it.
 * So the few tokens the cards use are repeated here rather than imported.
 * Keep them in step with src/styles/_tokens.scss.
 */
export const OG = {
  size: { width: 1200, height: 630 },
  ink: "#0D0D0C",
  inkLine: "#2A2A26",
  bone: "#F2F1EA",
  smoke: "#8C8C84",
  volt: "#D6FF3F",
} as const;

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700 | 900;
  style: "normal";
}

/**
 * Fetches a Google font in a format satori can parse: truetype, opentype, or
 * woff. Explicitly NOT woff2, which satori cannot decode.
 *
 * The archaic User-Agent is what keeps woff2 off the table — Google serves
 * woff2 to modern clients. Note it currently answers this UA with plain `woff`
 * rather than `truetype`, so matching only truetype silently yields no font and
 * the card renders in a fallback face at the wrong weight.
 *
 * Returns null rather than throwing: a social card is worth having in a
 * fallback face, and not worth failing a deploy over a transient network error.
 * The failure is logged so it shows up in build output instead of vanishing.
 */
async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}`;

    const res = await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30",
      },
    });

    if (!res.ok) {
      console.warn(`OG font: ${family} ${weight} — CSS request ${res.status}`);
      return null;
    }

    const css = await res.text();
    const url = css.match(
      /src:\s*url\((.+?)\)\s*format\('(?:truetype|opentype|woff)'\)/
    )?.[1];

    if (!url) {
      console.warn(
        `OG font: ${family} ${weight} — no truetype/opentype/woff source in CSS`
      );
      return null;
    }

    const font = await fetch(url);
    if (!font.ok) {
      console.warn(`OG font: ${family} ${weight} — download ${font.status}`);
      return null;
    }

    return await font.arrayBuffer();
  } catch (error) {
    console.warn(`OG font: ${family} ${weight} — ${String(error)}`);
    return null;
  }
}

/** Archivo 900 for display, JetBrains Mono 700 for labels. */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [display, mono] = await Promise.all([
    loadGoogleFont("Archivo", 900),
    loadGoogleFont("JetBrains Mono", 700),
  ]);

  const fonts: OgFont[] = [];
  if (display) {
    fonts.push({ name: "Archivo", data: display, weight: 900, style: "normal" });
  }
  if (mono) {
    fonts.push({
      name: "JetBrains Mono",
      data: mono,
      weight: 700,
      style: "normal",
    });
  }
  return fonts;
}

/**
 * Style fragments, spread into a satori element's `style`.
 *
 * Weight travels with the family deliberately. Only one weight of each face is
 * registered, and satori resolves the default 400 against a face that isn't
 * there — silently rendering the display type thin. Setting `fontFamily` alone
 * is therefore a bug, so the two are not offered separately.
 *
 * The stacks fall back to a generic family if loadOgFonts() returned nothing.
 */
export const OG_DISPLAY = {
  fontFamily: "Archivo, sans-serif",
  fontWeight: 900,
} as const;

export const OG_MONO = {
  fontFamily: "JetBrains Mono, monospace",
  fontWeight: 700,
} as const;
