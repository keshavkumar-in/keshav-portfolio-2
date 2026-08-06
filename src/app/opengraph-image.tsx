import { ImageResponse } from "next/og";
import {
  OG,
  OG_DISPLAY,
  OG_MONO,
  loadOgFonts,
} from "@/lib/og";
import { SITE } from "@/lib/site";

export const alt =
  "Keshav Kumar — freelance full stack developer. Largest Contentful Paint improved from 4.5s to 0.6s.";
export const size = OG.size;
export const contentType = "image/png";

/**
 * The card every shared link renders. Replaces the /og-image.jpg the metadata
 * used to point at, which did not exist — so link previews were blank.
 *
 * Generated rather than static so it cannot drift out of sync with the site
 * the way a hand-exported image does.
 */
export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG.ink,
          padding: 64,
          ...OG_DISPLAY,
        }}
      >
        {/* Top rule: domain and availability */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 24,
            borderBottom: `1px solid ${OG.inkLine}`,
            ...OG_MONO,
            fontSize: 22,
            letterSpacing: 3,
            color: OG.smoke,
          }}
        >
          <span>KESHAVKUMAR.IN</span>
          {SITE.available ? (
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 12, height: 12, background: OG.volt }} />
              <span style={{ color: OG.bone }}>AVAILABLE FOR WORK</span>
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: -4,
              color: OG.bone,
              textTransform: "uppercase",
            }}
          >
            Keshav Kumar
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              ...OG_MONO,
              fontSize: 28,
              letterSpacing: 1,
              color: OG.smoke,
            }}
          >
            Freelance full stack developer / India · Remote
          </div>
        </div>

        {/* The signature device, carrying the strongest documented result. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: `1px solid ${OG.inkLine}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                fontSize: 76,
                letterSpacing: -3,
              }}
            >
              <span
                style={{ color: OG.smoke, textDecoration: "line-through" }}
              >
                4.5s
              </span>
              <span style={{ color: OG.volt }}>→</span>
              <span style={{ color: OG.bone }}>0.6s</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                ...OG_MONO,
                fontSize: 20,
                letterSpacing: 3,
                color: OG.smoke,
              }}
            >
              LARGEST CONTENTFUL PAINT · BERT LABS
            </div>
          </div>

          {/* The mark, drawn with the same geometry as the favicon. */}
          <svg width="104" height="104" viewBox="0 0 64 64">
            <rect width="64" height="64" fill={OG.volt} />
            <g fill={OG.ink}>
              <rect x="15" y="12" width="10" height="40" />
              <path d="M25 36 L49 12 L35 12 L25 22 Z" />
              <path d="M25 28 L49 52 L35 52 L25 42 Z" />
            </g>
          </svg>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
